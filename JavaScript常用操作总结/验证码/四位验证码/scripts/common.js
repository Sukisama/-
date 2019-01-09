
function fixPagesHeight() {
   var rem = $("#content").width() / 6.4;
   $("#content").css("font-size",rem+"px");
   $(".index_img_div .span3 span").css("font-size",(rem*0.2)+"px");
   var w = $(".input_li li").eq(0).find("input").width();
   $(".input_li li input").height(w);
   $(".ir_txt span.fl").css("padding-top",(w-$(".ir_txt span.fl").height())/2+"px");
}

$(function(){

  
    fixPagesHeight();
	$(window).on('resize', function() {
		fixPagesHeight();
	})
	$(window).load(function(){
		fixPagesHeight();
	})
	
   var i = 0;
   times();
  	function times(){
		var obj = $(".span4").find("img");
		if(i==0){
			obj.attr("src",$(obj).attr("date_img"));
			i=1;	
		}else{
			obj.attr("src",$(obj).attr("date_img1"));
			i=0;	
		}
		
		setTimeout(function(){times();},500)
		
	}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

})

 