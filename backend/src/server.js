const app = require('./app');

const PORT = 3001;

require('dotenv').config();

app.listen(PORT, async () => {
    console.log(`Rodando na porta: ${PORT}`);
});