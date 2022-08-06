let city
let searchHistory = []
let newSearchHistory
let searchHistoryListEl = $('.search-history')
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
    //not functioning yet
    localStorage.clear();
    localStorage.removeItem('searchHistory');
    searchHistoryListEl.children().remove();
})

$('#searchButton').on('click', function(){
    city = $('#searchInput')[0].value;
    if($('#searchInput')[0].value) {
        //console.log($('#searchInput')[0].value);
        getWeather();
    } else alert('Invalid city')
})

function getWeather() {
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
            
            console.log(searchHistory);
            searchHistory.unshift(city);
            if (searchHistory.length>6) {
                searchHistory.pop();
            }
            console.log(searchHistory);
            localStorage.setItem('searchHistory',JSON.stringify(searchHistory));
            
            newSearchHistory = document.createElement('button');
            newSearchHistory.textContent = city;
            newSearchHistory.setAttribute('type','button');
            newSearchHistory.setAttribute('class','btn-width btn btn-secondary');
            $(searchHistoryListEl).prepend(newSearchHistory);
            //for (i=0)
            console.log($(searchHistoryListEl).length);
            if($(searchHistoryListEl).children().length>6) {
                searchHistoryListEl.children().last().remove();
            }
            
            

            lat = data[0].lat;
            lon = data[0].lon;



            //check if error & 404 x2

            weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ee2ea348be4426aff9e80806bfe0d841`;

            fetch(weather).then(function(response){
                return response.json();
            }).then(function(data){
                console.log(data);
            })
        })
}





