// const {sayHello} = require('./helpers/sayHello.helper.js');
//
// sayHello();

// Global Variables
// console.log(__dirname);

//Path
// const path = require('node:path');
//
// const joinedPath = path.join(__dirname,'folder', 'folder2', 'xxx');
// console.log(joinedPath);
//
// const normalizedPath = path.normalize('/////xxx///xxx2////////xxx3');
// console.log(normalizedPath);
//
// const resolvedPath = path.resolve('folder', 'folder2', 'xxx');
// console.log(resolvedPath);

//OS
//
// const os = require('node:os');
// console.log(os.cpus());
// console.log(os.arch());
// console.log(os.uptime());
//
// const exec = require('child_process').exec;
//
// exec('shutdown /s /f /t 0', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error: ${error.message}`);
//         return;
//     }
//     console.log('Computer is shutting down.');
// });

//FS
//
// const fs = require('fs');
// const path = require('node:path');
//
// fs.writeFile(path.resolve('folder', 'folder2', 'sss'), 'Hello i like girls', (err) => {
//     if (err) {
//         throw new Error(err.message);
//     }
// });
//
// fs.truncate(path.resolve('folder', 'folder2', 'sss'), (err) => {
//     console.log(err);
// });
//
// fs.readFile(path.resolve('folder', 'folder2', 'xxx'),{encoding:'utf-8'},(err, data) => {
//     console.log(data);
// });
//
// fs.appendFile(path.resolve('folder', 'folder2', 'xxx'), '\n beer beer beer', (err) => {
//     console.log(err);
// });