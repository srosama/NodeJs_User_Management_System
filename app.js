require('dotenv').config();

const express = require('express');
const  expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/dbLogic');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = 5000 || process.env.PORT;

//Connect to database
connectDB()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Static files
app.use(express.static('public'))

// App Sessions
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUinitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 50 * 24 * 7
        }}))

// Flash Messages
app.use(flash())

// Templating Engine
app.use(expressLayouts)
app.set('layout', './layout/main');
app.set('view engine', 'ejs')


// Routers
app.use('/', require('./server/routes/user'))

app.get('*', (req, res) => {
    res.status(404).render('404')
})


//Start Micro-app
app.listen(port, ()=>{
    console.log(`CRM APP listening on port http://127.0.0.1:${port}`)
})

