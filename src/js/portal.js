//response for ul li click
(function() {
  $("ul#header-nav-content-menu li").click(function(){
    $("ul#header-nav-content-menu li[class=current]").attr("class","");
    $(this).attr("class","current");
    console.log($(this).attr("name"));
    $("body article").attr("style","display:none;");
    $("body article[id="+$(this).attr("name")+"]").attr("style","display:block;");
  });
  $("ul#about-content-div-center-ul li").click(function(){
  	$("ul#about-content-div-center-ul li[class=active]").attr("class","");
  	$(this).attr("class","active");
  	console.log($(this).attr("name"));
  	$("body article[id=about] div[name=about_content_div] div").attr("style","display:none;");
  	$("body article[id=about] div[name=about_content_div] div[id="+$(this).attr("name")+"]").attr("style","display:block;");
  });
}());