import mongoose from 'mongoose'

const User_Schema = new mongoose.Schema({
    Favorites : [String],
    ID : String,
    PW : String,
    CEO : Boolean,  // False: 일반, True: 사장
    CEO_restaurant_list : [String]
})

export const User = mongoose.model("User", User_Schema)