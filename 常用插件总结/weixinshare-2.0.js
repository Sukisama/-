// 定义全局变量
window.share_config = {
    title: document.title, // 分享标题
    desc: '看得见的视野 感受到的温度', // 分享描述
    link: window.location.href, // 分享链接
    img_url: 'http://www.cditv.cn/statics/images/cando/8.2/logo.jpg' // 分享图标
  };
  
  $(document).ready(function() {　
    // 获取网页description作为分享描述
    var meta = document.getElementsByTagName('meta');
    for (var i in meta) {
      if (typeof(meta[i].name) != 'undefined' && meta[i].name.toLowerCase() == 'description') {
        if (meta[i].content.length > 0) {
          share_config.desc = meta[i].content;
        }
      }
    }
    // 获取网页第一张src不为空的图片作为分享图标
    var img = document.getElementsByTagName('img');
    for (i in img) {
      if (typeof(img[i].src) != 'undefined' && img[i].src != '' && img[i].src != location.href) {
        share_config.img_url = img[i].src;
        break;
      }
    }
  });
  
  // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给朋友
    WeixinJSBridge.on('menu:share:appmessage', function() {
      WeixinJSBridge.invoke('sendAppMessage', share_config, function(e) {});
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function() {
      WeixinJSBridge.invoke('shareTimeline', share_config, function(e) {});
    });
    // 分享到手机QQ
    WeixinJSBridge.on('menu:share:qq', function() {
      WeixinJSBridge.invoke('shareQQ', share_config, function(e) {});
    });
    // 分享到QQ空间
    WeixinJSBridge.on('menu:share:QZone', function() {
      WeixinJSBridge.invoke('shareQZone', share_config, function(e) {});
    });
  }, false);