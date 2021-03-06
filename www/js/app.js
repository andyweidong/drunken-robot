angular.module('drunken', ['ionic', 'drunken.controllers', 'drunken.services', 'drunken.directives', 'drunken.filters'])

.run(['$ionicPlatform', 'user', '$state', 'chat', function($ionicPlatform, user, $state, chat) {
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
    if(user.isLogin()){
      chat.init();
      //TChatRoom.getRoomId();
    }
  });
}])

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
  .state('tab.chat-rooms', {
    url: '/chat-rooms',
    views: {
      'chat-rooms': {
        templateUrl: 'templates/chat-rooms.html',
        controller: 'ChatRoomsCtrl'
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
  .state('sign-up', {
    url: '/sign-up',
    templateUrl: 'templates/sign-up.html',
    controller: 'SignUpCtrl'
  })

  .state('set-address', {
    url: '/set-address',
    templateUrl: 'templates/set-address.html',
    controller: 'SetAddressCtrl'
  })

  .state('set-system', {
    url: '/set-system',
    templateUrl: 'templates/set-system.html',
    controller: 'SetSystemCtrl'
  })

  .state('order-confirm', {
    url: '/order-confirm/:busId',
    templateUrl: 'templates/order-confirm.html',
    controller: 'OrderConfirmCtrl'
  })

  .state('chat', {
    url: '/chat/:shuttleShift',
    templateUrl: 'templates/chat.html',
    controller: 'ChatCtrl'
  })

  // .state('chat-rooms', {
  //   url: '/chat-rooms',
  //   templateUrl: 'templates/chat-rooms.html',
  //   controller: 'ChatRoomsCtrl'
  // })

  .state('pay-success', {
    url: '/pay-success/:orderId',
    templateUrl: 'templates/pay-success.html',
    controller: 'PaySuccessCtrl'
  })
  .state('ticket-info', {
    url: '/ticket-info/:ticketId',
    templateUrl: 'templates/ticket-info.html',
    controller: 'TicketInfoCtrl'
  })

  .state('suggest', {
    url: '/suggest',
    templateUrl: 'templates/suggest.html',
    controller: 'SuggestCtrl'
  })

  .state('order-list', {
    url: '/order-list',
    templateUrl: 'templates/order-list.html',
    controller: 'OrderListCtrl'
  })

  ;

  $urlRouterProvider.otherwise('/tab/bbss');
   $ionicConfigProvider.tabs.position('bottom');
   $ionicConfigProvider.tabs.style('standard');

});
