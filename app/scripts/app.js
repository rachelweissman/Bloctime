//variables for full time, short break, and long break -- global

var workTimer = 1500;
var shortBreak = 300;
var longBreak = 1800;


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
    // $scope.counter = 1500;
    // var stop;
    // var isTimerRunning = false;
    $scope.isTimerRunning = false;
    $scope.breakTime = false;
    var pomodoros = 0;
    var pomodoroGo;

    $scope.startTimer = function () {
          $scope.isTimerRunning = true;

          if (!$scope.counter) {
            $scope.counter = workTimer;
          }

          pomodorGo = $interval(function() {
            $scope.counter--;
            if ($scope.counter == 0) {
              $interval.cancel(pomodorGo);
              $scope.isTimerRunning = false;

              if (!$scope.breakTime) {
                pomodoros++;
                console.log(pomodoros);
                $scope.breakTime = true;

                if (pomodoros % 4 === 0) {
                  $scope.counter = longBreak;
                  $scope.isTimerRunning = false;
                } else {
                  $scope.counter = shortBreak;
                  $scope.isTimerRunning = false;
                }
              } else {
                console.log("back to work");
                $scope.breakTime = false;
                $scope.counter = workTimer;
              }
            }
          }, 1000);
    };

    $scope.resetTimer = function() {
    $interval.cancel(pomodorGo);
    $scope.counter = workTimer;
    $scope.isTimerRunning = false;
  }


    // $scope.stopTimer = function() {
    //   $interval.cancel(stop);
    //   $scope.counter = 1500;
    //   this.isTimerRunning = false;
    // }

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
