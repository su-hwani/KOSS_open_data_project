const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

router.post('/', async (req, res) => {
    try {
        const { name, menu } = req.body;

        const restaurant = new Restaurant({
            name,
            menu,
        });

        await restaurant.save();

        res.status(200).json({ message: '음식점 메뉴 저장' });
    } catch (error) {
        res.status(500).json({ error: '서버 오류.' });
    }
});

module.exports = router;