import express from 'express'
import mongoose from 'mongoose'
import axios from "axios"

import { Restaurant } from "../models/restaurant.js"


const waiting_time_router = express.Router()

// 식당 waiting time 받아오기 
waiting_time_router.get("/", async (req,res)=>{
    await Restaurant.findOne({name: req.body.name}).then(result=>{
        if (result){
            res.json(result.waiting_time) 
            // ***** waiting_time => Number이기 때문에 res.send 사용X -> res.json 사용O
        }else{
            res.send("식당 이름이 잘못되었습니다.")
        }})
})

// 식당 waiting_time 최신화
waiting_time_router.post("/", async (req, res)=>{
    await Restaurant.findOneAndUpdate(
        {name: req.body.name},
        {waiting_time: req.body.waiting_time},
        {new: true}
    ).then((result)=>{
        res.send("waiting time 이 수정되었습니다.")
    }).catch((err)=>{
        res.send("식당 이름이 잘못 되었습니다.")
    })
})

export default waiting_time_router