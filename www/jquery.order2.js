
(function($) {
  var php_script;
  var uname = "";
  var pword = "";
  var order0 = {}; // 原始订单
  var cnum = 0;
  var csum = 0;
  var caidan = []; // 原始订单的菜单分解
  var change_status = 0;
  var func_fail = function(){};
  $.fn.set_func = function (f_fail) {
	return this.each(function() {
	  func_fail = f_fail;
	});
  }
  var show_sum = function() {
    var str = "";
    if (cnum == 0) {
	  str += "您还没有点菜";
    } else {
	  str += "您点了<span style='color:white;'>"+cnum+"</span>个菜，一共"+"<span style='color:white;'>￥"+csum+"</span>";
    }
    document.getElementById("css_otop2").innerHTML = str;
  }
  $.fn.close = function () {
	return this.each(function() {
	  if (change_status == 1) {
	    $('#id_showolist').fresh_orders_show();
	  }
	  this.style.display = "none";
	});
  }
  $.fn.pay_order = function () {
    return this.each(function() {
      var r = confirm("确定结账了吗？");
      if (r == false) {
        return;
      }
      $.post(php_script, {'u':uname,'p':pword,'p0':"confirm_payorder", 'p1':order0.i}, function(msg) {
        var ret = $.parseJSON(msg);
        if (ret.s < 0) {
          alert(ret.s);
        } else {
		  change_status = 1;
		  var ctime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
		  document.getElementById("id_ostatus").innerHTML = show_status1(ctime);
		  show_b1();
		  $('#id_showolist').fresh_orders_data();
		  alert("付款成功！");
		}
      });
    });
  }
  $.fn.modify_order = function () {
    return this.each(function() {
	  var order_c = order0;
	  order_c.cd = caidan;
      modify_order(order_c); // etc.html里面的函数
	  this.innerHTML = "";
	  this.style.display = "none";
    });
  }
  var show_status1 = function(t1) {
    return "<div class='css_oline0'>买单时间："+t1+"</div>"+
           "<div class='css_oline0'>订单状态：已买单</div>";
  };
  var show_b0 = function(tobj) {
    document.getElementById("css_obottom0").innerHTML = "<div class='css_obtn0' onclick=$('#"+tobj.id+"').modify_order()>修改</div>";
    document.getElementById("css_obottom1").innerHTML = "<div class='css_obtn0' onclick=$('#"+tobj.id+"').pay_order()>付款</div>";
  }
  var show_b1 = function() {
    document.getElementById("css_obottom0").innerHTML = "<div class='css_obtn1'>修改</div>";
    document.getElementById("css_obottom1").innerHTML = "<div class='css_obtn1'>付款</div>";
  }
  $.fn.extend({
    showorder: function(order) {
      return this.each(function() {
		php_script = get_server();
        uname = localStorage.getItem('tsh51_username');
        pword = localStorage.getItem('tsh51_password');
        cnum = 0;
        csum = 0;
	    order0 = order;
	    caidan = [];
	    change_status = 0;

        var str = "";
        str += "<div class='css_oline0'>订单号："+order.i+"</div>"+
               "<div class='css_oline0'>顾客："+order.u+"</div>"+
               "<div class='css_oline0'>下单者："+order.e+"</div>"+
               "<div class='css_oline0'>下单时间："+order.t0+"</div>";
        if (order.m == 0) {
          str += "<div class='css_oline0'>订单类型：有座</div>";
		} else {
		  str += "<div class='css_oline0'>订单类型：外带</div>";
		}
        str += "<div id='id_ostatus'>";
        if (order.s == 0) {
          str += "<div class='css_oline0'>订单状态：<span style='color:red;'>未付款</span></div>";
		} else {
		  str += show_status1(order.t1);
		}
		str += "</div>"
        str += "<br />";
        str += "<div class='css_oline'>"+
                 "<div style='width:33%;float:left;'>菜</div>"+
                 "<div style='width:33%;float:left;'>价格</div>"+
                 "<div style='width:34%;float:left;'>数量</div>"+
               "</div>";
	    var cds = order.c.split(';'); // 处理菜单
	    for (var i=0;i<cds.length;i++) {
		  var cd = cds[i].split(':');
		  cnum = add(cnum, cd[3]);
		  var sum = mul(cd[2], cd[3]);
		  csum = add(csum, sum);
		  var ocd = { i:cd[0],n:cd[1],p:cd[2],x:cd[3] };
		  caidan.push(ocd);
          str += "<div class='css_oline'>"+
                   "<div style='width:33%;float:left;'>"+cd[1]+"</div>"+
                   "<div style='width:33%;float:left;'>￥"+cd[2]+"</div>"+
                   "<div style='width:34%;float:left;'>X"+cd[3]+"</div>"+
                 "</div>";
		}

        str =
          "<div class='css_otop1' onclick=$('#"+this.id+"').close()></div>"+
          "<div id='css_otop2'></div>"+
          "<div class='css_showorder'>"+str+"</div>"+
		  "<div id='css_obottom0'></div><div id='css_obottom1'></div>";
        this.innerHTML = str;
        if (order.s == 0) {
		  show_b0(this);
        } else {
          show_b1();
		}
        show_sum();
        this.style.display = "block";
      });
    }
  });
})(jQuery);
