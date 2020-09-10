import store from '../backend/store';

export function whereShouldIPoint() {

  if (window.location.hostname) {
    let URL = 'https://' + window.location.hostname;

    if (window.location.hostname === store.getters.getBackend.frontLocalhost) {
      store.commit(
        "setBackend",
        store.getters.getBackend.local
      );
    }

    else if (window.location.hostname === store.getters.getBackend.frontDev) {
      store.commit(
        "setBackend",
        store.getters.getBackend.development
      );
    }

    else {
      store.commit(
        'setBackend',
        `${URL}/back`
      );
    }

  }
}

export function getAllUrlParams() {
  if (window.location.hostname) {
    store.commit("setHREF", window.location.href);
    let url = window.location.href;
    var queryString = url ?
      url.split("?")[1] :
      window.location.search.slice(1);
    var obj = {};
    if (queryString) {
      queryString = queryString.split("#")[0];
      var arr = queryString.split("&");
      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split("=");
        var paramNum = undefined;
        var paramName = a[0].replace(/\[\d*\]/, function (v) {
          paramNum = v.slice(1, -1);
          return "";
        });
        var paramValue = typeof a[1] === "undefined" ? true : a[1];
        if (obj[paramName]) {
          if (typeof obj[paramName] === "string") {
            obj[paramName] = [obj[paramName]];
          }
          if (typeof paramNum === "undefined") {
            obj[paramName].push(paramValue);
          } else {
            obj[paramName][paramNum] = paramValue;
          }
        } else {
          obj[paramName] = paramValue;
        }
      }
    }
    store.commit("setParamsURL", obj);
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) store.commit("setIsEmpty", false);
      else store.commit("setIsEmpty", false);
    }
    store.commit("setParamsURL", Object.values(obj));
    if (Object.values(obj)[0]) {
      store.commit("setToken", Object.values(obj)[0]);
    }
    if (Object.values(obj)[1]) {
      store.getters.getFunctions.locales.forEach(element => {
        var str = Object.values(obj)[1];
        var n = str.includes(element);
        if (n) {
          if (element == "pt-Br") {
            element = "pt-br";
          }
          localStorage.setItem("locale", element);
          store.commit("setLocale", element);
        }
      });
    }
    return obj;
  }
}

export default {
  whereShouldIPoint,
  getAllUrlParams,
};
