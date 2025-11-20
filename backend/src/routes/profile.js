const express = require("express")
const router = express.Router()

router.get('/myProfile', (req, res) => {
    res.status(200).json({
        message : 'profile Get endpoint hit',
        user : {
            name : 'rk',
            email: 'aravind05.rk@gmail.com',
            phone: '9025517279',
            preference: {
                style: 'casual',
                colors: ['black', 'white']
            }
        }
    });
});

router.put('/myProfile', (req, res) => {
    console.log('Update profile body: ', req.body);
    res.status(200).json({
        message: 'profile updated',
        updatedData: req.body
    });
});

module.exports = router 