import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "capachica_secret_2026";

// Hash pregenerado de 'admin123'
const ADMIN = {
  email: "admin@capachica.pe",
  password: "$2b$10$Yhbqh.BMT91qrEEIoYvDGe2ZtlJt7L76zVA.ho./s.GrdrT1fZMsu",
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email !== ADMIN.email) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }
  const valid = await bcrypt.compare(password, ADMIN.password);
  if (!valid) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }
  const token = jwt.sign({ email, role: "admin" }, SECRET, {
    expiresIn: "24h",
  });
  res.json({ token, email });
});

router.get("/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ valid: true, decoded });
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
});

export default router;
