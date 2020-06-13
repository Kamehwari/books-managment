const express =           require('express');
const cors   =            require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const url = "mongodb://localhost:27017/authors";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
  


// Use middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.set('port',process.env.PORT || 3000);

// Allow CORS
app.use(cors());
allowCrossDomain = function(req, res, next) {

  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Allow', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
  res.header('Accept','application/json');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
  //res.header('Access-Control-Allow-preflightContinue','false');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin, filters,eventid');

  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);



// Define Routes

// these routes doesn't require authorization
app.get('/', function(){
    console.log('Welcome to TapEvent Server');
});

app.use(  require('./controllers/authors') );

/**
 * Start Express server.
 */

app.listen(app.get('port'), function(){
	console.log('Server running on port ' + app.get('port'));
});
