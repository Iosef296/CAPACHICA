import express from "express";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM familias WHERE activa = TRUE ORDER BY calificacion DESC",
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener familias" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM familias WHERE id = $1", [
      req.params.id,
    ]);
    if (!rows.length)
      return res.status(404).json({ error: "Familia no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener familia" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const {
    nombre,
    comunidad,
    descripcion,
    especialidad,
    foto_url,
    habitaciones,
    idiomas,
    servicios,
    calificacion,
    activa,
  } = req.body;
  if (!nombre || !comunidad) {
    return res.status(400).json({ error: "Nombre y comunidad son obligatorios" });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO familias (nombre, comunidad, descripcion, especialidad, foto_url, habitaciones, idiomas, servicios, calificacion, activa)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        nombre,
        comunidad,
        descripcion || null,
        especialidad || null,
        foto_url || null,
        habitaciones || 1,
        idiomas && idiomas.length ? idiomas : ["español"],
        servicios && servicios.length ? servicios : ["desayuno"],
        calificacion || 5.0,
        activa !== false,
      ],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear familia" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const {
    nombre,
    comunidad,
    descripcion,
    especialidad,
    foto_url,
    habitaciones,
    idiomas,
    servicios,
    calificacion,
    activa,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE familias SET
        nombre = COALESCE($1, nombre),
        comunidad = COALESCE($2, comunidad),
        descripcion = COALESCE($3, descripcion),
        especialidad = COALESCE($4, especialidad),
        foto_url = COALESCE($5, foto_url),
        habitaciones = COALESCE($6, habitaciones),
        idiomas = COALESCE($7, idiomas),
        servicios = COALESCE($8, servicios),
        calificacion = COALESCE($9, calificacion),
        activa = COALESCE($10, activa)
       WHERE id = $11 RETURNING *`,
      [
        nombre ?? null,
        comunidad ?? null,
        descripcion ?? null,
        especialidad || null,
        foto_url ?? null,
        habitaciones ?? null,
        idiomas && idiomas.length ? idiomas : null,
        servicios && servicios.length ? servicios : null,
        calificacion ?? null,
        typeof activa === "boolean" ? activa : null,
        req.params.id,
      ],
    );
    if (!rows.length)
      return res.status(404).json({ error: "Familia no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar familia" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "UPDATE familias SET activa = FALSE WHERE id = $1 RETURNING id",
      [req.params.id],
    );
    if (!rows.length)
      return res.status(404).json({ error: "Familia no encontrada" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar familia" });
  }
});

export default router;
