

var Cookies = (function () {
  'use strict';
  var pub = {};

  /*set a cookie with a value and hours expire time*/
  pub.set = function (name, value, hours) {
    var date, expires;
    if(hours){
      date = new Date();
      date.setHours(date.getHours() + hours);
      expires = ';expires=' +  date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + ";path=/";
  };

  /*get cookie by name and return its stored value*/
  pub.get = function (name) {
    var nameEq, cookies, cookie, i;
    nameEq = name + '=';
    cookies = document.cookie.split(';');
    for(i = 0; i < cookies.length; i += 1) {
      cookie = decodeURIComponent(cookies[i].trim());
      if(cookie.indexOf(nameEq) === 0) {
        return cookie.substring(nameEq.length, cookie.length);
      }
    }
    return null;
  };

  /*clear cookie value by name*/
  pub.clear = function (name) {
    pub.set(name, "", -1);
  };

  return pub;
}());

if(window.addEventListener) {
  window.addEventListener('load', Cookies.setup);
} else if (window.attachEvent) {
  window.attachEvent('onload', Cookies.setup);
} else {
  window.alert("Could not attach ’js_cookies.setup’ to the ’window.onload’ event");
}
