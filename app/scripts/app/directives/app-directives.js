/* global google: false */
"use strict";

angular.module("BusApp")
  .directive("googleMaps", [
    "$rootScope",
    "googleMapsAsyncLoadService",
    "transportService",
    "googleMapsDrawService",
    function( $rootScope, googleMapsAsyncLoadService, transportService, googleMapsDrawService ) {
      return {
        restrict: "A",
        scope: {
          mapId: "@id",
          lat: "@",
          long: "@"
        },
        link: function( $scope ) {

          var stylersArray = [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}];

          if ( angular.isDefined($scope.lat) && angular.isDefined($scope.long) ) {

            googleMapsAsyncLoadService.then(function () {
              $scope.map = createGoogleMap();

              var input = document.getElementById("pac-input");
              var autocomplete = new google.maps.places.Autocomplete(input);
              autocomplete.bindTo("bounds", $scope.map);

              var infowindow = new google.maps.InfoWindow();
              var marker = new google.maps.Marker({
                map: $scope.map,
                anchorPoint: new google.maps.Point(0, -29)
              });

              google.maps.event.addListener($scope.map, "idle", function() {

              });


              google.maps.event.addListener(autocomplete, "place_changed", function() {

                var place = autocomplete.getPlace();
                if (!place.geometry) {
                  return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                  $scope.map.fitBounds(place.geometry.viewport);
                } else {
                  $scope.map.setCenter(place.geometry.location);
                  $scope.map.setZoom(17);  // Why 17? Because it looks good.
                }


                var address = "";
                if (place.address_components) {
                  address = [
                    (place.address_components[0] && place.address_components[0].short_name || ""),
                    (place.address_components[1] && place.address_components[1].short_name || ""),
                    (place.address_components[2] && place.address_components[2].short_name || "")
                  ].join(" ");
                }

                var obj = {
                  "minlat": $scope.map.getBounds().getNorthEast().lat(),
                  "maxlon": $scope.map.getBounds().getNorthEast().lng(),
                  "maxlat": $scope.map.getBounds().getSouthWest().lat(),
                  "minlon": $scope.map.getBounds().getSouthWest().lng()
                };
                transportService.getBusStops(obj).then(function (response) {
                  // TODO
                  var busStops = response.data.stops;
                  googleMapsDrawService.getMarkers($scope.map, busStops);
                },function(errorResponse) {
                  // TODO
                  console.log(errorResponse);
                });



              });


            }, function () {
              // Promise rejected
              // TODO
            });
          }

          var createGoogleMap =  function (){
            // Promised resolved
            var mapOptions = {
              zoom: 12,
              center: new google.maps.LatLng($scope.lat, $scope.long),
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: stylersArray
            };

            var success = function(position){
              var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              $scope.map.setCenter(latlng); //promise?
              $scope.map.setZoom(17); // if user is localized, zoom in
            };
            var error = function() {
              console.log("geolocation fails");
            };

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(success, error);
            } else {
              error("geolocation not supported");
            }

            return new google.maps.Map(document.getElementById($scope.mapId), mapOptions);


          };
        }
      };
    }]);