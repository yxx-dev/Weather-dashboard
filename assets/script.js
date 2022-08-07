let city
let searchHistory = []
let newSearchHistory
let searchHistoryListEl = $('.search-history')
let existInHistory = false
let lat = 0
let lon = 0
let geoCoding 
let weather

//read city search history from localStorage
$(window).on('load',function(){
    if(localStorage.getItem('searchHistory') !== null) {
        searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
        for (i=0; i<searchHistory.length; i++) {
            newSearchHistory = document.createElement('button');
            newSearchHistory.textContent = searchHistory[i];
            newSearchHistory.setAttribute('type','button');
            newSearchHistory.setAttribute('class','btn-width btn btn-secondary');
            $(searchHistoryListEl).append(newSearchHistory);
            if (i>3) {
                break;
            };
        }
    }
    
})

//clear search history
$('#clear-button').on('click',function(){
    //localStorage.clear();
    localStorage.removeItem('searchHistory');
    searchHistory = [];
    searchHistoryListEl.children().remove();
})
//click city history
searchHistoryListEl.on('click', function(event) {
    event.preventDefault();
    city = event.target.textContent;
    getWeather();
})

//search function
$('#searchButton').on('click', function(){
    city = $('#searchInput')[0].value;
    city = city.substr(0,1).toUpperCase()+city.substr(1);
    if($('#searchInput')[0].value) {
        //console.log($('#searchInput')[0].value);
        getWeather();
    } else alert('Invalid city')
    $('#searchInput')[0].value = '';
})

function getWeather() {
    //geocoding
    geoCoding = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=1&appid=ee2ea348be4426aff9e80806bfe0d841`;
    fetch(geoCoding)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            if(data.length == 0) {
                alert('Invalid city');
                return; //if invalid city, terminate before attempting to get weather
            } 
            console.log(data);
            console.log(data[0].lat, data[0].lon);
            lat = data[0].lat;
            lon = data[0].lon;
            //get weather
            weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=ee2ea348be4426aff9e80806bfe0d841`;
            fetch(weather).then(function(response){
                return response.json();
            }).then(function(data){
                console.log(data);
                //display weather
                displayWeather(data);
            })         
            //record & display search history if not already in the history
            for (i=0; i<searchHistory.length; i++) {
                if (searchHistory[i] == city) {
                    existInHistory = true;
                }
            }
            if (!existInHistory) {
                existInHistory = false;
                console.log(searchHistory);
                searchHistory.unshift(city);
                if (searchHistory.length>5) {
                    searchHistory.pop();
                }
                console.log(searchHistory);
                localStorage.setItem('searchHistory',JSON.stringify(searchHistory));
                newSearchHistory = document.createElement('button');
                newSearchHistory.textContent = city;
                newSearchHistory.setAttribute('type','button');
                newSearchHistory.setAttribute('class','btn-width btn btn-secondary');
                $(searchHistoryListEl).prepend(newSearchHistory);
                //console.log($(searchHistoryListEl).length);
                if($(searchHistoryListEl).children().length>5) {
                 searchHistoryListEl.children().last().remove();
                }
            }
        })
}

function displayWeather(input) {
    let currentWeather = input.current;
    let cloudinessImg = `<img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png" height="40em" alt="${currentWeather.weather[0].description}"/>`;
    let showCity = $('.show-city');
    let showCityParent = $('.show-city-parent')
    let showCityTemp = $('.show-city-parent p')
    //remove weather details if any
    showCityTemp.remove();
    //display current day weather
    showCity.html(`${city} (${moment().format('MMMM Do YYYY')}) ${cloudinessImg}`);
    showCityParent.append($('<p>').text(`Temp: ${currentWeather.temp} F`));
    showCityParent.append($('<p>').text(`Wind: ${currentWeather.wind_speed} mph`));
    showCityParent.append($('<p>').text(`Humidity: ${currentWeather.humidity} %`));
    showCityParent.append($('<p>').text(`UV index: ${currentWeather.uvi}`));

    console.log(showCityParent.children().length);

    //display 5-day forecast

}





