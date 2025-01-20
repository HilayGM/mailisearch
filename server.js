const express = require('express');
const { MeiliSearch } = require('meilisearch');
const cors = require('cors'); // Habilitar CORS para permitir solicitudes desde el frontend

const app = express();

app.use(cors());
app.use(express.json());

const client = new MeiliSearch({
  host: '',
  apiKey: '',
});

// Endpoint para realizar la búsqueda
app.post('/search', async (req, res) => {
  try {
    const { query } = req.body; // Obtener el término de búsqueda desde el cuerpo de la solicitud

    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'El término de búsqueda es obligatorio' });
    }

    const index = client.index('movies'); // Especificar el índice a buscar
    const searchResults = await index.search(query, {
      limit: 10, // Limitar los resultados a los primeros 10 documentos
    });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    res.status(500).json({ error: 'Hubo un problema al realizar la búsqueda' });
  }
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
