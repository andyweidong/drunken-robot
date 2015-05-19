angular.module('drunken.controllers', [])


.controller('BbssCtrl', ['$scope', 'user', 'TShuttleShift', 'TLine', '$state', '$rootScope', function($scope, user, TShuttleShift, TLine, $state, $rootScope) {
  if(!user.isLogin()){
    $rootScope.$on('user.login', initIndex);
    $state.go('login');
  }else {
    initIndex();
  }
  function initIndex(){
    TLine.getUserLine().then(function(line){
      if(line){
        $scope.line = line;
        TShuttleShift.list().then(function(list){
          $scope.list = list;
        });
      }else {
        //没有符合用户的线路
      }
      
    });
    $scope.user = user.current();
  }
  
}])


.controller('OrderConfirmCtrl', ['$scope', 'TBreakfastSet', '$stateParams', 'TShuttleShift', 'user', 'TTicketOrder', '$state', function($scope, TBreakfastSet, $stateParams, TShuttleShift, user, TTicketOrder, $state) {
  TBreakfastSet.list().then(function(list){
    $scope.breakfasts = list;
  });
  TShuttleShift.getById($stateParams.busId).then(function(item){
    $scope.tShuttleShift = item;
  });
  $scope.user = user.current();
  $scope.add = function(index){
    $scope.breakfasts[index].attributes.count ++;
    $scope.breakfastTotal += $scope.breakfasts[index].attributes.price;
  };
  $scope.minu = function(index){
    if($scope.breakfasts[index].attributes.count === 0){
      return;
    }
    $scope.breakfasts[index].attributes.count --;
    $scope.breakfastTotal -= $scope.breakfasts[index].attributes.price;
  };
  $scope.breakfastTotal = 0;
  $scope.ticketTotal = 15;

  $scope.createOrder = function(){
    var ticketNo = $scope.tShuttleShift.attributes.shuttleSerialNo + parseInt(Math.random() * 10000);
    var userPhoneNo = $scope.user.attributes.mobilePhoneNumber
    var breakfastOrders = [];
    for(var i = 0; i < $scope.breakfasts.length; i++){
      if($scope.breakfasts[i].attributes.count > 0){
        breakfastOrders[i] = {
          userPhoneNo: userPhoneNo,
          count: $scope.breakfasts[i].attributes.count,
          breakfastSet: $scope.breakfasts[i],
          totalPrice: $scope.breakfasts[i].attributes.count * $scope.breakfasts[i].attributes.price
        }
      }
    }
    TTicketOrder.create({
      ticketNo: ticketNo, 
      type: 0,//0上班，1下班
      price: $scope.ticketTotal,
      paymentType: 0//0alipay, 1weixin
    }, $scope.tShuttleShift, breakfastOrders).then(function(ticketOrder){
      $state.go('pay-success', {orderId: ticketOrder.id});  
    });
    
  };
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
    LoginService.login($scope.user.phone, $scope.user.code).then(function(user){
    	$ionicLoading.show({ template: '登录成功', noBackdrop: true, duration: 1000 });
    	$scope.user.code = '';
    	$rootScope.$broadcast('user.login');
      if(user.attributes.homeAddr){
        $state.go('tab.bbss');
      }else {
        $state.go('sign-up');
      }
    	
    });
	};
}])

.controller('SignUpCtrl', ['$scope', 'SignUpService', '$state', function($scope, SignUpService, $state){
  $scope.user = {};


  $scope.signUp = function(){
    SignUpService.signUp($scope.user.home, $scope.user.company).then(function(){
      $state.go('tab.bbss');
    });
  };
}])


.controller('SetSystemCtrl', ['$scope', function($scope){
	
}])


.controller('CameramanDetailCtrl', ['$scope', '$stateParams', function($scope, $stateParams){

}])

.controller('ChatRoomsCtrl', ['$scope', function($scope){
  $scope.rooms = [{
    img: 'img/avatar.jpg',
    title: '群聊',
    lastWords: '大家好'
  }];
}])

.controller('ChatCtrl', ['$scope', 'imagePicker', '$state', '$stateParams', function($scope, imagePicker, $state, $stateParams) {
  //$stateParams.shuttleShift
  $scope.goIndex = function(){
    $state.go('tab.chat-rooms');
  }
  $scope.results = [{
    content: '你好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: false
  }, {
    content: '我不好',
    name: 'lucy',
    img: 'img/avatar.jpg',
    isSelf: false
  }];
  $scope.send = function(){
    if(!$scope.content){
      return;
    }
    $scope.results.push({
      content: $scope.content,
      name: 'lucy',
      img: 'img/avatar.jpg',
      isSelf: true
    });
    $scope.content = '';
  };
	$scope.selectImg = function(){
    imagePicker.getPictures({
      maximumImagesCount: 1
    }).then(function(results){
      $scope.results = results;
    }, function(err){
      $ionicLoading.show({ template: err, noBackdrop: true, duration: 2000 });
    });
  };
}])

.controller('PaySuccessCtrl', ['$scope', '$state', 'TTicketOrder', '$stateParams', 'TBreakfastOrder', function($scope, $state, TTicketOrder, $stateParams, TBreakfastOrder) {
  TTicketOrder.getById($stateParams.orderId).then(function(ticketOrder){
    $scope.ticketOrder = ticketOrder;
    TBreakfastOrder.list(ticketOrder).then(function(list){
      $scope.breakfastList = list;
    });
  });
  $scope.goChat = function(){
    //$state.go('chat', {shuttleShift: ticketOrder.attributes.ticketNo.substring(0, 19)});
    $state.go('chat', {shuttleShift: $scope.ticketOrder.attributes.tShuttleShift.id});
  }
}])

.controller('TicketInfoCtrl', ['$scope', '$stateParams', '$ionicLoading', 'TTicketOrder', 'TBreakfastOrder', function($scope, $stateParams, $ionicLoading, TTicketOrder, TBreakfastOrder){
  //$stateParams.ticketId
  TTicketOrder.getById($stateParams.ticketId).then(function(ticketOrder){
    $scope.ticketOrder = ticketOrder;
    TBreakfastOrder.list(ticketOrder).then(function(list){
      $scope.breakfastList = list;
    });
  });
  $scope.cancelOrder = function(){
    $ionicLoading.show({ template: '取消成功！', noBackdrop: true, duration: 2000 });
  };
}])

.controller('SetAddressCtrl', ['$scope', 'user', function($scope, user){
  $scope.user = user.current();
  $scope.saveAddr = function(){
    user.saveAddr($scope.user.attributes.homeAddr, $scope.user.attributes.companyAddr).then(function(msg){

    });;
  }
}])

.controller('SuggestCtrl', ['$scope', '$ionicLoading', function($scope, $ionicLoading){
  $scope.send = function(){
    $ionicLoading.show({ template: '感谢您的建议！', noBackdrop: true, duration: 2000 });
  }
}])

.controller('OrderListCtrl', ['$scope', 'TTicketOrder', function($scope, TTicketOrder){
  TTicketOrder.list().then(function(list){
    $scope.list = list;
    console.log(list);
  });
}])



;
