const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const router = express.Router();
var exports = module.exports = {};
const Twitter = require('twitter');
const qs = require('querystring');
const querystring = require('querystring');

var client = new Twitter({
  consumer_key: '6SFjcVDTlQ5xwqSxPfKNgXwOt',
  consumer_secret: '2mHd2nn0GVobVcLkdAXUpoPHhwbpzSbGTibNsN2UTdm9yPDnKB',
  access_token_key: '916728546306932736-7Jvk4HCA5HRYiVDra8GBzEY7gVSXzb1',
  access_token_secret: 'iyiwO2zwWq6TwulPxrWLA6AFuO60yUUM7epsUOXPrvzOu'
});

const params = {screen_name: 'nodejs'};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.get('/search/tweets', (req, res) => {
    console.log("search/tweets");
    console.log(req.query);
    let queryS = querystring.escape(req.query['query']);
    params['q'] =queryS;
    client.get('search/tweets', params).then( (tweet)=> {
    //console.log(tweet);
     res.send(tweet);
  })
  .catch( (error)=> {
   console.log(error)
  });
  client.stream('statuses/filter',{ track:queryS}, (stream)=>{ /* */
        console.log(stream);
        io.emit("searchTweets", stream);
  });
});

// API file for interacting with MongoDB
//const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', router);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
const io = require("socket.io").listen(server);

io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
server.listen(port, () => console.log(`Running on localhost:${port}`));

exports.closeServer = function(){
  server.close();
};