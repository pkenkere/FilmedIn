var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var cons = require('consolidate');
var path = require('path');
var MongoDB     = require('mongodb').Db;
var Server      = require('mongodb').Server;
var moment      = require('moment');
global.appRoot = path.resolve(__dirname) + '/';

var app = express();

app.locals.pretty = true;
app.set('port', process.env.PORT || 5000);
app.engine('html', cons.swig);
app.set('views', __dirname + '/frontend/HTML');
app.set('view engine', 'html');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(path.join(__dirname, 'frontend')));

// build mongo database connection url //

var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017;
var dbName = process.env.DB_NAME || 'filmedIn';

var dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;
if (app.get('env') == 'live'){
    // prepend url with authentication credentials //
    dbURL = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+dbHost+':'+dbPort+'/'+dbName;
}

app.use(session({
    secret: 'gk66kxittjevobfhawofyvel4jfrlq34skbifpr6',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: dbURL })
}));

/*
 *  ESTABLISH DATABASE CONNECTION
 *  */

var dbName = process.env.DB_NAME || 'filmedIn';
var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017;

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d){
    if (e) {
        console.log(e);
    } else {
        if (process.env.NODE_ENV == 'live') {
            db.authenticate(process.env.DB_USER, process.env.DB_PASS, function(e, res) {
                if (e) {
                    console.log('mongo :: error: not authenticated', e);
                }
                else {
                    console.log('mongo :: authenticated and connected to database :: "'+dbName+'"');
                }
            });
        }   else{
            console.log('mongo :: connected to database :: "'+dbName+'"');
        }
    }
});

require('./backend/routes/loginRoutes')(app,db);
require('./backend/routes/profileRoutes')(app,db);
require('./backend/routes/job-routes')(app,db);
require('./backend/routes/announcement-routes')(app,db);
require('./backend/routes/equipmentRoutes')(app,db);
require('./backend/routes/feedbackRoutes')(app,db);
require('./backend/routes/reports-routes')(app,db);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
