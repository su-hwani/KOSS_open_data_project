const express = requrie('express')

const router = express.router();


router.post('/', (req, res) => {
    const { id, pwd, email } = req.body;

    if (!id) return res.json({error : "NO_ID"})
    if (!pwd) return res.json({error : "NO_PWD"})
    if (!email) return res.json({error : "NO_EMAIL"})

    
})

export default router;
