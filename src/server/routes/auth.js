const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Registration = require("../models/Registration");

router.post("/team-login", async (req, res) => {
  const { email, password } = req.body;

  const team = await Registration.findOne({ email });

  if (!team) {
    return res.status(400).json({ message: "Team not found" });
  }

  const isMatch = await bcrypt.compare(password, team.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: team._id, role: "team" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});