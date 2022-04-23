const express = require('express');
const router = express();

router.get('/logout', (req,res)=> {
    req.session= null;
    req.logOut();
    res.redirect('/');
})


module.exports= router;