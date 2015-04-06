angular.module('drunken.controllers', [])

.controller('BbssCtrl', ['$scope', 'Bbss', function($scope, Bbss) {
    $scope.bbss = Bbss.all();
}])

.controller('BbsDetailCtrl', ['$scope', '$stateParams', 'Bbss', function($scope, $stateParams, Bbss) {
  $scope.bbs = Bbss.get($stateParams.bbsId);
}])

.controller('LocationCtrl', ['$scope', function($scope) {

}])

.controller('AccountCtrl', ['$scope', function($scope) {
  $scope.settings = {
    
  };
}])

.controller('LoginCtrl', ['$scope', '$interval', function($scope, $interval){
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
	};
	$scope.login = function(){

	};
	$scope.changePhone = function(){
		validateCodeDisable();
		validateLoginDisable();
	};

	$scope.changeCode = function(){
		validateLoginDisable();
	}

	function validateLoginDisable(){
		if((!$scope.codeDisable) && $scope.user.code >10){
			$scope.loginDisable = false;
		}else {
			$scope.loginDisable = true;
		}
	}

	function validateCodeDisable(){
		if($scope.user.phone > 1999999999 && $scope.user.phone < 19999999999 && time === 60){
			$scope.codeDisable = false;
		}else {
			$scope.codeDisable = true;
		}
	}

}]);
