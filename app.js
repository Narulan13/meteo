const key = "c1e17803a010416793f152038240908";
const path = window.location.href;
const url ='http://api.weatherapi.com/v1'
var themeV = "";
var storage = window.localStorage;



function theme(){
    const theme_img = document.getElementById("theme_img");
    let urlImg = theme_img.src.toString();
    const city = document.getElementById("city").value;
    if(urlImg.includes("sun.svg")){
        theme_img.src = 'img/moon.svg';
        if(city != ""){
            document.getElementsByClassName("windPic")[0].src = 'img/windL.svg';
            document.getElementsByClassName("humidityPic")[0].src = 'img/humidityL.svg';
            document.getElementsByClassName("pressurePic")[0].src = 'img/pressureL.svg';
            document.getElementsByClassName("feels_likePic")[0].src = 'img/feelslikeL.svg';
        }
        document.body.classList.add("light");
        themeV = "light";
        storage.setItem("theme", themeV);
    } else {
        theme_img.src = 'img/sun.svg';
        document.body.classList.remove("light");
        if(city != ""){
            document.getElementsByClassName("windPic")[0].src = 'img/wind.svg';
            document.getElementsByClassName("humidityPic")[0].src = 'img/humidity.svg';
            document.getElementsByClassName("pressurePic")[0].src = 'img/pressure.svg';
            document.getElementsByClassName("feels_likePic")[0].src = 'img/feels_like.svg';
        }
        themeV = "dark";
        storage.setItem("theme", themeV);
    }
}

