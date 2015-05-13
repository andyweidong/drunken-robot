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

.factory('LoginService', ['_q', 'user', function(_q){


  return {
    sendCode: sendCode,
    login: login
  }

  function sendCode(phone){
    return _q(function(resolve, reject){
      AV.User.requestLoginSmsCode(phone + '').then(function(){
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
      AV.User.logInWithMobilePhoneSmsCode(phone + '', code + '').then(function(user){
        resolve(user);
      }, function(err){
        reject(err);
      });
    });
  }

}])

.factory('SignUpService', ['_q', 'user', function(_q){
  return {
    signUp: signUp,
    verify: verify,
    sendCode: sendCode
  };

  function signUp(phone, code, home, company){
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
      // user.set('username', '' + phone);
      // user.set('homeAddr', home);
      // user.set('companyAddr', company);
      // user.set('type', 1);
      // user.setMobilePhoneNumber(phone + '');
      // user.signUp(null, {
      //   success: function(user){
      //     resolve('验证短信已经发送!');
      //   },
      //   error: function(user, error){
      //     reject(error);
      //   }
      // })
    });
    
  }

  function verify(code){
    return _q(function(resolve, reject){
      AV.User.verifyMobilePhone(code + '').then(function(){
        //验证成功
        resolve('验证成功');
      }, function(err){
        //验证失败
        reject(err);
      });
    });
  }

  function sendCode(phone){
    return _q(function(resolve, reject){
      AV.Cloud.requestSmsCode(phone + '').then(function(){
          //发送成功
          resolve('发送成功');
      }, function(err){
         //发送失败
         reject(err);
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

.factory('TStation', ['_q', 'user', function(_q, user){
  return {
    getUserHomeStation: getUserHomeStation,
    getUserCompanyStation: getUserCompanyStation
  };

  function getUserHomeStation(){

    return _q(function(resolve, reject){
      var cUser = user.current();
      var relation = cUser.relation('homeStation');
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
  function getUserCompanyStation(){

    return _q(function(resolve, reject){
      var cUser = user.current();
      var relation = cUser.relation('companyStation');
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

.factory('TLine', ['_q', 'TStation', function(_q, TStation){
  return {
    getUserLine: getUserLine
  };

  function getUserLine(){
    return _q(function(resolve, reject){
      TStation.getUserHomeStation().then(function(homeStation){
        var query = new AV.Query('T_station');
        query.get(homeStation.id, {
          success: function(homeStation){
            var relation = homeStation.relation('lineNo');
            relation.query().find({
              success: function(list){
                resolve(list[0]);
              },
              error: function(err){
                reject(err);
              }
            });
          },
          error: function(){

          }
        });

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

.factory('TTicketOrder', ['_q', function(_q){
  return {
    create: create
  }
  function create(ticketNo, userPhoneNo, type, price, paymentType){

  }
}])

.factory('TBreakfastOrder', ['_q', function(_q){

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
    console.log('in loadScript');
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



















