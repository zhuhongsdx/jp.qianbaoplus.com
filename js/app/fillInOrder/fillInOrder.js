var sumbitInfo ={};
var globalStatus ="";//全局状态
var isOrderClick = true;
var globalStatusText = "行程单审批不通过,请重新审批";
var userInsureList ="userInsureList";
var insureObject ={
    '0':{"insurePrice":"","insureCode":"","insureCodeBack":""},
    '1':{"insurePrice":"","insureCode":"","insureCodeBack":""},
    '2':{"insurePrice":"","insureCode":"","insureCodeBack":""}
};
var fill = {
    config: {
        localStart: "localStart",
        localEnd: "localEnd",
        personName: "personName",
        jouryType: "jouryType",
        queryFlowNo: "queryFlowNo",
        remark: "remark",
        cause: "cause",
        identity_card: "identity_card",
        initIdCard:'',
        passage: "passage",
        result: "",
        resultBack: "",
        Html: '<div id="{route}" class="order-info-list">' +
        '<div>' +
        '<div class="{direction}">{goText}</div>' +
        '<div class="order-info-gotime">' +
        '<p class="font-12 fontColor-999 flightDate" data-code="{flightDate}">{date}</p>' +
        '<p class="font-22 fontColor-333">{beginTime}</p>' +
        '<p class="font-12 fontColor-666 departAirport" data-code="{departAirport}">{departAirportNameDepartTerminal}</p>' +
        '</div>' +
        '<div class="order-info-middtime">' +
        '<img style="width:6rem;margin-top:0.8rem;" src="./img/img_time_consuming_plane.png" alt=""/>' +
        '<div style="text-align: center;">' +
        '<img class="icon-clock" src="./img/img_time_consuming_clock.png" alt=""/>' +
        '<span class="flytime font-10-m fontColor-999">{diffTime}</span>' +
        '</div>' +
        '</div>' +
        '<div class="order-info-backtime">' +
        '<p class="font-12 fontColor-999">{dateArrive}</p>' +
        '<p class="font-22 fontColor-333">{endTime}</p>' +
        '<p class="font-12 fontColor-666 arriveAirport" data-code="{arriveAirport}">{arriveAirportNameArriveTerminal}</p>' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '<div class="order-info-price">' +
        '<div class="flightListBottom font-12 fontColor-999">' +
        '<img src="./img/logo/{carrierCode}.png" alt=""/>' +
        '<span class="flightNo" data-code="{carrierCode}" data-num="{flightNo}">{carrierNameFlightNo}</span><span class="planeType">{planeType}</span><span class="mealCode">{mealCode}</span>' +
        '<em><a href="javascript:;" class="font-17 fontColor-ff6 price" data-code="{cabinCode}">{price}</a><a href="javascript:;" class="font-15 fontColor-ff6" style="margin-left: 3px;">元</a></em>' +
        '</div>' +
        '</div>' +
        '<div class="order-detail-switch" style="padding-bottom: 0.5rem;">' +
        '<a href="javascript:;" class="look-info font-12">查看退改签</a>' +
        '</div>' +
        '</div>' +
        '<img style="width:100%;" src="./img/img_redBG.png" alt=""/>' +
        '</div>'
    },
    init: function() {
        var self = this;
        self.loadHtml();
        self.eventFn();
    },
    //生成模板
    loadHtml: function() {
        var self = this;
        var tpl = "";
        var item = {};
        var itemBack = {};
        self.config.result = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.localStart)));
        console.log(self.config.result);

        var mealCode;
        if(self.config.result.mealCode != "" && self.config.result.mealCode != null){
            mealCode = "有餐食";
        }else{
            if(self.config.result.mealCode == ""){
                mealCode = "无餐食";
            }else{
                mealCode = "null";
            }
        }

        if(localStorage.getItem(self.config.jouryType) == "RT") {
            item = {
                direction: "direction-go font-12 fontColor-49b",
                goText: "去程",
                route: "go_channel",
                flightDate: self.config.result.departureDate,
                date: self.config.result.dateDay,
                beginTime: switchTime(self.config.result.beginTime),
                arriveAirport: self.config.result.arriveAirport,
                arriveAirportNameArriveTerminal: self.config.result.arriveAirportName + self.config.result.arriveTerminal,
                diffTime: self.config.result.diffTime,
                carrierCode:self.config.result.carrierCode,
                flightNo:self.config.result.flightNo,
                carrierNameFlightNo: self.config.result.carrierName + " " + self.config.result.carrierCode + self.config.result.flightNo,
                planeType:self.config.result.planeType,
                mealCode: mealCode,
                dateArrive: self.config.result.endDay,
                endTime: switchTime(self.config.result.endTime),
                departAirport: self.config.result.departAirport,
                departAirportNameDepartTerminal: self.config.result.departAirportName + self.config.result.departTerminal,
                cabinCode:self.config.result.freightList[self.config.result.countIndex].cabinCode,
                price:self.config.result.freightList[self.config.result.countIndex].cabinPrice
            };
        }else{
            item = {
                direction: "",
                goText: "",
                route: "",
                flightDate: self.config.result.departureDate,
                date: self.config.result.dateDay,
                beginTime: switchTime(self.config.result.beginTime),
                arriveAirport: self.config.result.arriveAirport,
                arriveAirportNameArriveTerminal: self.config.result.arriveAirportName + self.config.result.arriveTerminal,
                diffTime: self.config.result.diffTime,
                carrierCode:self.config.result.carrierCode,
                flightNo:self.config.result.flightNo,
                carrierNameFlightNo: self.config.result.carrierName + " " + self.config.result.carrierCode + self.config.result.flightNo,
                planeType:self.config.result.planeType,
                mealCode: mealCode,
                dateArrive: self.config.result.endDay,
                endTime: switchTime(self.config.result.endTime),
                departAirport: self.config.result.departAirport,
                departAirportNameDepartTerminal: self.config.result.departAirportName + self.config.result.departTerminal,
                cabinCode:self.config.result.freightList[self.config.result.countIndex].cabinCode,
                price:self.config.result.freightList[self.config.result.countIndex].cabinPrice
            };
        }
        tpl += BASE.lang.sub(self.config.Html, item);
        if (localStorage.getItem(self.config.jouryType) == "RT") {
            self.config.resultBack = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.localEnd)));
            console.log(self.config.resultBack);

            var mealCodeBack;
            if(self.config.resultBack.mealCode != "" && self.config.resultBack.mealCode != null){
                mealCodeBack = "有餐食";
            }else{
                if(self.config.resultBack.mealCode == ""){
                    mealCodeBack = "无餐食";
                }else{
                    mealCodeBack = "null";
                }
            }

            itemBack = {
                goText: "返程",
                direction: "direction-back font-12 fontColor-ffb",
                route: "back_channel",
                flightDate: self.config.resultBack.departureDate,
                date: self.config.resultBack.dateDay,
                beginTime: switchTime(self.config.resultBack.beginTime),
                arriveAirport: self.config.resultBack.arriveAirport,
                arriveAirportNameArriveTerminal: self.config.resultBack.arriveAirportName + self.config.resultBack.arriveTerminal,
                diffTime: self.config.resultBack.diffTime,
                carrierCode:self.config.resultBack.carrierCode,
                flightNo:self.config.resultBack.flightNo,
                carrierNameFlightNo: self.config.resultBack.carrierName + " " + self.config.resultBack.carrierCode + self.config.resultBack.flightNo,
                planeType:self.config.resultBack.planeType,
                mealCode: mealCodeBack,
                dateArrive: self.config.resultBack.endDay,
                endTime: switchTime(self.config.resultBack.endTime),
                departAirport: self.config.resultBack.departAirport,
                departAirportNameDepartTerminal: self.config.resultBack.departAirportName + self.config.resultBack.departTerminal,
                cabinCode:self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinCode,
                price:self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinPrice
            };
            tpl += BASE.lang.sub(self.config.Html, itemBack);
        }
        $(".airportMessage").html(tpl);

        //判断是否有机型和餐食
        $.each($(".planeType"),function(index,val){
            var this_ = $(this);
            console.log(this_.text());
            if(this_.text() == "null"){
                this_.hide();
            }
        });
        $.each($(".mealCode"),function(index,val){
            var this_ = $(this);
            if(this_.text() == "null"){
                this_.hide();
            }
        });
    },
    eventFn: function() {
        //zhf审批单号
        var casAppNo = localStorage.getItem("casAppNo");
        console.log(casAppNo);
        if(casAppNo == null){
            casAppNo = "";
            $(".approvalNo").hide();
        }else{
            $(".approvalNo").show().find("span").text(casAppNo);
        }
        var sPlace = JSON.parse(localStorage.getItem("sPlace")).startPlace;
        var sEnd = JSON.parse(localStorage.getItem("sEnd")).endPlace;

        var orderID = localStorage.getItem("orderID");
        console.log(orderID);
        var self = this;
        var isAppendLogin = localStorage.getItem("isAppendLogin");
        var channelFlag = self.config.result.freightList[self.config.result.countIndex].channelFlag,
            insureData = {"channelType":channelFlag},
            channelFlagBack = "",
            insureDataBack = "";
        if(localStorage.getItem(self.config.jouryType) == "RT"){
            channelFlagBack = self.config.resultBack.freightList[self.config.resultBack.countIndex].channelFlag;
            insureDataBack = {"channelType":channelFlagBack};
        }
        console.log(insureData);
        console.log(insureDataBack);
        var noApply = [];
        var mobile = [];
        console.log(localStorage.getItem("noApply"));
        if(localStorage.getItem("noApply") != null){
            noApply = JSON.parse(localStorage.getItem("noApply"));
        }
        if(localStorage.getItem("mobile") != null){
            mobile = localStorage.getItem("mobile");
        }
        console.log(noApply);
        function template(){
            //获取联系人手机号
            if(noApply == undefined || noApply == ""){
                console.info(noApply);
                $.ajax({
                    type: 'POST',
                    //url: API.AIR_TICKER.LOGIN,
                    url: API.AIR_TICKER.REGISTER_TOKEN,//获取乘机人信息接口
                    contentType: 'application/json',
                    data: JSON.stringify({"casToken": token,"appId": appId}),
                    dataType: 'json',
                    success: function(data){
                        console.info(data);
                        if(data.status == 200){
                            /*if(data.result['idCard'] != "" && $(".cardType").text() == "身份证"){
                             //$(".identity_card").attr("value",data.result['idCard']);
                             self.config.initIdCard = data.result['idCard'];
                             $(".identity_card").val(self.config.initIdCard);
                             }else{
                             $(".identity_card").attr("value",idCard);
                             }
                             $(".personName").text(data.result.userName);
                             $(".phone").text(data.result.userPhone);*/

                            if(data.content.costCenterList.length>0){
                                data.content['costCenterCode'] = data.content.costCenterList[0].costCenterCode;
                                data.content['costCenterName'] = data.content.costCenterList[0].costCenterName;
                            }
                            if(data.content.casTaskList.length>0){
                                data.content['taskCode'] = data.content.casTaskList[0].taskCode;
                                data.content['taskName'] = data.content.casTaskList[0].taskName;
                            }
                            if(data.content.costItemList.length>0){
                                data.content['key'] = data.content.costItemList[0].key;
                                data.content['value'] = data.content.costItemList[0].value;
                            }
                            if(data.content.departmentList.length>0){
                                data.content['departmentIdx'] = data.content.departmentList[0].departmentIdx;
                                data.content['departmentName'] = data.content.departmentList[0].departmentName;
                            }

                            if(casAppNo != null){
                                var casAppList = "";
                                if(localStorage.getItem("casAppList") != null){
                                    casAppList = JSON.parse(localStorage.getItem("casAppList"));
                                }
                                for(var i=0,len=casAppList.length;i<len;i++){
                                    if (casAppList[i].casApproveNo == casAppNo) {
                                        data.content['costCenterCode'] = casAppList[i].costCenterCode;
                                        data.content['costCenterName'] = casAppList[i].costCentername;
                                        data.content['taskCode'] = casAppList[i].taskCode;
                                        data.content['taskName'] = casAppList[i].taskName;
                                        data.content['key'] = casAppList[i].costItemCode;
                                        data.content['value'] = casAppList[i].costItemName;
                                    }
                                }
                            }
                            console.log(data.content);
                            $(".linkPhone").val(data.content.userPhone);
                            $(".selfPhone").text(data.content.userPhone);
                            console.log(mobile);
                            localStorage.setItem("selfId",data.content.userIdx);

                            //没审批流程时的乘机人
                            if(isAppendLogin == 1){
                                localStorage.setItem("noApply",JSON.stringify(data.content));
                                localStorage.setItem("mobile",data.content.userPhone);
                                localStorage.setItem("urlHaveId",JSON.stringify([data.content.userIdx]));
                                //haveOrNotInsure([data.content.userIdx]);
                                appendPeopleAndInsure(data.content);
                            }
                            showOrHideDel();
                            //appendInsureData();
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
                });
            }else{
                $(".linkPhone").val(mobile);
                $(".selfPhone").text(mobile);
                if(isAppendLogin == 1){
                    appendPeopleAndInsure(noApply);
                    localStorage.setItem("urlHaveId",JSON.stringify([noApply.userIdx]));
                    //haveOrNotInsure([noApply.userIdx]);
                }
                showOrHideDel();
            }

            //走审批时获取出差原因
            if(orderID != "" && orderID != null){
                if(localStorage.getItem("userList")==null){
                    $.get(baseUrl + "xingyun/v1/app/getOrderDetailByApply?access_token="+ token +"&orderUuid="+ orderID,function (data){
                        data = JSON.parse(data);
                        console.log(data);
                        console.log(data.result.followUserList);
                        var list = data.result.followUserList;
                        $.each(list,function(index,val){
                            if(val.deptList.length>0){
                                list[index]['departmentIdx'] = val.deptList[0].departmentIdx;
                                list[index]['departmentName'] = val.deptList[0].departmentName;
                            }
                        });
                        localStorage.setItem("cause",data.result.reason);
                        localStorage.setItem("userList",JSON.stringify(data.result.followUserList));
                    })
                }
            }else{
                if (localStorage.getItem("selfCause")) {
                    localStorage.setItem("cause",localStorage.getItem("selfCause"));
                }
            }

            //appendInsureData();
        }

        //判断是否有保险,zhf没有，但怕后期会加
        function haveOrNotInsure(insureUserList){
            console.log(insureUserList);
            var logRequestList = {url:API.AIR_TICKER.FLIGHT_RULES_DETAIL,"clientUserIndexList":insureUserList};
            logRequest(logRequestList);
            ajaxRequest({url:API.AIR_TICKER.FLIGHT_RULES_DETAIL,data:{"clientUserIndexList":insureUserList}},function(data){
                console.log(data.content);
                if(data.content == null){
                    $(".canBuy").show();
                    $(".canNotBuy").hide();
                    $(".order-detail-insure").attr("data-insure","1");
                    /*var userInsure ={};
                    for(var index=0,len=insureUserList.length;index<len;index++){
                        userInsure[insureUserList[index]]={"isSure":"1","userId":insureUserList[index]};
                    }
                    localStorage.setItem(userInsureList,JSON.stringify(userInsure));*/

                }else{
                    var flightRulesDetailItemList = data.content.flightRulesDetailItemList;
                    var notHaveIdIndex = [];

                    var userInsure = JSON.parse(localStorage.getItem(userInsureList));
                    $.each($(".order-detail-insure"),function(index,val){
                        var isHave = false;
                        console.log($(val).attr("data-code"));
                        var this_ = $(val),
                            userIndex = this_.attr("data-code");

                        $.each(flightRulesDetailItemList,function(n,v){
                            if(userIndex == v.clientUserIndex ){
                                if(!v.enterpriseBuyInsurance){
                                    this_.find(".canBuy").hide();
                                    this_.find(".canNotBuy").show();
                                    this_.attr("data-insure","0");
                                }
                                else{
                                    this_.find(".canBuy").show();
                                    this_.find(".canNotBuy").hide();
                                    this_.attr("data-insure","1");
                                }
                                isHave = true;
                            }
                        });
                        if(!isHave){
                            notHaveIdIndex.push(index);
                        }
                    });

                    if(notHaveIdIndex.length>0){
                        for(var index=0,len=notHaveIdIndex.length;index<len;index++){
                            var this_= $(".order-detail-insure").eq(notHaveIdIndex[index]);
                            this_.find(".canBuy").show();
                            this_.find(".canNotBuy").hide();
                            this_.attr("data-insure","1");
                        }
                    }
                }
            })
        }

        //乘机人、保险渲染
        function appendPeopleAndInsure(val){
            console.log(val);
            $("#userList").append('<li style="height: 5.3rem;border-top: 1px solid #ddd;margin-right: 1rem;padding-top: 0.2rem;">'+
                '<div class="del" data-code="'+ val.userIdx +'"><img src="img/delete.png" alt=""></div><div class="userInfo">'+
                '<p><b>姓名</b><span>'+ val.userName +'</span></p>'+
                '<p><b>证件号</b><span>身份证/'+ val.idCard +'</span></p>'+
                '<img src="./img/img_rightarrow.png" alt=""/></div></li>');

            var high = "high";
            var dataInsure = "1";
            if(localStorage.getItem(userInsureList)!=null){
                var userInsure = JSON.parse(localStorage.getItem(userInsureList));
                if(userInsure[val.userIdx] && userInsure[val.userIdx]["isSure"]=="false"){
                    high ="";
                    dataInsure = "2";
                }
            }

            $(".insureList").append('<li class="order-detail-insure" data-code="'+ val.userIdx +'" id="insure_'+ val.userIdx +'"><label>航空意外险</label>'+
                '<div class="yiwaixian canBuy"><a href="javascript:;"><img class="yiwai-pic" style="width:1.2rem;vertical-align: middle;margin-top:-5px;" src="./img/img__wenhao.png" alt=""/></a><span class="fontColor-ff6 font-14" style="margin-left: 6px;"><b class="insure" style="font-weight:normal;"></b>元</span>'+
                '<div class="btn"><label class="'+high+'"></label></div></div>'+
                '<div class="yiwaixian canNotBuy"><p>该员工无法购买保险</p></div></li>');
            //if(localStorage.getItem(userInsureList)!=null){
                $(".canBuy").show();
                $(".order-detail-insure").attr("data-insure",dataInsure);
            //}

            $(".insure").text(localStorage.getItem("insure"));
        }

        //获取保险金额
        function appendInsureData() {
            $(".bg").show();
            $(".waiting").show();
            var canBuyInsure = true;
            var logInsureData =$.extend({url:API.AIR_TICKER.INSURANCE_LIST},insureData);
            logRequest(logInsureData);
            ajaxRequest({url:API.AIR_TICKER.INSURANCE_LIST,data:insureData},function(data){
                console.log(data.content[0].insurancePrice);
                if(data.content[0] != undefined){
                    localStorage.setItem("insure",data.content[0].insurancePrice);
                    localStorage.setItem("insureCode",data.content[0].insuranceCode);
                    insureObject['1'].insurePrice =data.content[0].insurancePrice;
                    insureObject['1'].insureCode =data.content[0].insuranceCode;
                }else{
                    canBuyInsure = false;
                    $(".order-detail-insure").find(".canNotBuy").show();
                }
                $(".bg").hide();
                $(".waiting").hide();
            });
            if(localStorage.getItem(self.config.jouryType) == "RT" && canBuyInsure){
                var logInsureDataBack =$.extend({url:API.AIR_TICKER.INSURANCE_LIST},insureDataBack);
                logRequest(logInsureDataBack);
                ajaxRequest({url:API.AIR_TICKER.INSURANCE_LIST,data:insureDataBack},function(data){
                    if(data.content[0] != undefined){

                        insureObject['1'].insureCodeBack =data.content[0].insuranceCode;
                        localStorage.setItem("insureCodeBack",data.content[0].insuranceCode);
                    }else{
                        $(".order-detail-insure").find(".canNotBuy").show();
                    }
                    $(".bg").hide();
                    $(".waiting").hide();
                })
            }
        }
        appendInsureData();

        //保险按钮开关事件
        var userInsure ={};
        $(".btn").live("tap",function(){
            var this_ = $(this);
            var userId = this_.parents(".order-detail-insure").attr("data-code");
            var label = this_.find("label");
            var dataInsure = label.hasClass("high")?"2":"1";
            var price = label.hasClass("high")?"0":localStorage.getItem("insure");
            var high = label.hasClass("high")?"false":"true";
            console.log(high);
            label.toggleClass("high");
            this_.parents(".order-detail-insure").attr("data-insure",dataInsure);
            userInsure[userId]={"isSure":high,"userId":userId,"insurePrice":price};
            localStorage.setItem(userInsureList,JSON.stringify(userInsure));
        });

        var userList = [],
            urlHaveId = [];
        if(localStorage.getItem("userList")==null){
            template();
        }else{
            $(".linkPhone").val(localStorage.getItem("mobile"));
            //渲染乘机人
            if(localStorage.getItem("userList")!=null){
                userList = JSON.parse(localStorage.getItem("userList"));
            }
            if(localStorage.getItem("urlHaveId")!=null){
                urlHaveId = JSON.parse(localStorage.getItem("urlHaveId"));
                var newUrlHaveId = [];
                if(localStorage.getItem(userInsureList)!=null){
                    var userInsureObject = JSON.parse(localStorage.getItem(userInsureList));
                    for(var i=0,len=urlHaveId.length;i<len;i++){
                        if(!userInsureObject[urlHaveId[i]]){
                            newUrlHaveId.push(urlHaveId[i]);
                        }
                    }
                    if(newUrlHaveId.length>0){
                        //haveOrNotInsure(newUrlHaveId);
                    }
                }else{
                    //haveOrNotInsure(urlHaveId);
                }
            }
            console.log(userList);
            console.log(urlHaveId);
            $.each(userList,function(index,val){
                for(var i=0,len=urlHaveId.length;i<len;i++){
                    if(urlHaveId[i] == val.userIdx){
                        appendPeopleAndInsure(val);
                    }
                }
            });
            $(".selfPhone").text(mobile);
            showOrHideDel();
            //appendInsureData();
        }

        //判断是否走审批流程
        function showOrHideDel(){
            if(orderID != "" && orderID != null){
                $(".addUser").show();
                $(".linkPhone").show();
            }else{
                $(".addUser").hide();
                $(".selfPhone").show();
                $(".del").hide();
                $(".userInfo").css("margin-left","1rem");
            }
        }

        var cardType = localStorage.getItem("cardType"),
            dataCode = localStorage.getItem("code");
        if(cardType != "身份证" && cardType != undefined){
            $(".cardType").text(cardType);
            $(".cardType").attr("data-code",dataCode);
            $(".sexLine").show();
            $(".birthdayLine").show();
        }else{
            $(".cardType").text("身份证");
            $(".cardType").attr("data-code","NI");
            $(".sexLine").hide();
            $(".birthdayLine").hide();
        }

        /*$(".identity_card").on("focus",function(){
         $(".identity_card").val("").css("color","#333");
         $(".prompt").hide();
         if($(".cardType").text() == "身份证"){
         $(".identity_card").attr("maxlength","18");
         }else{
         $(".identity_card").attr("maxlength","21");
         }
         });
         $(".prompt").on("tap",function(){
         $(".prompt").hide();
         });*/

        //联系人手机号
        $(".linkPhone").on("focus",function(){
            $(".linkPhone").val("").css("color","#333");
            $(".promptF").hide();
        });
        $(".promptF").on("tap",function(){
            $(".promptF").hide();
        });

        var ifMobile = /^1[3|4|5|7|8][0-9]\d{8}$/;
        $(".linkPhone").on("blur",function(){
            var link = $(".linkPhone").val();
            if(link == ""){
                $(".promptF").hide();
            }else if(!ifMobile.test(link)){
                $(".promptF").text("您输入的手机号码有误").show();
            }else{
                localStorage.setItem("mobile",link);
            }
        });
        //添加乘机人
        $(".addUser").on("tap",function(){
            localStorage.removeItem("identity_card");
            localStorage.removeItem("checkList");
            window.location.href = "userList.html";
        });

        $(".userInfo").live("tap",function(){
            var userId = $(this).prev().attr("data-code");
            localStorage.setItem("userId",userId);
            localStorage.removeItem("selectCause");
            window.location.href = "addUser.html";
        });

        //删除乘机人
        $(".del").live("tap",function(){
            $(".bg").show();
            $(".delWarn").show();
            var this_ = $(this),
                dataId = this_.attr("data-code");

            $(".noDel").on("tap",function(){
                $(".bg").hide();
                $(".delWarn").hide();
            });

            $(".yesDel").on("tap",function(){
                $(".bg").hide();
                $(".delWarn").hide();

                _.remove(urlHaveId, function(n) {
                    return n  == dataId;
                });
                localStorage.setItem("urlHaveId",JSON.stringify(urlHaveId));
                this_.parent().remove();
                $.each($(".order-detail-insure"),function(index,val){
                    var thisInsure_ = $(val),
                        userIndex = thisInsure_.attr("data-code");
                    if(userIndex == dataId){
                        thisInsure_.remove();
                    }
                });
            });
        });


        /*//证件选择
         var shenfenNo = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,//身份证号码验证
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
         });*/


        $(".birthday").on("focus",function(){
            $(".birthday").val("").css("color","#333");
            $(".birthPrompt").hide();
        });
        $(".birthPrompt").on("tap",function(){
            $(".birthPrompt").hide();
        });
        var birthdayNo = /^\d{4}-\d{2}-\d{2}$/;
        $(".birthday").on("blur",function() {
            var birthNo = $(".birthday").val();
            console.log(birthNo);
            if (birthNo == "") {
                $(".birthPrompt").hide();
            } else if (!birthdayNo.test(birthNo)) {
                $(".birthPrompt").show();
                return false;
            }
        });

        var insureObject ={
            '0':{'go':{"insurePrice":"","insureCode":""},"back":{"insurePrice":"","insureCode":"","insureCodeBack":""}},
            '1':{"go":{"insurePrice":localStorage.getItem("insure"),"insureCode":localStorage.getItem("insureCode")},"back":{"insurePrice":localStorage.getItem("insure"),"insureCode":localStorage.getItem("insureCode"),"insureCodeBack":localStorage.getItem("insureCodeBack")}},
            '2':{"go":{"insurePrice":"0","insureCode":localStorage.getItem("insureCode")},"back":{"insurePrice":"0","insureCode":localStorage.getItem("insureCode"),"insureCodeBack":localStorage.getItem("insureCodeBack")}}
        };

        //预订
        $(".order-btn").on('click', function() {
            sameTravelForceOrder = "false";
            /*$(".warnText").fadeIn('slow').find("p").text("请至少选择一位乘机人");
            setTimeout(fadeOut,2000);
            return false;*/
            if(isOrderClick){
                isOrderClick =!isOrderClick;
                if(isRefuseSubmit()){
                    var subCause = localStorage.getItem("cause");
                    if(userList.length==0){
                        var noApply = JSON.parse(localStorage.getItem("noApply"));
                        userList.push(noApply);
                    }
                    var selfId = userList[0].idCard;
                    console.log(selfId);

                    if(orderID != "" && orderID != null){//验证联系人手机号码
                        var linkPhone = $(".linkPhone").val();
                        console.log(linkPhone);
                        if(linkPhone == ""){
                            $(".promptF").text("请输入联系人手机号码").show();
                            isOrderClick = true;
                            return false;
                        }else if(!ifMobile.test(linkPhone)){
                            $(".promptF").text("您输入的手机号码有误").show();
                            isOrderClick = true;
                            return false;
                        }else if(selfId == "" || selfId == undefined){//验证证件号码是否合法
                            $(".warnText").show().find("p").text("乘机人证件号码不能为空");
                            setTimeout(fadeOut,2000);
                            isOrderClick = true;
                            return false;
                        }
                            // else if(subCause == "" || subCause == null){//验证申请原因是否合法
                        //     $(".warnText").show().find("p").text("乘机人信息不完善，请补充完整");
                        //     setTimeout(fadeOut,2000);
                        //     isOrderClick = true;
                        //     localStorage.removeItem("selectCause");
                        //     return false;
                        // }
                        else{
                            $(".bg").show();
                            $(".Loading").show();
                        }
                    }else{
                        if(selfId == "" || selfId == undefined){//验证证件号码是否合法
                            $(".warnText").show().find("p").text("乘机人证件号码不能为空");
                            setTimeout(fadeOut,2000);
                            isOrderClick = true;
                            return false;
                        }
                        // else if(subCause == "" || subCause == null){//验证申请原因是否合法
                        //     $(".warnText").show().find("p").text("乘机人信息不完善，请补充完整");
                        //     setTimeout(fadeOut,2000);
                        //     isOrderClick = true;
                        //     localStorage.removeItem("selectCause");
                        //     return false;
                        // }
                        else{
                            $(".bg").show();
                            $(".Loading").show();
                        }
                    }

                    /*var identityNo = $(".identity_card").val();
                     if($(".cardType").text() == "身份证"){
                     if(identityNo == ""){
                     $(".prompt").hide();
                     }else if(!shenfenNo.test(identityNo)){
                     $(".prompt").show();
                     return false;
                     }else{
                     $(".bg").show();
                     $(".loading").show();
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
                     }*/
                    //验证生日格式是否合法
                    /*var birthNo = $(".birthday").val();
                     if (birthNo == "") {
                     $(".birthPrompt").hide();
                     } else if (!birthdayNo.test(birthNo)) {
                     $(".birthPrompt").show();
                     return false;
                     }*/

                    //是否含有保险
                    /*var insure = $(".btn").eq(0).attr("data-type");
                    console.log(insure);
                    if(insure == "true"){
                        localStorage.setItem("insure",$(".insure").eq(0).text());
                        localStorage.setItem("insureCode",$(".insure").eq(0).attr("data-code"));
                    }else{
                        localStorage.setItem("insure","0");
                        localStorage.setItem("insureCode","");
                    }
                    if (localStorage.getItem(self.config.jouryType) == "RT"){
                        var insureBack = $(".btn").eq(1).attr("data-type");
                        console.log(insureBack);
                        if(insureBack == "true"){
                            localStorage.setItem("insureBack",$(".insure").eq(1).text());
                            localStorage.setItem("insureCodeBack",$(".insure").eq(1).attr("data-code"));
                        }else{
                            localStorage.setItem("insureBack","0");
                            localStorage.setItem("insureCodeBack","");
                        }
                    }*/

                    //时间格式转换
                    var ttBegin=new Date(self.config.result.departureDate.replace("-","/").replace("-","/") + " " + (switchTime(self.config.result.beginTime)));
                    var beginTime = ttBegin.getTime() / 1000;
                    var ttEnd = new Date(self.config.result.endDate.replace("-","/").replace("-","/") + " " + (switchTime(self.config.result.endTime)));
                    var endTime = ttEnd.getTime() / 1000;
                    var date = new Date(self.config.result.departureDate).getTime() / 1000;
                    var endDate = new Date(self.config.result.endDate).getTime() / 1000;

                    //得到总的保险金额
                    /*var insureNum = 0;
                    $.each($(".order-detail-insure"),function(index,val){
                        if($(val).attr("data-insure") == "1"){
                            insureNum++;
                        }
                        localStorage.setItem("insureNum",insureNum);
                    });*/

                    var passengerList = [],
                        passengerListBack = [];
                    console.log(passengerList);

                    var passenger = [];
                    if(localStorage.getItem("noApply") != null){
                        passenger = JSON.parse(localStorage.getItem("noApply"));
                    }
                    console.log(passenger);
                    console.info(userList);
                    $.each(userList,function(index,val){
                        console.info(urlHaveId.length);
                        urlHaveId  = JSON.parse(localStorage.getItem("urlHaveId"));
                        for(var i=0,len=urlHaveId.length;i<len;i++){
                            console.log(urlHaveId[i]);
                            if(urlHaveId[i] == val.userIdx ){
                                var userInsure = $("#insure_" + urlHaveId[i]).attr("data-insure");
                                console.log(userInsure);
                                console.log(insureObject[userInsure]);
                                console.log(insureObject[userInsure]["insureCode"]);
                                console.log(insureObject[userInsure]["insurePrice"]);
                                passengerList.push({
                                    "psrType": "0",
                                    "passengerUserIndex": val.userIdx,
                                    "psrName": val.userName,
                                    "idType": "NI",
                                    "idCode": val.idCard,
                                    "psrSex": $(".sex").attr("data-code") || "",
                                    "birthDate": $(".birthday").val() || "",
                                    "costCenterCode": val.costCenterCode,
                                    "costCentername": val.costCenterName,
                                    "taskCode": val.taskCode,
                                    "taskName": val.taskName,
                                    "costItemCode": val.key,
                                    "costItemName": val.value,
                                    "departmentIndex": val.departmentIdx,
                                    "departmentName": val.departmentName,
                                    "phone": val.cellphone||val.userPhone,
                                    "flightAccidentCode": insureObject[userInsure]["insureCode"],
                                    "flightAccidentInsurance": insureObject[userInsure]["insurePrice"],
                                    /*"flightAccidentCode": "",
                                    "flightAccidentInsurance": "",*/
                                    "travelReason": subCause,
                                    "remark": localStorage.getItem(self.config.remark) || ""
                                });
                                if(localStorage.getItem(self.config.jouryType) == "RT"){

                                    passengerListBack.push({
                                        "psrType": "0",
                                        "passengerUserIndex": val.userIdx,
                                        "psrName": val.userName,
                                        "idType": "NI",
                                        "idCode": val.idCard,
                                        "psrSex": $(".sex").attr("data-code") || "",
                                        "birthDate": $(".birthday").val() || "",
                                        "costCenterCode": val.costCenterCode,
                                        "costCentername": val.costCenterName,
                                        "taskCode": val.taskCode,
                                        "taskName": val.taskName,
                                        "costItemCode": val.key,
                                        "costItemName": val.value,
                                        "departmentIndex": val.departmentIdx,
                                        "departmentName": val.departmentName,
                                        "phone": val.cellphone||val.userPhone,
                                        "flightAccidentCode": insureObject[userInsure]["insureCodeBack"],
                                        "flightAccidentInsurance": insureObject[userInsure]["insurePrice"],
                                        /*"flightAccidentCode": "",
                                        "flightAccidentInsurance": "",*/
                                        "travelReason": subCause,
                                        "remark": localStorage.getItem(self.config.remark) || ""
                                    });
                                }
                            }
                        }
                    });

                    localStorage.setItem("passengerList",JSON.stringify(passengerList));
                    console.log(passengerList);

                    var causeCode = "";
                    if(localStorage.getItem("causeType") != null){
                        var causeType = JSON.parse(localStorage.getItem("causeType"));
                        causeCode = causeType.causeCode;
                    }
                    console.log(causeCode);

                    if (localStorage.getItem(self.config.jouryType) == "RT") {
                        var beginTimeBack = new Date(self.config.resultBack.departureDate.replace("-","/").replace("-","/") + " " + (switchTime(self.config.resultBack.beginTime))).getTime() / 1000;
                        var endTimeBack = new Date(self.config.resultBack.departureDate.replace("-","/").replace("-","/") + " " + (switchTime(self.config.resultBack.endTime))).getTime() / 1000;
                        var dateBack = new Date(self.config.resultBack.departureDate).getTime() / 1000;
                        var endDateBack = new Date(self.config.resultBack.endDate).getTime() / 1000;
                        sumbitInfo = {
                            "casQueryFlag": "CAS",
                            "causeType": causeCode,
                            "flightList": [{
                                "carrierName": self.config.result.carrierName,
                                "carrierCode": self.config.result.carrierCode,
                                "flightNo": self.config.result.flightNo,
                                "freightSpaceType": self.config.result.freightList[self.config.result.countIndex].cabinCode,
                                "classCode": self.config.result.freightList[self.config.result.countIndex].baseCabin,
                                "discountRate": self.config.result.freightList[self.config.result.countIndex].discountRate,
                                "date": date,
                                "beginTime": beginTime,
                                "endDate": endDate,
                                "endTime": endTime,
                                "departAirport": self.config.result.departAirport,
                                "departAirportName": self.config.result.departAirportName,
                                "departTerminal": self.config.result.departTerminal,
                                "departCity": sPlace,
                                "arriveCity": sEnd,
                                "arriveAirport": self.config.result.arriveAirport,
                                "arriveAirportName": self.config.result.arriveAirportName,
                                "arriveTerminal": self.config.result.arriveTerminal,
                                "flightType": self.config.result.planeType,
                                "flightFee": $(".price").text(),
                                 //"flightFee": $(".price").html().substring(1),
                                "airPortTax": self.config.result.freightList[self.config.result.countIndex].airportBuildFee,
                                "jourytype": "2",
                                "cabinTmpIndex": self.config.result.freightList[self.config.result.countIndex].cabinTmpIndex,
                                //"approveNo": orderID,
                                "approveNo": casAppNo,
                                "srcChannel": ditch[self.config.result.freightList[self.config.result.countIndex].channelFlag],
                                "mealCode": self.config.result.mealCode,
                                "mealName": self.config.result.mealName,
                                "forceOrder": false,
                                "forceOrderReason": "",
                                "remark": "",
                                "minFlightPrice": self.config.result.minPrice,
                                "noBuyMinPriceReason": localStorage.getItem("goNoBuyMinPriceReason") || "",
                                "minFlightPriceRemark": localStorage.getItem("goMinFlightPriceRemark") || "",
                                "sameTravelForceOrder": "false",
                                "passengerList": passengerList
                            }, {
                                "carrierName": self.config.resultBack.carrierName,
                                "carrierCode": self.config.resultBack.carrierCode,
                                "flightNo": self.config.resultBack.flightNo,
                                "freightSpaceType": self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinCode,
                                "discountRate": self.config.resultBack.freightList[self.config.resultBack.countIndex].discountRate,
                                "classCode": self.config.resultBack.freightList[self.config.resultBack.countIndex].baseCabin,
                                "date": dateBack,
                                "beginTime": beginTimeBack,
                                "endDate": endDateBack,
                                "endTime": endTimeBack,
                                "arriveAirportName": self.config.result.departAirportName,
                                "arriveAirport": self.config.resultBack.arriveAirport,
                                "arriveTerminal": self.config.resultBack.arriveTerminal,
                                "departCity": sEnd,
                                "arriveCity": sPlace,
                                "departAirportName": self.config.result.arriveAirportName,
                                "departTerminal":  self.config.resultBack.departTerminal,
                                "departAirport": self.config.resultBack.departAirport,
                                "flightType": self.config.resultBack.planeType,
                                "flightFee": $(".price:eq(1)").text(),
                                "airPortTax": self.config.resultBack.freightList[self.config.resultBack.countIndex].airportBuildFee,
                                "jourytype": "3",
                                "cabinTmpIndex": self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinTmpIndex,
                                //"approveNo": orderID,
                                "approveNo": casAppNo,
                                "srcChannel": ditch[self.config.resultBack.freightList[self.config.resultBack.countIndex].channelFlag],
                                "mealCode": self.config.resultBack.mealCode,
                                "mealName": self.config.resultBack.mealName,
                                "forceOrder": false,
                                "forceOrderReason": "",
                                "remark": "",
                                "minFlightPrice": self.config.resultBack.minPrice,
                                "noBuyMinPriceReason": localStorage.getItem("noBuyMinPriceReason") || "",
                                "minFlightPriceRemark": localStorage.getItem("minFlightPriceRemark") || "",
                                "sameTravelForceOrder": "false",
                                "passengerList": passengerListBack
                            }]
                        };
                    }
                    else {
                        sumbitInfo = {
                            "casQueryFlag": "CAS",
                            "causeType": causeCode,
                            "flightList": [{
                                "carrierName": self.config.result.carrierName,
                                "carrierCode": self.config.result.carrierCode,
                                "flightNo": self.config.result.flightNo,
                                "freightSpaceType": self.config.result.freightList[self.config.result.countIndex].cabinCode,
                                "classCode": self.config.result.freightList[self.config.result.countIndex].baseCabin,
                                "discountRate": self.config.result.freightList[self.config.result.countIndex].discountRate,
                                "date": date,
                                "beginTime": beginTime,
                                "endDate": endDate,
                                "endTime": endTime,
                                "departAirport": self.config.result.departAirport,
                                "departAirportName": self.config.result.departAirportName,
                                "departTerminal":  self.config.result.departTerminal,
                                "departCity": sPlace,
                                "arriveCity": sEnd,
                                "arriveAirport": self.config.result.arriveAirport,
                                "arriveAirportName": self.config.result.arriveAirportName,
                                "arriveTerminal": self.config.result.arriveTerminal,
                                "flightType": self.config.result.planeType,
                                "flightFee": $(".price").text(),
                                "airPortTax": self.config.result.freightList[self.config.result.countIndex].airportBuildFee,
                                "jourytype": "1",
                                "cabinTmpIndex": self.config.result.freightList[self.config.result.countIndex].cabinTmpIndex,
                                //"approveNo": orderID,
                                "approveNo": casAppNo,
                                "srcChannel": ditch[self.config.result.freightList[self.config.result.countIndex].channelFlag],
                                "mealCode": self.config.result.mealCode,
                                "mealName": self.config.result.mealName,
                                "forceOrder": false,
                                "forceOrderReason": "",
                                "remark": "",
                                "minFlightPrice": self.config.result.minPrice,
                                "noBuyMinPriceReason": localStorage.getItem("noBuyMinPriceReason") || "",
                                "minFlightPriceRemark": localStorage.getItem("minFlightPriceRemark") || "",
                                "sameTravelForceOrder": "false",
                                "passengerList": passengerList
                            }]
                        };
                    }
                    console.log(sumbitInfo);
                    console.log(sumbitInfo.flightList[0]["beginTime"]);

                    /*var promptF=$(".showConsole").html();
                    promptF=promptF+',reserve-btn<br/>';
                    $(".showConsole").html(promptF);*/
                    submitPlane();
                }
                else{
                    isOrderClick =true;
                }
            }

        });

        //选择证件类型
        /*$(".credentials-txt").click(function() {
         $(".credentials-mask").show();
         });
         $(".credentials-info-list").click(function() {
         var code  = $(this).attr("data-code");
         if($(this).text()=='身份证'){
         console.info(self.config.initIdCard);
         $(".identity_card").val(self.config.initIdCard);
         localStorage.setItem(self.config.identity_card, self.config.initIdCard);
         $(".sexLine").hide();
         $(".birthdayLine").hide();
         } else{
         $(".identity_card").val("").css("color","#333");
         localStorage.setItem(self.config.identity_card, "");
         $(".sexLine").show();
         $(".birthdayLine").show();
         }
         $(".credentials-mask").hide();
         $(".cardType").text($(this).text());
         $(".cardType").attr("data-code",code);
         localStorage.setItem("cardType",$(this).text());
         localStorage.setItem("code",code);
         });*/
        //选择性别
        $(".sexLine").click(function() {
            $(".sex-mask").show();
        });
        $(".sex-info-list").click(function() {
            var code  = $(this).attr("data-code");
            $(".sex-mask").hide();
            $(".sex").text($(this).text());
            $(".sex").attr("data-code",code);
        });

        /*查看退改签*/
        $(".look-info").click(function() {
            var startCode = $(this).parents(".order-info-list").find(".departAirport").attr("data-code"),
                endCode = $(this).parents(".order-info-list").find(".arriveAirport").attr("data-code"),
                flightDate = $(this).parents(".order-info-list").find(".flightDate").attr("data-code"),
                carrierCode = $(this).parents(".order-info-list").find(".flightNo").attr("data-code"),
                cabinType = $(this).parents(".order-info-list").find(".price").attr("data-code"),
                flightNo = $(this).parents(".order-info-list").find(".flightNo").attr("data-num");
            var rule = {
                "fromCityCode":startCode,
                "toCityCode":endCode,
                "flightDate":flightDate,
                "carrierCode":carrierCode,
                "cabinType":cabinType,
                "flightNo":flightNo
            };
            getRule(rule);
        });
        /*查看保险说明*/
        $(".yiwai-pic").eq(0).on("tap",function(){
            $(".insureInfo").show();
        });
        $(".yiwai-pic").eq(1).on("tap",function(){
            $(".insureInfo").show();
        });
        $(".insureInfo").on("tap",function(){
            $(this).hide();
        });

        /*$(".btn").eq(0).on('toggle', function(event) {
            if(event.detail.isActive){
                $(this).attr("data-type", "true");
                //localStorage.setItem("insure","20");
                localStorage.setItem("insure",$(".insure").eq(0).text());
                $(".mui-switch-handle").eq(0).css("transform","translate(26px, 0px);");
            }else{
                $(this).attr("data-type", "false");
                localStorage.setItem("insure","0");
            }
        });
        $(".btn").eq(1).on('toggle', function(event) {
            if(event.detail.isActive){
                $(this).attr("data-type", "true");
                localStorage.setItem("insureBack",$(".insure").eq(1).text());
                $(".mui-switch-handle").eq(1).css("transform","translate(26px, 0px);");
            }else{
                $(this).attr("data-type", "false");
                localStorage.setItem("insureBack","0");
            }
        });*/

        $(".sameCancel").live("click",function(){
            $(".bg").hide();
            $(".sameWarn").hide();
        });
        $(".sameGo").live("click",function(){
            sumbitInfo.flightList[0].sameTravelForceOrder = "true";
            if(localStorage.getItem(self.config.jouryType) == "RT"){
                sumbitInfo.flightList[1].sameTravelForceOrder = "true";
            }
            console.log(sameTravelForceOrder);
            submitPlane();
            $(".sameWarn").hide();
            $(".Loading").show();
        });

        //变价后继续预订
        var goonBook = true;
        $(".goonBook").on("tap",function(){
            goonBook = false;
            if(!goonBook){
                $(".changePrice").hide();
                $(".bg").show();
                $(".Loading").show();
                var newPrice = $(".newPrice").text();
                $(".price").text(newPrice);
                sumbitInfo.flightList[0].flightFee = newPrice;
                sumbitInfo.flightList[0].noBuyMinPriceReason = "机票变价";
                localStorage.setItem("noBuyMinPriceReason","机票变价");
                submitPlane();
                goonBook = true;
                self.config.result.freightList[self.config.result.countIndex].cabinPrice = newPrice;
                localStorage.setItem(self.config.localStart, encodeURIComponent(JSON.stringify(self.config.result)));
            }
        });

        //去审批单详情页
        $(".approvalNo").on("tap",function(){
            var approvalNo = $(".approvalNo").find("span").text();
            window.location.href = "zhfApproInfo.html?approvalNo=" + approvalNo;
        });

        $(".goBack").on("tap",function(){
            window.location.href = "list.html";
        });
    }
};

fill.init();

function forceBook(forceOrderReason,remark) {
    $(".bg").show();
    $(".Loading").show();
    for(var i=0,len=sumbitInfo.flightList.length;i<len;i++){
        sumbitInfo.flightList[i]["forceOrder"] = true;
        sumbitInfo.flightList[i]["forceOrderReason"] = forceOrderReason;
        sumbitInfo.flightList[i]["remark"] = remark;
        console.log(sumbitInfo.flightList[i]);
    }

    /*var promptF=$(".showConsole").html();
    promptF=promptF+',forceBook<br/>';
    $(".showConsole").html(promptF);*/
    submitPlane();
}

function isRefuseSubmit() {//如果提交的时候后端返回的状态码为2001时，则提示，不进行提交
    var result = true;
    if(globalStatus ==2001||globalStatus=='2001'){
        mui.alert(globalStatusText);
        result =  false;
    }
    return result;
}
/*
$(".sameCancel").live("click",function(){
    $(".bg").hide();
    $(".sameWarn").hide();
});
$(".sameGo").live("click",function(){
    sumbitInfo.flightList[0].sameTravelForceOrder = "true";
    if(localStorage.getItem(self.config.jouryType) == "RT"){
        sumbitInfo.flightList[1].sameTravelForceOrder = "true";
    }
    console.log(sameTravelForceOrder);
    submitPlane();
    $(".sameWarn").hide();
    $(".Loading").show();
});*/

function submitPlane(){
    console.info(sumbitInfo);
    //alert(JSON.stringify(sumbitInfo));
    /*var promptF=$(".showConsole").html();
    promptF=promptF+',submitPlane<br/>';
    $(".showConsole").html(promptF);*/
    var logSumbitInfo =$.extend({url:API.AIR_TICKER.FLIGHT_BOOK},sumbitInfo);
    logRequest(logSumbitInfo);
    ajaxRequest({url:API.AIR_TICKER.FLIGHT_BOOK,data:sumbitInfo},function(data){
        /*var promptF=$(".showConsole").html();
        promptF=promptF+',ajaxRequest<br/>';
        $(".showConsole").html(promptF);*/
        //alert(JSON.stringify(data));
        console.log(data);
        console.log(data.content[0].orderUuid);
        localStorage.setItem("orderUuid",data.content[0].orderUuid);
        var requestList = {},
            getStatus = "";

        var isSetInterval =0;

        var orderUuidList =[];
        $.each(data.content,function(index,val){
            if(val.orderStatus==0){
                isSetInterval =1;
            }
            orderUuidList.push(val.orderUuid);
        });

        if(isSetInterval==1){
            requestList = {
                orderUuidList : orderUuidList
            };
            getStatus = setInterval(getFlightOrderStatus,2000);
        }
        else{
            $(".Loading").hide();
            console.log(data.content);
            showTicketResult(data.content);
        }

        var num = 0;

        function getFlightOrderStatus(){
            num++;
            if(num < 31){
                var logRequestList =$.extend({url:API.AIR_TICKER.GET_FLIGHT_ORDER_STATUS},requestList);
                logRequest(logRequestList);
                ajaxRequest({url:API.AIR_TICKER.GET_FLIGHT_ORDER_STATUS,data:requestList},function(data){
                    console.log(data);
                    localStorage.setItem("showTicket",JSON.stringify(data));
                    var isRequest = false;
                    for(var i=0;i<data.content.length;i++){
                        if(data.content[i].orderStatus===0 || data.content[i].orderStatus==='0'){
                            isRequest = true;
                        }
                    }
                    if(!isRequest){
                        clearInterval(getStatus);
                        $(".Loading").hide();
                        localStorage.removeItem("urlHaveId");
                        showTicketResult(data.content);
                    }
                });
            }else{
                var res = JSON.parse(localStorage.getItem("showTicket"));
                showTicketResult(res.content);
                clearInterval(getStatus);
                $(".Loading").hide();
                window.location.href = "order-list.html?orderType=0";
            }
        }
    },function(data){
        console.log(data);
        isOrderClick =true;
        $(".bg").hide();
        $(".Loading").hide();
        if(data.status == "0" || data.status == 0){
            if(data.content == null){
                $(".warnText").fadeIn('slow').find("p").text(data.message);
                setTimeout(fadeOut,2000);
                return false;
            }else{
                var orderAlreadyHave = data.content[0].orderUuid;
                $(".bg").show();
                showSameOrderInf(orderAlreadyHave);
                $(".sameWarn").show();
                return false;
            }
        }else if(data.status == "300" || data.status == 300){
            localStorage.setItem("bookList",JSON.stringify(data.content));
            notConformRule();
        }else if(data.status == "2001" || data.status == 2001){
            mui.alert(data.message);
            globalStatus = data.status;
            globalStatusText = data.message;
            return false;
        }else if(data.status == "400" || data.status == 400){
            mui.alert("根据公司政策设置，您暂时无法使用该功能，如需使用请联系公司管理员。");
            return false;
        }
    });
}

//显示预订结果
function showTicketResult(result){
    var successRes = [],
        failRes = [],
        ingRes = [],
        passengerList = JSON.parse(localStorage.getItem("passengerList")),
        passengerNum = passengerList.length*1 - 2;
    console.log(passengerNum);
    console.info(result);
    console.info(passengerList);

    var showTicketInfo = {};
    var tickInfo = {};
    var imgObject ={
        '-1':'img/icon_booking_success.png',
        '0':'img/icon_booking.png',
        '2':'img/icon_booking_failed.png'
    };
    var colorObject ={
        '-1':'#7AB43B',
        '0':'#9B9B9B',
        '2':'#FF600A'
    };
    var stringObject = {
        "0": "预订中",
        "-1": "待支付",//预订成功
        "2": "占座失败"//已售罄
    };
    for(var i=0;i<result.length;i++){
        tickInfo = result[i];
        var clientUserIndex =result[i].clientUserIndex || result[i].passengerUserIndex;

        if(!showTicketInfo[clientUserIndex]){
            showTicketInfo[clientUserIndex] = {'userName':'','goStatus':'','goStatusString':'','goColor':'','goImg':'','goInsure':'','backStatus':-1,'backStatusString':'','backImg':'','backColor':'','backInsure':''};
        }

        $.each(passengerList,function(index,val){
            if(clientUserIndex == val.passengerUserIndex){
                console.info(val);
                console.info(tickInfo);
                if(tickInfo.jourytype==3){
                    showTicketInfo[clientUserIndex].backInsure =val.flightAccidentInsurance;
                    result[i].backInsure =val.flightAccidentInsurance;
                }
                else{
                    showTicketInfo[clientUserIndex].userName =val.psrName;
                    showTicketInfo[clientUserIndex].goInsure =val.flightAccidentInsurance;
                    result[i].goInsure =val.flightAccidentInsurance;
                }
            }
        });
        if(tickInfo.jourytype == 1 || tickInfo.jourytype == 2){
            showTicketInfo[clientUserIndex].goStatus =tickInfo.orderStatus;
            showTicketInfo[clientUserIndex].goImg =imgObject[tickInfo.orderStatus];
            showTicketInfo[clientUserIndex].goStatusString =stringObject[tickInfo.orderStatus];
            showTicketInfo[clientUserIndex].goColor =colorObject[tickInfo.orderStatus];
        }
        else if(tickInfo.jourytype==3){
            showTicketInfo[clientUserIndex].backStatus =tickInfo.orderStatus;
            showTicketInfo[clientUserIndex].backImg =imgObject[tickInfo.orderStatus];
            showTicketInfo[clientUserIndex].backStatusString =stringObject[tickInfo.orderStatus];
            showTicketInfo[clientUserIndex].backColor =colorObject[tickInfo.orderStatus];

        }

        if(result[i].orderStatus === -1 || result[i].orderStatus === '-1'){
            $.each(passengerList,function(index,val){
                if(result[i].clientUserIndex == val.passengerUserIndex || result[i].passengerUserIndex == val.passengerUserIndex){
                    successRes.push(val.passengerUserIndex);
                    console.log(successRes);
                }
            });
        }else if(result[i].orderStatus === 2 || result[i].orderStatus === '2'){
            if(result[i].changePriceFailCode == globalResponseStatus.planeChangePrice_Int || result[i].changePriceFailCode == globalResponseStatus.planeChangePrice_String){
                $(".yesNo").hide();
                $(".bg").show();
                $(".changePrice").show();
                $(".newPrice").text(result[i].ticketPriceNew);
                var oldPrice = $(".price").text();
                var chaPrice = result[i].ticketPriceNew - oldPrice;
                if(chaPrice>0){
                    $(".chaPrice").text("增加" + chaPrice);
                }else{
                    $(".chaPrice").text("减少" + (chaPrice+'').replace("-",""));
                }
            }else{
                $(".yesNo").show();
                $.each(passengerList,function(index,val){
                    if(result[i].clientUserIndex == val.passengerUserIndex || result[i].passengerUserIndex == val.passengerUserIndex){
                        failRes.push(val.passengerUserIndex);
                    }
                });
            }
        }else if(result[i].orderStatus === 0 || result[i].orderStatus === '0'){
            $(".yesNo").show();
            $.each(passengerList,function(index,val){
                if(result[i].clientUserIndex == val.passengerUserIndex || result[i].passengerUserIndex == val.passengerUserIndex){
                    ingRes.push(val.passengerUserIndex);
                }
            });
        }
    }
    
    localStorage.setItem("bookList",JSON.stringify(result));
    var isHaveBack = false;//是否有返程
    console.info(showTicketInfo);

    var insureNum = 0;
    for(var n=0,len=successRes.length;n<len;n++){
        if(localStorage.getItem("jouryType") == "OW"){
            if(showTicketInfo[successRes[n]].goStatus == -1 && showTicketInfo[successRes[n]].goInsure == "20"){
                insureNum++;
                console.log(insureNum);
            }
        }else{
            if((showTicketInfo[successRes[n]].goStatus == -1 && showTicketInfo[successRes[n]].goInsure == "20") || (showTicketInfo[successRes[n]].backStatus == -1 && showTicketInfo[successRes[n]].backInsure == "20")){
                insureNum++;
                console.log(insureNum);
            }
        }
        localStorage.setItem("insureNum",insureNum);
    }

    for(var index in showTicketInfo){
        (function (temp) {
            temp['showOrHide']='none';
            if(temp.backStatus!=-1){
                temp['showOrHide']='inline-block';
                isHaveBack = true;
            }
            $(".bookList").append(baidu.template("tickInfo", temp));
        })(showTicketInfo[index]);
    }

    var temp = 16,
        top = 8;
    if(isHaveBack){
        $("#titleSpan").show();
        temp = 18;
        top = 9;
    }

    if(passengerNum >= 0){
        console.log(temp);
        var n = temp + passengerNum * 2,
            h = top + passengerNum;
        $(".yesNo").css({"height":n+"rem","margin-top":"-"+ h +"rem"});
    }

    if(successRes.length == result.length){
        $(".bg").hide();
        window.location.href = "order-confirm-info.html?status=-1";
    }else{
        $(".bookNum").text(failRes.length*1 + ingRes.length*1);
        if(successRes.length != 0){
            $(".allStatus").show();
            $(".allStatusBtn").show();
        }else{
            if(failRes.length == result.length){
                $(".allFail").show();
                $(".allFailBtn").show();
            }else{
                $(".failAndIng").show();
                $(".failAndIngBtn").show();
            }
        }

        $(".yes").on("tap",function(){
            window.location.href = "order-list.html?orderType=0";
        });
        $(".goList").on("tap",function(){
            window.location.href = "order-list.html?orderType=0";
        });
    }
}

//获取同行程订单信息
function showSameOrderInf(resOrderUuid){
    var logRequestList = {url:API.AIR_TICKER.ORDER_DETAIL,"orderUuid": resOrderUuid};
    logRequest(logRequestList);
    ajaxRequest({url:API.AIR_TICKER.ORDER_DETAIL,data:{"orderUuid": resOrderUuid}},function(data){
        console.log(data);
        if($(".sameTitle").length == 0){
            var bgTime = data.content.travelFlight.beginTime * 1000,
                content = data.content;
            content.passengerName = content.travelPassenger.passengerName;
            content.carrierCode = content.travelFlight.carrierCode;
            content.flightNo = content.travelFlight.carrierCode + content.travelFlight.flightNo;
            content.departCity = content.travelFlight.departCity;
            content.arriveCity = content.travelFlight.arriveCity;
            content.beginTime = moment(bgTime).format("YYYY/MM/DD HH:mm");
            $(".sameWarn").append(baidu.template("sameWarn", content));
        }
    });

    $(".sameBody").live("tap",function(){
        var status = $(this).attr("data-code");
        var url = "";
        if(status == "-2" || status == "-1"){
            url = "order-confirm-info.html";
        }else if(status == "0" || status == "1" || status == "6" || status == "7"){
            url = "order-info.html";
        }
        window.location.href=url+"?orderUuid=" + resOrderUuid + "&status=" + status + "&sameOrder=1";
    })
}

//不符合规则选择原因
function notConformRule() {
    $(".bg").show();
    $(".zhf_low").show();
    $(".zhf_select_left,.zhf_select_right").off().on("tap",
        function () {
            $(".zhf_select_left,.zhf_select_right").removeClass("selectNew");
            $(this).addClass("selectNew");
        });
    $(".zhf_submit_goon").off().on("tap",function () {
        $(".bg").hide();
        $(".zhf_low").hide();
        var reason=$(".selectNew").text();
        var remark=$(".zhf_beizhu_area textarea").val();
        console.log(reason,remark);
        forceBook(reason,remark);
    });
    $(".zhf_submit div:nth-child(1)").off().on("tap",function () {
        $(".bg").hide();
        $(".zhf_low").hide();
    });
    $(".bg").off().on("tap",function(){
        $(".bg").hide();
        $(".zhf_low").hide();
    });
}