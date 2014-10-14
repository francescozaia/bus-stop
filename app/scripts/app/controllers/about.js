"use strict";

/**
 * @ngdoc function
 * @name BusApp.controller:AboutController
 * @description
 * # AboutController
 * Controller of the BusApp
 */

angular.module("BusApp")
  .controller("AboutController", function ($scope) {
    $scope.awesomeThings = [
      "HTML5 Boilerplate",
      "AngularJS",
      "Karma"
    ];
  });
