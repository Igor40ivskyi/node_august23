//Events
// const events = require('node:events');
//
// const eventEmitter = new events();
//
// eventEmitter.on('click', () => {
//     console.log('click click click');
// });
//
// eventEmitter.once('clickOnce', () => {
//     console.log('click only Once');
// });
//
// eventEmitter.emit('click');
//
// eventEmitter.emit('clickOnce');
// eventEmitter.emit('clickOnce');
// eventEmitter.emit('clickOnce');
// eventEmitter.emit('clickOnce');
// eventEmitter.emit('clickOnce');
// eventEmitter.emit('clickOnce');

//Streams

const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.status(200).json({name: 'Oleh', age: 15});
})


const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})
