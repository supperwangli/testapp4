
function add(a, b) {
    var c, d, e;
    try {c = a.toString().split(".")[1].length;} catch (f) {c = 0;}
    try {d = b.toString().split(".")[1].length;} catch (f) {d = 0;}
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}
function sub(a, b) {
    var c, d, e;
    try {c = a.toString().split(".")[1].length;} catch (f) {c = 0;}
    try {d = b.toString().split(".")[1].length;} catch (f) {d = 0;}
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}
function mul(a, b) {
    var c = 0, d = a.toString(), e = b.toString();
    try {c += d.split(".")[1].length;} catch (f) {}
    try {c += e.split(".")[1].length;} catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
function div(a, b) {
    var c, d, e = 0, f = 0;
    try {e = a.toString().split(".")[1].length;} catch (g) {}
    try {f = b.toString().split(".")[1].length;} catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

/**
*@param {string} url 完整的URL地址
*@returns {object} 自定义的对象
*@description 用法示例：var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');

myURL.file='index.html'
myURL.hash= 'top'
myURL.host= 'abc.com'
myURL.query= '?id=255&m=hello'
myURL.params= Object = { id: 255, m: hello }
myURL.path= '/dir/index.html'
myURL.segments= Array = ['dir', 'index.html']
myURL.port= '8080'
yURL.protocol= 'http'
myURL.source= 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
*/
function parseURL(url) {
 var a =  document.createElement('a');
 a.href = url;
 return {
 source: url,
 protocol: a.protocol.replace(':',''),
 host: a.hostname,
 port: a.port,
 query: a.search,
 params: (function(){
     var ret = {},
         seg = a.search.replace(/^\?/,'').split('&'),
         len = seg.length, i = 0, s;
     for (;i<len;i++) {
         if (!seg[i]) { continue; }
         s = seg[i].split('=');
         ret[s[0]] = s[1];
     }
     return ret;
 })(),
 file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
 hash: a.hash.replace('#',''),
 path: a.pathname.replace(/^([^\/])/,'/$1'),
 relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
 segments: a.pathname.replace(/^\//,'').split('/')
 };
}

function get_server()
{
  //var host = window.location.hostname;
  var host = "www.tsh51.com";
  return "http://" + host + "/login.php";
}
function get_rootdir()
{
  //var host = window.location.hostname;
  var host = "www.tsh51.com";
  return "http://" + host + "/";
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//是否存在指定函数 
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}
//是否存在指定变量 
function isExitsVariable(variableName) {
    try {
        if (typeof(variableName) == "undefined") {
            //alert("value is undefined"); 
            return false;
        } else {
            //alert("value is true"); 
            return true;
        }
    } catch(e) {}
    return false;
}

/* 回到index.html,实际就是关闭本窗口 */
function open_home() {
  window.close();
}
