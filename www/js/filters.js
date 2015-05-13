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

.filter('dateFormat', function(){
  return function(input, format){
    if(input && input.getHours){
      var out = format;
      out = out.replace(/yyyy/, input.getUTCFullYear());
      out = out.replace(/MM/, input.getMonth() + 1);
      out = out.replace(/dd/, input.getDate());
      out = out.replace(/HH/, input.getHours());
      out = out.replace(/mm/, input.getMinutes());
      out = out.replace(/ss/, input.getSeconds());
      return out;
    }
  }
})


;