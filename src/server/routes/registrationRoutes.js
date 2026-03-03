const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//
// 🔹 LOGIN TEAM (MUST COME FIRST)
//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const team = await Registration.findOne({ email });

    if (!team)
      return res.status(404).json({ error: "Team not found" });

    const isMatch = await bcrypt.compare(password, team.password);

    if (!isMatch)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: team._id, teamId: team.teamId, role: "team" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      teamName: team.teamName,
      teamId: team.teamId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// 🔹 GET CURRENT TEAM (MUST COME BEFORE /:id)
//
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token)
      return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const team = await Registration.findById(decoded.id).select("-password");

    if (!team)
      return res.status(404).json({ error: "Team not found" });

    res.json(team);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

router.put("/me", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updated = await Registration.findByIdAndUpdate(
      decoded.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(401).json({ error: "Update failed" });
  }
});

//
// 🔹 GET ALL (Admin)
//
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// 🔹 GET SINGLE
//
router.get("/:id", async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);
    res.json(reg);
  } catch {
    res.status(404).json({ error: "Registration not found" });
  }
});

//
// 🔹 CREATE
//
router.post("/", async (req, res) => {
  try {
    const lastTeam = await Registration.findOne().sort({ teamId: -1 });
    const newTeamId = lastTeam ? lastTeam.teamId + 1 : 1;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newRegistration = new Registration({
      ...req.body,
      password: hashedPassword,
      teamId: newTeamId,
    });

    await newRegistration.save();

    res.status(201).json(newRegistration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//
// 🔹 UPDATE BY ID
//
router.put("/:id", async (req, res) => {
  try {
    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//
// 🔹 DELETE
//
router.delete("/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;