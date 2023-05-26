import mongoose from 'mongoose'

const Restaurant_Schema = new mongoose.Schema({
    X: Number,
    Y: Number,
    name: String,
    recommend_count: Number,
    recommend_user_list: [ Object ], // user 객체 list
    waiting_time: Number,
    menu: [ String ],
    is_Best: Boolean
})

export const Restaurant = mongoose.model("Restaurant", Restaurant_Schema)