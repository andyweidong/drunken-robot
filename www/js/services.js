angular.module('drunken.services', [])

.factory('user', [function(){

  return {
    isLogin: isLogin,
    set: set,
    get: get,
    exit: exit
  };

  function isLogin(){
    return get('isLogin') === 'true' ? true : false;
  }

  function set(key, value){
    localStorage.setItem(key, value);
    return this;
  }

  function get(key){
    
    console.log(key + ':' + localStorage.getItem(key));
    return localStorage.getItem(key);
  }

  function exit(){
    set('isLogin', 'false');
  }

}])

.factory('LoginService', ['$q', '$ionicLoading' function($q, $ionicLoading){

  var type = 'login';

  return {
    sendCode: sendCode,
    login: login
  }

  function sendCode(phone){
    return $q(function(resolve, reject){
      AV.User.requestLoginSmsCode(phone + '').then(function(){
        type = 'login';
        resolve('发送成功!');
      }, function(err){
        type = 'regist';
        if(err.code === 213){//未注册
          regist(phone, resolve, reject);
        }else if(err.code === 215){//手机号码未验证
          AV.User.requestMobilePhoneVerify(phone + '').then(function(){
            //发送成功
            resolve('发送成功!');
          }, function(err){
            //发送失败
            //reject(err);
            $ionicLoading.hide();
            $ionicLoading.show({ template: err.msg, noBackdrop: true, duration: 1000 });
          });
        }else {
          //reject(err);
          $ionicLoading.hide();
          $ionicLoading.show({ template: err.msg, noBackdrop: true, duration: 1000 });
        }
      });
    });
  }

  function regist(phone, resolve, reject){
    var user = new AV.User();
    user.set("username", phone + '');
    user.set("password", "XXXXXX.ew#$");
    user.set("email", phone + "@xiangpianshuo.com");
    user.setMobilePhoneNumber(phone + '');
    user.signUp(null, {
      success: function(user) {
        resolve('发送成功!');
      },
      error: function(user, error) {
        //reject(error);
        $ionicLoading.hide();
        $ionicLoading.show({ template: error.message, noBackdrop: true, duration: 1000 });
      }
    });
  }

  function registVerifyMobilePhone(code){
    return $q(function(resolve, reject){
      AV.User.verifyMobilePhone(code + '').then(function(){
        resolve(AV.user.current());
      }, function(err){
        $ionicLoading.hide();
        $ionicLoading.show({ template: err.msg, noBackdrop: true, duration: 1000 });
      });
    });

  }

  function login(phone, code){
    if(type === 'regist'){
      return registVerifyMobilePhone(code);
    }
    return $q(function(resolve, reject){
      AV.User.logInWithMobilePhoneSmsCode(phone + '', code + '').then(function(user){
        resolve(user);
      }, function(err){
        $ionicLoading.hide();
        $ionicLoading.show({ template: err.msg, noBackdrop: true, duration: 1000 });
      });
    });
  }

}])

.factory('Bbss', ['$q', function($q) {

  var bbss = [{
    id: 0,
    name: '你最近在看什么书',
    lastText: '[图片]我在看老人与海',
    comments: [{
      id: 5,
      img: 'http://ionicframework.com/img/docs/mcfly.jpg',
      name: '哈哈',
      content: '锤子手机',
      time: '2015年4月1日',
      chats: 3,
      like: 4
    }, {
      id: 2,
      img: 'http://ionicframework.com/img/docs/mcfly.jpg',
      name: '哈哈',
      content: '锤子手机',
      time: '2015年4月1日',
      chats: 3,
      like: 4
    }]
  }, {
    id: 1,
    name: '月薪',
    lastText: '这是一个秘密',
    comments: [{
      id: 5,
      img: 'http://ionicframework.com/img/docs/mcfly.jpg',
      name: '哈哈',
      content: '锤子手机',
      time: '2015年4月1日',
      chats: 3,
      like: 4
    }, {
      id: 2,
      img: 'http://ionicframework.com/img/docs/mcfly.jpg',
      name: '哈哈',
      content: '锤子手机',
      time: '2015年4月1日',
      chats: 3,
      like: 4
    }]
  }];

  return {
    all: function() {
      return bbss;
    },
    remove: function(bbs) {
      bbss.splice(bbss.indexOf(bbs), 1);
    },
    get: function(bbsId) {
      for (var i = 0; i < bbss.length; i++) {
        if (bbss[i].id === parseInt(bbsId)) {
          return bbss[i];
        }
      }
      return null;
    },
    create: function(title){
      return $q(function(resolve, reject){
        setTimeout(function(){
          resolve('创建成功');
        }, 1000);
      });
    }
  };
}])

;
