"use strict";

angular.module("BusApp")
  .service("googleMapsAsyncLoadService", ["$window", "$q", function ( $window, $q ) {

    // Load Google map API script
    function loadScript() {
      var s = document.createElement("script");
      s.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&" +
        "callback=initialize&libraries=places";

      document.body.appendChild(s);
    }

    var deferred = $q.defer();

    $window.initialize = function () {
      deferred.resolve();
    };

    loadScript();

    return deferred.promise;
  }])
  .service("transportService", ["$window", "$http", function ( $window, $http ) {

    var transportAPIUrl = "http://transportapi.com/v3/uk/bus/stops/bbox.json";
    var transportAPIKey = "fed809061ed9956f32d719787fcf8d0e";
    var transportAPIAppId = "ad0f4534";

    return $http.get(transportAPIUrl,{
      params: {
        "api_key": transportAPIKey,
        "app_id": transportAPIAppId,
        "minlon": 0,
        "minlat": 1,
        "maxlon": 0,
        "maxlat": 1
      }
    });

  }]);
