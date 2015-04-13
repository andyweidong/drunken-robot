angular.module('drunken.controllers', [])


.controller('BbssCtrl', ['$scope', 'Bbss', '$ionicLoading', function($scope, Bbss, $ionicLoading) {
  $ionicLoading.show({
    template: '<i class="icon ion-load-c padding"></i>'
  });
  Bbss.list(0, 20).then(function(bbss){
    $scope.bbss = bbss;
    $ionicLoading.hide();
  });
  $scope.doRefresh = function(){
  	Bbss.list($scope.bbss[0].attributes.autoincrement, 20).then(function(bbss){
      $scope.bbss = bbss;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
}])


.controller('BbsDetailCtrl', ['$scope', '$stateParams', 'Bbss', '$state', '$ionicPlatform', function($scope, $stateParams, Bbss, $state, $ionicPlatform) {
  Bbss.get($stateParams.bbsId).then(function(bbs){
    //$scope.bbs = bbs;
    $scope.bbs = {
      attributes: {
        bbs: 'fdfdfffd'
      },
      allComments: 120,
      attentions: 234,
      id: 'fdfdfdfdff34234',
      comments: [{
        like: 5,
        chats: 10,
        avatarPath: 'img/avatar.jpg',
        username: 'oxoxll',
        content: 'contentcontentcontentcontentcontentcontentcontentcontentcontent',
        time: '2014-13-1'
      }, {
        like: 5,
        chats: 10,
        avatarPath: 'img/avatar.jpg',
        username: 'oxoxll',
        content: 'contentcontentcontentcontentcontentcontentcontentcontentcontent',
        time: '2014-13-1'
      }, {
        like: 5,
        chats: 10,
        avatarPath: 'img/avatar.jpg',
        username: 'oxoxll',
        content: 'contentcontentcontentcontentcontentcontentcontentcontentcontent',
        time: '2014-13-1'
      }]
    };
  });
  $scope.like = function(id){
  	
  };
}])


.controller('LocationCtrl', ['$scope', function($scope) {
  
}])


.controller('AccountCtrl', ['$scope', '$rootScope', 'user', '$ionicLoading', function($scope, $rootScope, user, $ionicLoading) {
  $rootScope.$on('user.login', initUserInfo);
  $scope.exit = function(){
    $ionicLoading.show({
      template: '<i class="icon ion-load-c padding"></i>正在退出...'
    });
  	user.exit();
  	initUserInfo();
    $ionicLoading.hide();
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
    LoginService.login($scope.user.phone, $scope.user.code).then(function(){
    	$ionicLoading.hide();
    	$ionicLoading.show({ template: '登录成功!', noBackdrop: true, duration: 2000 });
    	$scope.user.code = '';

    	$rootScope.$broadcast('user.login');
    	$ionicHistory.goBack();
    });
	};
}])


.controller('CreateBbsCtrl', ['$scope', 'Bbss', '$ionicLoading', '$ionicHistory', function($scope, Bbss, $ionicLoading, $ionicHistory){
	$scope.sendBbs = function(){
    if(!$scope.bbs){
      $ionicLoading.show({ template: '请输入内容', noBackdrop: true, duration: 1000 });
      return;
    }
		$ionicLoading.show({
			template: '<i class="icon ion-load-c padding"></i>正在发送...'
		});
		Bbss.create($scope.bbs).then(function(bbs){
			$ionicLoading.hide();
			$ionicLoading.show({ template: '成功!', noBackdrop: true, duration: 1000 });
			$scope.bbs = '';
			//$state.go('bbs-detail', {bbsId: bbs.id});
      $ionicHistory.goBack();
		});
	};
}])


.controller('CameramansCtrl', ['$scope', function($scope){

}])


.controller('CameramanDetailCtrl', ['$scope', '$stateParams', function($scope, $stateParams){

}])


.controller('ChatCtrl', ['$scope'], function($scope) {
	
})
.controller('BbsCommentCtrl', ['$scope', 'comment', '$stateParams', function($scope, comment, $stateParams) {
  $scope.bbsId = $stateParams.bbsId;
  $scope.addComment = function(){
    comment.create($scope.comment, $scope.bbsId);
  };
}])


;
