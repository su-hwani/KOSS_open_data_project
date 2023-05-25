import express from 'express'
import mongoose from 'mongoose'
import axios from "axios"

import { Restaurant } from "../models/restaurant.js"


const best_restaurant_router = express.Router()

// 베스트 맛집에 등록하기
best_restaurant_router.post("/new", async (req, res)=> {
    await Restaurant.findOneAndUpdate(
        {name: req.body.name}, 
        {is_Best: true},
        {new:true})
    return res.send("베스트 맛집에 등록되었습니다.")
    // new_upload best restaurant
})

// 베스트 맛집에서 삭제하기
best_restaurant_router.post("/delete", async (req, res)=>{
    await Restaurant.findOneAndUpdate(
        {name: req.body.name},
        {is_Best: false},
    )
    return res.send("베스트 맛집에서 삭제되었습니다.")
})

// 주변에 있는 베스트 맛집 검색하기
best_restaurant_router.get("/near", async (req, res)=>{
    var data_name = req.body.name // string
    var restaurant_data = null
    // 이름을 입력받아 X, Y 구하기
    axios({
      method: "get",
      url: "http://openapi.seoul.go.kr:8088/557a527753776a6439336269685878/json/LOCALDATA_072404/1/5/", 
    }).then(function(response){
      for ( var i=0; i < response.data.LOCALDATA_072404.row.length; i++){
        if ( response.data.LOCALDATA_072404.row[i].BPLCNM == data_name ){
            restaurant_data = response.data.LOCALDATA_072404.row[i] // 객체 형태 data
            break
        }
      }
    }).then(function(response){
    // X, Y 기준으로 일정 범위 내 있는 식당 검색하기
        if (restaurant_data){
            Restaurant.find({
                $and: [
                {"X":{$gt: restaurant_data.X - 20, $lt: restaurant_data.X + 20}},
                {"Y":{$gt: restaurant_data.Y - 20, $lt: restaurant_data.Y + 20}},
                {"is_Best":true}
                ]}).then(result => {
                if (result[0]){ 
                    // 주변에 등록된 BEST 맛집이 하나라도 있는 경우
                    res.send(result)
                }else{
                    // 주변에 등록된 bEST 맛집이 하나도 없는 경우 
                    res.status(422).json("not exist near best restaurant")
                }
            })
        }
    })
});
  
export default best_restaurant_router