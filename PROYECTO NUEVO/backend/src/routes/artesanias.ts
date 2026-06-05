import express from "express";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { tipo } = req.query;
    const query = tipo
      ? "SELECT * FROM artesanias WHERE activo = TRUE AND tipo = $1 ORDER BY created_at DESC"
      : "SELECT * FROM artesanias WHERE activo = TRUE ORDER BY created_at DESC";
    const { rows } = await pool.query(query, tipo ? [tipo] : []);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener artesanías" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM artesanias WHERE id = $1", [
      req.params.id,
    ]);
    if (!rows.length)
      return res.status(404).json({ error: "Artesanía no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener artesanía" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const {
    nombre,
    tipo,
    descripcion,
    tecnica,
    materiales,
    precio_soles,
    precio_usd,
    imagen_url,
    emoji,
    artesana_nombre,
    artesana_comunidad,
    artesana_experiencia,
    stock,
    activo,
  } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO artesanias (nombre, tipo, descripcion, tecnica, materiales, precio_soles, precio_usd, imagen_url, emoji, artesana_nombre, artesana_comunidad, artesana_experiencia, stock, activo)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [
        nombre,
        tipo || null,
        descripcion || null,
        tecnica || null,
        materiales || null,
        precio_soles || 0,
        precio_usd || 0,
        imagen_url || null,
        emoji || null,
        artesana_nombre || null,
        artesana_comunidad || null,
        artesana_experiencia || null,
        stock || 1,
        activo !== false,
      ],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear artesanía" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const {
    nombre,
    tipo,
    descripcion,
    tecnica,
    materiales,
    precio_soles,
    precio_usd,
    imagen_url,
    emoji,
    artesana_nombre,
    artesana_comunidad,
    artesana_experiencia,
    stock,
    activo,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE artesanias SET
        nombre = COALESCE($1, nombre),
        tipo = COALESCE($2, tipo),
        descripcion = COALESCE($3, descripcion),
        tecnica = COALESCE($4, tecnica),
        materiales = COALESCE($5, materiales),
        precio_soles = COALESCE($6, precio_soles),
        precio_usd = COALESCE($7, precio_usd),
        imagen_url = COALESCE($8, imagen_url),
        emoji = COALESCE($9, emoji),
        artesana_nombre = COALESCE($10, artesana_nombre),
        artesana_comunidad = COALESCE($11, artesana_comunidad),
        artesana_experiencia = COALESCE($12, artesana_experiencia),
        stock = COALESCE($13, stock),
        activo = COALESCE($14, activo)
       WHERE id = $15 RETURNING *`,
      [
        nombre ?? null,
        tipo || null,
        descripcion ?? null,
        tecnica ?? null,
        materiales ?? null,
        precio_soles ?? null,
        precio_usd ?? null,
        imagen_url ?? null,
        emoji ?? null,
        artesana_nombre ?? null,
        artesana_comunidad ?? null,
        artesana_experiencia ?? null,
        stock ?? null,
        typeof activo === "boolean" ? activo : null,
        req.params.id,
      ],
    );
    if (!rows.length)
      return res.status(404).json({ error: "Artesanía no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar artesanía" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "DELETE FROM artesanias WHERE id = $1 RETURNING id",
      [req.params.id],
    );
    if (!rows.length)
      return res.status(404).json({ error: "Artesanía no encontrada" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar artesanía" });
  }
});

export default router;
