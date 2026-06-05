import express from "express";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";
const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT r.*, f.nombre as familia_nombre, f.comunidad
       FROM reservas r LEFT JOIN familias f ON r.familia_id = f.id
       ORDER BY r.created_at DESC`,
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener reservas" });
  }
});

router.post("/", async (req, res) => {
  const {
    familia_id,
    nombre_huesped,
    email,
    telefono,
    fecha_llegada,
    fecha_salida,
    num_personas,
    actividad_preferida,
    metodo_pago,
    notas,
  } = req.body;
  if (!nombre_huesped || !email || !fecha_llegada || !fecha_salida) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  const noches = Math.ceil(
    (new Date(fecha_salida).getTime() - new Date(fecha_llegada).getTime()) /
      86400000,
  );
  const precio_total = noches * (num_personas || 1) * 120;
  try {
    const { rows } = await pool.query(
      `INSERT INTO reservas (familia_id, nombre_huesped, email, telefono, fecha_llegada, fecha_salida, num_personas, actividad_preferida, precio_total, metodo_pago, notas)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id, codigo, precio_total, estado`,
      [
        familia_id || null,
        nombre_huesped,
        email,
        telefono,
        fecha_llegada,
        fecha_salida,
        num_personas,
        actividad_preferida,
        precio_total,
        metodo_pago,
        notas,
      ],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear reserva" });
  }
});

router.put("/:id/estado", requireAuth, async (req, res) => {
  const { estado } = req.body;
  const validos = ["pendiente", "confirmada", "cancelada", "completada"];
  if (!validos.includes(estado)) {
    return res.status(400).json({ error: "Estado inválido" });
  }
  try {
    const { rows } = await pool.query(
      "UPDATE reservas SET estado = $1 WHERE id = $2 RETURNING id, codigo, estado",
      [estado, req.params.id],
    );
    if (!rows.length)
      return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});

router.get("/:codigo", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT r.*, f.nombre as familia_nombre, f.comunidad FROM reservas r LEFT JOIN familias f ON r.familia_id = f.id WHERE r.codigo = $1`,
      [req.params.codigo],
    );
    if (!rows.length)
      return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar reserva" });
  }
});

export default router;
