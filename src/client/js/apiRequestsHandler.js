//geoNames api parameters 
const geonamesUrl = 'http://api.geonames.org/';
const username = 'loai10';
const geonamesQuery = 'searchJSON?formatted=true&q=';

//weatherbit api parameters 
const weatherbitUrl = 'http://api.weatherbit.io/v2.0/forecast/';
const weatherbitKey = '59778792fbcc4303806a70a20469f149';

//pixabay api 
const pixabayUrl ='https://pixabay.com/api/';
const  pixabayKey ='28654242-78ae036bc6b751045ae50913e';



//getting the lattiude and longtude from geoNames API
async function getGeoLocation(location) {
    const url = geonamesUrl + geonamesQuery + location + '&username=' + username + '&style=full'; 
    try {
      const response = await fetch(url);
      if (response.ok) {
       
        const data = await response.json();
        const location = {}; 

        location.latitude = data.geonames[0].lat;
        location.longitude = data.geonames[0].lng;
        location.countryCode = data.geonames[0].countryCode;
  
        console.log(location);

        postData('http://localhost:8080/location' ,location);
        return location;
      }
    } catch (error) {
        alert('Entered wrong place')
      console.log(error);
    }
  }


  //getting the weather from weatherbit API
  async function getWeather(lat,lon,days)
  { 
    const urlType = 'daily';
    if(days < 10 )
    urlType = 'hourly'

    const weatherApiEndpoint = `${weatherbitUrl}${urlType}?lat=${lat}&lon=${lon}&key=${weatherbitKey}`;
    const forecast = await fetch(weatherApiEndpoint)
    
    const newData = await forecast.json();
    console.log(newData)
    postData('http://localhost:8080/weather',newData)    
    return newData;
  }


  //getting photo for the desired city
  async function getPhoto(city)
  {
    const pixabayEndpoint = `${pixabayUrl}?key=${pixabayKey}&q=${city}&image_type=photo&pretty=true&category=places`;
/*
    const photo = await fetch('http://localhost:8080/photo',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({pixabayEndpoint})
    })*/
    const photo = await fetch(pixabayEndpoint);
    const photoData = await photo.json();
    console.log(photoData)

    postData('http://localhost:8080/photo',{photo:photoData});
    return photoData;
  }


  
//making a post request 
const postData = async (url='',data={})=>{
  console.log(data);
  const res = await fetch(url,{
      method:'POST',
      credentials:'same-origin',
      headers:{
          'Content-Type':'application/json',
      },
      body: JSON.stringify(data),
  });

  try {
      const newData = await res.json();
      console.log(newData);
      return newData;
  }
  catch(err){
      console.log('error',err);
  }
  
}
  export{getGeoLocation,getWeather,getPhoto};