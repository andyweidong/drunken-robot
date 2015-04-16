angular.module('drunken.controllers', [])


.controller('BbssCtrl', ['$scope', 'Bbss', function($scope, Bbss) {

  $scope.doRefresh = function(){
  	Bbss.list($scope.bbss ? $scope.bbss[Bbss.maxIdIndex].attributes.autoincrement : 0, 20).then(function(bbss){
      $scope.bbss = bbss;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  $scope.doRefresh();
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
  var map = new BMap.Map("l-map");  
map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);  
console.log(111);
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


.controller('CreateBbsCtrl', ['$scope', 'Bbss', '$ionicLoading', '$ionicHistory', function($scope, Bbss, $ionicLoading, $ionicHistory){
	$scope.sendBbs = function(){
    if(!$scope.bbs){
      $ionicLoading.show({ template: '请输入内容', noBackdrop: true, duration: 1000 });
      return;
    }
		Bbss.create($scope.bbs).then(function(bbs){
			$ionicLoading.show({ template: '成功!', noBackdrop: true, duration: 1000 });
			$scope.bbs = '';
      $ionicHistory.goBack();
		});
	};
}])


.controller('CameramansCtrl', ['$scope', function($scope){
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

.controller('BbsCommentCtrl', ['$scope', 'comment', '$stateParams', 'imagePicker', function($scope, comment, $stateParams, imagePicker) {
  $scope.bbsId = $stateParams.bbsId;
  $scope.imgSrc = '';
  $scope.isSelect = false;
  $scope.addComment = function(){
    //comment.create($scope.comment, $scope.bbsId);
  };
  $scope.selectImg = function(){
    imagePicker.getPictures({
      maximumImagesCount: 1
    }).then(function(results){
      $scope.imgSrc = results[0];
      $scope.isSelect = true;
    }, function(err){
      console.dir(err);
      $ionicLoading.show({ template: err, noBackdrop: true, duration: 2000 });
    });
  };
  $scope.closeSelectImg = function(){
    $scope.imgSrc = '';
    $scope.isSelect = false;
  };
}])


;
