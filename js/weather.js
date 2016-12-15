/**
 * Created by User on 15.12.2016.
 */
function drawStatusWeather(condition_array){
//        for(var i = 0; i < condition_array.length; i++ ){
//            document.getElementById("info").src = condition_array;
//        }
    document.getElementById("first").src = "img/" + condition_array[0] + ".png";
    document.getElementById("second").src = "img/" + condition_array[1] + ".png";
    document.getElementById("third").src = "img/" + condition_array[2] + ".png";
    document.getElementById("four").src = "img/" + condition_array[3] + ".png";
    document.getElementById("fifth").src = "img/" + condition_array[4] + ".png";
    document.getElementById("six").src = "img/" + condition_array[5] + ".png";
    document.getElementById("seven").src = "img/" + condition_array[6] + ".png";
};
function drawWeather(some_data, day_array) {
    console.log(some_data);
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: day_array,
            datasets: [{
                label: '# weather',
                data: some_data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
};

function getWeather() {
    var locationUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    var xhttp = new XMLHttpRequest();
    var result = '';
    var text = '';
    var data_forecast = '';

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText) {
                try {
                    result = JSON.parse(this.responseText);
                    data_forecast = result.query.results.channel.item.forecast;
                    document.getElementById("info").innerHTML = result.query.results.channel.title;
                    parseWeather(data_forecast);
                } catch(e) {
                    alert('Try again, Yahoo is not answer'); // error in the above string (in this case, yes)!
                }
            }
        }
    };
    xhttp.open('get', locationUrl, true);
    xhttp.send();
};
function parseWeather(data_forecast) {
    var weather_array = [];
    var day_array = [];
    var condition_array = [];
    for (var i = 0; i < 7; i++) { //data_forecast.length; i++) {
        weather_array.push(data_forecast[i].low);
        day_array.push(data_forecast[i].day);
        condition_array.push(data_forecast[i].text);
    }
    drawWeather(weather_array, day_array);
    drawStatusWeather(condition_array);
};