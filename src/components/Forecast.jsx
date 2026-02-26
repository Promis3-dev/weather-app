import {useState , useEffect} from 'react'
import {toast} from 'react-toastify';





const Forecast = () => {

  const [ForecastData , setForecastData] = useState(false);
  const [cityInput , setCityInput] = useState("");

  const allIcons = {
  "01d": "/clear_icon.png",
  "01n": "/clear_icon.png",
  "02d": "/cloud_icon.png",
  "02n": "/cloud_icon.png",
  "03d": "/scatteredcloud_icon.png",
  "03n": "/scatteredcloud_icon.png",
  "04d": "/brokencloud_icon.png",
  "04n": "/brokencloud_icon.png",
  "09d": "/showerRain_icon.png",
  "09n": "/showerRain_icon.png",
  "10d": "/rain_icon.png",
  "10n": "/rain_icon.png",
  "11d": "/thunderstorm_icon.png",
  "11n": "/thunderstorm_icon.png", 
  "13d": "/snow.png",
  "13n": "/snow.png",
  "50d": "/mist_icon.png",
  "50n": "/mist_icon.png",
}
    
  
const search= async (city)=> {
  if(city===""){
    toast.error("Enter City Name");
    return;                           
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

    const response = await fetch(url);
    const data = await response.json()
          if (response.ok) {
    // console.log(data); 
    const icon = allIcons[data.weather[0].icon] ||"/clear_icon.png" 
    setForecastData ({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon: icon
    });
  } else {
    toast.error("City not found");
  }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

}

   useEffect(() => {
    search("London");
   },[])


  return (
    <div className="container">
      <div className='weather'>
        <div className='search-bar'>
          <input type='text' placeholder='Enter City Name'value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}/>
          <button className='search' onClick={() => search(cityInput)}>search</button>  
        </div>

        <img src={ForecastData.icon} alt='clear' className='weather-icon'/>
        <p className='temperature'>{ForecastData.temperature}°c</p>
        <p className='location'>{ForecastData.location}</p>

        <div className='weather-data'>
          <div className='col'>
            <img src='humidity-icon.png' alt=''/>
            <p>{ForecastData.humidity}%</p>
            <span>Humidity</span>
          </div>

          <div className='col'>
            <img src='wind_icon.png' alt=''/>
            <p>{ForecastData.windSpeed}km/h</p>
            <span>Wind Speed</span>


          </div>


        </div>


      </div>
      {/* <h1>Weather</h1> */}
      
      
    </div>
  )
}

export default Forecast


