const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3030;

const DB_FILE = path.join(__dirname, "emails.json");

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ emails: [] }, null, 2));
}

app.use(cors());
app.use(express.json());

// === CONFIGURACIÓN DE GMAIL ===
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "torresdeissy56@gmail.com",
    pass: "xgdv vjdz swbx nltd",
  },
});

// Función para enviar correo de bienvenida
async function enviarBienvenida(emailSuscriptor) {
  const mailOptions = {
    from: '"Capachica Turismo" <torresdeissy56@gmail.com>',
    to: emailSuscriptor,
    subject: "¡Bienvenido/a a Capachica Turismo! 🌊",
    html: `
      <div style="max-width: 560px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background: #0a2640; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #2a7ab0, #c9a227); padding: 30px 25px; text-align: center;">
          <h1 style="color: #f0f8ff; margin: 0; font-size: 26px; letter-spacing: 1px;">CAPACHICA</h1>
          <p style="color: #e8d5a3; margin: 4px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">Turismo</p>
        </div>
        <div style="padding: 30px 25px; background: #0f2d4a;">
          <p style="color: #d4e8f5; font-size: 16px; line-height: 1.6;">¡Hola! 🎉</p>
          <p style="color: #d4e8f5; font-size: 15px; line-height: 1.7;">
            Gracias por suscribirte al newsletter de <strong style="color: #c9a227;">Capachica Turismo</strong>. 
            A partir de ahora recibirás semanalmente:
          </p>
          <ul style="color: #7fb3d3; font-size: 14px; line-height: 2; padding-left: 20px; margin: 15px 0;">
            <li>🗺️ Nuevos destinos y rutas por el Lago Titicaca</li>
            <li>🎉 Ofertas exclusivas de alojamiento y tours</li>
            <li>🍜 Recetas de gastronomía local</li>
            <li>📅 Calendario de festividades y eventos comunitarios</li>
            <li>📸 Historias y fotos de la vida en Capachica</li>
          </ul>
          <div style="background: rgba(42,122,176,0.2); border-left: 3px solid #c9a227; padding: 15px 18px; border-radius: 0 8px 8px 0; margin: 20px 0;">
            <p style="color: #e8d5a3; font-size: 13px; margin: 0; line-height: 1.6;">
              💡 <strong>Tip:</strong> ¿Sabías que Capachica tiene más de 15 comunidades con tradiciones únicas? 
              En nuestro próximo email te contaremos sobre la Isla de Ticonata y su leyenda milenaria.
            </p>
          </div>
          <p style="color: #d4e8f5; font-size: 14px; line-height: 1.7;">
            Mientras tanto, puedes explorar nuestros destinos en:
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="http://localhost:4321/destinos" style="background: #c9a227; color: #0a2640; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">
              Explorar destinos →
            </a>
          </div>
        </div>
        <div style="padding: 20px 25px; background: #0a2640; text-align: center; border-top: 1px solid rgba(42,122,176,0.3);">
          <p style="color: #7fb3d3; font-size: 12px; margin: 0 0 12px;">Síguenos en redes</p>
          <a href="https://instagram.com/capachicaturismo" style="color: #7fb3d3; text-decoration: none; margin: 0 8px; font-size: 13px;">Instagram</a>
          <a href="https://facebook.com" style="color: #7fb3d3; text-decoration: none; margin: 0 8px; font-size: 13px;">Facebook</a>
          <a href="https://tiktok.com" style="color: #7fb3d3; text-decoration: none; margin: 0 8px; font-size: 13px;">TikTok</a>
        </div>
        <div style="padding: 18px 25px; background: #081e33; text-align: center;">
          <p style="color: #7fb3d3; font-size: 11px; margin: 0; opacity: 0.7;">
            © 2026 Capachica Turismo · Hecho con amor a las orillas del Lago Titicaca 🌊
          </p>
          <p style="color: #7fb3d3; font-size: 10px; margin: 8px 0 0; opacity: 0.5;">
            Recibiste este correo porque te suscribiste en capachicaturismo.pe<br>
            <a href="mailto:hola@capachicaturismo.pe" style="color: #7fb3d3;">hola@capachicaturismo.pe</a>
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Correo enviado a ${emailSuscriptor}`);
  } catch (error) {
    console.error(`❌ Error enviando correo a ${emailSuscriptor}:`, error.message);
  }
}

// GET - listar todos los emails
app.get("/api/newsletter", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  res.json({
    success: true,
    total: data.emails.length,
    emails: data.emails,
  });
});

// POST - guardar email nuevo Y enviar correo
app.post("/api/newsletter", async (req, res) => {
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

  // Enviar correo de bienvenida
  enviarBienvenida(email);

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
  console.log(`   📧 Correos activados con Gmail`);
});