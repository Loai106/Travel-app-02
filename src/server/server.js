var path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const bodyParser = require('body-parser');

const fetch = require("node-fetch");
const { default: axios } = require('axios')
const console = require('console')



const corsOptions = {
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}

// Setup empty JS object to act as endpoint for all routes
const projectData = {};



// Start up an instance of app
const app = express();


// Cors for cross origin allowance

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8080;
app.listen(port,setUp);
function setUp()
{
    console.log('server is running');
    console.log(`running on localhost:${port}`);
}


//the response of a GET request if it made 
app.get('/getAll',(req,res) => {
    console.log('here to get all')
    console.log(projectData)
    res.send(projectData);
    projectData = {};
});

app.get('/getLocation',(req,res)=>{
    console.log("sending location data");
    let locationData = {
        lat : projectData.lat,
        lon : projectData.lon
    }

    console.log(locationData);
    res.send(locationData)
})

//POST routes
app.post('/addData',(req,res)=>{

    console.log(req.body);
    projectData = {
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content,
    }
    

})

//getting dsta from weatherbit api
app.post('/location', (req,res)=>{


   console.log('posting location data');
   console.log(req.body);

   projectData.lat = req.body.latitude;
   projectData.lon = req.body.longitude;
   console.log(projectData);


})

//geeting data from pixabay
app.post('/photo',(req,res)=>{
    console.log('posting photo data');
    console.log(req.body);
    projectData.photo = req.body.photo;
    
})

app.post('/weather',(req,res)=>{
    console.log('posting weather data');
    console.log(req.body);

    projectData.weather = req.body;

})

module.exports = { app };
