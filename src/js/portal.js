//response for ul li click
(function() {
  if (localStorage.username != "null" && typeof localStorage.username != "undefined") {
    console.log("l:"+localStorage.username);
    $("ul#header-nav-content-menu2 li[name=login]").attr("style","display:none;");
    $("ul#header-nav-content-menu2 li[name=loginfo]").attr("style","display:inline;");
    $("ul#header-nav-content-menu2 li[name=loginfo] a").text(localStorage.username);
  } else if (sessionStorage.username != "null" && typeof sessionStorage.username != "undefined") {
    console.log("s:"+sessionStorage.username);
    $("ul#header-nav-content-menu2 li[name=login]").attr("style","display:none;");
    $("ul#header-nav-content-menu2 li[name=loginfo]").attr("style","display:inline;");
    $("ul#header-nav-content-menu2 li[name=loginfo] a").text(sessionStorage.username);
  }

  $("#login").hide();

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

  $("ul#header-nav-content-menu2 li[name=login]").click(function(){
    $("#login").show();
    console.log($(this).attr("name"));
    $('#login').dialog( 
    { 
      hide:true,  
      autoOpen:false, 
      // height:580, 
      // width:500, 
      modal:true,  
      // title:'开标人', 
      overlay: {opacity: 0.5, background: "black" ,overflow:'auto'} 
      // buttons:{ 
      //   '确定':function(){ 
      //   }, 
      //   '取消':function(){ 
      //     $(this).dialog("close"); 
      //   } 
      // } 
    });

    $("div.modal-myself div.modal-body div#login div.login-header a").click(function(){
      $('#mydialog').dialog('close');
    });

    $("div.modal-myself div.modal-body div#login div.login-content input[id=submit]").click(function(){
      var username_v = $("div.modal-myself div.modal-body div#login div.login-content input[id=username]").val();
      var password_v = $("div.modal-myself div.modal-body div#login div.login-content input[id=password]").val();
      var enablepw_v = $("div.modal-myself div.modal-body div#login div.login-content input[id=enablepw]").is(':checked') ? 1 : 0;
      if (username_v.length && password_v.length) {
        $("ul#header-nav-content-menu2 li[name=login]").attr("style","display:none;");
        $("ul#header-nav-content-menu2 li[name=loginfo]").attr("style","display:inline;");
        $("ul#header-nav-content-menu2 li[name=loginfo] a").text(username_v);
        $.post("../json/portal.json", { username: username_v, password: password_v, enablepw: enablepw_v },     
          function (data){          
            if (data.error) {
              $("div.modal-myself div.modal-body div#login div.login-content label[id=error_result]").text(data.error);
            } else {
              if (enablepw_v) {
                // $.cookie("username", username_v);
                localStorage.username = username_v; 
                // console.log(localStorage.username);
              } else {
                sessionStorage.username = username_v;
                // $.cookie("username", null);
                // localStorage.username = null;
              }
              $('#mydialog').dialog('close'); 
          }     
        }, "json");
      } else {
        $("div.modal-myself div.modal-body div#login div.login-content label[id=error_result]").text("用户名/密码不能为空!");
      }
      
    });
  });

  $("ul#header-nav-content-menu2 li[name=logout]").click(function(){
      // $.cookie("username", null);
      if (sessionStorage.username != "null" && typeof sessionStorage.username != "undefined") {
        sessionStorage.username = "null";
      } else if (localStorage.username != "null" && typeof localStorage.username != "undefined") {
        localStorage.username = "null";
      }
      
      $("ul#header-nav-content-menu2 li[name=loginfo] a").text("");
      $("ul#header-nav-content-menu2 li[name=loginfo]").attr("style","display:none;");
      $("ul#header-nav-content-menu2 li[name=login]").attr("style","display:inline;");     
  });

}());

