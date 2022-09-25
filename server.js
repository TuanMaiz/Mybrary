if(process.env.NODE_ENV !== 'production') //load .env file only in develop process
{
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routers/index')
const authorRouter = require('./routers/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout') //every files of view are going to be put in this layout file
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))


//intergrate mongodb
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}) //dynamic connect base on which host we deploy the site on, second param is require
const db = mongoose.connection //check the connection
db.on('error', error => console.error(error));
db.once('open', () => {console.log('Connected to MongoDB')});

//use router
app.use('/', indexRouter);
app.use('/authors', authorRouter)



app.listen(process.env.PORT || 3000)