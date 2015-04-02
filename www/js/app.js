
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

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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
  .state('tab.bbs-detail', {
    url: '/bbs/:bbsId',
    views: {
      'tab-bbss': {
        templateUrl: 'templates/bbs-detail.html',
        controller: 'BbsDetailCtrl'
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


  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/bbss');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.tabs.style('standard');

});
