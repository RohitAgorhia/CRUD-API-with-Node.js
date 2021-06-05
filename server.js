const {mongo_url, mongoose} = require('./config/mongo.config');
const express = require('express');
const bodyParser = require('body-parser');
var http = require("http");
const app = express();
var cors = require('cors')



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: '50mb',extended: true }))


// Connecting to the Mongo database
mongoose.connect(mongo_url, {
    useNewUrlParser: true
}).then(() => {
    console.log("mongoose Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// create express app
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '100mb',extended: true }))
app.use(bodyParser.json({ limit: '100mb',extended: true }))


app.get('/', (req, res) => {
    res.json({ "message": "Welcome to your project." });
});

app.use('/images',express.static(__dirname + '/images'));

require('./app/routes/routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
