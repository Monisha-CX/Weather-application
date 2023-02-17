var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#add");
var city = document.querySelector("#cityoutput");
var weather = document.querySelector("#text");
var temp = document.querySelector("#temp_c");
var tem = document.querySelector("#temp");
var humidity = document.querySelector("#humidity");
var pressure = document.querySelector("#pressure");
var visibility = document.querySelector("#visibility");
var winddir = document.querySelector("#wind_dir");
var winddeg = document.querySelector("#wind_degree");
var uv = document.querySelector("#uv");
var currenticon=document.querySelector("#icon");


//---Moon rise & Set---//

var moonrise = document.querySelector("#moonrise");
var moonset = document.querySelector("#moonset");

//--- City Details ---//
var day = document.querySelector('#currentDate');
var city = document.querySelector("#cityoutput");

//--- sun rise & set ---//
var sunrise = document.querySelector('#sunrise');
var sunriseDiff = document.querySelector("#sunriseDiff");
var sunset = document.querySelector('#sunset');
var sunsetDiff = document.querySelector("#sunsetDiff");

//--- current day weather ---//
var morning = document.querySelector('#morning');
var morningImg = document.querySelector('#morningImg');
var afternoon = document.querySelector('#afternoon');
var afternoonImg = document.querySelector('#afternoonImg');
var evening = document.querySelector('#evening');
var eveningImg = document.querySelector('#eveningImg');
var night = document.querySelector('#night');
var nightImg = document.querySelector('#nightImg');

var dayForecast = document.querySelector('#day-forecast');

btn.addEventListener("click", function () {
  
    fetch('http://api.weatherapi.com/v1/forecast.json?key=55df415ce302427d82d53522231502&q='+inputval.value+'&days=8&aqi=no&alerts=no')           //api for the get request
.then(response => response.json())
.then((data)=> {
      day.innerHTML = moment().format('ddd');
      city.innerHTML = data.location.name;

      if(data && data.forecast && data.forecast){
        let {forecastday} = data.forecast;
        currenticon.setAttribute('src',`./img/${data.current.is_day === 0 ? 'night': 'day'}/${data.current.condition.code}.svg`)
        if(forecastday && forecastday.length > 0){
            const currentDay = forecastday.shift();
            sunrise.innerHTML = currentDay.astro.sunrise;
            sunriseDiff.innerHTML =  moment(`${currentDay.astro.sunrise}`, 'hh:mm A') .from(moment());
            sunset.innerHTML = currentDay.astro.sunset;
            sunsetDiff.innerHTML =  moment().to(moment(`${currentDay.astro.sunset}`, 'hh:mm A'));
            

            let { hour } = currentDay;
            if(hour && hour.length > 0){
                let morningWeather = hour[5];
                
                morning.innerHTML = morningWeather.temp_c;
                
                morningImg.setAttribute('src',`./img/${morningWeather.is_day ===1 ? 'day':'night'}/${morningWeather.condition.code}.svg`);
                let afternoonWeather = hour[11];
                afternoon.innerHTML = afternoonWeather.temp_c;
                afternoonImg.setAttribute('src',`./img/${afternoonWeather.is_day ===1 ? 'day':'night'}/${afternoonWeather.condition.code}.svg`);
                let eveningWeather = hour[17];
                evening.innerHTML = eveningWeather.temp_c;
                eveningImg.setAttribute('src',`./img/${eveningWeather.is_day ===1 ? 'day':'night'}/${eveningWeather.condition.code}.svg`);
                let nightWeather = hour[23];
                night.innerHTML = nightWeather.temp_c;
                nightImg.setAttribute('src',`./img/${nightWeather.is_day ===1 ? 'day':'night'}/${nightWeather.condition.code}.svg`);
            }

             let weatherData = forecastday.map((day,index) =>{
                return `
                <div class="pp ${index !== forecastday.length -1 ? 'border-end':''}">
                <img src="./img/day/${day.day.condition.code}.svg" style="height: 40px" />
                <p class="h5 text-center">${day.day.avgtemp_c}°C</p>
                <p class="text-center">${moment(day.date).format('dddd')}</p>
              </div>
                `;
            });
            dayForecast.innerHTML = weatherData.join('\n');
        
        }
      }

      temp.innerHTML = ` ${data.current.temp_c}°C`;
      tem.innerHTML = ` <span>${data.current.temp_c}°C</span>`;
      weather.innerHTML= data.current.condition.text;
      humidity.innerHTML=`<span>${data.current.humidity} %</span>`;
      pressure.innerHTML=`<span>${data.current.pressure_mb} mb</span>`;
      visibility.innerHTML=`<span>${data.current.vis_km} km</span>`;
      winddir.innerHTML=`<span>${data.current.wind_dir} Wind</span>`;
      winddeg.innerHTML= data.current.wind_degree;
      moonrise.innerHTML=data.forecast.forecastday[0].astro.moonrise;
      moonset.innerHTML=data.forecast.forecastday[0].astro.moonset;
      uv.innerHTML= data.current.uv;
      
      
    })

    //.catch((err) => alert("You entered Wrong city name"));
});


