angular.module('drunken.filters', [])

.filter('oDateToStrTime', function(){
  return function(input){
    if(input && input.getHours){
      var hours = input.getHours();
      var minutes = input.getMinutes();
      return (hours > 9 ? hours : ('0' + hours)) + ':' + (minutes > 9 ? minutes : ('0' + minutes));
    }
    
  };
})

.filter('oDateToStrDate', function(){
  return function(input){
    if(input && input.getHours){
      return input.getMonth()+1 + '月' + input.getDate() + '日';
    }
  }
})

;