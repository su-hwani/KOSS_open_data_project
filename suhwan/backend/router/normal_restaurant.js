import express from 'express'
import mongoose from 'mongoose'
import axios from "axios"

import { Restaurant } from "../models/restaurant.js"


const normal_restaurant_router = express.Router()

// 새로운 식당 등록하기
normal_restaurant_router.post("/new", async (req,res)=>{
    const restaurant = new Restaurant({
        X: req.body.X,
        Y: req.body.Y,
        name: req.body.name,
        recommend: 0, // 특정 추천 수 넘으면 베스트 맛집 DB에 등록
        recommend_user_list: [],
        waiting_time: 0, // 나중에 입력 받을 때 update
        menu: req.body.menu, // menu는 크롤링
        is_Best: false
    })
    await restaurant.save()
    return res.send("식당이 등록되었습니다.")
})

// 식당 정보 삭제하기
normal_restaurant_router.post("/delete", async (req,res)=>{
    await Restaurant.deleteOne({ name: req.body.name }).then((item)=>{
        if (item.deletedCount != 0){
            res.send("식당이 삭제되었습니다.")
        }else{
            res.send("등록된 식당이 아닙니다.")
        }
    })
})

export default normal_restaurant_router