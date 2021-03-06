"use strict";

angular.module("BusApp")
  .factory("transportService", ["$window", "$http", function ( $window, $http ) {

    var transportAPIUrl = "https://cors-anywhere.herokuapp.com/transportapi.com/v3/uk/bus/stops/bbox.json";
    var transportAPIKey = "fed809061ed9956f32d719787fcf8d0e";
    var transportAPIAppId = "ad0f4534";

    var getBusStops = function (latLng) {
      return $http.get(transportAPIUrl,{
        params: {
          "api_key": transportAPIKey,
          "app_id": transportAPIAppId,
          "minlon": latLng.minlon,
          "minlat": latLng.minlat,
          "maxlon": latLng.maxlon,
          "maxlat": latLng.maxlat
        }
      });
    };

    var getBusDepartures = function (busID) {
      var transportAPIUrlLive = "https://cors-anywhere.herokuapp.com/transportapi.com/v3/uk/bus/stop/" + busID + "/live.json"

      return $http.get(transportAPIUrlLive,{
        params: {
          "api_key": transportAPIKey,
          "app_id": transportAPIAppId
        }
      });
    };

    return {
      getBusStops: function(latLng) {
        return getBusStops(latLng);
      },
      getBusDepartures: function(busID) {
        return getBusDepartures(busID);
      }
    };

  }])
