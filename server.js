if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express= require('express');
const app= express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error',(error)=> console.error(error));
db.once('open',()=> console.log('Connected to Database'));

const indexRouter= require('./routes/index');
const dailyRouter= require('./routes/dailies');
const todoRouter= require('./routes/todo');

app.set('view engine','ejs');
app.set('views', __dirname +'/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}))


app.use('/', indexRouter);
app.use('/dailies', dailyRouter);
app.use('/todo', todoRouter);

app.listen(3000);