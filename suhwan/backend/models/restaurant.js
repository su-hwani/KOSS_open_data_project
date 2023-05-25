import mongoose from 'mongoose'

const Restaurant_Schema = new mongoose.Schema({
    X: Number,
    Y: Number,
    name: String,
    recommend: String,
    waiting_time: Number,
    menu: [ String ],
    is_Best: Boolean
})

export const Restaurant = mongoose.model("Restaurant", Restaurant_Schema)