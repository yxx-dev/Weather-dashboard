let city
let cityHistory = []
let lat = 0
let lon = 0
let geoCoding 
let weather

//read city search history from localStorage
$(window).on('load',function(){
    let searchHistory = localStorage.getItem('searchHistory');
    if(searchHistory !== null) {
        for (i=0; i<searchHistory.length; i++) {
            let newSearchHistory = document.createElement('button');
            newSearchHistory.setAttribute('type','button');
            newSearchHistory.setAttribute('class','btn-width btn btn-secondary');
        }
    }
    
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





