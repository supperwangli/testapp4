
(function($) {
  var uname = "";
  var p_mid;
  var p_obj;
  var p_num;
  var p_price;

  var func_close = function(o){};
  $.fn.set_close = function (fclose) {
	return this.each(function() {
	  func_close = fclose;
	});
  }
  $.fn.close = function () {
	return this.each(function() {
	  func_close(p_obj);
	  this.innerHTML = "";
	  this.style.display = "none";
	});
  }
  $.fn.change = function (obj,i,s) {
	return this.each(function() {
	  var x = p_obj[i].x;
	  if (s == 0) {
		if (x > 0) {
		  p_obj[i].x--;
		  $(obj).prev().html(x-1);
		  p_num--;
		  p_price = sub(p_price, p_obj[i].p);
		  show_sun();
		}
	  } else if (s == 1) {
		if (x < 99) {
		  p_obj[i].x++;
		  $(obj).next().html(x+1);
		  p_num++;
		  p_price = add(p_price, p_obj[i].p);
		  show_sun();
		}
	  }
	  gen_qrcode();
	});
  }
  $.fn.waidai = function () {
	return this.each(function() {
      if (document.getElementById("id_waidai").checked) {
	    document.getElementById("id_show_waidai").innerHTML = "订单类型：外带";
	  } else {
		document.getElementById("id_show_waidai").innerHTML = "订单类型：有座";
	  }
	  gen_qrcode();
	});
  }
  var show_sun = function() {
	$('#id_postatus').html(p_num+"个菜，"+p_price+"元");
  };

  var gen_qrcode = function() {
	var wd = 0;
	if (document.getElementById("id_waidai").checked) {
      wd = 1;
	}
	var str = p_mid + ":" + uname + ":" + wd + ";";
	var xxx = 0;
	for (var i=0;i<p_obj.length;i++) {
	  str += p_obj[i].i + ":" + p_obj[i].x + ";";
	  xxx = add(xxx, p_obj[i].x);
	}
	$('#id_qrcode').html("");
	if (xxx != 0) {
      $('#id_qrcode').qrcode({width:145,height:145,text:str});
	}
  }

    $.fn.extend({
        putorder: function(mid,obj) {
            return this.each(function() {
/*****/
  uname = localStorage.getItem('tsh51_username');
  p_mid = mid;
  p_obj = obj;
  var str = "";
  str += "<div class='css_top0' onclick=$('#"+this.id+"').close()></div>"+
         "<div id='id_postatus' class='css_top1'></div>"+
         "<div class='css_top2'></div>";
  str += "<div class='css_qrcode'><div id='id_qrcode' style='margin:0px auto;width:145px;height:145px;'></div></div>";
	p_num = 0;
	p_price = 0;
	str += "<div class='css_po_l'>";
    str += "<div class='css_orderline' style='color:lightgray;'>"+
             "<div style='width:33%;float:left;'>菜</div>"+
             "<div style='width:33%;float:left;'>价格</div>"+
             "<div style='margin:0px 35px;float:right;'>数量</div>"+
           "</div>";
	for (var i=0;i<obj.length;i++) {
	  str += "<div class='css_orderline'>"+
			   "<div style='float:left;width:33%;'>"+obj[i].n+"</div>"+
			   "<div style='float:left;width:33%;'>￥"+obj[i].p+"</div>"+
	  		   "<div class='p_btn' onclick=$('#"+this.id+"').change(this,"+i+",1)>＋</div>"+
			   "<div class='p_txt'>"+obj[i].x+"</div>"+
			   "<div class='p_btn' onclick=$('#"+this.id+"').change(this,"+i+",0)>－</div>"+
			 "</div>";
	  p_num += obj[i].x - 0;
	  p_price += (obj[i].x - 0)*(obj[i].p - 0);
	}
    str += "<div id='id_show_waidai' class='css_orderline'>订单类型：有座</div>";
	str += "</div>";
  str += "<div class='css_po_b0'></div>";
  str += "<div class='css_po_b1'><input id='id_waidai' type='checkbox' onclick=$('#"+this.id+"').waidai() />外带</div>";

  this.innerHTML = str;
  show_sun();
  gen_qrcode();
  this.style.display = "block";
/*****/
            });
        }
    });

})(jQuery);
