/*
 * @Author: omtech.cn
 * @Date: 2018-09-04 14:11:50
 * @LastEditors: Doris
 * @LastEditTime: 2018-09-04 14:11:50
 * @Description: 
 */

$(document).ready(function () {

  // slide
  var $slide = $('#J_slide');
  $slide.hover(function () {
    $(this).find('.prev').css('left', 0);
    $(this).find('.next').css('right', 0);
  }, function () {
    $(this).find('.prev').css('left', '-50px');
    $(this).find('.next').css('right', '-50px');
  });
  $slide.slide({ 
    titCell: '.icon li', 
    mainCell: '.cont ul', 
    effect: 'leftLoop', 
    autoPlay: true, 
    vis: 1, 
    scroll: 1, 
    interTime: 5000 
  });

  // tab
  $('.J_tab').slide({ 
    titCell: '.hd-nav li', 
    mainCell: '.bd', 
    effect: 'fade', 
    autoPlay: false, 
    trigger: 'mouseover', 
    delayTime: 500, 
    pnLoop: true 
  });

  // slideTopic
  $('.J_slideTopic').slide({ 
    mainCell: '.conts ul', 
    autoPlay: false, 
    effect: 'leftLoop', 
    vis: 5, 
    scroll: 1, 
    interTime: 2000,
    prevCell: ".prev-arrow",
    nextCell: ".next-arrow"
  });


  // 下拉弹框
  $(".select-item .select-wraper").on("click", function () {
    if (!$(this).hasClass("on")) {
      $(this).parent(".select-item").addClass("on").find(".select-list").show();
      $(this).addClass("on");
    }
  });
  $(".select-item").on("mouseleave", function () {
    $(this).removeClass("on").find(".select-wraper").removeClass("on");
    if (!$(this).find(".select-list").is(":hidden")) {
      $(this).find(".select-list").hide();
    }
  });

  // 下拉选中
  $(".select-item .select-list li").on("click", function () {
    $(this).addClass("on").siblings().removeClass("on");
  });
});