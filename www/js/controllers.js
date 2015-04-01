angular.module('starter.controllers', [])

.controller('BbssCtrl', function($scope, Bbss) {
    $scope.bbss = Bbss.all();
    $scope.remove = function(bbs){
        Bbss.remove(bbs);
    };
})

.controller('BbsDetailCtrl', function($scope, $stateParams, Bbss) {
  $scope.bbs = Bbss.get($stateParams.bbsId);
})

.controller('LocationCtrl', function($scope) {

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    
  };
});
