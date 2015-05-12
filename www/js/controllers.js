angular.module('drunken.controllers', [])


.controller('BbssCtrl', ['$scope', 'user', 'TShuttleShift', 'TLine', 'TStation', function($scope, user, TShuttleShift, TLine, TStation) {
  TShuttleShift.list().then(function(list){
    console.log(list);
    $scope.list = list;
  });
  TLine.getUserLine().then(function(line){
    console.log(line);
    $scope.line = line;
  });
  TStation.getUserHomeStation().then(function(station){
    console.log(station);
    $scope.homeStation = station;
  });
  TStation.getUserCompanyStation().then(function(station){
    $scope.companyStation = station;
  });

  $scope.list = [{
    id:1,
    startTime: '07:30',
    arrivalTime: '09:00',
    price: '15￥'
  },{
    id:2,
    startTime: '08:30',
    arrivalTime: '10:00',
    price: '15￥'
  },{
    id:3,
    startTime: '09:30',
    arrivalTime: '10:30',
    price: '15￥'
  }];
  
}])


.controller('OrderConfirmCtrl', ['$scope', function($scope) {
  $scope.breakfasts = [{
    name: 'kfc 6 yuan ',
    count: 0,
    unit: 6
  },{
    name: 'kfc 10 yuan ',
    count: 0,
    unit: 10
  }];
  $scope.add = function(index){
    $scope.breakfasts[index].count ++;
    $scope.breakfastTotal += $scope.breakfasts[index].unit;
  };
  $scope.minu = function(index){
    if($scope.breakfasts[index].count === 0){
      return;
    }
    $scope.breakfasts[index].count --;
    $scope.breakfastTotal -= $scope.breakfasts[index].unit;
  };

  $scope.breakfastTotal = 0;
  $scope.ticketTotal = 15;
}])


.controller('LocationCtrl', ['$scope', 'loadScript', function($scope, loadScript) {
  loadScript('http://api.map.baidu.com/api?type=quick&ak=qtwRMwRkWZ9EndLMnMpGHAWs&v=1.0').then(function(){
    var map = new BMap.Map("l-map");  
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
    console.log('loaded');  
  });

}])



.controller('AccountCtrl', ['$scope', '$rootScope', 'user', function($scope, $rootScope, user) {
  $rootScope.$on('user.login', initUserInfo);
  $scope.exit = function(){
  	user.exit();
  	initUserInfo();
  };
  function initUserInfo(){
    $scope.isLogin = user.isLogin();
    if($scope.isLogin){
      $scope.username = user.get('username');
      $scope.avatar = user.get('avatar') || 'img/avatar.jpg';
    }
  }
  initUserInfo();
}])


.controller('LoginCtrl', ['$scope', '$interval', '$ionicLoading', 'LoginService', '$state', '$rootScope', 'user', function($scope, $interval, $ionicLoading, LoginService, $state, $rootScope, user){
	var time = 60;
	$scope.codeDisable = false;
	$scope.codeBtnText = '获取验证码';
	$scope.user = {};

	$scope.sendCode = function(){
		$scope.codeDisable = true;
		$scope.codeBtnText = time + '秒';
		time--;
		var intervalId = $interval(function(){
			$scope.codeBtnText = time + '秒';
			time--;
			if(time === -1){
				$interval.cancel(intervalId);
				$scope.codeBtnText = '获取验证码';
				time = 60;
				$scope.codeDisable = false;
			}
		}, 1000);
		LoginService.sendCode($scope.user.phone).then(function(msg){
			
		});
	};
	$scope.login = function(){
    LoginService.login($scope.user.phone, $scope.user.code).then(function(){
    	
    	$scope.user.code = '';
    	$rootScope.$broadcast('user.login');
    	$state.go('tab.bbss');
    });
	};
}])

.controller('SignUpCtrl', ['$scope', '$interval', '$ionicLoading', 'SignUpService', '$state', '$rootScope', 'user', function($scope, $interval, $ionicLoading, SignUpService, $state, $rootScope, user){
  var time = 60;
  $scope.codeDisable = false;
  $scope.codeBtnText = '获取验证码';
  $scope.user = {};

  $scope.sendCode = function(){
    $scope.codeDisable = true;
    $scope.codeBtnText = time + '秒';
    time--;
    var intervalId = $interval(function(){
      $scope.codeBtnText = time + '秒';
      time--;
      if(time === -1){
        $interval.cancel(intervalId);
        $scope.codeBtnText = '获取验证码';
        time = 60;
        $scope.codeDisable = false;
      }
    }, 1000);
    SignUpService.sendCode($scope.user.phone).then(function(msg){
      
    });
  };
  $scope.signUp = function(){
    SignUpService.signUp($scope.user.phone, $scope.user.code, $scope.user.home, $scope.user.company).then(function(){
      $scope.user.code = '';
      $rootScope.$broadcast('user.login');
      $state.go('tab.bbss');
    });
  };
}])


.controller('SetSystemCtrl', ['$scope', function($scope){
	
}])


.controller('OrderlistsCtrl', ['$scope', function($scope){
  $scope.cameramans = [{
    avatar: 'img/avatar.jpg',
    times: 343,
    name: '丽丽'
  }, {
    avatar: 'img/avatar.jpg',
    times: 343,
    name: '丽丽'
  }, {
    avatar: 'img/avatar.jpg',
    times: 343,
    name: '丽丽'
  }, {
    avatar: 'img/avatar.jpg',
    times: 343,
    name: '丽丽'
  }, {
    avatar: 'img/avatar.jpg',
    times: 343,
    name: '丽丽'
  }, {
    avatar: 'img/avatar.jpg',
    times: 343,
    name: '丽丽'
  }, {
    avatar: 'img/avatar.jpg',
    times: 343,
    name: '丽丽'
  }, {
    avatar: 'img/avatar.jpg',
    times: 343,
    name: '丽丽'
  }];
}])


.controller('CameramanDetailCtrl', ['$scope', '$stateParams', function($scope, $stateParams){

}])

.controller('ChatCtrl', ['$scope', 'imagePicker', function($scope, imagePicker) {
  $scope.results = [{
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: true
  }, {
    content: '我不好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: true
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: false
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: false
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: true
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: false
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: true
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: true
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: false
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: false
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: true
  }, {
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: false
  }];
	$scope.selectImg = function(){
    imagePicker.getPictures({
      maximumImagesCount: 1
    }).then(function(results){
      $scope.results = results;
    }, function(err){
      console.dir(err);
      $ionicLoading.show({ template: err, noBackdrop: true, duration: 2000 });
    });
  };
}])

.controller('PaySuccessCtrl', ['$scope', function($scope) {
  
}])

.controller('TicketInfoCtrl', ['$scope', function($scope){

}])

.controller('SetAddressCtrl', ['$scope', 'user', function($scope, user){
  $scope.user = user.current();
  console.dir($scope.user);
  $scope.saveAddr = function(){
    user.saveAddr($scope.user.attributes.homeAddr, $scope.user.attributes.companyAddr).then(function(msg){

    });;
  }
}])

;
