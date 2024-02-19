let container1 = document.querySelector(".container")
let container2 = document.querySelector(".container2")

let info = document.getElementById("results")
let inputPart = document.getElementById("search")
let btnLocation =document.getElementById("btn")
let bottom = document.querySelector(".footer")
let imgTab = container2.querySelector(".output_part .clear img")
console.log(imgTab)
const API_KEY = "cbcc1812114782f8ac93783fb98e8481"
let api;
inputPart.addEventListener("keyup",e=>{
    if(e.key=="Enter" &&inputPart.value!="")
    {
      
        requestApi(inputPart.value)
    }
})

btnLocation.addEventListener("click",()=>
{
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
    else 
    {
        alert("your browser not support geolocation api")
    }
})

function onSuccess(position)
{
    console.log(position)
    const {latitude,longitude} =position.coords;
     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    fetchData()

}

function onError(error)
{
    info.innerHTML =error.message
    info.classList.add("resultError")
}
function requestApi(city)
{
    
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    //  info.innerText ="Getting weather details....."
    //  info.classList.add("resultPending")
     fetchData()
}

function fetchData()
{
    
    info.innerText ="Getting weather details....."
    info.classList.add("resultPending")

   fetch(api).then(response=>(response.json())).then(result =>weatherDetails(result));
}
function weatherDetails(info)
{
    if(info.cod =="404")
    {
    info.innerText =`${inputPart.value}isn't a valid city name`
    info.classList.add("resultError")
    }
    else 
    {
        
        const city = info.name;
        const country = info.sys.country;
        let temp = info.main.temp;
        temp = temp-273
        temp =temp.toFixed(2)
        const description=info.weather[0].description;
        let feels_like = info.main.feels_like;
        feels_like = feels_like-273
        feels_like =feels_like.toFixed(2)
        const humidity = info.main.humidity;
        const id = info.weather[0].id

        if(id==800)
        {
            imgTab.src ="../IMG/clear(all).png"
        }
        else if(id>800 && id<=804)
        {
            imgTab.src ="../IMG/cloud.png"
        }
        else if(id>600 && id<=622)
        {
            imgTab.src ="../IMG/snow.png"
        }
        else if(id>200 && id<=232)
        {
            imgTab.src ="../IMG/sto.png"
        }
        else if(id>500 && id<=531)
        {
            imgTab.src ="../IMG/sto.png"
        }
        else if(id==721)
        {
            imgTab.src ="../IMG/haze.png"
        }



        

        console.log(container2.children[1].children[1].children[0].innerText =temp)
        
        console.log(container2.children[1].children[2].innerText = description)

        console.log(container2.children[1].children[3].children[1].innerText =city)

        
        console.log(container2.children[1].children[3].children[3].innerText =country)

       console.log(bottom.children[0].children[1].children[0].innerText = feels_like)

       console.log(bottom.children[1].children[1].innerText = humidity)

        // info.classList.remove("resultPending","resultError")
        container1.style.display ="none"
        container2.style.display="block"
    }
    console.log(info)
}

let moveTab = document.getElementById("button")
// let moveTab1 = document.getElementById("button1")

moveTab.addEventListener("click",()=>
{
    container2.style.display ="none"
    container1.style.display ="block";
    inputPart.value =""
    info.style.display="none"
})