navigator.geolocation.getCurrentPosition(loc=>{
    fetch('http://api.weatherapi.com/v1/forecast.json?key=55df415ce302427d82d53522231502&q='+loc.coords.latitude+","+loc.coords.longitude+'&days=8&aqi=no&alerts=no')           //api for the get request
.then(response => response.json())
.then((data)=> {
    day.innerHTML = moment().format('ddd');
      city.innerHTML = data.location.name;

      if(data && data.forecast && data.forecast){
        let {forecastday} = data.forecast;
        currenticon.setAttribute('src',`./img/${data.current.is_day === 0 ? 'night': 'day'}/${data.current.condition.code}.svg`)
        if(forecastday && forecastday.length > 0){
            const currentDay = forecastday.shift();
            sunrise.innerHTML = currentDay.astro.sunrise;
            sunriseDiff.innerHTML =  moment(`${currentDay.astro.sunrise}`, 'hh:mm A') .from(moment());
            sunset.innerHTML = currentDay.astro.sunset;
            sunsetDiff.innerHTML =  moment().to(moment(`${currentDay.astro.sunset}`, 'hh:mm A'));
            

            let { hour } = currentDay;
            if(hour && hour.length > 0){
                let morningWeather = hour[5];
                
                morning.innerHTML = morningWeather.temp_c;
                
                morningImg.setAttribute('src',`./img/${morningWeather.is_day ===1 ? 'day':'night'}/${morningWeather.condition.code}.svg`);
                let afternoonWeather = hour[11];
                afternoon.innerHTML = afternoonWeather.temp_c;
                afternoonImg.setAttribute('src',`./img/${afternoonWeather.is_day ===1 ? 'day':'night'}/${afternoonWeather.condition.code}.svg`);
                let eveningWeather = hour[17];
                evening.innerHTML = eveningWeather.temp_c;
                eveningImg.setAttribute('src',`./img/${eveningWeather.is_day ===1 ? 'day':'night'}/${eveningWeather.condition.code}.svg`);
                let nightWeather = hour[23];
                night.innerHTML = nightWeather.temp_c;
                nightImg.setAttribute('src',`./img/${nightWeather.is_day ===1 ? 'day':'night'}/${nightWeather.condition.code}.svg`);
            }

             let weatherData = forecastday.map((day,index) =>{
                return `
                <div class="pp ${index !== forecastday.length -1 ? 'border-end':''}">
                <img src="./img/day/${day.day.condition.code}.svg" style="height: 40px" />
                <p class="h5 text-center">${day.day.avgtemp_c}°C</p>
                <p class="text-center">${moment(day.date).format('dddd')}</p>
              </div>
                `;
            });
            dayForecast.innerHTML = weatherData.join('\n');
        
        }
      }

      temp.innerHTML = ` ${data.current.temp_c}°C`;
      tem.innerHTML = ` <span>${data.current.temp_c}°C</span>`;
      weather.innerHTML= data.current.condition.text;
      humidity.innerHTML=`<span>${data.current.humidity} %</span>`;
      pressure.innerHTML=`<span>${data.current.pressure_mb} mb</span>`;
      visibility.innerHTML=`<span>${data.current.vis_km} km</span>`;
      winddir.innerHTML=`<span>${data.current.wind_dir} Wind</span>`;
      winddeg.innerHTML= data.current.wind_degree;
      moonrise.innerHTML=data.forecast.forecastday[0].astro.moonrise;
      moonset.innerHTML=data.forecast.forecastday[0].astro.moonset;
      uv.innerHTML= data.current.uv;
      
      
    })
})
