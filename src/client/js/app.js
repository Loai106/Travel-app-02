const { default: axios } = require('axios')
import { getGeoLocation,getWeather, getPhoto } from './apiRequestsHandler';
//putting all data in one object
const tripData = {};


//add an event to get the data from open Weather api whenever user click generate
const perform = async(e)=>
{
    e.preventDefault();

    tripData.city = document.getElementById('city').value;

    const startDate= new Date(document.getElementById('date').value);
    const endDate = new Date(document.getElementById('end_date').value)

    tripData.startDate = startDate
    tripData.endDate = endDate;
    tripData.daysToStart = calculateNumOfDays();
    console.log(tripData.daysToStart)

    tripData.duration = tripDuration();
    
    //adding contry data
    const geoNamesData =await getGeoLocation(tripData.city);

    let locationData = await fetch('http://localhost:8080/getLocation')
    tripData.lat = geoNamesData.latitude;
    tripData.lon = geoNamesData.longitude;

    //adding weather data
    const weatherData =await getWeather(tripData.lat,tripData.lon, 15);
    console.log(weatherData);

    tripData.weather = weatherData;

    const tirpPhoto =  await getPhoto(tripData.city);
    tripData.photo = tirpPhoto.hits[0].largeImageURL;
    console.log(tripData);

    if(document.querySelector('.result')!=null)
    {
      clearData();

    }

    updateUI();    

 
    
}


//updating the page after got the data and send it to our server
const updateUI= ()=>{

    //creating the html code so just add it into the dom after that 
    const trip = `<div class="holder result">
<div id="image">
    <img src="${tripData.photo}" alt="${tripData.city}"/>
</div>
<div id="data">
  <div id="location">trip to : ${tripData.city}</div>
  <div id="trip_start">Departing : ${tripData.startDate}</div>
  <div id="trip_end">return : ${tripData.endDate}</div>
  <div id="days_to_start">Days to go : ${tripData.daysToStart} days</div>
  <div id="duration">Duration : ${tripData.duration} days</div>
</div>

<div id="weather_container">
  <h2>Weather for then :</h2>
    <p id="low_temp">low temperature:${tripData.weather.data[0].low_temp}</p>
    <p id="high_temp">high temperature:${tripData.weather.data[0].high_temp}</p>
    <p id="high_temp">description:${tripData.weather.data[0].weather.description}</p>


</div>

    
    
    
    </div>`;

    document.getElementById('entryHolder').insertAdjacentHTML('beforeend',trip)
 
}


const clearData = ()=>{

  document.querySelector('.result').remove();
}

   //number of days till your trip
const calculateNumOfDays = ()=>{
  const date1= new Date(document.getElementById('date').value);
  const presentDate = new Date(); 

  //time defference of two dates
  const diff_in_time = date1.getTime() - presentDate.getTime();

  //difference in days
  const days = diff_in_time/(1000*3600*24);


  return Math.round(days) ;

 }

   // trip duration 
const tripDuration = ()=>{
  const start = new Date(document.getElementById('date').value);
  const end = new Date(document.getElementById('end_date').value);
  const diff = end.getTime() -start.getTime();
  const days = diff/(1000*3600*24);

  return Math.round(days);
        

 }


export {perform}