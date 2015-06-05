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
.controller('CarsCtrl', function($scope, $ionicModal, $http, $timeout) {
  $scope.cars=[];
  $http.get('json/user/cars.json').success(function(data){
    $scope.cars=data.cars;  
  });

  // Form data for the login modal
  $scope.addCartData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/modal/add_auto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeAddCar = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.addCar = function() {
    $scope.addCartData={};
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doAddCar = function() {
    $scope.cars.push($scope.addCartData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeAddCar();
    }, 1000);
  };


})

.controller('ChoiceServiceCtrl', function($scope, $stateParams, $ionicModal, UserBid, $http, $timeout) {
  UserBid.car_name=$stateParams.car_name;
  $http.get('json/user/services.json').success(function(data){
    $scope.services=data.services;  
  });
  $http.get('json/user/modal_services.json').success(function(data){
    $scope.modal_services=data.services;  
  });

  $scope.user = {
    modal_services: []
  };

  // Form data for the login modal
  $scope.addServicesData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/modal/add_services.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeAddServices = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.addServices = function() {
    $scope.addServicesData={};
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doAddServices = function() {
    
    if(!$scope.addServicesData.name){$scope.addServicesData.name="Mega+"}
    
    $scope.addServicesData.description="";
    $scope.addServicesData.price=0;
    $scope.addServicesData.time=0;
    
    console.log($scope.user,$scope.addServicesData.groupName);
    
    angular.forEach($scope.user.modal_services, function(value, key) {
      $scope.addServicesData.description+=value.name+"+";
      $scope.addServicesData.price+=parseFloat(value.price);
      $scope.addServicesData.time+=parseInt(value.time);
    }); 
    
    console.log($scope.addServicesData);
    $timeout(function() {
      $scope.closeAddServices();
    }, 1000);

    $scope.services.push($scope.addServicesData);
  };


})

.controller('ChoiceWasherCtrl', function($scope, $stateParams, UserBid, $http, $cordovaGeolocation, getDastance) {

  UserBid.car_name=$stateParams.description;
  
  $scope.sorts='km';
  $scope.sort_by =function (val){
    $scope.sorts=val;
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
      $scope.geoObject="Координаты определены..."
      $http.get('http://geocode-maps.yandex.ru/1.x/?format=json&geocode='+$scope.long+','+$scope.lat).success(function(data){
        $scope.geoObject=data.response.GeoObjectCollection.featureMember[0].GeoObject.name;  
      });
      $http.get('json/user/washers.json').then(function(data){
        $scope.washers=data.data.washers;
        angular.forEach($scope.washers, function(value, key) {
          value.km=getDastance.distance(value.lat,value.long,$scope.lat,$scope.long);
        }, $scope.washers);     
      });
    
    }, function(err) {
      // error
    });
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
