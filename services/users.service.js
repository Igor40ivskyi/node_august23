const fs = require('node:fs/promises');
const path = require('node:path');

const userPath = path.join(process.cwd(), 'dataBase', 'user.json');

const readUser = async () => {
    const buffer = await fs.readFile(userPath);
    const json = buffer.toString();
    return json ? JSON.parse(json) : [];
};

const writeUser = async (users) => {
    await fs.writeFile(userPath, JSON.stringify(users));
};

module.exports = {
    readUser,
    writeUser
};


