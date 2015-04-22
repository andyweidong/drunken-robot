angular.module('drunken.controllers', [])


.controller('BbssCtrl', ['$scope', 'slider', function($scope, slider) {
  slider('slider1_container');
  
}])


.controller('SetAddressCtrl', ['$scope', function($scope) {
  
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


.controller('LoginCtrl', ['$scope', '$interval', '$ionicLoading', 'LoginService', '$ionicHistory', '$rootScope', 'user', function($scope, $interval, $ionicLoading, LoginService, $ionicHistory, $rootScope, user){
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
			$ionicLoading.show({ template: msg, noBackdrop: true, duration: 1000 });
		});
	};
	$scope.login = function(){
    LoginService.login($scope.user.phone, $scope.user.code).then(function(){
    	$ionicLoading.show({ template: '登录成功!', noBackdrop: true, duration: 1000 });
    	$scope.user.code = '';
    	$rootScope.$broadcast('user.login');
    	$ionicHistory.goBack();
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
  $scope.results = [1];
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

.controller('BookTicketCtrl', ['$scope', function($scope) {
  
}])


;
