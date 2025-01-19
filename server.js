// server.js

const express = require('express');
const app = express();
const port = 3001; // Defina a porta do backend (diferente do Next.js)

app.get('/', (req, res) => {
    res.send('Servidor Backend funcionando!');
});

app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`);
});

const cors = require('cors');
app.use(cors());  // Permite todas as origens por padrão
