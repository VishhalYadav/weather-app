"use strict";

// selecting elements from html file
const city = document.querySelector("#cityName");
const state = document.querySelector("#stateCode");
const country = document.querySelector("#countryCode");
const btnSubmit = document.querySelector("#submit");
const temp = document.querySelector("#temperature");
const feelsLike = document.querySelector("#feels_like");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const img = document.querySelector("#img");
const dateInfo = document.querySelector("#date");
const description = document.querySelector("#description");
const infoContainer = document.querySelector(".info");
const cityDisplayName = document.querySelector("#cityDisplayName");

// function to display date in the weather-forecast terminal.
const displayDate = () => {
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()].slice(0, 3);
  const day = date.getDate();
  const hours = date.getHours();
  const min = date.getMinutes();
  console.log(typeof min);
  const ampm = hours > 12 ? "pm" : "am";
  const info = `${month} ${day}, ${hours}:${min}${ampm}`;
  dateInfo.textContent = info;
};
displayDate();
infoContainer.style.display = "none";

// event listener for the submit event
btnSubmit.addEventListener("click", function (e) {
  if (city.value != "" && state.value != "" && country.value != "") {
    const cityName = city.value;
    const stateName = state.value;
    const countryName = country.value;
    // api requesting for latitude and longtitude of the user location.
    const request = fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryName}&limit=4&appid=7cb853706a03d9e315fea20cbd0c8d2f`
    )
      .then((res) => res.json())
      .then((data) => {
        const { lat } = data[0];
        const { lon } = data[0];
        // api request for the weather-forecast
        const request2 = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7cb853706a03d9e315fea20cbd0c8d2f&units=metric`
        )
          .then((res) => res.json())
          .then((data) => {
            const id = data.weather[0].icon;
            img.src = ` https://openweathermap.org/img/wn/${id}@2x.png`;
            infoContainer.style.display = "block";
            console.log(data);
            temp.textContent = data.main.temp + "℃";
            feelsLike.textContent = data.main.feels_like;
            humidity.textContent = data.main.humidity;
            windSpeed.textContent = data.wind.speed;
            description.textContent = data.weather[0].description;
            cityDisplayName.textContent = `${data.name}, ${data.sys.country}`;
            console.log(cityDisplayName);
            console.log(cityDisplayName.textContent);
          });
      });
  }
});
//
