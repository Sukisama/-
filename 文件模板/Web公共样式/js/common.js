/*
 * @Author: omtech.cn
 * @Date: 2017-12-31 11:02:25
 * @LastEditors: Doris
 * @LastEditTime: 2018-09-04 15:50:25
 * @Description: 
 */


$(function () {
  // 图片延迟加载
  $('.J_lazyImg').lazyLoad();
  
  // 头部导航获取当前时间
  if ($('#J_Date').size() > 0) {
    getNowTime();
  }

  // 头部轮播
  var HeaderIndex = 0, IndexBanner = null, timer = 6500;
  IndexBanner = setInterval(function () {
    startFocus();
  }, timer);
  function startFocus() {
    HeaderIndex++;
    HeaderIndex = HeaderIndex > $("#J_header_slide ul").find('li').size() - 1 ? 0 : HeaderIndex;
    $("#J_header_slide ul").find('li').eq(HeaderIndex).stop().animate({ 'opacity': 1 }, 1200).siblings().stop().animate({ 'opacity': 0 }, 1200);
  }

  // 返回顶部
  $('body').append('<a class="backtop" id="J_backTop" href="javascript:void(0);"></a>');
  var $backTop = $('#J_backTop');
  $(window).scroll(function () {
    var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
    scrollTop > 200 ? $backTop.fadeIn() : $backTop.stop().fadeOut();
  });
  $backTop.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 200);
  });

  $('.float-mini').on('click',function(){
    var floatBox = $('.float-box');
    
    if (floatBox.hasClass('hide')){
      floatBox.removeClass('hide');
      floatBox.addClass('active');
      floatBox.css('display','block');
    } else {
      floatBox.removeClass('active');
      floatBox.addClass('hide');
      setTimeout(function () {
        floatBox.css('display', 'none');
      }, 180);
    }
    
  });
});


/**
 * [getNowTime 取得当前时间]
 */
function getNowTime() {
  var now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth() + 1,
    day = now.getDate(),
    weekDay = formatWeekDay(now.getDay()),
    hour = now.getHours(),
    minute = now.getMinutes(),
    second = now.getSeconds(),
    nowDate = year + "年" + formatNumber(month) + "月" + formatNumber(day) + "日 " + weekDay + " " + formatNumber(hour) + ":" + formatNumber(minute) + ":" + formatNumber(second);
  if (document.getElementById("J_Date")) {
    document.getElementById("J_Date").innerHTML = nowDate;
  }
  setTimeout(getNowTime, 1000);
}

function formatWeekDay(n) {
  var day;
  switch (n) {
    case 0:
      day = "星期日";
      break;
    case 1:
      day = "星期一";
      break;
    case 2:
      day = "星期二";
      break;
    case 3:
      day = "星期三";
      break;
    case 4:
      day = "星期四";
      break;
    case 5:
      day = "星期五";
      break;
    case 6:
      day = "星期六";
      break;
  }
  return day;
}

function formatNumber(n) {
  if (n < 10) {
    return "0" + n;
  } else {
    return n;
  }
}

// 设为首页
function SetHome(obj, vrl) {
  var url = 'http://' + window.location.host;
  try {
    obj.style.behavior = 'url(#default#homepage)';
    obj.setHomePage(url);
  } catch (e) {
    if (window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
      } catch (e) {
        alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
      }
      var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
      prefs.setCharPref('browser.startup.homepage', url);
    } else {
      alert("您的浏览器不支持！\n请按照下面步骤操作：1.打开浏览器设置；2.点击设置网页；3.输入：" + url + "点击确定。");
    }
  }
}

// 加入收藏
function AddFavorite(sURL, sTitle) {
  sURL = encodeURI(sURL);
  try {
    window.external.addFavorite(sURL, sTitle);
  } catch (e) {
    try {
      window.sidebar.addPanel(sTitle, sURL, "");
    } catch (e) {
      alert("加入收藏失败！\n请使用Ctrl+D进行添加，或手动在浏览器里进行设置。");
    }
  }
}

/**
 * 验证搜索表单
 * @param tag 元素
 */
function checkSearch(tag) {
  if (!tag.value) {
    if (myBrowser() == "IE6") {
      alert('请输入搜索关键词！');
      tag.focus();
    } else {
      alerts('请输入搜索关键词！', function () {
        tag.focus();
      });
    }
    return false;
  } else {
    return true;
  }
}

/**
 * 提示信息
 * @param msg 提示信息内容
 * @param fun 回调函数
 */
function alerts(msg, fun) {
  var alert = $('#alert'),
    msg = '<span>' + msg + '</span>';
  if (alert.length > 0) {
    alert.html(msg);
    alert.show();
  } else {
    $('body').append('<div class="alert" id="alert">' + msg + '</div>');
  }
  setTimeout(function () {
    $('#alert').fadeOut();
    fun && $.isFunction(fun) ? fun() : '';
  }, 2000);
}

/**
 * 判断移动设备
 */
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  Mobile: function () {
    return navigator.userAgent.match(/mobile/i) ? true : false;
  },
  Weixin: function () {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ? true : false;
  },
  App: function () {
    return navigator.userAgent.toLowerCase().indexOf('tjjw_ua') > -1 ? true : false;
  },
  iphone: function () {
    return (this.iOS());
  },
  any: function () {
    return (this.Mobile() || this.Android() || this.iOS());
  }
};

/**
 * 判断浏览器版本
 */
function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  if (isIE) {
    var IE5 = IE55 = IE6 = IE7 = IE8 = false;
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    IE55 = fIEVersion == 5.5;
    IE6 = fIEVersion == 6.0;
    IE7 = fIEVersion == 7.0;
    IE8 = fIEVersion == 8.0;
    if (IE55) {
      return "IE55";
    }
    if (IE6) {
      return "IE6";
    }
    if (IE7) {
      return "IE7";
    }
    if (IE8) {
      return "IE8";
    }
  } //isIE end
}

//点赞动画
$(function () {
  $(".praise").click(function () {
    var praise_img = $(this).find(".praise-img");
    var text_box = $(this).find(".add-num");
    var praise_txt = $(this).find(".praise-txt");
    var num = parseInt(praise_txt.text());
    if (praise_img.attr("src") == ("/statics/default/images/like_red_icon.png")) {
      $(this).find(".praise-btn").html("<img src='/statics/default/images/like_grey_icon.png' class='praise-img animation'>");
      praise_txt.removeClass("hover");
      text_box.show().html("<em class='add-animation'>-1</em>");
      $(".add-animation").removeClass("hover");
      num -= 1;
      praise_txt.text(num);
    } else {
      $(this).find(".praise-btn").html("<img src='/statics/default/images/like_red_icon.png' class='praise-img animation'>");
      praise_txt.addClass("hover");
      text_box.show().html("<em class='add-animation'>+1</em>");
      $(".add-animation").addClass("hover");
      num += 1;
      praise_txt.text(num);
    }
  });
});