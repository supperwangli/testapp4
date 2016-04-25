
(function($) {
  var uname = "";
  var pword = "";
  var ct_sid;
  var orders = [];
  var php_script;
  var type;

  var get_orders = function () {
    $.post(php_script, {'p0':"get_Eorderlist",'u':uname,'p':pword,'p1':ct_sid}, function(msg) { // 如果数据有改变需要更新显示？？？？
      var ret = $.parseJSON(msg);
	  if (ret.s > 0) {
	    orders = ret.l;
	  }
    });
  }
	var refresh_func = function(){};
	$.fn.set_freshfunc = function (func) {
	  return this.each(function() {
		refresh_func = func;
	  });
	}
	$.fn.fresh_orders_data = function () {
	  return this.each(function() {
		get_orders();
		refresh_func();
	  });
	}
	$.fn.openorder = function (i) {
	  return this.each(function() {
        $('#id_showorder').showorder(orders[i]);
	  });
	}
  var show_orderone = function (tid, i) {
    var str = "";
    var o = orders[i];
    str += "<div class='css_ol2_line' onclick=$('#"+tid+"').openorder("+i+")>"+
             "<div style='float:left;'>订单号："+o.i+"</div>";
	var cstr = o.c;
	if (cstr.length > 10) {
	  cstr = cstr.substring(0,10) + "...";
	}
    str +=   "<div style='float:left;'>"+cstr+"</div>";
	if (o.s) {
      str += "<div style='float:right;'>已结账</div>";
	} else {
	  str += "<div style='float:right;'><span style='color:red;'>未付款</span></div>";
	}
    str += "</div>";
    return str;
  }
  var show_orders = function(tid, xt){
    var str = "";
    var j = 0;
    for (var i=0;i<orders.length;i++) {
	  switch (xt) {
      case 0:
      break;
      case 1:
        if (orders[i].e != uname) {
		  continue;
		}
      break;
      case 2:
        if (orders[i].s != 0) {
		  continue;
		}
      break;
      case 3:
        if (orders[i].s != 1) {
		  continue;
		}
      break;
      default: continue;
	  }
	  str += show_orderone(tid, i);
      j++;
    }
    if (j == 0) {
      var sss = "没有订单";
	  switch (xt) {
      case 0: sss = "没有订单"; break;
      case 1: sss = "没有我的订单"; break;
      case 2: sss = "没有未付款订单"; break;
      case 3: sss = "没有已结账订单"; break;
	  }
	  str = "<div class='css_ol2_line'>"+sss+"</div>";
    }
    document.getElementById("CSS_OL2LIST").innerHTML = str;
  };
  var show_type = function(x) {
    var objs = document.getElementById("CSS_OL2TYPE").childNodes;
    for (var i=0;i<objs.length;i++) {
	  if (i == x) {
	    objs[i].style.background = "white";
	  } else {
        objs[i].style.background = "paleturquoise";
	  }
	}
  }
  $.fn.set_type = function (x) {
    return this.each(function() {
      type = x;
      show_type(x);
      show_orders(this.id, x);
    });
  }
  $.fn.fresh_orders_show = function () {
    return this.each(function() {
	  show_type(type);
      show_orders(this.id, type);
    });
  }
  $.fn.extend({
    init_orders: function(sid) {
      return this.each(function() {
        uname = localStorage.getItem('tsh51_username');
        pword = localStorage.getItem('tsh51_password');
        ct_sid = sid;
        type = 0;
        php_script = get_server();
        get_orders();

        var str = "<div id='CSS_OL2TYPE'>"+
                     "<div class='css_typeline' onclick=$('#"+this.id+"').set_type(0)>全部</div>"+
                     "<div class='css_typeline' onclick=$('#"+this.id+"').set_type(1)>我的</div>"+
                     "<div class='css_typeline' onclick=$('#"+this.id+"').set_type(2)>未付款</div>"+
                     "<div class='css_typeline' onclick=$('#"+this.id+"').set_type(3)>已结账</div>"+
                  "</div>"+
                  "<div id='CSS_OL2LIST'></div>";
        this.innerHTML = str;
        show_type(0);
      });
    }
  });

})(jQuery);
