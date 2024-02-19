console.log("HII PK")
// to fetch api
const API_key  ="cbcc1812114782f8ac93783fb98e8481"
async function showWeather()
{
    let city_name ="Multai";
 const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`)

    const data = await response.json();
    console.log(data);
    let newPara = document.createElement('p');
    newPara.textContent= `${data?.main?.temp.toFixed(2)} 0c`

    document.body.appendChild(newPara)
}

