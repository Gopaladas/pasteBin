import mongoose from "mongoose";

const pasteBinSchema = new mongoose.Schema(
  {
    binId: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    binLink: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
    maxViews: {
      type: Number,
      default: null,
      min: 1,
    },
    viewsUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const pasteBinModel = mongoose.model("pasteBinData", pasteBinSchema);
export default pasteBinModel;
