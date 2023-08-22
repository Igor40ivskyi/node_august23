const fs = require('node:fs/promises');
const path = require('node:path');

// const foo = async () => {
//
//     const basePath = path.join(process.cwd(), 'baseFolder');
//     await fs.mkdir(basePath,{recursive: true});
//
//     const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
//     const folderNames = ['folder1', 'folder2', 'folder3', 'folder4'];
//
//     for (const file of fileNames) {
//         await fs.writeFile(path.join(basePath, file),'Hello');
//     }
//
//     for (const folder of folderNames) {
//         await fs.mkdir(path.join(basePath, folder),{recursive: true});
//     }
//
//     const files = await fs.readdir(path.join(basePath));
//     for (const file of files) {
//         const stat = await fs.stat(path.join(basePath, file));
//         console.log(path.join(basePath, file), ' : ', stat.isDirectory() ? 'folder' : 'file');
//     }
//
// };
//
// foo();

// const foo = async () => {
//
//     const basePath = path.join(process.cwd(), 'baseFolder');
//     await fs.mkdir(basePath,{recursive: true});
//
//     const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
//     const folderNames = ['folder1', 'folder2', 'folder3', 'folder4'];
//
//     for (const folder of folderNames) {
//
//         const folderPath = path.join(basePath, folder);
//         await fs.mkdir(folderPath,{recursive: true});
//         for (const file of fileNames) {
//             await fs.writeFile(path.join(folderPath, file), 'Hello');
//         }
//     }
//
//     const files = await fs.readdir(path.join(basePath));
//     for (const file of files) {
//         const stat = await fs.stat(path.join(basePath, file));
//         console.log(path.join(basePath, file), ' : ', stat.isDirectory() ? 'folder' : 'file');
//     }
//
// };
//
// foo();

const foo = async () => {

    const basePath = path.join(process.cwd(), 'baseFolder');
    await fs.mkdir(basePath,{recursive: true});

    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
    const folderNames = ['folder1', 'folder2', 'folder3', 'folder4'];

    await Promise.all(folderNames.map(async (folder) => {

        const folderPath = path.join(basePath, folder);
        await fs.mkdir(folderPath, {recursive: true});
        for (const file of fileNames) {
            await fs.writeFile(path.join(folderPath, file), 'Hello');
        }
    }));

    const files = await fs.readdir(path.join(basePath));
    for (const file of files) {
        const stat = await fs.stat(path.join(basePath, file));
        console.log(path.join(basePath, file), ' : ', stat.isDirectory() ? 'folder' : 'file');
    }

};

foo();