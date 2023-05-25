import { ObjectId } from 'bson'
import mongoose from 'mongoose'

const Restaurant_Schema = new mongoose.Schema({
    X: String,
    Y: String,
    name: String,
    recommend: String,
    owner : ObjectId
    
})

export const Restaurant = mongoose.model("Restaurant", Restaurant_Schema)