var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://alexkeenability:testkeenability@ds135876.mlab.com:35876/node_todo_development');

//Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

// Convention is to use capital when creating a model
var Todo = mongoose.model('Todo', todoSchema);


// this is the middleware that we will run in the post request to parse the body of the request
var urlencodedParser = bodyParser.urlencoded({extended: false});



// note that the app that we are passing in as parameter is: app = express();
module.exports = function(app){

  app.get('/todo', function(req, res){
    // get data from mongo db and pass it to the view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data); // this is sending json back to the ajax success function which then reloads the page with the new data.
    });
  });

  app.delete('/todo/:item', function(req, res){
    // find item to delete (replace hyphens with a space because of url)
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data); // this is sending json back to the ajax success function which then reloads the page with the new data.
    });
  });
};




// normally you would get data from the db, but in the beginning of the tutorial we were using this dummy data
// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

// old delete
  // app.delete('/todo/:item', function(req, res){
  //   // the following function is cycling through each todo item and we are returning true or false, 
  //   // if that item returns true then the item remains in the array, if false it deletes it from the array
  //   // we are also replacing spaces with hyphens because you cant have spaces in the url
  //   data = data.filter(function(todo){
  //     return todo.item.replace(/ /g, '-') !== req.params.item;
  //   });
  //   res.json(data); // this is sending json back to the ajax success function which then reloads the page with the new data.
  // });

