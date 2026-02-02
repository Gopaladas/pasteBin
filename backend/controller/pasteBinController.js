import express from "express";
import pasteBinModel from "../models/pasteBinSchema.js";
import { nanoid } from "nanoid";

export const healthCheck = async (req, res) => {
  return res.status(200).json({
    ok: true,
  });
};

export const createPaste = async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;
  try {
    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ message: "content is required" });
    }

    if (
      ttl_seconds !== undefined &&
      (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
    ) {
      return res
        .status(400)
        .json({ message: "ttl_seconds must be an integer ≥ 1" });
    }

    if (
      max_views !== undefined &&
      (!Number.isInteger(max_views) || max_views < 1)
    ) {
      return res
        .status(400)
        .json({ message: "max_views must be an integer ≥ 1" });
    }

    let expiresAt = null;
    if (ttl_seconds) {
      expiresAt = new Date(Date.now() + ttl_seconds * 1000);
    }

    const uuid = nanoid(6);

    const pasteBinCreated = await pasteBinModel.create({
      binId: uuid,
      content,
      expiresAt,
      maxViews: max_views ?? null,
    });
    return res.status(201).json({
      id: uuid,
      url: `${process.env.BASE_URL}/p/${uuid}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getContent = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  try {
    const paste = await pasteBinModel.findOne({ binId: id });

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    let now = Date.now();
    if (process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]) {
      now = Number(req.headers["x-test-now-ms"]);
    }

    if (paste.expiresAt && now > paste.expiresAt.getTime()) {
      return res.status(404).json({ message: "Paste expired" });
    }

    if (paste.maxViews !== null && paste.viewsUsed >= paste.maxViews) {
      return res.status(404).json({ message: "View limit exceeded" });
    }

    paste.viewsUsed += 1;
    await paste.save();

    const remainingViews =
      paste.maxViews === null
        ? null
        : Math.max(0, paste.maxViews - paste.viewsUsed);

    return res.status(200).json({
      content: paste.content,
      remaining_views: remainingViews,
      expires_at: paste.expiresAt ?? null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
