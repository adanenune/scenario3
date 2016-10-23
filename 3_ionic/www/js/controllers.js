

angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('ConfigurationCtrl', ['$rootScope', '$state', '$ionicHistory', function($rootScope, $state, $ionicHistory) {

  $rootScope.api = {};



  $rootScope.setEndpoint = function() {
    $ionicHistory.nextViewOptions({
    disableBack: true
  });
    $state.go('app.orders');
  }

}])

.controller('OrdersCtrl', function($rootScope, $scope, $stateParams, $http) {

 //Get Order Data START
   $scope.orders = [];
     $scope.totalOrders = 0;

  var urlBase = $rootScope.api.endpoint;

  var headersBase =
  {
    'X-IBM-Client-Id': $rootScope.api.clientId,
    'X-IBM-Client-Secret': $rootScope.api.secret,
    'content-type': 'application/json',
    'accept': 'application/json'
  }

  var urlModified = urlBase + 'Orders';

    var req = {
   method: 'GET',
   url: urlModified,
   headers: headersBase
  }

  $http(req).then(function(response){
      $scope.orders = response.data;
      $scope.totalOrders =  $scope.orders.length;
  });
//Get Order Data END


})



.controller('OrderDetailsCtrl', function($rootScope, $scope, $stateParams, $location, $http) {

//Get Order Details Data START
  $scope.orderId = $location.search().theId;
  $scope.orderDescription = $location.search().description;
  $scope.orderDetails = [];

 var urlBase = $rootScope.api.endpoint;

 var headersBase =
 {
   'X-IBM-Client-Id': $rootScope.api.clientId,
   'X-IBM-Client-Secret': $rootScope.api.secret,
   'content-type': 'application/json',
   'accept': 'application/json'
 }

 var urlModified = urlBase + 'Orders/' + $scope.orderId + '/events';

   var req = {
  method: 'GET',
  url: urlModified,
  headers: headersBase
 }

 $http(req).then(function(response){
     $scope.orderDetails = response.data;
 });
//Get Order Details Data END

});
