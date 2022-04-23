const express = require('express');
const app = express();
const cors= require('cors');
const bodyParser= require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const res = require('express/lib/response');
const env = require('dotenv').config()
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./middleware/passportSetup');





// Require Routes
const indexRouter = require('./routes/index');
const statusRouter = require('./routes/status');
const authRouter = require('./routes/auth');
const logOutRouter = require('./routes/logOut');

app.use(cors());
app.use(urlencoded({extended : false}));
app.use(bodyParser.json());
app.listen(process.env.PORT, () => { console.log(`App running in the port ${process.env.PORT}!`);})


// create session
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))


// init passport
app.use(passport.initialize());
app.use(passport.session());


// use routes
app.use(indexRouter);
app.use(statusRouter);
app.use(authRouter);
app.use(logOutRouter);


