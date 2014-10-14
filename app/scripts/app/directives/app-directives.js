/* global google: false */
"use strict";

angular.module("BusApp")
  .directive("googleMaps", ["$rootScope", "googleMapsAsyncLoadService", function( $rootScope, googleMapsAsyncLoadService ) {
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
            }, function () {
              // Promise rejected
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
          }
        }
      };
    }]);

/*
function initialize() {
  var latlng = new google.maps.LatLng(0, 0);
  var success = function(position){
    latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(latlng)
  }
  var error = function() {
    console.log('geolocation failes');
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    error('geolocation not supported');
  }

  var stylersArray = [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}];

  var mapOptions = {
    zoom: 17,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: stylersArray
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  google.maps.event.addListener(map, "bounds_changed", function() {
    // send the new bounds back to your server
    console.log("map bounds{"+map.getBounds());
  });
}

*/