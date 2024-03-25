import "./styles/main.css"; // The CSS plugin with take this and make it load first.

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=fb7003ac9500483ab32152923242303&q=${city}`,
    );
    const data = await response.json();
    renderWeather(data);
  } catch (error) {
    console.error(error);
    alert("ERROR: City not found!");
  }
}

function renderWeather(data) {
  const cityName = document.querySelector("#city");
  const state = document.querySelector("#state");
  const condition = document.querySelector("#condition");
  const temp = document.querySelector("#temp");
  const feelsLike = document.querySelector("#feelslike");
  const humidity = document.querySelector("#humidity");
  const wind = document.querySelector("#wind");

  cityName.textContent = data.location.name;
  state .textContent = data.location.region;
  condition.textContent = data.current.condition.text;
  temp.textContent = `${data.current.temp_c}°C`;
  feelsLike.textContent = `Feels like: ${data.current.feelslike_c}°C`;
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  wind.textContent = `Wind: ${data.current.wind_kph}   KM/H`;
}

getWeather("london");

const form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  if (!data) return;
  const city = data.get("city-name");
  getWeather(city);
});
