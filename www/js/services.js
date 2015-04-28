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

.factory('slider', [function(){
  return function (containerId) {
      var _CaptionTransitions = [];
      _CaptionTransitions["L"] = { $Duration: 900, x: 0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
      _CaptionTransitions["R"] = { $Duration: 900, x: -0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
      _CaptionTransitions["T"] = { $Duration: 900, y: 0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
      _CaptionTransitions["B"] = { $Duration: 900, y: -0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
      _CaptionTransitions["ZMF|10"] = { $Duration: 900, $Zoom: 11, $Easing: { $Zoom: $JssorEasing$.$EaseOutQuad, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 };
      _CaptionTransitions["RTT|10"] = { $Duration: 900, $Zoom: 11, $Rotate: 1, $Easing: { $Zoom: $JssorEasing$.$EaseOutQuad, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInExpo }, $Opacity: 2, $Round: { $Rotate: 0.8} };
      _CaptionTransitions["RTT|2"] = { $Duration: 900, $Zoom: 3, $Rotate: 1, $Easing: { $Zoom: $JssorEasing$.$EaseInQuad, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInQuad }, $Opacity: 2, $Round: { $Rotate: 0.5} };
      _CaptionTransitions["RTTL|BR"] = { $Duration: 900, x: -0.6, y: -0.6, $Zoom: 11, $Rotate: 1, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Top: $JssorEasing$.$EaseInCubic, $Zoom: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInCubic }, $Opacity: 2, $Round: { $Rotate: 0.8} };
      _CaptionTransitions["CLIP|LR"] = { $Duration: 900, $Clip: 15, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic }, $Opacity: 2 };
      _CaptionTransitions["MCLIP|L"] = { $Duration: 900, $Clip: 1, $Move: true, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic} };
      _CaptionTransitions["MCLIP|R"] = { $Duration: 900, $Clip: 2, $Move: true, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic} };

      var options = {
          $FillMode: 2,                                       //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
          $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
          $AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
          $PauseOnHover: 1,                                   //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

          $ArrowKeyNavigation: true,                    //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
          $SlideEasing: $JssorEasing$.$EaseOutQuint,          //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad
          $SlideDuration: 800,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
          $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
          //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
          //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
          $SlideSpacing: 0,                           //[Optional] Space between each slide in pixels, default value is 0
          $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
          $ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
          $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
          $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
          $DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

          $CaptionSliderOptions: {                            //[Optional] Options which specifies how to animate caption
              $Class: $JssorCaptionSlider$,                   //[Required] Class to create instance to animate caption
              $CaptionTransitions: _CaptionTransitions,       //[Required] An array of caption transitions to play caption, see caption transition section at jssor slideshow transition builder
              $PlayInMode: 1,                                 //[Optional] 0 None (no play), 1 Chain (goes after main slide), 3 Chain Flatten (goes after main slide and flatten all caption animations), default value is 1
              $PlayOutMode: 3                                 //[Optional] 0 None (no play), 1 Chain (goes before main slide), 3 Chain Flatten (goes before main slide and flatten all caption animations), default value is 1
          },

          $BulletNavigatorOptions: {                          //[Optional] Options to specify and enable navigator or not
              $Class: $JssorBulletNavigator$,                 //[Required] Class to create navigator instance
              $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
              $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
              $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
              $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
              $SpacingX: 8,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
              $SpacingY: 8,                                   //[Optional] Vertical space between each item in pixel, default value is 0
              $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
          },

          $ArrowNavigatorOptions: {                       //[Optional] Options to specify and enable arrow navigator or not
              $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
              $ChanceToShow: 1,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
              $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
              $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
          }
      };

      var jssor_slider1 = new $JssorSlider$(containerId, options);

      //responsive code begin
      //you can remove responsive code if you don't want the slider scales while window resizes
      function ScaleSlider() {
          var bodyWidth = document.body.clientWidth;
          if (bodyWidth)
              jssor_slider1.$ScaleWidth(Math.min(bodyWidth, 1920));
          else
              $Jssor$.$Delay(ScaleSlider, 30);
      }

      ScaleSlider();
      $Jssor$.$AddEvent(window, "load", ScaleSlider);

      $Jssor$.$AddEvent(window, "resize", $Jssor$.$WindowResizeFilter(window, ScaleSlider));
      $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
      //responsive code end
  };
}])

;



















