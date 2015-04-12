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

.factory('LoginService', ['$q', '$ionicLoading', 'user', function($q, $ionicLoading, appUser){

  var type = 'login';

  return {
    sendCode: sendCode,
    login: login
  }

  function sendCode(phone){
    return $q(function(resolve, reject){
      AV.Cloud.requestSmsCode(phone + '').then(function(){
        //发送成功
        resolve('发送成功!');
      }, function(err){
        //发送失败
        $ionicLoading.hide();
        $ionicLoading.show({ template: err.msg, noBackdrop: true, duration: 1000 });
      });
    });
  }

  function login(phone, code){

    return $q(function(resolve, reject){
      var user = new AV.User();
      user.signUpOrlogInWithMobilePhone({
        mobilePhoneNumber: phone + '',
        smsCode: code + ''
      }, 
      {
        success:function(user){
          resolve('登录成功!');
        },
        error: function(err){
          //失败
          $ionicLoading.hide();
          $ionicLoading.show({ template: err.msg, noBackdrop: true, duration: 1000 });
        }
      });
    });
  }

}])

.factory('Bbss', ['$q', 'user', '$ionicLoading', function($q, user, $ionicLoading) {

  var bbsCache = [];

  return {
    list: list,
    remove: remove,
    get: get,
    create: create,
    bbsCache: bbsCache
  };

  function get(bbsId){
    return $q(function(resolve, reject){
      var bbs = new AV.Query('M_Bbs');
      bbs.get(bbsId, {
        success: function(bbs){
          resolve(bbs);
        },
        error: function(object, error){
          $ionicLoading.hide();
          $ionicLoading.show({ template: error.message, noBackdrop: true, duration: 1000 });
        }
      })
    });
  }

  function remove(){

  }

  function create(title){
      return $q(function(resolve, reject){
        var Bbs = AV.Object.extend("M_Bbs");
        var bbs = new Bbs();
        bbs.set("userId", user.id());
        bbs.set("bbs", title);
        var acl = new AV.ACL(user.current());
        acl.setPublicReadAccess(true);
        bbs.set("ACL", acl);
        bbs.save(null, {
          success: function(bbs){
            resolve(bbs);
          },
          error: function(bbs, error){
            $ionicLoading.hide();
            $ionicLoading.show({ template: error.message, noBackdrop: true, duration: 1000 });
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
            [].unshift.apply(bbsCache, results);
            resolve(bbsCache);
          },
          error: function(error) {
            $ionicLoading.hide();
            $ionicLoading.show({ template: error.message, noBackdrop: true, duration: 1000 });
          }
      });
    });
  }

}])

.factory('comment', []);

;
