import express from 'express'
import mongoose from 'mongoose'
import axios from "axios"


const XYrouter = express.Router()


XYrouter.get("/", function (req, res) {

  var data_name = req.body.name // string

  axios({
      method: "get",
      url: "http://openapi.seoul.go.kr:8088/557a527753776a6439336269685878/json/LOCALDATA_072404/1/5/", 
      // openapi test url
  }).then(function(response){
    
    for ( var i=0; i < response.data.LOCALDATA_072404.row.length; i++){
      if ( response.data.LOCALDATA_072404.row[i].BPLCNM == data_name ){
        const restaurant_data = response.data.LOCALDATA_072404.row[i]
        const result = {X: restaurant_data.X, Y: restaurant_data.Y} // 객체 형태로 위도, 경도 전달 -> result.X(string) , result.Y(string) 사용
        return res.send(result)
      }
    }
    return res.status(422).json("해당 식당이 없습니다.")
  })
});






export default XYrouter