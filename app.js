const express = require('express');
const userService = require('./services/users.service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const users = await userService.readUser();
    res.json(users);
});

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    if (typeof +userId !== "number") {
        return res.status(404).json('userId must be a number');
    }

    const users = await userService.readUser();
    const user = users.find(user => user.id === +userId);

    if (!user) {
        return res.status(404).json('no user match given userId');
    }

    res.json(user);
});

app.post('/users', async (req, res) => {
    const {name, age, gender, city} = req.body;

    if (!name || name.length < 3) {
        return res.status(400).json('name is not valid');
    }

    if (!age || (age < 18 || age > 100)) {
        return res.status(400).json('age must be greater or equal 18 and less than or equal 100');
    }

    if (!gender || gender !== 'male' && gender !== 'female') {
        return res.status(400).json('gender is required and must be eather male or female');
    }

    const users = await userService.readUser();
    const newUser = {
        id: users.length ? users.length + 1 : 1,
        name,
        age,
        gender,
        city
    };

    users.push(newUser);

    await userService.writeUser(users);

    res.status(201).json(newUser);
});

app.patch('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const {name, age, gender, city} = req.body;

    if (name && name.length < 3) {
        return res.status(400).json('name is not valid');
    }

    if (age && (age < 18 || age > 100)) {
        return res.status(400).json('age must be greater or equal 18 and less than or equal 100');
    }

    if (gender && gender !== 'male' && gender !== 'female') {
        return res.status(400).json('gender is required and must be eather male or female');
    }

    const users = await userService.readUser();
    const index = users.findIndex(user => user.id === +userId);

    if (index === -1) {
        return res.status(404).json('user not found');
    }

    if (name) users[index].name = name;
    if (age) users[index].age = age;
    if (gender) users[index].gender = gender;
    if (city) users[index].city = city;

    await userService.writeUser(users);

    res.status(200).json(users[index]);

});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    if (typeof +userId !== "number") {
        return res.status(400).json('userId must be a number');
    }

    const users = await userService.readUser();
    const index = users.findIndex(user => user.id === +userId);

    if (index === -1) {
        res.status(404).json('user not found');
    }

    users.splice(index, 1);

    await userService.writeUser(users);

    res.status(203).json('deleted');
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

