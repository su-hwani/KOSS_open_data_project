// 서울시 공공데이터 포탈 인증키: 557a527753776a6439336269685878
const json = require('json')
const mongoose = require('mongoose');
const axios = require('axios')
// express 모듈 불러오기
const express = require("express");

// express 객체 생성
const app = express();
app.use(express.json())

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 3000;
app.listen(port);

// 미들웨어 함수를 특정 경로에 등록
app.post("/", function (req, res) {
  var data_name = req.name // undefined 나옴

  axios({
    method: "get", // 통신 방식
    url: "http://openapi.seoul.go.kr:8088/557a527753776a6439336269685878/json/LOCALDATA_072404/1/5/", // 서버
  }).then(function(response){
    for ( i of response.data.LOCALDATA_072404.row ){
      // console.log(typeof(i.BPLCNM))
      // console.log(typeof(data_name))
      if ( i.BPLCNM == data_name ){
        // console.log(i.BPLCNM)
        
        return res.send(i.X, i.Y)
      }
    }
    return res.send("FALSE")
    //console.log(response.data.LOCALDATA_072404.row[i].BPLCNM) // X,Y 가 위도,경도 오픈데이터 api에서 가져오기.
  })

});

app.get("/restaurant", function (req, res){
  const result = {
    name:"HI"
  }
  res.send(result)
  
})


mongoose.connect("mongodb://my-database:27017/opendata")
console.log(`server running at http ${port}\n`);
