"use strict";

/**
 * @ngdoc overview
 * @name BusApp
 * @description
 * # BusApp
 *
 * Main module of the application.
 */
angular
  .module("BusApp", [
    "ngAnimate",
    "ngCookies",
    "ngResource",
    "ngRoute",
    "ngSanitize",
    "ngTouch"
  ])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "../../views/homepage.html",
        controller: "HomepageController"
      })
      .when("/about", {
        templateUrl: "../../views/about.html",
        controller: "AboutController"
      })
      .otherwise({
        redirectTo: "/"
      });
  }]);
  /*.config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
  }]);*/
