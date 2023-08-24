const fileService = require('./file.service');
const express = require('express')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const users = await fileService.readDB();
    res.json(users);
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fileService.readDB();

    const user = users.find(user => user.id === +userId);
    if (!user) {
        res.status(422).json('user not found');
    }

    res.json(user);
});

app.post('/users', async (req, res) => {

    const {name, age} = req.body;

    if (!name || name.length < 3) {
        return res.status(400).json('name is not correct');
    }

    if (!age || age < 18 || age > 100) {
        return res.status(400).json('age is not correct');
    }

    const users = await fileService.readDB();

    const newUser = {
        id: users.length ? users.length + 1 : 1,
        name,
        age
    };

    users.push(newUser);

    await fileService.writeDB(users);

    res.status(201).json(newUser);
});

app.patch('/users/:userId', async (req, res) => {

});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})
