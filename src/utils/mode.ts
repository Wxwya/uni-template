/**
 * 1 手机端微信打开
 * 2 pc微信上打开
 * 3 pc非微信上打开
 * 4 手机非微信上打开
 */
export function isOpenMode() {
  var system = {
    win: false,
    mac: false,
    xll: false,
    ipad: false
  };
  //检测平台
  let p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
  system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
  if (system.win || system.mac || system.xll || system.ipad) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      // alert("在PC端微信上打开的");
      return 2;
    } else {
      // alert("在PC端非微信上打开的");
      return 3;
    }
  } else {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      // alert("在手机端微信上打开的");
      return 1;
    } else {
      // alert("在手机上非微信上打开的");
      return 4;
    }
  }
}
