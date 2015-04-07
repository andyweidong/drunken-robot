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

;