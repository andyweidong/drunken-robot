angular.module('drunken.directives', [])

.directive('phone', function(){
	var PHONE_REGEXP = /^\d{11}$/;
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl){
			ctrl.$validators.phone = function(modelValue, viewValue){
				if(PHONE_REGEXP.test(modelValue)){
					return true
				}
				return false;
			};
		}
	};
})

.directive('code', function(){
	var CODE_REGEXP = /^\d{6}$/;
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl){
			ctrl.$validators.code = function(modelValue, viewValue){
				if(CODE_REGEXP.test(modelValue)){
					return true
				}
				return false;
			};
		}
	};
})

.directive('focusMe', ['$timeout', function($timeout){
	return {
		link: function(scope, element, attrs){
			$timeout(function(){
				element[0].focus();
				// if(ionic.Platform.isAndroid()){
				// 	cordova.plagins.Keyboard.show();
				// }
			}, 150);
		}
	};
}])

.directive('quantity', function(){
	return {
		restrict: 'E',
		scope: {
			customerCount: '=count'
		},
		template: '<a href="javascript:;">-</a><input type="text" value="{{customerCount.count}}"><a href="javascript:;">+</a>'
	};
})

;