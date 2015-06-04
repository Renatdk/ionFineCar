angular.module('starter.controllers',  ['starter.factory'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('CarsCtrl', function($scope, $http) {
  $scope.cars=[];
  $http.get('json/user/cars.json').success(function(data){
    $scope.cars=data.cars;  
  });
})

.controller('ChoiceServiceCtrl', function($scope, $stateParams, UserBid, $http) {
  UserBid.car_name=$stateParams.car_name;
  $http.get('json/user/services.json').success(function(data){
    $scope.services=data.services;  
  });
})

.controller('ChoiceWasherCtrl', function($scope, $stateParams, UserBid, $http, $cordovaGeolocation) {
  UserBid.car_name=$stateParams.description;
  
  $http.get('json/user/washers.json').success(function(data){
    $scope.washers=data.washers;  
  });
  
   $scope.sorts='km';
   $scope.sort_by =function (val){
    $scope.sorts=val;
    console.log(val);
  };
  $scope.getClass = function(path) {
    if ($scope.sorts == path) {
      return "active"
    } else {
      return ""
    }
  }
  $scope.geoObject="Определение местоположения..."
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat  = position.coords.latitude;
      $scope.long = position.coords.longitude;
      $http.get('http://geocode-maps.yandex.ru/1.x/?format=json&geocode='+$scope.long+','+$scope.lat).success(function(data){
        $scope.geoObject=data.response.GeoObjectCollection.featureMember[0].GeoObject.name;  
        console.log(data);
      });
    }, function(err) {
      // error
    });


  var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
  });

  
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
