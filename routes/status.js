const express = require('express');
const router = express();
const isLoggedIn = require('../middleware/isLogged');

router.get('/failed', (req,res) => {
    res.send('you failed to log in')
});

router.get('/success', isLoggedIn, (req,res) => {
    res.send(`welcome ${req.user.displayName}`)
});

module.exports = router ;