import { ObjectId } from 'bson'
import mongoose from 'mongoose'

const Recommend_Schema = new mongoose.Schema({
    user: ObjectId,
    restaurant: ObjectId,
})

export const Recommend = mongoose.model("Recommend", Recommend_Schema)