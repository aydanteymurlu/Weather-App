
const ApiKey = 'e7e33ac2c7566dd82d3ee269aae763d5';

const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const image = document.querySelector('.icon');

async function getWeather(city) {
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`);
        
        if (!res.ok) {
            throw new Error('City not found');
        }
        
        let data = await res.json();
        console.log(data);

        document.querySelector('.error').style.display = 'none';
        document.querySelector('.celcius').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.humidityP').innerHTML = Math.round(data.main.humidity) + '%';
        document.querySelector('.windS').innerHTML = Math.round(data.wind.speed) + 'km/h';

        if (data.weather[0].main == 'Clouds') {
            image.src = 'images/clouds.png';
        } else if (data.weather[0].main == 'Drizzle') {
            image.src = 'images/drizzle.png';
        } else if (data.weather[0].main == 'Mist') { // corrected typo
            image.src = 'images/mist.png';
        } else if (data.weather[0].main == 'Rain') {
            image.src = 'images/rain.png';
        }else if (data.weather[0].main == 'Clear') {
                image.src = 'images/sunny.png';
        }
    } catch (error) {
        console.error(error);
        document.querySelector('.error').style.display = 'block';
    }
}

searchBtn.addEventListener('click', () => {
    getWeather(searchInput.value);
});

