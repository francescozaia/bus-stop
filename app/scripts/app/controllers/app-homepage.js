"use strict";

/**
 * @ngdoc function
 * @name BusApp.controller:HomepageController
 * @description
 * # HomepageController
 * Controller of the BusApp
 */

angular.module("BusApp")
  .controller("HomepageController", ["$scope", "$modal", "transportService", function ($scope, $modal, transportService) {



    $scope.open = function (markerInfo) {

      transportService.getBusDepartures(markerInfo.atcocode).then(function (response) {

        console.log(response);

        var modalInstance = $modal.open({
          templateUrl: "modalContent.html",
          controller: function ($scope, $modalInstance) {
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
            $scope.departures = [];
            for ( var departure in response.data.departures ) {
              var obj = {
                number: departure,
                details: response.data.departures[departure]
              }
              $scope.departures.push(obj);
            }
          }
        });
      },function(errorResponse) {
        console.log(errorResponse);
      });


    };
  }]);
