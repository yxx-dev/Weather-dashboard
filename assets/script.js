//open weather api key ee2ea348be4426aff9e80806bfe0d841

//geocoding
let city
let lat = 0
let lon = 0
let geoCoding 
let weather

$('#searchButton').on('click', function(){
    city = $('#searchInput')[0].value;
    //console.log($('#searchInput')[0].value);
    getWeather();
})

function getWeather() {
    geoCoding = `http://api.openweathermap.org/geo/1.0/direct?q= ${city} ,US&limit=1&appid=ee2ea348be4426aff9e80806bfe0d841`;
    fetch(geoCoding)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
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





