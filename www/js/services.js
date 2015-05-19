angular.module('drunken.services', [])

.factory('user', ['_q', function(_q){

  return {
    isLogin: isLogin,
    get: get,
    exit: exit,
    id: id,
    current: current,
    saveAddr: saveAddr
  };

  function saveAddr(home, company){
    return _q(function(resolve, reject){
      var user = current();
      user.set('homeAddr', home);
      user.set('companyAddr', company);
      user.save().then(function(){
        resolve('保存成功');
      }, function(err){
        reject(err);
      });
    });

  }

  function isLogin(){
    return AV.User.current() ? true : false;
  }

  function get(key){
    return AV.User.current().attributes[key];
  }

  function exit(){
    AV.User.logOut();
  }

  function id(){
    return AV.User.current().id;
  }

  function current(){
    return AV.User.current();
  }

}])

.factory('LoginService', ['_q', 'user', function(_q, appUser){

  var type = 'login';

  return {
    sendCode: sendCode,
    login: login
  }

  function sendCode(phone){
    return _q(function(resolve, reject){
      AV.Cloud.requestSmsCode(phone + '').then(function(){
        //发送成功
        resolve('发送成功!');
      }, function(err){
        //发送失败
        reject(err);
      });
    });
  }

  function login(phone, code){

    return _q(function(resolve, reject){
      var user = new AV.User();
      user.signUpOrlogInWithMobilePhone({
        mobilePhoneNumber: phone + '',
        smsCode: code + ''
      }, 
      {
        success:function(user){
          resolve(user);
        },
        error: function(err){
          reject(err);
        }
      });
    });
  }

}])

.factory('SignUpService', ['_q', 'user', function(_q){
  return {
    signUp: signUp
  };

  function signUp(home, company){
    return _q(function(resolve, reject){
      var user = new AV.User();
      user.signUpOrlogInWithMobilePhone({
        mobilePhoneNumber: phone+ '',
        smsCode: code + '',
        username: phone + '',
        companyAddr: company,
        homeAddr: home
      }, {
        success: function(user){
          resolve('注册成功');
        },
        error: function(err){
          reject(err);
        }
      });
    });
    
  }



}])

.factory('TShuttleShift', ['_q', 'TLine', function(_q, TLine) {
  return {
    list: list,
    getById: getById
  };

  function getById(id){
    return _q(function(resolve, reject){
      var query = new AV.Query('T_Shuttle_Shift');
      query.get(id, {
        success: function(item){
          resolve(item);
        },
        error: function(error){
          reject(error);
        }
      });
    });
  }


  function list(){
    return _q(function(resolve, reject){
      TLine.getUserLine().then(function(line){
        var query = AV.Relation.reverseQuery('T_Shuttle_Shift', 'lineNo', line);
        query.find({
          success:function(list) {
            resolve(list);
          },
          error: function(err){
            reject(err);
          }
        });
      });
    });
  }
}])

// .factory('TStation', ['_q', 'user', function(_q, user){
//   return {
//     getUserHomeStation: getUserHomeStation,
//     getUserCompanyStation: getUserCompanyStation
//   };

//   function getUserHomeStation(){

//     return _q(function(resolve, reject){
//       var cUser = user.current();
//       var relation = cUser.relation('homeStation');
//       relation.query().find({
//         success: function(list){
//           resolve(list[0]);
//         },
//         error: function(err){
//           reject(err);
//         }
//       });
//     });
//   }
//   function getUserCompanyStation(){

//     return _q(function(resolve, reject){
//       var cUser = user.current();
//       var relation = cUser.relation('companyStation');
//       relation.query().find({
//         success: function(list){
//           resolve(list[0]);
//         },
//         error: function(err){
//           reject(err);
//         }
//       });
//     });
//   }

// }])

.factory('TLine', ['_q', 'user', function(_q, user){
  return {
    getUserLine: getUserLine
  };

  function getUserLine(){
    return _q(function(resolve, reject){
      var cUser = user.current();
      var relation = cUser.relation('line');
      relation.query().find({
        success: function(list){
          resolve(list[0]);
        },
        error: function(err){
          reject(err);
        }
      });
    });
  }
}])

