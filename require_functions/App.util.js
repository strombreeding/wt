import * as Location from "expo-location";
import { dateData } from "../jsjs";
const API_KEY = "3f85ee371d112b47086f9bcc251b0f11";

/**위치 정보 가져오기 */
export const getXY = async () => {
  console.log("Function/ getXY start");
  const {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync({ accuracy: 5 });
  return { latitude, longitude };
};

/**XY좌표로 사는곳 시+동  */
export const getLocation = async (latitude, longitude) => {
  console.log("Function/ getLocation start");
  const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
  return location[0];
};

export const getNowWeather = async (latitude, longitude) => {
  console.log("Function/ getNowWeather start");
  const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  const fetching = await fetch(fetchUrl);
  const json = await fetching.json();

  const resultData = {
    weather: json.weather[0].main,
    temp: String(json.main.temp).substring(0, 2) + " °C",
    tempMin: String(json.main.temp_min).substring(0, 2) + " °C",
    tempMax: String(json.main.temp_max).substring(0, 2) + " °C",
    humidity: String(json.main.humidity + " %"),
    iconCode: `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
    date: `${dateData.year}-${dateData.month}-${dateData.date}`,
    time: `${new Date().getTime()}`,
    feelsLike: String(json.main.feels_like).substring(0, 2) + " °C",
    discomfort: Math.floor(0.81 * json.main.temp + 0.01 * json.main.humidity * (0.99 * json.main.temp - 14.3) + 46.3),
  };
  return resultData;
};

export const getWeater = async (latitude, longitude) => {
  console.log("Function/ getWeater start");
  const fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  const fetching = await fetch(fetchUrl);
  const json = await fetching.json();
  const weathers = await json.list;
  const weatherArr = [];
  for (let i = 0; i < weathers.length; i++) {
    const daysWeater = {
      weather: weathers[i].weather[0].main,
      temp: String(weathers[i].main.temp).substring(0, 2) + " °C",
      tempMin: String(weathers[i].main.temp_min).substring(0, 2) + " °C",
      tempMax: String(weathers[i].main.temp_max).substring(0, 2) + " °C",
      humidity: String(weathers[i].main.humidity + " %"),
      iconCode: `https://openweathermap.org/img/wn/${weathers[i].weather[0].icon}@2x.png`,
      date: weathers[i].dt_txt.split(" ")[0],
      time: weathers[i].dt_txt.split(" ")[1],
      feelsLike: String(weathers[i].main.feels_like).substring(0, 2) + " °C",
      discomfort: Math.floor(
        0.81 * weathers[i].main.temp + 0.01 * weathers[i].main.humidity * (0.99 * weathers[i].main.temp - 14.3) + 46.3
      ),
    };

    weatherArr.push(daysWeater);
  }
  return weatherArr;
};
