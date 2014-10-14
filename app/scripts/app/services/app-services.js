"use strict";

angular.module("BusApp")
  .service("googleMapsAsyncLoadService", ["$window", "$q", function ( $window, $q ) {

    // Load Google map API script
    function loadScript() {
      console.log("loadScript");
      var s = document.createElement("script");
      s.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&" +
        "callback=initialize";

      document.body.appendChild(s);
    }

    var deferred = $q.defer();

    $window.initialize = function () {
      deferred.resolve();
    };

    loadScript();

    return deferred.promise;
  }])
