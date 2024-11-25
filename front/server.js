import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import cors from 'cors';



const app = express();
const PORT = 5173;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cors({
    origin: 'http://localhost:5173',  // L'URL de ton front-end (port 5286 dans ce cas)
    methods: ['GET', 'POST']         // Méthodes HTTP autorisées               // Si tu envoies des cookies ou des informations d'authentification
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});