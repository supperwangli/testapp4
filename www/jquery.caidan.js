
(function($) {
	var ct_sid;
	var ct_page;
	var caidan_num = 0;
	var caidan_price = 0;
	var myPos = new Array();
	var change_func = function(){};

  $.fn.c1_fun = function (line, op) {
	return this.each(function() {
/**********/
      var objs = this.childNodes[1].childNodes;

      var cobj = objs[line].childNodes; // 一行菜单的变化
      var y = cobj[3].innerHTML - 0;
      if ((op > 0) && (y < 99)) {
        y++;
      } else if ((op <= 0) && (y > 0)) {
        y--;
      } else {
        return;
      }
      cobj[3].innerHTML = y;
      if (y > 0) {
        cobj[3].style.visibility = "visible";
        cobj[4].style.visibility = "visible";
      } else {
        cobj[3].style.visibility = "hidden";
        cobj[4].style.visibility = "hidden";
      }

      var str = '';
      caidan_num = 0;
      caidan_price = 0;
      for (var i=0;i<objs.length;i++) {
        var cobj = objs[i].childNodes;
        if (cobj.length != 5) {
          continue;
        }
        var num = cobj[3].innerHTML - 0;
        if (num > 0) {
          var n = cobj[0].innerHTML;
          var p = cobj[1].childNodes[1].childNodes[1].innerHTML - 0;
          var x = cobj[3].innerHTML - 0;
          str += '{"i":'+i+',"n":"'+n+'","p":'+p+',"x":'+x+'},';

          caidan_num = add(caidan_num, x);
          var tsum = mul(p, x);
          caidan_price = add(caidan_price, tsum);
        }
      }
	  if (str.charAt(str.length-1) == ',') { // 如果字符最后一个','就去掉
	    str = str.substring(0, str.length-1);
	  }
      str = '[' + str + ']';
      localStorage.setItem(ct_page+ct_sid,str);

      change_func();
/**********/
    });
  }

  var jump_ctype0 = function(tobj, x) {
    var obj = tobj.childNodes[1];
    var hh_name = 0;
    var hh_desc = 0;
    //alert(document.body.scrollTop);
    //document.body.scrollTop = hh_name + hh_desc + n;
    //alert($(obj).html());
    $(obj).scrollTop(hh_name + hh_desc + myPos[x]);

    var objs = tobj.childNodes[0].childNodes;
    for (var i=0;i<objs.length;i++) {
      if (i == x) {
        objs[i].style.background = "white";
      } else {
        objs[i].style.background = "paleturquoise";
      }
    }
  }
  $.fn.jump_ctype = function (x) {
    return this.each(function() {
      jump_ctype0(this, x);
	});
  }
  $.fn.clearcaidan = function() {
	return this.each(function() {
      show_dian(this, []);
      localStorage.setItem(ct_page+ct_sid,'[]');
	});
  }
  var show_dian = function(obj, dobjs) { // 如果dobjs为[]则菜单clear
    caidan_num = 0;
    caidan_price = 0;
    var objs = obj.childNodes[1].childNodes;
    for (var i=0;i<objs.length;i++) {
      var cobj=objs[i].childNodes;
      var len=cobj.length;
      if (len != 5) { // 是类型跳过
	    continue;
      }
      for (var j=0;j<dobjs.length;j++) {
	    if (dobjs[j].i != i) { continue; }
		if (dobjs[j].n != cobj[0].innerHTML) { continue; }
		if (dobjs[j].p != cobj[1].childNodes[1].childNodes[1].innerHTML) { continue; }
		break;
      }
      if ((j != dobjs.length) && (dobjs[j].x != 0)) {
		cobj[3].innerHTML = dobjs[j].x;
		cobj[3].style.visibility = "visible";
		cobj[4].style.visibility = "visible";

        caidan_num = add(caidan_num, dobjs[j].x);
        var tsum = mul(dobjs[j].p, dobjs[j].x)
        caidan_price = add(caidan_price, tsum);
      } else {
        cobj[3].innerHTML = 0;
        cobj[3].style.visibility = "hidden";
        cobj[4].style.visibility = "hidden";
      }
    }
  }
  $.fn.set_dian = function(dobjs) {
    return this.each(function() {
	  show_dian(this, dobjs)
	  var dstr = JSON.stringify(dobjs);
	  localStorage.setItem(ct_page+ct_sid,dstr);
    });
  }
  $.fn.get_dian = function() {
    var dians = [];
    this.each(function() {
	  var ldian = localStorage.getItem(ct_page+ct_sid);
      dians = $.parseJSON(ldian);
	});
    return dians;
  }
    $.fn.extend({
        showcaidan: function(canting_cd, func) {
            return this.each(function() {
/*****************************************************************************/
var myURL = parseURL(window.location.href);
ct_sid = myURL.params.i;
ct_page = myURL.file;
change_func = func;

var arr = canting_cd.split(";");
if (arr == null) {
  this.innerHTML = "<div class='css_menu'>没有菜单</div>";
  return;
}

var mstr = "";
var tstr = "";
var mpos = 0;
var j = 0;
for (var i=0;i<arr.length;i++) {
  var nn=arr[i].split(":");
  if (nn[1] == "-1") {
	mstr += "<div class='c_typet'>"+nn[0]+"</div>";
	myPos[j] = mpos;
	tstr += "<div class='c_typel' onclick=$('#"+this.id+"').jump_ctype("+(j++)+")>"+nn[0]+"</div>";
	mpos += 25 + 1;
  } else {
	mstr += "<div class='c_caidan' style='height:60px;'>"+
			  "<div style='width:100%;height:24px;line-height:24px;font-size:15px;font-weight:bold;'>"+nn[0]+"</div>"+
			  "<div style='height:36px;float:left;'>"+
				"<div style='font-size:2px;color:lightgray;'>"+nn[2]+"&nbsp;</div>"+
				"<div style='font-size:16px;color:red;'>￥<span>"+nn[1]+"</span></div>"+
			  "</div>"+
			  "<div class='c1_add' onclick=$('#"+this.id+"').c1_fun("+i+",1)>＋</div>"+
			  "<div class='c1_txt'>0</div>"+
			  "<div class='c1_del' onclick=$('#"+this.id+"').c1_fun("+i+",0)>－</div>"+
			"</div>";
	mpos += 60 + 1;
  }
}
this.innerHTML = "<div class='css_type'>"+tstr+"</div><div class='css_menu'>"+mstr+"</div>";

//localStorage.setItem(ct_page+ct_sid,'[{"i":1,"n":"鱼香肉丝","p":15,"x":1},{"i":2,"n":"番茄炒鸡蛋","p":10,"x":1},{"i":3,"n":"京酱肉丝","p":20,"x":1}]');
var ldian = localStorage.getItem(ct_page+ct_sid);
try {
  ldian = $.parseJSON(ldian);
  for (var i=0;i<ldian.length;i++) { // 检查local存储数据的有效性
    if (
       isNaN(ldian[i].i) ||
       (typeof(ldian[i].n) == "undefined") ||
       isNaN(ldian[i].p) ||
       isNaN(ldian[i].x)
     ) {
      ldian = [];
      localStorage.setItem(ct_page+ct_sid,'[]');
	  break;
　　}
  }
} catch (error) {
  ldian = [];
  localStorage.setItem(ct_page+ct_sid,'[]');
}
show_dian(this, ldian);
change_func();
jump_ctype0(this, 0);

var thisobj = this;
var obj = this.childNodes[1];
$(obj).scroll(function() {
  var offs = $(obj).scrollTop();
  for (var i=1;i<myPos.length;i++) {
	if (offs < myPos[i]) {
	  break;
	}
  }
  i = i -1;
  var objs = thisobj.childNodes[0].childNodes;
  for (var j=0;j<objs.length;j++) {
	if (j == i) {
	  objs[j].style.background = "white";
	} else {
	  objs[j].style.background = "paleturquoise";
	}
  }
});
/*****************************************************************************/
            });
        }
    });

})(jQuery);
