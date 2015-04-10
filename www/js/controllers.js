angular.module('drunken.controllers', [])


.controller('BbssCtrl', ['$scope', 'Bbss', '$ionicLoading', function($scope, Bbss, $ionicLoading) {
    $scope.bbss = Bbss.all();
    $scope.doRefresh = function(){
    	setTimeout(function(){
    		$scope.$broadcast('scroll.refreshComplete');
    		$ionicLoading.show({ template: '45个更新!', noBackdrop: true, duration: 1000 });
    	}, 2000);
    };
    console.log('BbssCtrl');
}])


.controller('BbsDetailCtrl', ['$scope', '$stateParams', 'Bbss', '$state', '$ionicPlatform', function($scope, $stateParams, Bbss, $state, $ionicPlatform) {
  $scope.bbs = Bbss.get($stateParams.bbsId);
  $scope.back = function(){
  	$state.go('tab.bbss');
  };
  $scope.like = function(id){
  	
  };
  $ionicPlatform.registerBackButtonAction(function() {
     $scope.back();
  }, 100);
}])


.controller('LocationCtrl', ['$scope', function($scope) {
  
}])


.controller('AccountCtrl', ['$scope', '$rootScope', 'user', function($scope, $rootScope, user) {
  $rootScope.$on('user.login', initUserInfo);
  $scope.exit = function(){
  	user.exit();
  	initUserInfo();
  };
  function initUserInfo(){
  	console.log(user.isLogin());
  	$scope.username = user.get('username');
  	$scope.avatar = user.get('avatar');
  	console.log($scope.avatar);
  	$scope.isLogin = user.isLogin();
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
		$ionicLoading.show({
	      template: '<i class="icon ion-load-c padding"></i>正在发送...'
	    });
		LoginService.sendCode($scope.user.phone).then(function(msg){
			$ionicLoading.hide();
			$ionicLoading.show({ template: msg, noBackdrop: true, duration: 2000 });
		});
	};
	$scope.login = function(){
		$ionicLoading.show({
      template: '<i class="icon ion-load-c padding"></i>正在登录...'
    });
    LoginService.login($scope.user.phone, $scope.user.code).then(function(userInfo){
    	$ionicLoading.hide();
    	$ionicLoading.show({ template: '登录成功!', noBackdrop: true, duration: 2000 });
    	$scope.user.code = '';
    	user.set('username', userInfo.username);
    	user.set('avatar', userInfo.avatar);
    	user.set('isLogin', 'true');
    	$rootScope.$broadcast('user.login');
    	$ionicHistory.goBack();
    });
	};
}])


.controller('CreateBbsCtrl', ['$scope', 'Bbss', '$ionicLoading', '$state', function($scope, Bbss, $ionicLoading, $state){
	$scope.sendBbs = function(){
		$ionicLoading.show({
			template: '<i class="icon ion-load-c padding"></i>正在发送...'
		});
		Bbss.create($scope.bbs).then(function(){
			$ionicLoading.hide();
			$ionicLoading.show({ template: '成功!', noBackdrop: true, duration: 2000 });
			$scope.bbs = '';
			$state.go('bbs-detail', {bbsId: 0});
		});
	};
}])


.controller('CameramansCtrl', ['$scope', function($scope){

}])


.controller('CameramanDetailCtrl', ['$scope', '$stateParams', function($scope, $stateParams){

}])


.controller('ChatCtrl', ['$scope'], function($scope) {
	
})


;