.factory('TBreakfastSet', ['_q', function(_q){
  return {
    list: list
  }

  function list(){
    return _q(function(resolve, reject){
      var query = new AV.Query('T_Breakfast_Set');
      query.find({
        success: function(list){
          for(var item in list){
            list[item].attributes.count = 0;
            //item.attributes.count = 0;
          }
          resolve(list);
        },
        error: function(error){
          reject(error);
        }
      });
    });
  }
}])

.factory('TTicketOrder', ['_q', 'TBreakfastOrder', 'user', function(_q, TBreakfastOrder, user){
  return {
    create: create,
    getById: getById,
    list: list
  }

  function list(){
    return _q(function(resolve, reject){
      var query = new AV.Query('T_Ticket_Order');
      query.include('tShuttleShift');
      query.equalTo('user', user.current());
      query.find({
        success: function(orders){
          resolve(orders);
        },
        error: function(err){
          reject(err);
        }
      });
    });
  }

  function getById(id){
    return _q(function(resolve, reject){
      var query = new AV.Query('T_Ticket_Order');
      query.include('tShuttleShift');
      query.get(id, {
        success: function(item){
          console.log(item);
          resolve(item);
        },
        error: function(error){
          reject(error);
        }
      });
    });
  }
  function create(ticketAttrs, tShuttleShift, breakfasts){//ticketNo, userPhoneNo, type, price, paymentType
    return _q(function(resolve, reject){
      var T_Ticket_Order = AV.Object.new('T_Ticket_Order');
      T_Ticket_Order.set('user', user.current());
      T_Ticket_Order.set('tShuttleShift', tShuttleShift);
      T_Ticket_Order.save(ticketAttrs, {
        success: function(ticketOrder){
          if(breakfasts.length > 0){
            TBreakfastOrder.create(breakfasts, ticketOrder).then(function(){
              resolve(ticketOrder);  
            }, function(err){
              reject(err);
            });
          }else {
            resolve(ticketOrder);  
          }
        },
        error: function(ticketOrder, err){
          reject(err);
        }
      });

    });
  }
}])

.factory('TBreakfastOrder', ['_q', '$q', function(_q, $q){
  return {
    create: create,
    list: list
  }

  function list(ticketNo){
    return _q(function(resolve, reject){
      var query = new AV.Query('T_Breakfast_Order');
      query.equalTo('ticketNo', ticketNo);
      query.include('breakfastSet');
      query.find({
        success: function(results){
          resolve(results);
        },
        error: function(err){
          reject(err);
        }
      });
    });
  }

  function create(breakfasts, ticketOrderNo){//ticketNo, userPhoneNo, type, price, paymentType
    var promises = [];
    angular.forEach(breakfasts, function(breakfast){
      var deffered  = $q.defer();
      var T_Breakfast_Order = AV.Object.new('T_Breakfast_Order');
      T_Breakfast_Order.set('ticketNo', ticketOrderNo);
      T_Breakfast_Order.set('breakfastSet', breakfast.breakfastSet);
      delete breakfast.breakfastSet;
      T_Breakfast_Order.save(breakfast, {
        success: function(breakfast){
          deffered.resolve(breakfast);
        },
        error: function(breakfast, err){
          deffered.reject(err);
        }
      });
    });

    return $q.all(promises);
  }
}])

.factory('imagePicker', ['$q', function($q){
  return {
    getPictures: function(options){
      var q = $q.defer();
      window.imagePicker.getPictures(
        function(results) {
          q.resolve(results);
        }, function (error) {
          q.reject(error);
        }, options
      );
      return q.promise;
    }
  };
}])

.factory('_q', ['$q', '$ionicLoading', function($q, $ionicLoading){

  return _q;

  function _q(fn){
    $ionicLoading.show({
      template: '<ion-spinner icon="ios"></ion-spinner>'
    });
    return $q(function(resolve, reject){
      $q(fn).then(function(result){
        $ionicLoading.hide();
        if(typeof result === 'string'){
          $ionicLoading.show({ template: result, noBackdrop: true, duration: 1000 });
        }
        resolve(result);
      }, function(err){
        $ionicLoading.hide();
        $ionicLoading.show({ template: err.msg ? err.msg : err.message, noBackdrop: true, duration: 4000 });
        reject(err);
      });
    });
  }
}])

.factory('loadScript', ['$q', function($q){
  return function(src){
    return $q(function(resolve, reject){
      var script = document.createElement('script');
      script.onload = function() {
        resolve();
      };
      script.src = src;
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  };
}])



;



















