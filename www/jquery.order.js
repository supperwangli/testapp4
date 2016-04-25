
(function($) {
  var uname = "";
  var pword = "";
  var order0;
  var cnum = 0;
  var csum = 0;

  var func_fail = function(){};
  $.fn.set_func = function (f_fail) {
	return this.each(function() {
	  func_fail = f_fail;
	});
  }
  $.fn.close = function () {
	return this.each(function() {
	  this.innerHTML = "";
	  this.style.display = "none";
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

  $.fn.extend({
    showorder: function(order, un) {
      return this.each(function() {
        uname = localStorage.getItem('tsh51_username');
        pword = localStorage.getItem('tsh51_password');
        order0 = order;
        var str = "";
        str += "<div class='css_oline0'>订单号："+order.i+"</div>"+
               "<div class='css_oline0'>顾客："+uname+"</div>"+
               "<div class='css_oline0'>下单者："+order.e+"</div>"+
               "<div class='css_oline0'>下单时间："+order.t0+"</div>";
        if (order.m == 0) {
          str += "<div class='css_oline0'>订单类型：有座</div>";
		} else {
		  str += "<div class='css_oline0'>订单类型：外带</div>";
		}
        if (order.s == 0) {
          str += "<div class='css_oline0'>订单状态：<span style='color:red;'>未付款</span></div>";
		} else {
		  str += "<div class='css_oline0'>买单时间："+order.t1+"</div>"+
		         "<div class='css_oline0'>订单状态：已买单</div>";
		}
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
        show_sum();
        this.style.display = "block";
      });
    }
  });

})(jQuery);
