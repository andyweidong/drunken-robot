angular.module('drunken.services', [])

.factory('user', [function(){

  return {
    isLogin: isLogin,
    get: get,
    exit: exit
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
