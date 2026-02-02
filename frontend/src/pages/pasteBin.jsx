import React, { useState } from "react";
import axios from "axios";
import { pasteBinURI } from "../mainApi";
import "./PasteBin.css";

const PasteBin = () => {
  const [formData, setFormData] = useState({
    content: "",
    ttl_seconds: "",
    max_views: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const payload = { content: formData.content };

      if (formData.ttl_seconds)
        payload.ttl_seconds = Number(formData.ttl_seconds);
      if (formData.max_views) payload.max_views = Number(formData.max_views);

      const res = await axios.post(`${pasteBinURI}/pastes`, payload);
      setResult(res.data);

      setFormData({
        content: "",
        ttl_seconds: "",
        max_views: "",
      });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Request failed");
      } else {
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="pastebin-container">
      <h2>Create Paste</h2>

      <form onSubmit={handleSubmit} className="pastebin-form">
        <textarea
          name="content"
          placeholder="Enter paste content..."
          value={formData.content}
          onChange={handleChange}
          rows={8}
          required
        />

        <input
          type="number"
          name="ttl_seconds"
          placeholder="TTL (seconds)"
          value={formData.ttl_seconds}
          onChange={handleChange}
          min="1"
        />

        <input
          type="number"
          name="max_views"
          placeholder="Max views"
          value={formData.max_views}
          onChange={handleChange}
          min="1"
        />

        <button type="submit">Create Paste</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p>
            <b>Paste ID:</b> {result.id}
          </p>

          <div className="copy-row">
            <a href={result.url} target="_blank" rel="noreferrer">
              {result.url}
            </a>

            <button type="button" onClick={handleCopy} className="copy-btn">
              Copy
            </button>
          </div>

          {copied && <span className="copied">Copied!</span>}
        </div>
      )}
    </div>
  );
};

export default PasteBin;
