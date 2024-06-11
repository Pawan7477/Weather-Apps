/**
 * @license MIT
 * @fileoverview Manage all routes
 * @copyright Sarvan Yaduvanshi 2024 All rights reserved
 * @author Sarvan Yaduvanshi <sarvankumar620058@gmail.com>
 */

'use strict';

import { updateWeather, error404 } from "./app.js";

const defaultLocation = "#/weather?lat=28.6139&lon= 77.209" // India coordinates

const currentLocation = function () {
    window.navigator.geolocation.getCurrentPosition(
        res => {
            const { latitude, longitude } = res.coords;
            updateWeather(latitude, longitude);
        },
        err => {
            window.location.hash = defaultLocation;
        }
    );
};

/**
 * @param {string} query Searched query
 */
const searchedLocation = query => {
    const params = query.split("&");
    const lat = params.find(param => param.startsWith("lat=")).split("=")[1];
    const lon = params.find(param => param.startsWith("lon=")).split("=")[1];
    updateWeather(lat, lon);
};

const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);
    const [route, query] = requestURL.includes("?") ? requestURL.split("?") : [requestURL, ""];
    routes.has(route) ? routes.get(route)(query) : error404();
};

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
    if (!window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
});
