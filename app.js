const express = require('express');
const app = express();
const cors= require('cors');
const bodyParser= require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const res = require('express/lib/response');
const env = require('dotenv').config()
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passportSetup');


app.use(cors());
app.use(urlencoded({extended : false}));
app.use(bodyParser.json());
app.listen(process.env.PORT, () => { console.log(`App running in the port ${process.env.PORT}!`);})



app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))

const isLoggedIn = (req,res,next) => {
    if(req.user){
        next()
    }else{
        res.sendStatus(401)
    }
}

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req,res) => {
    res.send('you are logout')
});

app.get('/failed', (req,res) => {
    res.send('you failed to log in')
});
app.get('/success', isLoggedIn, (req,res) => {
    res.send(`welcome ${req.user.displayName}`)
});

app.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  });

app.get('/logout', (req,res)=> {
    req.session= null;
    req.logOut();
    res.redirect('/');
})