function getData(){
    document.getElementById("curWea").innerHTML = "";
    document.getElementById("hourlyWeather").innerHTML = "";
    document.getElementById("D10Weather").innerHTML = "";
    document.getElementById("otherPar").innerHTML = "";
    const city = document.getElementById("city").value;
    if(city == ""){
        document.getElementById("curWea").innerHTML = "The city is not selected";
        document.getElementById("hourlyWeather").innerHTML = "The city is not selected";
        document.getElementById("D10Weather").innerHTML = "The city is not selected";
        document.getElementById("otherPar").innerHTML = "The city is not selected";
    }
    fetch(`${url}/current.json?key=c1e17803a010416793f152038240908&q=${city}&aqi=no`)
        .then(res => res.json())
        .then(data => {

            let imgCon = document.createElement("div");
            imgCon.classList.add("imgCon");
            let img = document.createElement("img");
            img.src = `${data.current.condition.icon}`;
            imgCon.append(img);

            let content = document.createElement("div");
            content.classList.add("content");
            let loc = document.createElement("p");
            loc.classList.add("cur_location");
            loc.innerHTML = `${data.location.name}, ${data.location.country}`;
            let time = document.createElement("p");
            time.classList.add("cur_time");
            time.innerHTML = `${data.location.localtime.split(" ")[1]}`;
            let curT = document.createElement("p");
            curT.classList.add("cur_temp_c");
            curT.innerHTML =  `${data.current.temp_c}°C`;
            let status = document.createElement("p");
            status.classList.add("cur_status");
            status.innerHTML = `${data.current.condition.text}`;

            let today = document.createElement("div");
            today.classList.add("today");
            let maxT = document.createElement("p");
            maxT.classList.add("todayMax");
            let minT = document.createElement("p");
            minT.classList.add("todayMin");
            today.append(maxT, minT);

            content.append(loc,time,curT,status, today);

            document.getElementById("curWea").append(imgCon,content);

            let Params = document.createElement("div");
            Params.classList.add("otherParams");
            
            let paramW = document.createElement("div");
            paramW.classList.add("param");
            let windPic = document.createElement("img");
            windPic.src = 'img/wind.svg';
            windPic.classList.add("icon", "windPic");
            let wind = document.createElement("div");
            wind.classList.add("wind");
            let windP = document.createElement("p");
            windP.classList.add("title");
            windP.innerHTML = "Wind";
            let windV = document.createElement("p");
            windV.innerHTML = `${data.current.wind_kph}Km/h`;
            let windD = document.createElement("p");
            windD.innerHTML = `${data.current.wind_dir}`;
            paramW.append(windP,windV, windD);
            wind.append(windPic, paramW);

            let paramH = document.createElement("div");
            paramH.classList.add("param");
            let HumPic = document.createElement("img");
            HumPic.src = 'img/humidity.svg';
            HumPic.classList.add("icon", "humidityPic");
            let humidity = document.createElement("div");
            humidity.classList.add("humidity");
            let humidityP = document.createElement("p");
            humidityP.innerHTML = "Humidity";
            humidityP.classList.add("title");
            let humidityV = document.createElement("p");
            humidityV.innerHTML = `${data.current.humidity}%`;
            paramH.append(humidityP, humidityV);
            humidity.append(HumPic, paramH);

            let paramP = document.createElement("div");
            paramP.classList.add("param");
            let PresPic = document.createElement("img");
            PresPic.src = 'img/pressure.svg';
            PresPic.classList.add("icon", "pressurePic");
            let pressure = document.createElement("div");
            pressure.classList.add("pressure");
            let pressureP = document.createElement("p");
            pressureP.innerHTML = "Pressure";
            pressureP.classList.add("title");
            let pressureV = document.createElement("p");
            pressureV.innerHTML = `${data.current.pressure_mb}mb`;
            paramP.append(pressureP, pressureV);
            pressure.append(PresPic, paramP);

            let paramF = document.createElement("div");
            paramF.classList.add("param");
            let FeelPic = document.createElement("img");
            FeelPic.src = 'img/feels_like.svg';
            FeelPic.classList.add("icon", "feels_likePic");
            let feelsLike = document.createElement("div");
            feelsLike.classList.add("feels_like");
            let feelsLikeP = document.createElement("p");
            feelsLikeP.classList.add("title");
            feelsLikeP.innerHTML = "Feels Like";
            let feelsLikeV = document.createElement("p");
            feelsLikeV.innerHTML = `${data.current.feelslike_c}°C`;
            paramF.append(feelsLikeP, feelsLikeV);
            feelsLike.append(FeelPic, paramF);

            Params.append(wind, humidity, pressure, feelsLike);

            document.getElementById("otherPar").append(Params);
            if(storage.getItem("theme") == "light"){
                document.getElementsByClassName("windPic")[0].src = 'img/windL.svg';
                document.getElementsByClassName("humidityPic")[0].src = 'img/humidityL.svg';
                document.getElementsByClassName("pressurePic")[0].src = 'img/pressureL.svg';
                document.getElementsByClassName("feels_likePic")[0].src = 'img/feelslikeL.svg';
            } else {
                document.getElementsByClassName("windPic")[0].src = 'img/wind.svg';
                document.getElementsByClassName("humidityPic")[0].src = 'img/humidity.svg';
                document.getElementsByClassName("pressurePic")[0].src = 'img/pressure.svg';
                document.getElementsByClassName("feels_likePic")[0].src = 'img/feels_like.svg';
            }
        })
        .catch(err => console.error("Error: ", err)) 

    fetch(`${url}/forecast.json?key=c1e17803a010416793f152038240908&q=${city}&days=1&aqi=no&alerts=no`)
        .then(res => res.json())
        .then(data => {
            let maxT = data.forecast.forecastday[0].day.maxtemp_c;
            let minT = data.forecast.forecastday[0].day.mintemp_c;
            document.getElementsByClassName("todayMax")[0].innerHTML = `Max.:${maxT}°C`;
            document.getElementsByClassName("todayMin")[0].innerHTML = `Min.:${minT}°C`;
            let hours = data.forecast.forecastday[0].hour;
            hours.forEach(hour => {
                let divCard = document.createElement("div");
                divCard.classList.add("hour_card");
                let hourP = document.createElement("p");
                hourP.innerHTML = `${hour.time.split(" ")[1]}`;
                let img = document.createElement("img");
                img.classList.add("icon");
                img.src = `${hour.condition.icon}`;
                let T = document.createElement("p");
                T.innerHTML = `${hour.temp_c}°C`;
                divCard.append(hourP,img,T);
                document.getElementById("hourlyWeather").append(divCard);
            })
        })
        .catch(err => console.error("Error: ", err))
    fetch(`${url}/forecast.json?key=c1e17803a010416793f152038240908&q=${city}&days=10&aqi=no&alerts=no`)
        .then(res => res.json())
        .then(data => {
            let days = data.forecast.forecastday;
            days.forEach(day => {
                let divCard = document.createElement("div");
                divCard.classList.add("d10_card");
                let dayP = document.createElement("p");
                dayP.innerHTML = `${day.date.split("-")[1]}/${day.date.split("-")[2]}`;
                let img = document.createElement("img");
                img.classList.add("icon");
                img.src = `${day.day.condition.icon}`;
                let maxT = document.createElement("p");
                maxT.innerHTML = `Max.:${day.day.maxtemp_c}°C`;
                let minT = document.createElement("p");
                minT.innerHTML = `Min.:${day.day.mintemp_c}°C`;
                divCard.append(dayP,img,maxT,minT);
                document.getElementById("D10Weather").append(divCard);
            })
        })
        .catch(err => console.error( "Error: ", err))
}