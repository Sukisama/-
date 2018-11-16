var data = ['iphoneX','Ipad Pro','雷神911 air','机械革命Z2','500元优惠券','200元优惠券','谢谢参与',],
  timer = null;
  flag=0;

window.onload = function(){
  var play = document.getElementById('play'),
    stop = document.getElementById('stop');

  //开始抽奖
  play.onclick = playFun;
  stop.onclick = stopFun;

  //键盘事件
  document.onkeyup=function(event) {
    event = event || window.event;
    var KeyCode = (navigator.appname=="Netscape")?event.which:event.keyCode; 
    //console.log(event.KeyCode);
    if (KeyCode==13) {
      if(flag==0){
        playFun();
        flag=1;
      }else{
        stopFun();
        flag=0;
      }
    }
  };
};

function playFun(){
  var title = document.getElementById('title');
  var play=document.getElementById('play');
  // 间歇调用
  clearInterval(timer);
  timer = setInterval(function(){
    var random = Math.floor(Math.random()*data.length);//0-6,7个
    title.innerHTML = data[random];
  },50);
  play.style.background = '#999';
}

 function stopFun(){
  clearInterval(timer);
  var play = document.getElementById('play');
  play.style.background = '#036';
 }