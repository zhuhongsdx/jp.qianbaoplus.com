;(function($){
    var token = getQueryString("cas_access_token"),
        appId = getQueryString("appId");
    if(token!=null) {
        localStorage.clear();
        localStorage.setItem("token",token);
    }else{
        token = localStorage.getItem("token");
    }
    if(appId!=null) {
        localStorage.setItem("appId",appId);
    }else{
        appId = localStorage.getItem("appId");
    }
    var reData = {
        "casToken": token,
        "appId": appId
    };
    regist();
    function regist(){
        $(".Loading").show();
        $(".bg").hide();
        $(".yesNo").hide();
        ajaxRequest({url:API.AIR_TICKER.REGISTER_TOKEN,data:reData},function(data){
            $(".Loading").hide();
            $(".wrapper").show();
            if(data.content.tokenStatus == 0 || data.content.tokenStatus == "0"){
                $(".bg").show();
                $(".yesNo").show().find("p").text("未授权!");
            }
            var casToken = data.content.casToken,
                casUserIdx = data.content.userIdx;
            localStorage.setItem("casUserIdx",casUserIdx);

            $(".air").on("tap",function(){
                window.location.href = "home.html?init=2&cas_access_token=" + casToken + "&appId=" + appId + "&casUserIdx=" + casUserIdx;
            });
        },function(data){
            $(".Loading").hide();
            $(".bg").show();
            $(".yesNo").show().find("p").text("未登录，请重新登录!");

        });
    }

    $(".yes").on("tap",function(){
        regist();
    });
    $(".bg").on("tap",function(){
        $(".bg").hide();
        $(".yesNo").hide();
    });

    $(".footer a").on("tap",function(){
        var this_ = $(this);
        this_.addClass("current").siblings().removeClass("current");
    });
})(Zepto);
