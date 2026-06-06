const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dataPath = path.join(
  __dirname, 'data', 'festividades.json'
);

function leerDatos() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

function guardarDatos(data) {
  fs.writeFileSync(
    dataPath,
    JSON.stringify(data, null, 2),
    'utf-8'
  );
}

// GET - Todas las festividades
app.get('/api/festividades', (req, res) => {
  try {
    const datos = leerDatos();
    res.json(datos);
  } catch (error) {
    res.status(500).json({
      error: 'Error al leer festividades'
    });
  }
});

// GET - Una festividad por ID
app.get('/api/festividades/:id', (req, res) => {
  try {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const festividad = datos.find(
      f => f.id === id
    );
    if (!festividad) {
      return res.status(404).json({
        error: 'Festividad no encontrada'
      });
    }
    res.json(festividad);
  } catch (error) {
    res.status(500).json({
      error: 'Error al buscar festividad'
    });
  }
});

// POST - Crear nueva festividad
app.post('/api/festividades', (req, res) => {
  try {
    const datos = leerDatos();
    const nueva = req.body;
    const maxId = datos.reduce(
      (max, f) => Math.max(max, f.id), 0
    );
    nueva.id = maxId + 1;
    if (!nueva.nombre || !nueva.fecha) {
      return res.status(400).json({
        error: 'Nombre y fecha son requeridos'
      });
    }
    nueva.actividades = nueva.actividades || [];
    nueva.galeria = nueva.galeria || [];
    nueva.destacado = nueva.destacado || false;
    nueva.imagen = nueva.imagen ||
      `https://picsum.photos/seed/fest${nueva.id}/800/500`;
    datos.push(nueva);
    guardarDatos(datos);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear festividad'
    });
  }
});

// PUT - Actualizar festividad
app.put('/api/festividades/:id', (req, res) => {
  try {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const index = datos.findIndex(f => f.id === id);
    if (index === -1) {
      return res.status(404).json({
        error: 'Festividad no encontrada'
      });
    }
    const actualizada = { ...req.body, id };
    datos[index] = actualizada;
    guardarDatos(datos);
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar'
    });
  }
});

// DELETE - Eliminar festividad
app.delete('/api/festividades/:id', (req, res) => {
  try {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const index = datos.findIndex(f => f.id === id);
    if (index === -1) {
      return res.status(404).json({
        error: 'Festividad no encontrada'
      });
    }
    const eliminada = datos.splice(index, 1);
    guardarDatos(datos);
    res.json({
      mensaje: 'Festividad eliminada',
      eliminada: eliminada[0]
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar'
    });
  }
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mensaje: 'Backend Capachica funcionando'
  });
});

app.listen(PORT, () => {
  console.log(
    ' Servidor corriendo en http://localhost:' + PORT
  );
  console.log(
    ' API: http://localhost:' + PORT + '/api/festividades'
  );
});