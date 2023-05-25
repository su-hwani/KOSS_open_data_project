const { ObjectId } = require('bson');
const RecommendModel = require('../../models/recommend')
var express = require('express');

var router = express.Router();

router.post('/', (req, res) => {
    const user = new ObjectId(req.user);
    const { restaurant } = req.body;
    RecommendModel.findOne({
        restaurant: new ObjectId(restaurant),
        user
    }).then((recommend) => {
        if (!recommend)
            RecommendModel.create({
                restaurant: new ObjectId(restaurant),
                user
            }).then(
                (_) => res.json({ msg: "추천이 완료되었습니다." })
            )
        else
            res.json({ error: "EXISTS_RECOMMEND", msg: "이미 추천한 가게입니다." });
    })
        .catch((err) => res.json({ error: "DATABASE_ERROR", msg: "데이터베이스 오류 발생" }))

});

router.delete("/", async (req, res) => {
    const user = new ObjectId(req.user);
    const { restaurant } = req.body;
    RecommendModel.deleteOne({
        restaurant: new ObjectId(restaurant),
        user
    }).then(
     res.send({ msg: "추천이 취소되었습니다." })
    ).catch((err) => res.json({ error: "DATABASE_ERROR", msg: "데이터베이스 오류 발생" }))
 
})

module.exports = router;