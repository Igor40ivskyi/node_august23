const fs = require('node:fs/promises');
const path = require('node:path');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbPath = path.join(process.cwd(), 'dataBase', 'user.json');

app.get('/users', async (req, res) => {
    const data = await fs.readFile(dbPath);
    if (data.toString() !== '') {
        const users = JSON.parse(data.toString());
        res.status(200).json(users);
    }else {
        const users = [];
        res.status(200).json(users);
    }
});

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const data = await fs.readFile(dbPath);
    if (data.toString() !== '') {
        const users = JSON.parse(data.toString());
        res.status(200).json(users[userId - 1]);
    }else {
        res.status(404).json('no such user');
    }

});

app.post('/users', async (req, res) => {
    const user = req.body;

    if (user.name.length < 3) {
        res.status(404).json('name must be more than 2 letters');
    }

    if (user.age < 0 || user.age > 150) {
        res.status(404).json('age must be more or equal 0 and not bigger than 150');
    }

    if (!user.gender) {
        res.status(404).json('gender is required');
    }

    let data = await fs.readFile(dbPath);
    if (data.toString() !== '') {
        const users = JSON.parse(data.toString());
        users.push(user);
        await fs.writeFile(dbPath, JSON.stringify(users));
    }else {
        const users = [];
        users.push(user);

        await fs.writeFile(dbPath, JSON.stringify(users));
    }

    res.status(201).send('OK');
});

app.put('/users/:userId', async (req, res) => {

    const data = await fs.readFile(dbPath);
    if (data.toString() !== '') {
        const {userId} = req.params;
        const userUpdate = req.body;

        const users = JSON.parse(data.toString());

        if (users[userId - 1]) {
            users[userId - 1] = userUpdate;
            await fs.writeFile(dbPath, JSON.stringify(users));
            res.status(201).json('OK');
        }else {
            res.status(404).json('no user match given id ');
        }
    }else {
        res.status(404).json('no users for update');
    }

});

app.delete('/users/:userId', async (req, res) => {
    const data = await fs.readFile(dbPath);
    if (data.toString() !== '') {
        const {userId} = req.params;
        const users = JSON.parse(data.toString());

        if (users[userId - 1]) {
            users.splice(userId - 1, 1);
            await fs.writeFile(dbPath, JSON.stringify(users));
            res.status(201).json('Deleted');
        } else {
            res.status(404).json('no user match given id');
        }
    } else {
        res.status(404).json('no users for delete');
    }
});


const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})
