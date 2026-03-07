const express = require("express");
const router = express.Router();
const Sponsor = require("../models/Sponsor");
const upload = require("../middleware/upload");


// ================= GET ALL =================
// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {

    const tierOrder = {
      Silver: 1,
      Gold: 2,
      Platinum: 3,
      "Co-Title": 4,
      Title: 5,
    };

    const sponsors = await Sponsor.find();

    sponsors.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);

    res.json(sponsors);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= CREATE =================
router.post("/", upload.single("img"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const sponsor = new Sponsor({
      name: req.body.name,
      tier: req.body.tier,
      img: `/uploads/sponsors/${req.file.filename}`,
    });

    await sponsor.save();

    res.status(201).json(sponsor);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ================= UPDATE =================
router.put("/:id", upload.single("img"), async (req, res) => {
  try {

    const updateData = {
      name: req.body.name,
      tier: req.body.tier,
    };

    if (req.file) {
      updateData.img = `/uploads/sponsors/${req.file.filename}`;
    }

    const updated = await Sponsor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    await Sponsor.findByIdAndDelete(req.params.id);
    res.json({ message: "Sponsor deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;