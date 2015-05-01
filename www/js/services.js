angular.module('drunken.services', [])

.factory('user', [function(){

  return {
    isLogin: isLogin,
    get: get,
    exit: exit,
    id: id,
    current: current
  };

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
      AV.Cloud.requestLoginSmsCode(phone + '').then(function(){
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
      AV.User.logInWithMobilePhoneSmsCode().then(function(user){
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
    reSendCode: reSendCode
  };

  function signUp(phone, home, company){
    return _q(function(resolve, reject){
      var user = new AV.User();
      user.set('username', '' + phone);
      user.set('home', home);
      user.set('company', company);
      user.setMobilePhoneNumber(phone + '');
      user.signUp(null, {
        success: function(user){
          resolve('验证短信已经发送!');
        },
        error: function(user, error){
          reject(error);
        }
      })
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

  function reSendCode(phone){
    return _q(function(resolve, reject){
      AV.User.requestMobilePhoneVerify(phone + '').then(function(){
          //发送成功
          resolve('发送成功');
      }, function(err){
         //发送失败
         reject(err);
      });
    });
  }

}])

.factory('Bbss', ['$q', '_q', 'user', '$ionicLoading', function($q, _q, user, $ionicLoading) {

  var bbsCache = [];
  var maxIdIndex = 0;

  return {
    list: list,
    remove: remove,
    get: get,
    create: create,
    bbsCache: bbsCache,
    maxIdIndex: maxIdIndex
  };

  function get(bbsId){
    return _q(function(resolve, reject){
      var bbs = new AV.Query('M_Bbs');
      bbs.get(bbsId, {
        success: function(bbs){
          resolve(bbs);
        },
        error: function(object, error){
          reject(error, object);
        }
      })
    });
  }

  function remove(){

  }

  function create(title){
    return _q(function(resolve, reject){
      var Bbs = AV.Object.extend("M_Bbs");
      var bbs = new Bbs();
      bbs.set("userId", user.id());
      bbs.set("bbs", title);
      var acl = new AV.ACL(user.current());
      acl.setPublicReadAccess(true);
      bbs.set("ACL", acl);
      bbs.save(null, {
        success: function(bbs){
          bbsCache.unshift(bbs);
          maxIdIndex++;
          resolve(bbs);
        },
        error: function(bbs, error){
          reject(error, bbs);
        }
      });
    });
  }

  function list(lastId, count){
    return $q(function(resolve, reject){
      var query = new AV.Query("M_Bbs");
      query.greaterThan("autoincrement", lastId ? lastId : 0);
      query.limit(count ? count : 20);
      query.descending("autoincrement");
      query.find({
          success: function(results) {
            if(results.length === 20){
              bbsCache = [];
            }
            bbsCache.splice(0, maxIdIndex);
            maxIdIndex = 0;
            [].unshift.apply(bbsCache, results);
            resolve(bbsCache);
          },
          error: function(error) {
            $ionicLoading.show({ template: error.message, noBackdrop: true, duration: 1000 });
          }
      });
    });
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
        resolve(result);
      }, function(err){
        $ionicLoading.hide();
        $ionicLoading.show({ template: err.msg ? err.msg : err.message, noBackdrop: true, duration: 1000 });
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



















