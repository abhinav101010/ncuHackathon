const mongoose = require("mongoose");

const SponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    img: { type: String, required: true },

    tier: {
      type: String,
      required: true,
      enum: ["Silver", "Gold", "Platinum", "Co-Title", "Title"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sponsor", SponsorSchema);