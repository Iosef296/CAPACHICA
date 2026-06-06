const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

const DB_FILE = path.join(__dirname, "emails.json");

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ emails: [] }, null, 2));
}

app.use(cors());
app.use(express.json());

// GET - listar todos los emails
app.get("/api/newsletter", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  res.json({
    success: true,
    total: data.emails.length,
    emails: data.emails,
  });
});

// POST - guardar email nuevo
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "El campo email es obligatorio",
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "El formato del email no es válido",
    });
  }

  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));

  const yaExiste = data.emails.find((e) => e.email === email);
  if (yaExiste) {
    return res.status(409).json({
      success: false,
      message: "Este email ya está suscrito",
    });
  }

  const nuevoEmail = {
    id: Date.now(),
    email: email,
    fecha: new Date().toISOString(),
  };

  data.emails.push(nuevoEmail);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

  res.status(201).json({
    success: true,
    message: "¡Suscripción exitosa!",
    data: nuevoEmail,
  });
});

// DELETE - eliminar email
app.delete("/api/newsletter/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));

  const index = data.emails.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Email no encontrado",
    });
  }

  const eliminado = data.emails.splice(index, 1);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

  res.json({
    success: true,
    message: "Email eliminado correctamente",
    data: eliminado[0],
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
  console.log(`   GET    http://localhost:${PORT}/api/newsletter`);
  console.log(`   POST   http://localhost:${PORT}/api/newsletter`);
  console.log(`   DELETE http://localhost:${PORT}/api/newsletter/:id`);
});