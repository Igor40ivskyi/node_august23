const fs = require('node:fs/promises');
const path = require('node:path');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbPath = path.join(process.cwd(), 'dataBase', 'user.json');

app.get('/users', async (req, res) => {
    const users = await fs.readFile(dbPath);
    // const normUsers = users.toString();
    res.status(200).json(JSON.parse(users));
});




const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})
