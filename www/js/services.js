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

.factory('LoginService', ['$q', function($q){
  return {
    sendCode: sendCode,
    login: login
  }

  function sendCode(phone){
    return $q(function(resolve, reject){
      setTimeout(function(){
        resolve('发送成功');
      }, 1000);
    });
  }

  function login(){
    return $q(function(resolve, reject){
      setTimeout(function(){
        resolve({
          userId: 100,
          username: 'haha',
          avatar: 'http://ionicframework.com/img/docs/mcfly.jpg'
        });
      }, 1000);
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
