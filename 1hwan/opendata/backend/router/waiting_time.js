const express = require('express');
const router = express.Router();
const Waiting = require('../models/waiting');

router.post('/', async (req, res) => {
    try {
        const { name, menu } = req.body;

        const waiting = new Waiting({
            name,
            waiting,
        });

        await waiting.save();

        res.status(200).json({ message: '웨이팅 시간 저장' });
    } catch (error) {
        res.status(500).json({ error: '서버 오류.' });
    }
});

module.exports = router;