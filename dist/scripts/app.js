var blocTimeModule = angular.module('blocTimeModule', ['ui.router']);

blocTimeModule.config(function($stateProvider, $urlRouterProvider, $locationProvider){

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    controller: 'homeController',
    templateUrl: '/templates/home.html'
  });
});

blocTimeModule.controller("ApplicationController", [
  "$log",
  "$rootScope",
  function($log, $rootScope) {
    $log.debug("ApplicationController");

    $rootScope.user = {
      "first_name": "Ryan",
    };

    $log.info("Current user: ", $rootScope.user);
  }
]);

blocTimeModule.controller('homeController', [
  '$log',
  '$rootScope',
  '$scope',
  // '$fireBaseObject',
  // '$interval',
  function($log, $rootScope, $scope) {
    $log.debug("homeController");
    // var ref = new Firebase ("https://blinding-torch-8353.firebaseio.com");
    // $scope.data = $fireBaseObject(ref);
    $log.debug($rootScope.user);
    $rootScope.user.first_name = "Rachel";
  }
]);

blocTimeModule.controller("CountdownTimerController", [
  "$log",
  "$scope",
  '$interval',
  function($log, $scope, $interval) {
    $log.debug("CountdownTimerController");
    $scope.counter = 1500;
    var stop;
    var isTimerRunning = false;

    $scope.startTimer = function () {
      this.isTimerRunning = true;
      stop = $interval(function(){
        $scope.counter--;
        if($scope.counter == 0) {
          $interval.cancel(stop);
          $scope.counter = 1500;
        }
      }, 1000);
    };

    $scope.stopTimer = function() {
      $interval.cancel(stop);
      $scope.counter = 1500;
      this.isTimerRunning = false;
    }

    // $scope.timeRemaining = 100;

    // $interval(function() {
    //   $log.debug("interval fired!");
    //   $scope.timeRemaining -= 1;
    // }, 1000);

//     $scope.stop = function() {
//       alert("you clicked stop!");
//     };
   }
]);

blocTimeModule.filter('timeCode', function(){
  return function(seconds) {
    seconds = Number.parseFloat(seconds);
//not sure about isNAN
//return when no time is provided
    // if(Number.isNAN(seconds)){
    //   return '--:--';
    // }
    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);

    remainingSeconds = wholeSeconds % 60;

    var output = minutes + ':';

    if(remainingSeconds < 10) {
      output += '0';
    }
    output += remainingSeconds;
    return output;
  }
});
