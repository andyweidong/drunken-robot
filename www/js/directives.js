angular.module('drunken.directives', [])

.directive('phone', function(){
	var PHONE_REGEXP = /^\d{11}$/;
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl){
			ctrl.$validators.phone = function(modelValue, viewValue){
				if(PHONE_REGEXP.test(viewValue)){
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
				if(CODE_REGEXP.test(viewValue)){
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


.directive("keepScroll", function(){
  return {
    controller : function($scope){
      var element = 0;
      this.setElement = function(el){
        element = el;
      }
      this.addItem = function(item){
        console.log("Adding item", item, item.clientHeight);
        //element.scrollTop = (element.scrollTop+item.clientHeight+1); //1px for margin
      };
    },
    link : function(scope,el,attr, ctrl) {
     ctrl.setElement(el[0]); 
    }
  };
})

.directive("scrollItem", function(){
  return{
    require : "^keepScroll",
    link : function(scope, el, att, scrCtrl){
      scrCtrl.addItem(el[0]);
    }
  }
})

;