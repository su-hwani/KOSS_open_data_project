import express from 'express'
import mongoose from 'mongoose'
import axios from "axios"

import { Restaurant } from "../models/restaurant.js"
import { User } from "../models/user.js"


const user_router = express.Router()

// user 가 좋아요 누른 식당 얻기
user_router.get("/", async (req,res)=>{
    await User.findOne({ID: req.body.ID}).then(result=>{
        if (result){
            res.send(result.Favorites)
        }else{
            res.send("ID 가 잘못되었거나 회원가입 하지 않았습니다.") // user 정보 찾지 못함
        }
    })
})

user_router.get("/test_url", async (req, res)=>{
    await User.findOne({ID:req.body.ID}).then(result=>{
        res.send(result)
    })
})


// 임시 user 신규 가입 -> 회원가입 부분 완성되면 수정
user_router.post("/join", async (req,res)=>{
    const user = new User({
        Favorites : req.body.Favorites,
        ID : req.body.ID,
        PW : req.body.PW,
        CEO : false  // False: 일반, True: 사장
    })
    await user.save()
    res.send("새로운 유저가 등록하였습니다.")
})

// 좋아요 누른 식당 추가하기
user_router.post("/favorites_insert", async (req, res)=>{
    await User.findOne({ID: req.body.ID}).then(async result=>{
        if (result){
            result.Favorites.push(req.body.restaurant)
            await result.save()
            res.send("좋아요 누른 식당 목록에 추가하였습니다.")
        }else{
            res.send("식당 목록 추가에 실패하였습니다.")
        }
    })
})

// CEO 의 가게 리스트 얻기
user_router.get("/CEO_restaurant_list", async (req, res)=>{
    await User.findOne({ID: req.body.ID}).then(async result=>{
        if ((result) && (result.CEO)){
            res.send(result.CEO_restaurant_list)
        }else{
            res.send("사장이 아니거나 ID 가 잘못되었습니다.") 
        }
    })
})

// CEO 인증 완료 
user_router.post("/CEO_certificate", async (req, res)=>{
    await User.findOneAndUpdate(
        {ID: req.body.ID},
        {CEO: true},
        {new: true}
        ).then(result =>{
            res.send(result)
        }).catch(err=>{
            res.send("ID 가 잘못되었습니다.")
        })
})


export default user_router