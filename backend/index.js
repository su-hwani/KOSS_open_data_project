// express 모듈 불러오기
const express = require("express");

// express 객체 생성
const app = express();

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 3000;
app.listen(port);

// 미들웨어 함수를 특정 경로에 등록
app.use("/", function (req, res) {
  res.json("ASD");
});

console.log(`server running at http ${port}\n`);