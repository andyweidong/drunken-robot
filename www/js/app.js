
angular.module('drunken', ['ionic', 'drunken.controllers', 'drunken.services', 'drunken.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.bbss', {
    url: '/bbss',
    views: {
      'tab-bbss': {
        templateUrl: 'templates/tab-bbss.html',
        controller: 'BbssCtrl'
      }
    }
  })
  .state('tab.location', {
    url: '/location',
    views: {
      'tab-location': {
        templateUrl: 'templates/tab-location.html',
        controller: 'LocationCtrl'
      }
    }
  })
  .state('tab.cameramans', {
    url: '/cameramans',
    views: {
      'tab-location': {
        templateUrl: 'templates/tab-cameramans.html',
        controller: 'CameramansCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  //login
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('bbs-detail', {
    url: '/bbs/:bbsId',
    templateUrl: 'templates/bbs-detail.html',
    controller: 'BbsDetailCtrl'
  })

  .state('createBbs', {
    url: '/createBbs',
    templateUrl: 'templates/create-bbs.html',
    controller: 'CreateBbsCtrl'
  })

  .state('cameraman-detail', {
    url: '/cameraman/:cameramanId',
    templateUrl: 'templates/cameraman-detail.html',
    controller: 'CameramanDetailCtrl'
  })

  .state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller: 'ChatCtrl'
  })

  ;

  $urlRouterProvider.otherwise('/tab/bbss');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.tabs.style('standard');

});
