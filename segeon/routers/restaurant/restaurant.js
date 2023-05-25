const { ObjectId } = require('bson');
const RestaurantModel = require('../../models/restaurant')
var express = require('express');

var router = express.Router();

router.post('/', (req, res) => {
    const user = new ObjectId(req.user);
    const { name, x, y } = req.body;
    RestaurantModel.findOne({
        name: name,
        X: x,
        Y: y,
    }).then((recommend) => {
        if (!recommend)
            RestaurantModel.create({
                name: name,
                X: x,
                Y: y,
                owner: user,
            }).then(
                (_) => res.json({ msg: "가게를 등록하였습니다." })
            )
        else
            res.json({ error: "EXISTS_RESTAURANT", msg: "이미 존재하는 가게 입니다." });
    })
        .catch((err) => res.json({ error: "DATABASE_ERROR", msg: "데이터베이스 오류 발생" }))

});

module.exports = router;