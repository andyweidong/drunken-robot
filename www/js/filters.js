angular.module('drunken.filters', [])

.filter('dateFormat', function(){
  return function(input, format){
    if(input && input.getHours){
      var out = format;
      out = out.replace(/yyyy/, formatNumber(input.getUTCFullYear()));
      out = out.replace(/MM/, formatNumber(input.getMonth() + 1));
      out = out.replace(/dd/, formatNumber(input.getDate()));
      out = out.replace(/HH/, formatNumber(input.getHours()));
      out = out.replace(/mm/, formatNumber(input.getMinutes()));
      out = out.replace(/ss/, formatNumber(input.getSeconds()));
      return out;
    }
  }
  function formatNumber(num){
    return num < 10 ? '0' + num : num;
  }
})

.filter('subString', function(){
  return function(input, from, to){
    if(input){
      return input.substring(from, to);
    }
    
  }
})

.filter('orderStatus', function(){
  var status = ['未支付', '已支付', '已使用', '已退款'];
  return function(input){
    if(input >=0 && input <=3){
      console.log(input);
      return status[input];
    }
    
  }
})



;