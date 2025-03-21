import fate_start from './sound/fate_start.mp3';

export default class Util {
  static audio = new Audio(fate_start);
  static getPermissionForAutoPlay() {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    return isFirefox && !navigator.getAutoplayPolicy("mediaelement") === "allowed";
  }

  static playFateSound() {
    try {
      Util.audio.play();
    } catch (ex) {

    }
  }


  static setCookie(name, value, exdays = 999999) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  static getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return undefined;
  }

  static getBoolCookie(cname) {
    return Util.getCookie(cname) === 'true';
  }
}
