
(function($) {
  var uname = "";
  var pword = "";
  var usern = "";
  var p_sid;
  var p_obj;
  var p_ordero;
  var php_script;
  var p_num;
  var p_price;

  var func_close = function(){};
  $.fn.set_close = function (fclose) {
	return this.each(function() {
	  func_close = fclose;
	});
  }
  $.fn.close = function () {
	return this.each(function() {
	  this.innerHTML = "";
	  this.style.display = "none";
	});
  }
  var show_sun = function() {
	$('#id_postatus').html(p_num+"个菜，"+p_price+"元");
  };
  $.fn.send_order = function () {
	return this.each(function() {
      var r = confirm("确定下单吗？");
      if (r == false) {
        return;
      }
	  var str = "";
	  for (var i=0;i<p_obj.length;i++) {
	    str += p_obj[i].i+":"+p_obj[i].n+":"+p_obj[i].p+":"+p_obj[i].x+";";
	  }
	  if (str.charAt(str.length-1) == ';') { // 如果字符最后一个','就去掉
	    str = str.substring(0, str.length-1);
	  }
	  var wd = 0;
	  if (document.getElementById("id_waidai").checked) {
        wd = 1;
	  }
	  var thisobj = this;
      $.post(php_script, {'u':uname,'p':pword,'p0':"put_order", 'p1':p_sid, 'p2':usern, 'p3':str, 'p4':wd}, function(msg) {
		var ret = $.parseJSON(msg);
		if (ret.s > 0) {
	      func_close();
		  $('#id_showorder').showorder(ret.o);
	      thisobj.innerHTML = "";
	      thisobj.style.display = "none";
		}
      });
	});
  }
  $.fn.change_order = function () {
	return this.each(function() {
      var r = confirm("确定修改订单吗？");
      if (r == false) {
        return;
      }
	  var str = "";
	  for (var i=0;i<p_obj.length;i++) {
	    str += p_obj[i].i+":"+p_obj[i].n+":"+p_obj[i].p+":"+p_obj[i].x+";";
	  }
	  if (str.charAt(str.length-1) == ';') { // 如果字符最后一个','就去掉
	    str = str.substring(0, str.length-1);
	  }
	  var thisobj = this;
	  var wd = 0;
	  if (document.getElementById("id_waidai").checked) {
        wd = 1;
	  }
	  var oid = 0;
	  if (p_ordero != 0) {
		oid = p_ordero.i;
	  }
      $.post(php_script, {'u':uname,'p':pword,'p0':"change_order", 'p1':oid, 'p2':str, 'p3':wd}, function(msg) {
		var ret = $.parseJSON(msg);
		if (ret.s > 0) {
	      func_close();
		  $('#id_showorder').showorder(ret.o);
	      thisobj.innerHTML = "";
	      thisobj.style.display = "none";
		}
      });
	});
  }
  $.fn.waidai = function () {
	return this.each(function() {
	});
  }
    $.fn.extend({
        putorder: function(sid,un,obj,mo) { // sid:餐厅sid,obj:下单菜单,mo:要修改的菜单
            return this.each(function() {
/*****/
  p_sid = sid;
  uname = localStorage.getItem('tsh51_username');
  pword = localStorage.getItem('tsh51_password');
  usern = un;
  p_obj = obj;
  p_ordero = mo;
  php_script = get_server();
  var str = "";
  str += "<div class='css_top0' onclick=$('#"+this.id+"').close()></div><div id='id_postatus' class='css_top1'></div>";
	p_num = 0;
	p_price = 0;
	str += "<div class='css_po_l'>";
    str += "<div class='css_orderline'>"+
             "<div style='width:33%;float:left;'>菜</div>"+
             "<div style='width:33%;float:left;'>价格</div>"+
             "<div style='width:34%;float:left;'>数量</div>"+
           "</div>";
	for (var i=0;i<obj.length;i++) {
	  str += "<div class='css_orderline'>"+
			   "<div style='float:left;width:33%;'>"+obj[i].n+"</div>"+
			   "<div style='float:left;width:33%;'>￥"+obj[i].p+"</div>"+
			   "<div style='float:left;width:34%;'>X"+obj[i].x+"</div>"+
			 "</div>";
	  p_num = add(p_num, obj[i].x);
	  var msum = mul(obj[i].x, obj[i].p);
	  p_price = add(p_price, msum);
	}
	if (mo != 0) {
    if (mo.ac.length != 0) {
	  str += "<br />";
      str += "<div class='css_orderline'>增加：</div>";
	  for (var i=0;i<mo.ac.length;i++) {
	    str += "<div class='css_orderline'>"+
			     "<div style='float:left;width:33%;'>"+mo.ac[i].n+"</div>"+
			     "<div style='float:left;width:33%;'>￥"+mo.ac[i].p+"</div>"+
			     "<div style='float:left;width:34%;'>+"+mo.ac[i].x+"</div>"+
               "</div>";
	  }
	}
    if (mo.sc.length != 0) {
	  str += "<br />";
	  str += "<div class='css_orderline'>减少：</div>";
	  for (var i=0;i<mo.sc.length;i++) {
	    str += "<div class='css_orderline'>"+
			     "<div style='float:left;width:33%;'>"+mo.sc[i].n+"</div>"+
			     "<div style='float:left;width:33%;'>￥"+mo.sc[i].p+"</div>"+
			     "<div style='float:left;width:34%;'>-"+mo.sc[i].x+"</div>"+
               "</div>";
	  }
    }
	}
	str += "</div>";
  str += "<div class='css_po_b'>";
  var cccc = "";
  var dddd = "下单";
  var bbbb = "send_order";
  if (mo != 0) {
	if ((mo.ac.length != 0) || (mo.sc.length != 0)) {
	  if (mo.m == 1) {
	    cccc = "checked=true";	
	  }
	  dddd = "修改订单";
	  bbbb = "change_order";
	}
  }
  str += "<div class='css_po_b0'><input id='id_waidai' type='checkbox' onclick=$('#"+this.id+"').waidai() "+cccc+" />外带</div>"+
         "<div class='css_po_b1' style='cursor:pointer;' onclick=$('#"+this.id+"')."+bbbb+"() >"+dddd+"</div>";
  str += "</div>";

  this.innerHTML = str;
  show_sun();
  this.style.display = "block";
/*****/
            });
        }
    });

})(jQuery);
