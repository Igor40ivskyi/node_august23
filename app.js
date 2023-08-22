const fs = require('node:fs');
const path = require('node:path');

fs.mkdir(path.resolve('folder'), (err) => {
    if (err) {
        throw new Error(err.message);
    }

    for (let i = 1; i < 6; i++) {
        fs.mkdir(path.resolve('folder', `folder${i}`), (err) => {
            if (err) {
                throw new Error(err.message);
            }

            fs.writeFile(path.resolve('folder', `file${i}`),'x', (err) => {
                if (err) {
                    throw new Error(err.message);
                }
            });
        });
    }



});

    fs.readdir(path.resolve('folder'), {withFileTypes: true}, (err, data) => {
        console.log(data);
    });
