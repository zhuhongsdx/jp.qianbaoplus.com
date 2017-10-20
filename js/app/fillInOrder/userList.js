;(function($){
    var checkList = [];
    var checkListInfo = [];
    var urlHaveId = [];
    if(localStorage.getItem("checkList")!=null){
        checkListInfo = localStorage.getItem("checkList").split(",");
        checkList = localStorage.getItem("checkList").split(",");
    }else{
        if(localStorage.getItem("urlHaveId")!=null){
            urlHaveId = JSON.parse(localStorage.getItem("urlHaveId"));
            console.info(urlHaveId);
            if(urlHaveId.length>0){
                for(var i=0,len=urlHaveId.length;i<len;i++){
                    checkList.push(urlHaveId[i]);
                    // console.info(urlHaveId[i]);
                    localStorage.setItem("checkList",checkList);
                }
                //localStorage.get
                checkListInfo = localStorage.getItem("checkList").split(",");
            }
        }
        console.log(checkList);
        console.log(urlHaveId);
    }

    appendUserInfo(JSON.parse(localStorage.getItem('userList')));
    function  appendUserInfo(list) {
        $.each(list,function(index,val){
            console.log(val);
            var check = "";
            for(var i=0,len=checkListInfo.length;i<len;i++) {
                if (checkListInfo.length>0 && checkListInfo[i] == val.userIdx) {
                    check = "check";
                }
            }
            if($('user_id_'+val.userIdx).length==0){

                $(".wrap ul").append('<li data-code="' + val.userIdx + '" id="user_id_"'+val.userIdx+'><div class="userLi"><a class=' + check + ' href="javascript:;"></a>' +
                    '<b class="font-15 fontColor-333" data-code="' + val.idCard + '">' + val.userName + '</b>' +
                    '<p class="font-12">手机号：<span>' + val.cellphone + '</span></p>' +
                    '</div><div class="write"><img src="img/img_commoncontacts_edit.png" alt=""></div></li>');
            }

            /*if(val.deptList.length>0){
                list[index]['departmentIdx'] = val.deptList[0].departmentIdx;
                list[index]['departmentName'] = val.deptList[0].departmentName;
            }*/
        });
        //localStorage.setItem('userList',JSON.stringify(list));
        $(".Loading").hide();
    };


    //var checkList = [];
    var selfId = localStorage.getItem("selfId");
    $(".userLi").live("tap",function(){
        var this_ = $(this);
        var this_a = this_.find("a");
        var userIdx = this_.parent().attr("data-code");
        console.log(userIdx);

        if(this_a.hasClass("check")){
            console.info('hasClass');
            console.info(checkList);
            console.info(urlHaveId);
            _.remove(checkList, function(n) {
                return n  == userIdx;
            });
        }else{
            checkList.push(userIdx);
        }
        this_a.toggleClass("check");
        localStorage.setItem("checkList",checkList);
        //localStorage.setItem("urlHaveId",JSON.parse(urlHaveId));
    });
    console.log(checkList);

    $(".yes").on("tap",function(){
        $(".bg").hide();
        $(".yesNo").hide();
    });
    $(".no").on("tap",function(){
        $(".bg").hide();
        $(".yesNo").hide();
        window.location.href = "addUser.html";
    });

    $(".sure-btn").on("tap",function(){
        idCard();
    });

    //编辑乘机人
    $(".write").live("tap",function(){
        var userId = $(this).parents("li").attr("data-code");
        localStorage.setItem("userId",userId);

        localStorage.setItem("isAppend","0");
        window.location.href = "addUser.html?from=userList";
    })
})(Zepto);

var showName=[],urlId=[],urlHaveId=[];

//判断身份证信息是否缺失
function idCard(){
    var selfId = localStorage.getItem("selfId");
    if($(".check").size() > 0){
        showName=[];
        urlId=[];
        urlHaveId=[];
        $.each($(".check"),function (index,item) {
            var userIdCon = $(item).parents("li").attr("data-code"),
                idCardCon = $(item).next();
            console.log(idCardCon.attr('data-code'));
            if(idCardCon.attr('data-code') == '' || idCardCon.attr('data-code') == null){
                showName.push(idCardCon.text());
                urlId.push(userIdCon);
                //localStorage.setItem("urlId",urlId);
            }else{
                urlHaveId.push(userIdCon);
            }
            console.log(userIdCon);
            var index =_.findIndex(urlHaveId, function(chr) {
                return chr== selfId;
            });
            console.log(index);
            //if(index==-1 && localStorage.getItem("noApply") != null){
            if(index==-1){
                localStorage.removeItem("isAppendLogin");
            }else{
                localStorage.setItem("isAppendLogin","1");
            }
        });

        localStorage.setItem("isAppend","1");
        localStorage.setItem("urlId",urlId);
        localStorage.setItem("urlHaveId",JSON.stringify(urlHaveId));
        console.log(urlId);
        console.log(urlHaveId);
        if(showName.length>0){
            $(".bg").show();
            $(".yesNo").show();
            $(".userName").text(showName.join("、"));
        }else{
            window.location.href = "fill-in-order.html";
        }
    }else{
        $(".warnText").fadeIn('slow').find("p").text("请至少选择一位乘机人");
        setTimeout(fadeOut,2000);
        return false;
    }
}