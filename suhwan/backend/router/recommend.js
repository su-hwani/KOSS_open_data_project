import express from 'express'
import mongoose from 'mongoose'
import axios from "axios"

import { Restaurant } from "../models/restaurant.js"
import { User } from "../models/user.js"

const recommend_router = express.Router()

// 좋아요(=추천)을 누른 경우 -> USER 객체 좋아요 누른 식당 리스트에 추가 + Restaurant 좋아요 수 증가 + 해당 식당 좋아한 USER 리스트에 추가
recommend_router.post("/up", async (req, res)=>{

    await Restaurant.findOne({name: req.body.restaurant_name}).then(async result_restaurant=>{
        if (result_restaurant){
            result_restaurant.recommend_count += 1
            await User.findOne({ID: req.body.USER_ID}).then(async result_user=>{
                if (result_user){
                    result_restaurant.recommend_user_list.push(result_user)
                    result_user.Favorites.push(result_restaurant)
                    await result_user.save()
                }else{
                    res.send("USER_ID 가 잘못되었습니다.")
                }
            })
            await result_restaurant.save()
            res.send("해당 식당에 좋아요를 추가하였습니다.")
        }else{
            res.send("해당 식당 이름이 잘못되었습니다.")
        }
    })
})

// 좋아요(=추천)을 취소한 경우 -> USER 객체 좋아요 누른 식당 리스트에서 삭제
//                          + Restaurant 좋아요 수 감소 + 해당 식당 좋아한 USER 리스트에서 삭제
recommend_router.post("/down", async (req, res)=>{

    await Restaurant.findOne({name: req.body.restaurant_name}).then(async result_restaurant=>{
        if (result_restaurant){
            result_restaurant.recommend_count -= 1
            await User.findOne({ID: req.body.USER_ID}).then(async result_user=>{
                if (result_user){
                    for (var i =0; i < result_restaurant.recommend_user_list.length; i++){
                        if (result_restaurant.recommend_user_list[i] == result_user){
                            result_restaurant.recommend_user_list.splice(i,1)
                        }
                    }
                    for (var i =0; i < result_user.Favorites; i++){
                        if (result_user.Favorites[i] == result_restaurant){
                            result_user.Favorites.splice(i,1)
                        }
                    }
                    await result_user.save()
                }else{
                    res.send("USER_ID 가 잘못되었습니다.")
                }
            })
            await result_restaurant.save()
            res.send("해당 식당에 좋아요를 삭제하였습니다.")
        }else{
            res.send("해당 식당 이름이 잘못되었습니다.")
        }
    })
})


export default recommend_router