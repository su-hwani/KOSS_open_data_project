// 서울시 공공데이터 포탈 인증키: 557a527753776a6439336269685878
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import XYrouter from "./router/get_XY.js"
import best_restaurant_router from './router/best_restaurant.js'
import normal_restaurant_router from './router/normal_restaurant.js'
import waiting_time_router from './router/waiting_time.js'
import user_router from './router/user.js'

import dotenv from 'dotenv'
import nodemon from 'nodemon'


const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config();

mongoose
  .connect(
    process.env.URL,{}
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });
  
// Router
app.use("/get_XY", XYrouter)
app.use("/best_restaurant", best_restaurant_router)
app.use("/waiting_time", waiting_time_router)
app.use("/normal_restaurant", normal_restaurant_router)
app.use("/user", user_router)

app.listen(port)
console.log(`server running at http ${port}\n`)

