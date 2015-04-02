angular.module('drunken.directives', [])
.directive('hideTabs', function($rootScope){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			scope.$watch(attrs.hideTabs, function(value){
				console.log(value);
				$rootScope.hideTabs = value;
			});
			scope.$on('$destroy', function(){
				console.log('destory');
				$rootScope.hideTabs = false;
			});
		}
	};
});