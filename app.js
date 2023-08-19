require('dotenv').config();

const express = require('express');
const  expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 5000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Static files
app.use(express.static('public'))
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

