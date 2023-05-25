const mongoose = require('mongoose');

const waitingSchema = new mongoose.Schema({
    name: String,
    waiting: Number,
});

const Waiting = mongoose.model('Waiting', waitingSchema);

module.exports = Waiting;