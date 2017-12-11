var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
// app.use('/assets', express.static('./public')); 
app.use(express.static('./public')); // this will be used on every url or requests as opposed to just /assets url's, basically it wont be route specific
// basically if you have in your head tag link to stylesheet say styles.css, this will look for it and if it finds it will load it, otherwise not.

// fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');
