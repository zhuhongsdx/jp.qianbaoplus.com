;(function($){
    var fromUrl = getQueryString("from");
    console.log(fromUrl);
    var idCard = localStorage.getItem("identity_card");

    var userList = [];
    if(localStorage.getItem("userList") == null){
        userList.push(JSON.parse(localStorage.getItem("noApply")));
        localStorage.setItem("userList",JSON.stringify(userList));
    }

    //判断因公还是因私出行
    var causeType = JSON.parse(localStorage.getItem("causeType")),
        causeCode = causeType.causeCode;
    if(causeCode == "1"){//因公出行
        $(".gong").show();
        if(localStorage.getItem("casAppNo") == null){//无审批单
            $(".gong .arrow").show();

            $(".cancelDep").on("tap",function(){
                $(".bg").hide();
                $(".itemList").hide();
            });
            //成本中心选择
            $(".costing").on("tap",function(){
                $(".bg").show();
                $("#costing").show();
                 /*if($("#costList ul li").size()>5){
                    itemScroll("costList","#costList","0");
                }*/
                //window.location.href = "costSearch.html";
            });

            $("#costList div").live("tap",function () {
                $(".bg").hide();
                $("#costing").hide();
                var depText = $(this).html(),
                    depCodeText = $(this).attr("costCenterCode");
                $(".costCon").text(depText);
                $(".costCon").attr("data-code",depCodeText);
                $.each(userList,function(index,val) {
                    if (urlId[currentIndex] == val.userIdx) {
                        userList[index]['costCenterCode'] = depCodeText;
                        userList[index]['costCenterName'] = depText;
                    }
                });
                localStorage.setItem("userList",JSON.stringify(userList));
            });

            /*$("#costing .sureDep").on("tap",function(){
                $(".bg").hide();
                $("#costing").hide();
                var depText = $("#costing .selected").text(),
                    depCodeText = $("#costing .selected").attr("data-code");
                $(".costCon").text(depText);
                $(".costCon").attr("data-code",depCodeText);
                $.each(userList,function(index,val) {
                    if (urlId[currentIndex] == val.userIdx) {
                        userList[index]['costCenterCode'] = depCodeText;
                        userList[index]['costCenterName'] = depText;
                    }
                });
                localStorage.setItem("userList",JSON.stringify(userList));
            });*/
            //项目任务选择
            $(".task").on("tap",function(){
                $(".bg").show();
                $("#task").show();
                /*if($("#taskList ul li").size()>5){
                    itemScroll("taskList","#taskList","0");
                }*/
            });
            $("#taskList div").live("tap",function () {
                $(".bg").hide();
                $("#task").hide();
                var depText = $(this).html(),
                    depCodeText = $(this).attr("taskCode");
                $(".taskCon").text(depText);
                $(".taskCon").attr("data-code",depCodeText);
                $.each(userList,function(index,val) {
                    if (urlId[currentIndex] == val.userIdx) {
                        userList[index]['taskCode'] = depCodeText;
                        userList[index]['taskName'] = depText;
                    }
                });
                localStorage.setItem("userList",JSON.stringify(userList));
            });
            /*$("#task .sureDep").on("tap",function(){
                $(".bg").hide();
                $("#task").hide();
                var depText = $("#task .selected").text(),
                    depCodeText = $("#task .selected").attr("data-code");
                $(".taskCon").text(depText);
                $(".taskCon").attr("data-code",depCodeText);
                $.each(userList,function(index,val) {
                    if (urlId[currentIndex] == val.userIdx) {
                        userList[index]['key'] = depCodeText;
                        userList[index]['value'] = depText;
                    }
                });
                localStorage.setItem("userList",JSON.stringify(userList));
            });*/
            //费项选择
            $(".project").on("tap",function(){
                $(".bg").show();
                $("#project").show();
                if($("#projectList ul li").size()>5){
                    itemScroll("projectList","#projectList","0");
                }
            });
            $("#project .sureDep").on("tap",function(){
                $(".bg").hide();
                $("#project").hide();
                var depText = $("#project .selected").text(),
                    depCodeText = $("#project .selected").attr("data-code");
                $(".projectCon").text(depText);
                $(".projectCon").attr("data-code",depCodeText);
                $.each(userList,function(index,val) {
                    if (urlId[currentIndex] == val.userIdx) {
                        userList[index]['key'] = depCodeText;
                        userList[index]['value'] = depText;
                    }
                });
                localStorage.setItem("userList",JSON.stringify(userList));
            });
        }else{
            var casAppNo = localStorage.getItem("casAppNo"),
                casAppList = JSON.parse(localStorage.getItem("casAppList"));
            console.log(casAppNo);
            for(var i=0,len=casAppList.length;i<len;i++){
                if(casAppNo == casAppList[i].casApproveNo){
                    $(".costCon").text(casAppList[i].costCentername);
                    $(".costCon").attr("data-code",casAppList[i].costCenterCode);
                    $(".taskCon").text(casAppList[i].taskName);
                    $(".taskCon").attr("data-code",casAppList[i].taskCode);
                    $(".projectCon").text(casAppList[i].costItemName);
                    $(".projectCon").attr("data-code",casAppList[i].costItemCode);
                    if(casAppList[i].travelRequestReason==null){
                        $(".reason").html("").css("color", "#333");
                    }
                    else{
                        $(".reason").html(casAppList[i].travelRequestReason).css("color", "#333");
                    }

                    //$("#arrow").hide();

                    //var userList = JSON.parse(localStorage.getItem("userList"));
                    $.each(userList,function(index,val) {
                        if (casAppList[i].xyClientUserIndex == val.userIdx) {
                            userList[index]['costCenterCode'] = casAppList[i].costCenterCode;
                            userList[index]['costCenterName'] = casAppList[i].costCentername;
                            userList[index]['taskCode'] = casAppList[i].taskCode;
                            userList[index]['taskName'] = casAppList[i].taskName;
                            userList[index]['key'] = casAppList[i].costItemCode;
                            userList[index]['value'] = casAppList[i].costItemName;
                        }
                    });
                    localStorage.setItem("userList",JSON.stringify(userList));
                }
            }
        }
    }

    //判断是否走审批流程
    var orderID = localStorage.getItem("orderID");
    var noApply = {};
    var currentIndex = 0;
    /*var userList = [];
    userList.push(JSON.parse(localStorage.getItem("noApply")));
    localStorage.setItem("userList",JSON.stringify(userList));*/
    //if(orderID == "" || orderID == null){
    if(localStorage.getItem("casAppNo") == null){
        //$(".evection").text("商务会议");
        $(".evection").text(" ");
        //出差原因
        $("#arrow").show();
        $(".reason").on("tap",function(){
            window.location.href = "reason.html";
         });
        console.log(localStorage.getItem("selectCause"));
        if (localStorage.getItem("selectCause")) {
            $(".evection").html(localStorage.getItem("selectCause")).css("color", "#333");
        }else if(localStorage.getItem("selfCause")){
            $(".evection").html(localStorage.getItem("selfCause")).css("color", "#333");
        }
        /*else{
            $(".evection").html("商务会议");
            localStorage.setItem("selfCause","商务会议");
        }*/
        /*userList.push(JSON.parse(localStorage.getItem("noApply")));
        localStorage.setItem("userList",JSON.stringify(userList));*/
        //localStorage.setItem("cause",localStorage.getItem("selfCause"));
    }else{
    //证件选择
    /*if (localStorage.getItem("identity_card")) {
        $(".identity_card").val(localStorage.getItem("identity_card")).css("color", "#333");
    }*/

    //乘车人信息渲染
    /*$.ajax({
        type: 'POST',
        url: API.AIR_TICKER.LOGIN,
        contentType: 'application/json',
        dataType: 'json',
        success: function(data){
            console.info(data);
            if(data.status == 200){
                if(data.result['idCard'] != "" && $(".cardType").text() == "身份证"){
                    $(".identity_card").attr("value",data.result['idCard']);
                    /!*self.config.initIdCard = data.result['idCard'];
                    $(".identity_card").val(self.config.initIdCard);*!/
                }else{
                    $(".identity_card").attr("value",idCard);
                }
                $(".personName").text(data.result.userName);
                $(".phone").text(data.result.userPhone);
                $(".linkPhone").val(data.result.userPhone);
                localStorage.setItem("mobile",data.result.userPhone);

                var deptList = data.result.departmentList;
                var temp = _.find(deptList, function(chr) {
                    return chr.deptType=='1';
                });

                console.info(temp);
                if(temp!=undefined){
                    $(".personName").text(data.result.userName +" - "+ temp.departmentName);
                    $(".departCon").text(temp.departmentName);
                    $(".departCon").attr("data-code",temp.departmentIdx);
                    //localStorage.setItem("departmentName",temp.departmentName);
                    $("#departItem .before-and-after-selected").text(temp.departmentName);
                    $("#departItem .before-and-after-selected").attr("data-code",temp.departmentIdx);
                }else{
                    $(".personName").text(data.result.userName +" - "+ deptList[0].departmentName);
                    $(".departCon").text(deptList[0].departmentName);
                    $(".departCon").attr("data-code",deptList[0].departmentIdx);
                    //localStorage.setItem("departmentName",deptList[0].departmentName);
                    $("#departItem .selected").text(deptList[0].departmentName);
                    $("#departItem .selected").attr("data-code",deptList[0].departmentIdx);
                }

            }else{
                $(".warnText").fadeIn('slow').find("p").text(data.message);
                setTimeout(fadeOut,2000);
                return false;
            }
        },
        error: function(data){
            $(".warnText").fadeIn('slow').find("p").text(data.message);
            setTimeout(fadeOut,2000);
            return false;
        }
    });*/
        $(".evection").html(localStorage.getItem("cause")).css("color", "#333");
        //$("#arrow").hide();
    }

    var urlId = [],
        urlHaveId = JSON.parse(localStorage.getItem("urlHaveId"));
        console.info(urlHaveId);
        var userId = localStorage.getItem("userId");
        userList = JSON.parse(localStorage.getItem("userList"));
    console.log(userList);
        if(userId!=null){
            console.info('11');
            urlId.push(userId);
            initPersonInfo(userId);
        }else{
            console.info('2');
            if(localStorage.getItem("urlId") != null){
                urlId = localStorage.getItem("urlId");
                if(urlId.length > 1){
                    urlId = urlId.split(",");
                }
            }
            initPersonInfo(urlId[0]);
        }
    function initPersonInfo(userID) {
        console.info(currentIndex);
        $.each(userList,function(index,val){
            console.info(val);
            console.info(userID);
            console.log(val.userIdx)
            if(userID == val.userIdx){
                console.info(val);
                console.log(val.userIdx);
                console.log(val.idCard);
                /*if(data.result['idCard'] != "" && $(".cardType").text() == "身份证"){
                 $(".identity_card").attr("value",data.result['idCard']);
                 }else{
                 $(".identity_card").attr("value",idCard);
                 }*/

                var costList = val.costCenterList,
                    taskList = val.casTaskList,
                    projectList = val.costItemList,
                    deptList = val.deptList||val.departmentList;
                $(".personName").text(val.userName +" | "+ deptList[0].departmentName);
                $(".phone").text(val.cellphone||val.userPhone);
                //$(".identity_card").attr("data-code",val.userIdx);
                idCard = localStorage.getItem("identity_card");
                console.info(idCard);
                console.info(val.idCard);

                if(val.idCard == "" && idCard){
                    $(".identity_card").attr("value",idCard);
                }else{
                    console.info(val.idCard);
                    //$(".identity_card").attr("value",val.idCard);
                    $(".identity_card").val(val.idCard?val.idCard:'');
                }

                if(localStorage.getItem("casAppNo") == null){
                    $(".costCon").text(val.costCenterName);
                    $(".costCon").attr("data-code",val.costCenterCode);
                    $(".taskCon").text(val.taskName);
                    $(".taskCon").attr("data-code",val.taskCode);

                    if(localStorage.getItem('addUserCenter')){
                        var newStr=JSON.parse(localStorage.getItem('addUserCenter'));
                        $(".costCon").text(newStr.val);
                        $(".costCon").attr("data-code",newStr.code);
                    }
                    $(".projectCon").text(val.value);
                    $(".projectCon").attr("data-code",val.key);
                    $(".departCon").text(val.departmentName);
                    $(".departCon").attr("data-code",val.departmentIdx);

                    costing(costList);
                    task(taskList);
                    project(projectList);
                    departMent(deptList);
                }

                $("#costing .search").on("tap",function () {
                    var newVal=$("#costing .searchContent").val().trim();
                    console.log(newVal);
                    if(newVal==""){
                        costing(costList);
                        /*$("#costList").html("");
                        return;*/
                    }
                    $("#costList").html("");
                    for(var i=0;i<costList.length;i++){
                        if(costList[i].costCenterName.indexOf(newVal)>-1){
                            $("<div costCenterCode="+costList[i].costCenterCode+">"+costList[i].costCenterName+"</div>").appendTo("#costList")
                        }
                    }
                });

                $("#task .search").on("tap",function () {
                    var newVal=$("#task .searchContent").val().trim();
                    if(newVal==""){
                        task(taskList);
                        /*$("#taskList").html("");
                        return;*/
                    }
                    $("#taskList").html("");
                    for(var i=0;i<taskList.length;i++){
                        if(taskList[i].taskName.indexOf(newVal)>-1){
                            $("<div taskCode="+taskList[i].taskCode+">"+taskList[i].taskName+"</div>").appendTo("#taskList")
                        }
                    }
                });
                /*if(localStorage.getItem("depValue") == "" || localStorage.getItem("depValue") == null){
                 $(".departCon").text(val.deptList[0].departmentName);
                 $(".departCon").attr("data-code",val.deptList[0].departmentIdx);
                 }else{
                 $(".departCon").text(localStorage.getItem("depValue"));
                 $(".departCon").attr("data-code",localStorage.getItem("depCode"));
                 }

                 $(".selected").text(val.deptList[0].departmentName);
                 $(".selected").attr("data-code",val.deptList[0].departmentIdx);
                 if(val.deptList.length > 1){
                 $(".before-and-after-selected").text(val.deptList[1].departmentName);
                 $(".before-and-after-selected").attr("data-code",val.deptList[1].departmentIdx);
                 for(var i=2,len=val.deptList.length;i<len;i++){
                 $('<li data-code="'+ val.deptList[1].departmentIdx +'">'+ val.deptList[i].departmentName +'</li>').insertBefore($("#departList .addBefore"));
                 }
                 }*/
                /*var deptList = data.result.departmentList;
                 var temp = _.find(deptList, function(chr) {
                 return chr.deptType=='1';
                 });

                 console.info(temp);
                 if(temp!=undefined){
                 $(".personName").text(data.result.userName +" - "+ temp.departmentName);
                 $(".departCon").text(temp.departmentName);
                 $(".departCon").attr("data-code",temp.departmentIdx);
                 //localStorage.setItem("departmentName",temp.departmentName);
                 $("#departItem .before-and-after-selected").text(temp.departmentName);
                 $("#departItem .before-and-after-selected").attr("data-code",temp.departmentIdx);
                 }else{
                 $(".personName").text(data.result.userName +" - "+ deptList[0].departmentName);
                 $(".departCon").text(deptList[0].departmentName);
                 $(".departCon").attr("data-code",deptList[0].departmentIdx);
                 //localStorage.setItem("departmentName",deptList[0].departmentName);
                 $("#departItem .selected").text(deptList[0].departmentName);
                 $("#departItem .selected").attr("data-code",deptList[0].departmentIdx);
                 }*/
            }else{

            }
        });
    }
    //证件号码验证
    $(".identity_card").on("focus",function(){
        $(".identity_card").css("color","#333");
        $(".prompt").hide();
        if($(".cardType").text() == "身份证"){
            $(".identity_card").attr("maxlength","18");
        }else{
            $(".identity_card").attr("maxlength","21");
        }
    });
    //证件选择
    var shenfenNo = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x|X|x))$/,//身份证号码验证
        huzhaoNo = /^[a-zA-Z0-9]{3,21}$/,//护照验证
        gatNo = /^[a-zA-Z0-9]{5,21}$/;//港澳台验证
    $(".identity_card").on("blur",function(){
        var identityNo = $(".identity_card").val();
        if($(".cardType").text() == "身份证"){
            if(identityNo == ""){
                $(".prompt").hide();
            }else if(!shenfenNo.test(identityNo)){
                $(".prompt").show();
                return false;
            }
        }else if($(".cardType").text() == "护照"){
            if(identityNo == ""){
                $(".prompt").hide();
            }else if(!huzhaoNo.test(identityNo)){
                $(".prompt").show();
                return false;
            }
        }else{
            if(identityNo == ""){
                $(".prompt").hide();
            }else if(!gatNo.test(identityNo)){
                $(".prompt").show();
                return false;
            }
        }
    });
    //保存身份证信息
    $(".identity_card").on('keyup', function() {
        localStorage.setItem("identity_card", $(this).val());
    });

    $(".prompt").on("tap",function(){
        $(".prompt").hide();
    });

    //选择成本中心归属
    function costing(data){
        /*$("#costList .selected").text(data[0].costCenterName);
        $("#costList .selected").attr("data-code",data[0].costCenterCode);
        if(data.length > 1){
            $("#costList .before-and-after-selected").text(data[1].costCenterName);
            $("#costList .before-and-after-selected").attr("data-code",data[1].costCenterCode);
            for(var i=2,len=data.length;i<len;i++){
                $('<li data-code="'+ data[i].costCenterCode +'">'+ data[i].costCenterName +'</li>').insertBefore($("#costList .addBefore"));
            }
            $("#costList ul").append('<li></li>');
        }*/
        $("#costList").html("");
        for(var i=0;i<data.length;i++){
            $("<div costCenterCode="+data[i].costCenterCode+">"+data[i].costCenterName+"</div>").appendTo("#costList");
        }
    }

    //选择项目任务归属
    function task(data){
        /*$("#taskList .selected").text(data[0].taskName);
        $("#taskList .selected").attr("data-code",data[0].taskCode);
        if(data.length > 1){
            $("#taskList .before-and-after-selected").text(data[1].taskName);
            $("#taskList .before-and-after-selected").attr("data-code",data[1].taskCode);
            for(var i=2,len=data.length;i<len;i++){
                $('<li data-code="'+ data[i].taskCode +'">'+ data[i].taskName +'</li>').insertBefore($("#taskList .addBefore"));
            }
            $("#taskList ul").append('<li></li>');
        }*/
        $("#taskList").html("");
        for(var i=0;i<data.length;i++){
            $("<div taskCode="+data[i].taskCode+">"+data[i].taskName+"</div>").appendTo("#taskList");
        }
    }

    //选择费项归属
    function project(data){
        $("#projectList .selected").text(data[0].value);
        $("#projectList .selected").attr("data-code",data[0].key);
        if(data.length > 1){
            $("#projectList .before-and-after-selected").text(data[1].value);
            $("#projectList .before-and-after-selected").attr("data-code",data[1].key);
            for(var i=2,len=data.length;i<len;i++){
                $('<li data-code="'+ data[i].key +'">'+ data[i].value +'</li>').insertBefore($("#projectList .addBefore"));
            }
            $("#projectList ul").append('<li></li>');
        }
    }

    //选择费用归属
    function departMent(data){
        /*if(localStorage.getItem("depValue") == "" || localStorage.getItem("depValue") == null){
            $(".departCon").text(data[0].departmentName);
            $(".departCon").attr("data-code",data[0].departmentIdx);
        }else{
            $(".departCon").text(localStorage.getItem("depValue"));
            $(".departCon").attr("data-code",localStorage.getItem("depCode"));
        }*/

        $("#departList .selected").text(data[0].departmentName);
        $("#departList .selected").attr("data-code",data[0].departmentIdx);
        if(data.length > 1){
            $("#departList .before-and-after-selected").text(data[1].departmentName);
            $("#departList .before-and-after-selected").attr("data-code",data[1].departmentIdx);
            for(var i=2,len=data.length;i<len;i++){
                $('<li data-code="'+ data[i].departmentIdx +'">'+ data[i].departmentName +'</li>').insertBefore($("#departList .addBefore"));
            }
            $("#departList ul").append('<li></li>');
        }
    }

    function itemScroll(item,itemID,val){
        item = new IScroll(itemID,{
            bounceEasing: "ease",
            bounceTime: 10,
            snap: "li"
        });

        item.scrollToIng = true;
        item.scrollTo(0, val, 0, IScroll.utils.ease.circular);
        item.on("scrollEnd", function () {
            var y = this.y;
            var offset = Math.round(y / 30);
            var li_list = $(itemID + " ul").find("li");
            li_list.removeClass("selected before-and-after-selected");
            li_list.eq(Math.abs(offset)+2).addClass("selected");
            li_list.eq(Math.abs(offset)+1).addClass("before-and-after-selected");
            li_list.eq(Math.abs(offset)+3).addClass("before-and-after-selected");
        });
        item.onRefresh();
        
    }

    //费用归属选择
    $(".department").on("tap",function(){
        $(".bg").show();
        $("#department").show();
        if($("#departList ul li").size()>5){
            itemScroll("departList","#departList","0");
        }
    });
    /*$(".cancelDep").on("tap",function(){
     $(".bg").hide();
     $("#departItem").hide();
     });*/
    $("#department .sureDep").on("tap",function(){
        $(".bg").hide();
        $("#department").hide();
        var depText = $("#department .selected").text(),
            depCodeText = $("#department .selected").attr("data-code");
        $(".departCon").text(depText);
        $(".departCon").attr("data-code",depCodeText);
        localStorage.setItem("depValue",depText);
         localStorage.setItem("depCode",depCodeText);
        $.each(userList,function(index,val) {
            console.info(index);
            if (urlId[currentIndex] == val.userIdx) {
                userList[index]['departmentIdx'] = depCodeText;
                userList[index]['departmentName'] = depText;
            }
        });
        localStorage.setItem("userList",JSON.stringify(userList));
    });

    //确定新增的乘机人
    $(".sure-btn").on("tap",function(){
        //验证证件号码是否合法
        var identityNo = $(".identity_card").val();
        if($(".cardType").text() == "身份证"){
            if(identityNo == ""){
                $(".prompt").text("请输入证件号码").show();
                return false;
            }else if(!shenfenNo.test(identityNo)){
                $(".prompt").text("您输入的证件号码有误").show();
                return false;
            }else{
                localStorage.setItem("identity_card",identityNo);
               // if(orderID != "" && orderID != null){
                    for(var i=0,len=userList.length;i<len;i++){
                        if(userList[i].userIdx == urlId[currentIndex]){
                            userList[i].idCard =identityNo;
                        }
                    }
                    localStorage.setItem('userList',JSON.stringify(userList));
                    console.info('aaaaaaaaaaaaaaaaa');
                //}else{
                //    noApply.idCard = identityNo;
                //    localStorage.setItem("noApply",JSON.stringify(noApply));
               // }

                /*if(urlHaveId.length>0){
                    var index =_.findIndex(urlHaveId, function(chr) {
                        return chr== userId;
                    });
                    if(index==-1){
                        urlHaveId.push(userId);
                    }
                }else{
                    urlHaveId.push(userId);
                }
                $.each(userList,function(index,val){
                    if(userId[currentIndex] == val.userIdx){
                        val.idCard = identityNo;
                    }
                });*/
            }
        }else if($(".cardType").text() == "护照"){
            if(identityNo == ""){
                $(".prompt").hide();
            }else if(!huzhaoNo.test(identityNo)){
                $(".prompt").show();
                return false;
            }
        }else{
            if(identityNo == ""){
                $(".prompt").hide();
            }else if(!gatNo.test(identityNo)){
                $(".prompt").show();
                return false;
            }
        }

        var selCause = $(".evection").text();
        console.log(selCause);
        // if(selCause == " "){
        //     $(".warnText").fadeIn('slow').find("p").text("请选择出差原因");
        //     setTimeout(fadeOut,2000);
        //     return false;
        // }else{
            localStorage.setItem("selfCause",selCause);
            localStorage.setItem("cause",selCause);
        // }

        console.info(urlHaveId);
        console.info(userList);
        if(localStorage.getItem("isAppend")!='0'){
            if(urlHaveId.length>0){
                var index =_.findIndex(urlHaveId, function(chr) {
                    return chr== urlId[currentIndex];
                });
                if(index==-1){
                    urlHaveId.push(urlId[currentIndex]);
                }
            }else{
                urlHaveId.push(urlId[currentIndex]);
                console.log(urlHaveId);
            }
            localStorage.setItem("urlHaveId",JSON.stringify(urlHaveId));
        }

        $.each(userList,function(index,val){
            if(urlId[currentIndex] == val.userIdx){
                val.idCard = identityNo;
            }
        });

        console.info((urlId.length-1));

        console.info(currentIndex);
        if((urlId.length==0?0:(urlId.length-1))==currentIndex){
            //localStorage.setItem("userList",JSON.stringify(userList));
            //localStorage.setItem("urlHaveId",urlHaveId);
            console.info('bbbbbbbbbbbbbbbbb');
            localStorage.removeItem("urlId");
            localStorage.removeItem("userId");
            localStorage.removeItem("isAppend");

            if(fromUrl != null){
                window.location.href = "userList.html";
            }else{
                window.location.href = "fill-in-order.html";
            }
        }else{
            localStorage.removeItem("identity_card");
            currentIndex=currentIndex+1;
            initPersonInfo(urlId[currentIndex]);
        }
    });

    $(".goBack").on("tap",function(){
        window.history.back();
    });
})(Zepto);
