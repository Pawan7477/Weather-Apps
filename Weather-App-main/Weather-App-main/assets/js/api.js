/**
 * @license MIT
 * @fileoverview All API related stuff like API key, API request, etc.
 * @copyright Sarvan Yaduvanshi 2024 All rights reserved
 * @author codewithsadee <sarvankumar620058@gmail.com>
 */

'use strict';

const api_key = "26d75d8ec86604665a627da0f3540a39";

/**
 * Fetch data from server
 * @param {string} URL API URL
 * @param {Function} callback Callback function
 */
export const fetchData = function (URL, callback) {
    fetch(`${URL}&appid=${api_key}`)
       .then(res => res.json())
       .then(data => callback(data))
       .catch(error => console.error("Error fetching data:", error)); // Add error handling
};

export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
    },
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
    },
    airPollution(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
    },
    reverseGeo(lat, lon) {
        return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${api_key}`;
    },
    /**
     * @param {string} query Search query e.g.: "London", "New York"
     * @returns {string} API URL for geo search
     */
    geo(query) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`;
    }
};
