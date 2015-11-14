var blocTimeModule = angular.module('blocTimeModule', ['ui.router', 'firebase']);

//variables for full time, short break, and long break -- global

//real times
// var workTimer = 1500;
// var shortBreak = 300;
// var longBreak = 1800;

//smaller times used for testing
var workTimer = 15;
var shortBreak = 3;
var longBreak = 18;

var timerDing = new buzz.sound( "/assets/sounds/Ding.mp3", {
  preload: true
});

blocTimeModule.config(function($stateProvider, $urlRouterProvider, $locationProvider){

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

//angular ui state change success
//$rootScope.$on

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('root', {
  url: '/',
  controller: 'homeController',
  templateUrl: '/templates/home.html'
  })
  .state('home', {
    url: '/home',
    controller: 'homeController',
    templateUrl: '/templates/home.html'
  })
  .state('taskhistory', {
    url: '/taskhistory',
    controller: 'taskHistoryController',
    templateUrl: '/templates/taskhistory.html'
  });
});

blocTimeModule.controller("ApplicationController", [
  "$log",
  "$rootScope",
  "Tasks",
  function($log, $rootScope, Tasks) {
    $log.debug("ApplicationController");

//state change start

    $rootScope.user = {
      "first_name": "Ryan",
    };

    $log.info("Current user: ", $rootScope.user);
  }
]);

blocTimeModule.controller('taskHistoryController', [
  '$scope',
  'Tasks',
  // '$fireBaseObject',
  // '$interval',
  function($scope, Tasks) {

    // var ref = new Firebase ("https://blinding-torch-8353.firebaseio.com");

    //download the data into a local object
    // $scope.data = $fireBaseObject(ref);

    //synchronize the object with a three-way data blinding
    //click on 'index.html' above to see it used in the DOM
    // syncObject.$bindTo($scope, "data");

    //create a synchronized array
    //click

    $scope.tasks = Tasks.all;

    $scope.addTask = function () {
        Tasks.all.$add({
          task: $scope.task,
          completed: Date.now()
        });

        $scope.task = null;

      };
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
  // 'Tasks',
  function($log, $scope, $interval) {
    $log.debug("CountdownTimerController");

    $scope.counter = workTimer;
    $scope.isTimerRunning = false;
    $scope.breakTime = false;
    var pomodoros = 0;
    var pomodoroGo;

    // $scope.tasks = Tasks.all;
    //
    // $scope.addTask = function(){
    //   Tasks.all$add({
    //     task: $scope.task,
    //     completed: Date.now()
    //   });
    //   $scope.task = null;
    // }

    $scope.startTimer = function() {
      $scope.isTimerRunning = true;


      pomodorGo = $interval(function() {
        $scope.counter--;
        console.log("interval");
        if ($scope.counter == 0) {
          $interval.cancel(pomodorGo);
          timerDing.play();
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
  }
]);


//timer cannot pause, it can only reset
//button can start or reset timer with ngClick
blocTimeModule.filter('timeCode', function() {
  return function(seconds) {
    seconds = Number.parseFloat(seconds);

    //make whole number
    var wholeSeconds = Math.floor(seconds);

    var minutes = Math.floor(wholeSeconds / 60);

    remainingSeconds = wholeSeconds % 60;

    var output = minutes + ':';

    if (remainingSeconds < 10) {
      output += '0';
    }
    output += remainingSeconds;
    return output;
  }
});

blocTimeModule.factory('Tasks', [
  '$firebaseArray',
  function($firebaseArray) {
    var ref = new Firebase("https://blazing-fire-1424.firebaseio.com");

    //create an AngularFire reference to the data
    var tasks = $firebaseArray(ref);

    // function clearData() {
    //   ref.remove();
    // }
    return {
      all: tasks
      // clearData: clearData
    }
  }
]);
