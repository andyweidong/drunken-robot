angular.module('drunken.controllers', [])

.controller('BbssCtrl', function($scope, Bbss) {
    $scope.bbss = Bbss.all();
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
