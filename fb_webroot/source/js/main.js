$(function () {

  var _app_id = '998967653470510';
  var _api_key = '';

  //驗證
  window.fbAsyncInit = function() {
    FB.init({
      appId: _app_id,
      display: 'dialog',
      status: true, // check login status
      cookie: true, // enable cookies to allow the server to access the session
      xfbml: true,  // parse XFBML
      oauth: true,  // enable OAuth 2.0
      version : 'v2.3'
    });
    FB.Canvas.setAutoGrow(); //autoResize  → no scrollbar
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  $('.test').click(function () {
    getLoaginState();
  });

  //驗證
  function getLoaginState() {
    FB.getLoginStatus(function (response) {
      if (response.authResponse) {

        var u_fb_id = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;


        share();
        //openGraphStories();
        //feed();

      } else {
        login();
      }
    });
  }

  //跳出登入視窗
  function login() {
    FB.login(function (response) {
      if (response.authResponse) {
        var u_fb_id = response.authResponse.userID;
        console.log('FB.login response', response);
      } else {
        alert('須同意應用程式');
      }
    });
  }

  function feed() {
    FB.ui({
      method: 'feed',
      link: 'http://fashionguide.com.tw',
      caption: 'An example caption',
      message :'ppppp'
    }, function(response){
      console.log(response);
    });
  }

  function share() {
    FB.ui({
      //method: 'share',
      //href: 'https://tw.yahoo.com/'
      display: 'popup',
      method: 'share',
      href: 'http://www.fashionguide.com.tw/'
    }, function(response){
      if (response && !response.error_code) {
        console.log("OK: "+JSON.stringify(response));
      } else {
        console.log("Not OK: "+JSON.stringify(response));
      }
    });
  }

  function openGraphStories() {
    FB.ui({
      display: 'popup',
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
        object:'https://developers.facebook.com/docs/'
      })
    }, function(response){
      console.log(response);
    });
  }

  function testAPI(accessToken) {
    console.log('Welcome!  Fetching your information.... ');
    //FB.api('me/home?access_token='+accessToken+'/', function(response) {
    //  console.log(response);
    //
    //});

    FB.api('me?fields=id,name,picture', function(response){
      console.log(response);
    });
  }






});

