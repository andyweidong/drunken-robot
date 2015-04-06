angular.module('drunken.controllers', [])

.controller('BbssCtrl', ['$scope', 'Bbss', function($scope, Bbss) {
    $scope.bbss = Bbss.all();
    console.log('BbssCtrl');
}])

.controller('BbsDetailCtrl', ['$scope', '$stateParams', 'Bbss', function($scope, $stateParams, Bbss) {
  $scope.bbs = Bbss.get($stateParams.bbsId);
  console.log('BbsDetailCtrl');
}])

.controller('LocationCtrl', ['$scope', function($scope) {
	console.log('LocationCtrl');
}])

.controller('AccountCtrl', ['$scope', '$rootScope', 'user', function($scope, $rootScope, user) {
  
  $rootScope.$on('user.login', initUserInfo);

  $scope.exit = function(){
  	user.exit();
  	initUserInfo();
  };

  function initUserInfo(){
  	$scope.username = user.get('username');
  	$scope.avatar = user.get('avatar');
  	console.log($scope.avatar);
  	$scope.isLogin = user.isLogin();
  }
  initUserInfo();
}])

.controller('LoginCtrl', ['$scope', '$interval', '$ionicLoading', 'LoginService', '$ionicHistory', '$rootScope', 'user', function($scope, $interval, $ionicLoading, LoginService, $ionicHistory, $rootScope, user){
	console.log('LoginCtrl');
	var time = 60;
	$scope.codeDisable = true;
	$scope.loginDisable = true;
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
				validateCodeDisable();
			}
		}, 1000);
		$ionicLoading.show({
	      template: '正在发送...'
	    });
		LoginService.sendCode(15121035541).then(function(){
			$ionicLoading.hide();
			$ionicLoading.show({ template: '发送成功!', noBackdrop: true, duration: 2000 });
		}, function(){
			$ionicLoading.hide();
			$ionicLoading.show({ template: '发送失败!', noBackdrop: true, duration: 2000 });
		});
	};
	$scope.login = function(){
		$ionicLoading.show({
	      template: '正在登录...'
	    });
	    LoginService.login().then(function(userInfo){
	    	$ionicLoading.hide();
	    	$ionicLoading.show({ template: '登录成功!', noBackdrop: true, duration: 2000 });
	    	user.set('username', userInfo.username);
	    	user.set('avatar', userInfo.avatar);
	    	user.set('isLogin', 'true');
	    	$rootScope.$broadcast('user.login', 'dds');
	    	$ionicHistory.goBack();
	    }, function(){
	    	$ionicLoading.hide();
			$ionicLoading.show({ template: '登录失败!', noBackdrop: true, duration: 2000 });
	    });
	};
	$scope.changePhone = function(){
		validateCodeDisable();
		validateLoginDisable();
	};

	$scope.changeCode = function(){
		validateLoginDisable();
	}

	function validateLoginDisable(){
		if(validatePhone() && $scope.user.code >10){
			$scope.loginDisable = false;
		}else {
			$scope.loginDisable = true;
		}
	}

	function validateCodeDisable(){
		if(validatePhone() && time === 60){
			$scope.codeDisable = false;
		}else {
			$scope.codeDisable = true;
		}
	}

	function validatePhone(){
		return ($scope.user.phone > 1999999999 && $scope.user.phone < 19999999999);
	}

}]);
