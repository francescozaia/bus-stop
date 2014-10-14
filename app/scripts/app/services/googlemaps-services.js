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
  .factory("googleMapsDrawService", function ( ) {

    var getMarkers = function (map, busStops) {

      map.infoWindow = new google.maps.InfoWindow();
      map.infoTitleWindow = new google.maps.InfoWindow();

      for (var i = 0; i < busStops.length; i++) {

        var busStop = busStops[i];

        var marker = {
          atcocode: busStop.atcocode,
          smscode: busStop.smscode,
          name: busStop.name,
          mode: busStop.mode,
          bearing: busStop.bearing,
          locality: busStop.locality,
          indicator: busStop.indicator,
          distance: busStop.distance,
          latLng: new google.maps.LatLng(busStop.latitude, busStop.longitude)
        };

        var markerOptions = {
          map: map,
          position: marker.latLng,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            strokeColor: "#F00",
            fillColor: "#FFF",
            strokeWeight: 8,
            scale: 8
          },
          title: marker.name ? "" : marker.name,
          hoverContent: "<div>" +
            "<strong>" + marker.name + "</strong>" +
            "<br>(" + marker.locality + ")" +
            "<br>" + marker.indicator
        };

        _createMarker(markerOptions, marker);
      }

    };

    var getDirections = function() {

    };

    //create a single marker to map
    function _createMarker(markerOptions, markerInfo) {
      var map = markerOptions.map;
      var marker = new google.maps.Marker(markerOptions);

      //wire up maker hover handler to open info title window
      google.maps.event.addListener(marker, "mouseover", function () {
        map.infoTitleWindow.setContent(markerOptions.hoverContent);
        map.infoTitleWindow.open(map, marker);
      });

      google.maps.event.addListener(marker, "mouseout", function () {
        map.infoTitleWindow.close();
      });

      //wire up marker click handler to open info window
      google.maps.event.addListener(marker, "click", function () {
        map.infoTitleWindow.close();
        angular.element(document.getElementById('HomepageController')).scope().open(markerInfo);
      });
      marker.setVisible(true);

      return marker;
    };

    return {
      getMarkers: function(map, busStops) {
        return getMarkers(map, busStops);
      }
    };
  });