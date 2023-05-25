const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bestRestaurantRouter = require('./router/best_restaurant');
const waitingTimeRouter = require('./router/waiting_time');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));




mongoose.connect('mongodb+srv://3leeilwhan:2022@cluster0.v969qfs.mongodb.net/deliciousMenu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');

    app.use('/best_restautant', bestRestaurantRouter);
    app.use('/waiting_time', waitingTimeRouter);

    app.listen(4001, function() {
        console.log('listening on 4001');
    });
})
.catch((error) => {
    console.log('MongoDB connection error: ', error);
});










// var db;
// MongoClient.connect('mongodb+srv://3leeilwhan:2022@cluster0.v969qfs.mongodb.net/?retryWrites=true&w=majority', function (err, client) {

//     console.log('mongoDB connected');
//     if (err) {
//         console.log('mongoDB not connected');
//         return console.log(err);
//     }

//     db = client.db('deliciousMenu');

//     db.collection('post').insertOne( {이름 : 'John', 나이 : 20} , function(err, result) {
//         console.log('저장 완료');

//     });

//     app.listen(4001, function() {
//         console.log('listening on 4001')
//     });
        


// })






















































// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// app.use(express.urlencoded({ extended: true }));


// const Mongodb = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

// const router = express.Router();



// var db;
// MongoClient.connect('mongodb+srv://3leeilwhan:2022@cluster0.v969qfs.mongodb.net/?retryWrites=true&w=majority', function (err, client) {

//     console.log('mongoDB connected');
//     if (err) {
//         console.log('mongoDB not connected');
//         return console.log(err);
//     }

//     db = client.db('deliciousMenu');

//     db.collection('menuTop5').insertOne( {이름 : 'John', 나이 : 20} , function(err, result) {
//         console.log('저장 완료');

//     });

//     app.use('/menuTop5')

//     app.listen(4001, function() {
//         console.log('listening on 4001')
//     });
        


// })