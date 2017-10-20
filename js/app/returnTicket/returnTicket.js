var reTicket2 = true;
var returnTicket = {
    config : {
        localStart: "localStart",
        localEnd: "localEnd",
        personName:"personName",
        jouryType: "jouryType",
        queryFlowNo: "queryFlowNo",
        cause: "cause",
        identity_card: "identity_card",
        result: "",
        resultBack: "",
        passage:"passage",
        passageNo:"",
        dataRe:"",
        html : '<div class="flight-info01">'+
        '<div class="flight-info01-con">'+
        '<div class="order-info-price">'+
        '<div class="flightListBottom font-12 fontColor-333">'+
        '<img src="./img/logo/{carrierCode}.png" alt="" />'+
        '<span>{carrierNameFlightNo}</span><span class="planeType">{planeType}</span>'+
        /*'<i class="qucheng-color font-10">返程</i>'+*/
        '</div>'+
        '</div>'+
        '<div class="order-info-gotime">'+
        '<p class="font-12 fontColor-666">{date}</p>'+
        '<p class="font-22 fontColor-666">{beginTime}</p>'+
        '<p class="font-12 fontColor-666">{departAirportNameDepartTerminal}</p>'+
        '</div>'+
        '<div class="order-info-middtime">'+
        '<img style="width:6rem;margin-top:0.8rem;" src="./img/img_time_consuming_plane.png" alt="" />'+
        '<div style="text-align: center;">'+
        '<img class="icon-clock" src="./img/img_time_consuming_clock.png" alt="" />'+
        '<span class="flytime font-10-m fontColor-999">{diffTime}</span>'+
        '</div>'+
        '</div>'+
        '<div class="order-info-backtime">'+
        '<p class="font-12 fontColor-666">{dateArrive}</p>'+
        '<p class="font-22 fontColor-666">{endTime}</p>'+
        '<p class="font-12 fontColor-666">{arriveAirportNameArriveTerminal}</p>'+
        '</div>'+
        '<div class="clearfix"></div>'+
        '</div>'+
        '</div>'+
        '<div class="flight-info02">'+
        '<div class="order-detail-switch">'+
        '<div class="order-detail" style="display: block;padding-top:0;">'+
        '<div class="order-detail-top module">'+
        '<p class="font-12">'+
        '<label class="fontColor-777">订单编号</label><span class="fontColor-666">{passageNo}</span></p>'+
        '<p class="font-12 createTime">'+
        '<label class="fontColor-777">下单时间</label><span class="fontColor-666">{createTime}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">机票票号</label><span class="fontColor-666">{ticketNo}</span></p>'+
        '</div>'+
        '<div class="module">'+
        '<p class="font-12">'+
        '<label class="fontColor-777">乘机人</label><span class="fontColor-666">{personName}</span></p>'+
        '<p class="font-12" style="margin-top:-2px;">'+
        '<label class="fontColor-777" style="color:transparent;">证件号码</label><span class="fontColor-666">{perCode}</span></p>'+
        '<p class="font-12 casApproveNo" style="margin-top:-2px;">'+
        '<label class="fontColor-777 casApproveNo" style="">审批单号</label><span class="fontColor-666">{casApproveNo}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">所属部门</label><span class="fontColor-666">{departmentName}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">舱位</label><span class="fontColor-666">({cabinCode}) {space} {discountRate}</span></p>'+
        '</div>'+
        '<div class="module changeReason">'+
        '<p class="font-12">'+
        '<label class="fontColor-777">出差原因</label><span class="fontColor-666">{cause}</span></p>'+
        '<p class="font-12" style="height:3.2rem;">'+
        '<label class="fontColor-777">备注</label><span class="fontColor-666" style="display: inline-block;height:35px;margin-top:-2rem;margin-left: 5.5rem;">{remark}</span></p>'+
        '</div>'+
        '<div class="order-detail-middle module" id="module" style="padding:1rem 1.5rem 0.1rem;">'+
        '<p class="font-12">'+
        '<label class="fontColor-777">支付方式</label><span class="fontColor-666" style="float:right;">{payWay}</span></p>'+
        '<div class="clearfix"></div>'+
        '<div class="payDetail font-12">'+
        '<label class="fontColor-777">金额详情</label>'+
        '<div class="order-money-detail fontColor-666" style="display: none;">'+
        '<p><label class="fontColor-777">机票</label><span class="font-12 fontColor-ff6" style="float:right;">{planPrice}<a href="javascript:;" class="font-11" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
        '<div class="clearfix"></div>'+
        '<p><label class="fontColor-777" style="width: 10rem;">民航基金/燃油</label><span class="font-12 fontColor-ff6" style="float:right;">{buildFee}<a href="javascript:;" class="font-11" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
        '<div class="clearfix"></div>'+
        '<p class="insure"><label class="fontColor-777">保险</label><span class="font-12 fontColor-ff6" style="float:right;">{insure}<a href="javascript:;" class="font-11" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
        '</div>'+
        '<div class="clearfix"></div>'+
        '</div>'+
        '<p class="font-12">'+
        '<label class="payFee fontColor-777" style="float:left;display: none;">支付金额</label><span class="totelFee fontColor-ff6" style="float:right;margin-top: -1.5rem;"><b style="font-weight:normal;">{totalFee}</b><a href="javascript:;" class="font-11" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
        '<div class="clearfix"></div>'+
        '<p class="returnFee font-12" style="margin-top:-15px;">'+
        '<label class="feeCont fontColor-777" style="width:7.5rem;display:none;">退票费</label><span class="yuTicketFee fontColor-ff6" style="float:right;display:none;"><a href="javascript:;" class="yuTikFee" style="color: #ff600a;"></a><a href="javascript:;" class="font-11" style="margin-left: 3px;color: #ff600a;">元</a></span><span class="returnTicketFee fontColor-ff6" style="float:right;display:none;"><a href="javascript:;" class="returnTikFee" style="color: #ff600a;"></a><a href="javascript:;" class="font-11" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
        '</div>'+
        '<div class="module reality" style="display:none;border:none;background:#fff;">'+
        '<p class="font-12">'+
        '<label class="realityFee fontColor-777">实际退款</label><span class="fontColor-ff6" style="float:right;"><a href="javascript:;" class="reaFee" style="color: #ff600a;"></a><a href="javascript:;" class="font-11" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
        '</div>'+

        '<div class="order-detail-middle module" id="change" style="display:none;">'+
        '<div class="font-12">'+
        '<label class="fontColor-777">金额详情</label>'+
        '<div class="order-money-detail fontColor-666" style="display: block;">'+
        '<p><label class="font-12 fontColor-777">机票</label><span class="font-12 fontColor-ff6" style="float:right;">{originalOrderFlightFee}</span></p>'+
        '<p><label class="font-12 fontColor-777">民航基金/燃油</label><span class="font-12 fontColor-ff6" style="float:right;">{originalbuildFee}</span></p>'+
        '<p class="insure"><label class="font-12 fontColor-777">保险</label><span class="font-12 fontColor-ff6" style="float:right;">{originalOrderFlightAccidentInsurance}</span></p>'+
        /*'<p><label class="fontColor-777">原订单金额</label><span class="font-12 fontColor-ff6" style="float:right;">{originalOrderMoney}</span></p>'+*/
        '<p><label class="fontColor-777">改期/升舱费</label><span class="font-12 fontColor-ff6" style="float:right;">{changeFee}</span></p>'+
        '<p><label class="fontColor-777">总金额</label><span class="font-12 fontColor-ff6" style="float:right;">{changeTotalFee}</span></p>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="order-detail-bottom" style="padding: 0;margin-top: 6rem;display: none;">'+
        '<a href="javascript:;" class="font-12 reTicket" style="display: block;color: #49B0FF;border-top: 1px solid #eee;padding-right: 2rem;padding-bottom: 1rem;"><small class="tui" style="font-size: 14px;">退票</small></a>'+
        '</div>'
    },
    init: function() {
        var self = this;
        self.bindEvent();
        //self.locadHtml();
    },
    /*locadHtml : function () {
        var self = this;
        var tpl = "";
        var item = {};
        var itemBack = {};
        var flightPayItemsList = [];
        var cause = localStorage.getItem('cause');
        var remark = localStorage.getItem('remark');
        if(remark == null){
            remark = "";
        }
        var personName = localStorage.getItem('personName');
        var identity_card = localStorage.getItem('identity_card');
        self.config.result = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.localStart)));
        console.log(self.config.result);
        var planPrice = self.config.result.freightList[self.config.result.countIndex].cabinPrice,
            buildFee = self.config.result.freightList[self.config.result.countIndex].airportBuildFee,
            insure = localStorage.getItem("insure");
        localStorage.setItem("goTotelPrice",planPrice*1 + buildFee*1+insure*1);
        self.config.passageNo = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.passage)));
        for (var i = 0; i < self.config.passageNo.length; i++) {
            flightPayItemsList.push({"orderUuid":self.config.passageNo[i].orderUuid});
        }
        self.config.dataRe = {
            flightPayItemsList:flightPayItemsList
        };
        var goNo = self.config.passageNo[0].orderNumber;
        item = {
            date: self.config.result.dateDay,
            departureDate: self.config.result.departureDate,
            beginTime: switchTime(self.config.result.beginTime),
            arriveAirportNameArriveTerminal: self.config.result.arriveAirportName + self.config.result.arriveTerminal,
            diffTime: self.config.result.diffTime,
            carrierNameFlightNo: self.config.result.carrierName + " " + self.config.result.carrierCode + self.config.result.flightNo,
            planeType:self.config.result.planeType,
            mealCode: self.config.result.mealCode && self.config.result.mealName || "无餐食",
            endTime: switchTime(self.config.result.endTime),
            departAirportName: self.config.result.departAirportName,
            departAirportNameDepartTerminal: self.config.result.departAirportName + self.config.result.departTerminal,
            minPrice: self.config.result.minPrice,
            passageNo:goNo,
            space:self.config.result.freightList[self.config.result.countIndex].cabinName,
            perCode:localStorage.getItem(self.config.identity_card),
            personName:localStorage.getItem(self.config.personName),
            planPrice:planPrice,
            buildFee:buildFee,
            insure:insure,
            totalFee:planPrice*1 + buildFee*1+insure*1,
            perName:personName,
            perCodeId:identity_card,
            departmentName:localStorage.getItem("departmentName"),
            cause:cause,
            remark:remark
        };
        tpl += BASE.lang.sub(self.config.html, item);
        if (localStorage.getItem(self.config.jouryType) == "RT") {
            self.config.resultBack = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.localEnd)));
            var planPriceBack = self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinPrice,
                buildFeeBack = self.config.resultBack.freightList[self.config.resultBack.countIndex].airportBuildFee,
                insureBack = localStorage.getItem("insure");
            localStorage.setItem("backTotelPrice", planPriceBack * 1 + buildFeeBack * 1 + insureBack * 1);
            var backNo = self.config.passageNo[1].orderNumber;
            itemBack = {
                date: self.config.resultBack.dateDay,
                beginTime: switchTime(self.config.resultBack.beginTime),
                arriveAirportNameArriveTerminal: self.config.resultBack.arriveAirportName + self.config.resultBack.arriveTerminal,
                diffTime: self.config.resultBack.diffTime,
                carrierNameFlightNo: self.config.resultBack.carrierName + " " + self.config.result.carrierCode + self.config.resultBack.flightNo,
                planeType:self.config.result.planeType,
                mealCode: self.config.result.mealCode && self.config.result.mealName || "无餐食",
                endTime: switchTime(self.config.resultBack.endTime),
                departAirportNameDepartTerminal: self.config.resultBack.departAirportName + self.config.resultBack.departTerminal,
                minPrice: self.config.resultBack.minPrice,
                passageNo: backNo,
                space: self.config.result.freightList[0].cabinName,
                perCode: localStorage.getItem(self.config.identity_card),
                personName: localStorage.getItem(self.config.personName),
                planPrice: planPriceBack,
                buildFee: buildFeeBack,
                insure: insureBack,
                totalFee: planPriceBack * 1 + buildFeeBack * 1 + insureBack * 1,
                perName:personName,
                perCodeId:identity_card,
                departmentName:localStorage.getItem("departmentName"),
                cause:cause,
                remark:remark
            };
            tpl += BASE.lang.sub(self.config.html, itemBack);
        }
        $(".ticketCon").html(tpl);
    },*/
    bindEvent: function(){
        var self = this;
        /*var yuFee = localStorage.getItem("yuFee");
        if(yuFee == "0" || yuFee == 0){
            yuFee = "0";
        }else{
            yuFee = "-" + yuFee;
        }
        $(".yuTicketFee").find(".yuTikFee").text(yuFee);*/
        var status = getQueryString("status");//从订单列表进
        console.log(status);

        var orderUuid = getQueryString("orderUuid");//共有的
        
        var refundApply = getQueryString("refundApply");
        var type = getQueryString("orderType");//从订单详情进
        var data = {
            "orderUuid":orderUuid,
            "refundTicketApproveNo":refundApply
        };

        var num = 0;
        var getStatus = "";
        if(status == null){
            $(".bg").show();
            $(".loading").show();
            var logData =$.extend({url:API.AIR_TICKER.REFUND_TICKET},data);
            logRequest(logData);
            ajaxRequest({url:API.AIR_TICKER.REFUND_TICKET,data:data},function (data) {//退票
                $(".bg").hide();
                $(".loading").hide();
                console.log(data.content.returnMsg);
                //alert(JSON.stringify(data));
                var orderStatus = data.content.orderStatus;
                if(orderStatus == 9 || orderStatus == "9"){
                    getReturnStatus();
                }else if(orderStatus == 10){
                    getReturnStatus();
                    var totelFee = $(".totelFee").find("b").html();
                    console.log(totelFee);
                    var realityFee = (totelFee - data.content.refundFee).toFixed(2);
                    console.log(realityFee);
                    var refundFee;
                    if(data.content.refundFee == "0" || data.content.refundFee == 0){
                        refundFee = "0";
                    }else{
                        refundFee = "-" + data.content.refundFee;
                    }
                    $(".return-txt").hide();
                    $(".return-ticket-status").show().text("退票成功");
                    $(".feeCont").show().text("退票费");
                    //$(".yuTicketFee").hide().find(".yuTikFee").text(yuFee);
                    $(".returnTicketFee").show().find(".returnTikFee").text(refundFee);
                    $(".reality").show().find(".reaFee").text(realityFee);
                    $(".bookAgain").show();

                    if(isiOS){
                        showServiceButton(true);
                    }else if(isAndroid){
                        window.android.showServiceButton(true);
                    }
                } else if(orderStatus == 7){
                    $(".bg").show();
                    $(".tuiFalse").show();
                }else if(status == "11"){
                    $(".bg").show();
                    $(".tuiFalse").show();

                    $(".bg").on("tap",function(){
                        $(this).hide();
                        $(".tuiFalse").hide();
                        window.location.href="order-info.html?orderUuid=" + orderUuid + "&status=11";
                    });
                    $(".tuiFalse .yes").on("tap",function(){
                        $(".bg").hide();
                        $(".tuiFalse").hide();
                        window.location.href="order-info.html?orderUuid=" + orderUuid + "&status=11";
                    });
                }
                // else if(orderStatus == 11){
                //     $(".return-txt").show();
                //     $(".return-ticket-status").text("退票失败");
                //     $(".feeCont").text("预计退票费");
                //     $(".yuTicketFee").show().find(".yuTikFee").text(yuFee);
                //     $(".returnTicketFee").hide();
                //     $(".reality").hide();
                //     $(".bookAgain").hide();
                //     if(isiOS){
                //         showServiceButton(true);
                //     }else if(isAndroid){
                //         window.android.showServiceButton(true);
                //     }
                // }
            },function(data) {
                clearInterval(getStatus);
                $(".warnText").fadeIn('slow').find("p").text(data.message);
                setTimeout(fadeOut,2000);
                return false;
            });
        }else{
            detail(orderUuid,status);
        }

        function getReturnStatus(){
            num++;
            if(num < 31){
                var logRequestList = {url:API.AIR_TICKER.ORDER_DETAIL,"orderUuid": orderUuid};
                logRequest(logRequestList);
                ajaxRequest({url:API.AIR_TICKER.ORDER_DETAIL,data:{"orderUuid": orderUuid}},function(data){
                    console.log(data);
                    var tpl = "",item = {};
                    var status = data.content.orderStatus,
                        travelFlight = data.content.travelFlight,
                        travelPassenger = data.content.travelPassenger,
                        remark = travelPassenger.remark;

                    var perCode = travelPassenger.certificateNumber;
                    var perCodeStr = perCode.substring(6,14);
                    var perCodeNew = perCode.replace(perCodeStr,"********");

                    if(remark == null){
                        remark = "";
                    }
                    var mealCode,disRate;
                    if(travelFlight.mealCode != ""){
                        mealCode = "有餐食";
                    }else{
                        mealCode = "无餐食";
                    }

                    if(travelFlight.discountRate == 100) {
                        disRate = "全价";
                    }else if(travelFlight.discountRate == 0 || travelFlight.discountRate == null || travelFlight.discountRate > 100) {
                        disRate = "";
                    }else{
                        disRate = (travelFlight.discountRate)/10 + "折";
                    }

                    var buildFee,insure;
                    if(travelFlight.airportConstructionFee == null){
                        buildFee = "0";
                    }else{
                        buildFee = travelFlight.airportConstructionFee;
                    }
                    if(data.content.flightAccidentInsurance == null){
                        insure = "0";
                    }else{
                        insure = data.content.flightAccidentInsurance;
                    }


                    console.log(getHourAndMM((BASE.lang.getLocalTime(new Date(travelFlight.beginTime *1000))).replace("-","/").replace("-","/")));
                    console.log(getHourAndMM(BASE.lang.getLocalTime(new Date(travelFlight.beginTime *1000))));

                    var times = new Date(travelFlight.startDate *1000),
                        week = moment(travelFlight.startDate *1000).format('dddd');

                    var travelEndDate;
                    if(travelFlight.endDate == null){
                        if(travelFlight.beginTime > travelFlight.endTime){
                            var curDate = times.getFullYear()+ '-' + (times.getMonth()+1) + '-' + times.getDate(),
                                endDate = moment(curDate).add(1,'day').format('YYYY-MM-DD');
                            console.log(endDate);
                            travelEndDate = Math.round(new Date(endDate).getTime()/1000);
                        }else{
                            travelEndDate = travelFlight.startDate;
                        }
                    }else{
                        travelEndDate = travelFlight.endDate;
                    }
                    var endTimes = new Date(travelEndDate *1000),
                        endWeek = moment(travelEndDate *1000).format('dddd');

                    item = {
                        //date: times.getFullYear()+ '-' + (times.getMonth()+1) + '-' + times.getDate() + " " + week,
                        date: (times.getMonth()+1) + '月' + times.getDate() + "日 " + week,
                        //beginTime: getHourAndMM((BASE.lang.getLocalTime(new Date(travelFlight.beginTime *1000))).replace("-","/").replace("-","/")),
                        beginTime: moment(travelFlight.beginTime * 1000).format("HH:mm"),
                        arriveAirport: travelFlight.arriveAirport,
                        arriveAirportNameArriveTerminal: travelFlight.arriveAirportName + travelFlight.arriveTerminal,
                        diffTime: data.content.diffTime,
                        carrierCode: travelFlight.carrierCode,
                        carrierNameFlightNo: travelFlight.carrierName + " " + travelFlight.carrierCode + travelFlight.flightNo,
                        planeType: travelFlight.flightType,
                        mealCode: mealCode,
                        //endTime: getHourAndMM((BASE.lang.getLocalTime(new Date(travelFlight.endTime *1000))).replace("-","/").replace("-","/")),
                        dateArrive: (endTimes.getMonth()+1) + '月' + endTimes.getDate() + "日 " + endWeek,
                        endTime: moment(travelFlight.endTime * 1000).format("HH:mm"),
                        departAirport: travelFlight.departAirport,
                        departAirportNameDepartTerminal: travelFlight.departAirportName + travelFlight.departTerminal,
                        minPrice: travelFlight.minPrice,
                        passageNo:data.content.orderNumber,
                        createTime: moment(travelFlight.createTime * 1000).format("YYYY/MM/DD HH:mm:ss"),
                        cabinCode:travelFlight.freightSpaceType,
                        space:flightCabin[travelFlight.baseCabin]||travelFlight.baseCabin,
                        discountRate: disRate,
                        payWay: payType[data.content.payWay],
                        planPrice: travelFlight.flightFee,
                        buildFee: buildFee,
                        insure: insure,
                        totalFee:(travelFlight.flightFee)*1 + buildFee*1 + insure*1,
                        perCode: perCodeNew,
                        personName:travelPassenger.passengerName,
                        departmentName:travelPassenger.departmentName,
                        cause:travelPassenger.travelReason || "",
                        ticketNo:data.content.ticketNo,
                        remark:remark
                    };
                    if(data.content.casApprove){
                        item.casApproveNo=data.content.casApprove.casApproveNo||""
                    }
                    else{
                        item.casApproveNo=""
                    }
                    //console.info(returnTicket.config.html);
                    //console.info(item);
                    tpl += BASE.lang.sub(returnTicket.config.html, item);
                    //console.info(tpl);
                    $(".ticketCon").html(tpl);
                    if(!item.casApproveNo){
                        $(".casApproveNo").hide();
                    }
                    $(".casApproveNo").on("tap",function () {
                        window.location.href="zhfApproInfo.html?approvalNo="+item.casApproveNo;
                    });


                    //判断是否有机型
                    if($(".planeType").text() == "null"){
                        $(".planeType").hide();
                    }

                    if(status == "9"){
                        getStatus = setInterval(getReturnStatus,2000);
                        $(".return-txt").hide();
                        $(".return-ticket-status").show().text("退票中");
                        //$(".feeCont").text("预计退票费");
                        //$(".yuTicketFee").show().find(".yuTikFee").text(yuFee);
                        $(".returnTicketFee").hide();
                        $(".reality").hide();
                        $(".bookAgain").hide();
                    }else if(status == "10"){
                        clearInterval(getStatus);
                        var totelFee = $(".totelFee").find("b").html();
                        console.log(totelFee);
                        var realityFee = (totelFee - data.content.refundFee).toFixed(2);
                        var refundFee;
                        if(data.content.refundFee == "0" || data.content.refundFee == 0){
                            refundFee = "0";
                        }else{
                            refundFee = "-" + data.content.refundFee;
                        }
                        $(".return-txt").hide();
                        $(".return-ticket-status").show().text("退票成功");
                        $(".feeCont").show().html("退票费");
                        //$(".yuTicketFee").hide().find(".yuTikFee").text(yuFee);
                        $(".returnTicketFee").show().find(".returnTikFee").text(refundFee);
                        $(".reality").show().find(".reaFee").text(realityFee);
                        $(".bookAgain").show();

                        if(isiOS){
                            showServiceButton(true);
                        }else if(isAndroid){
                            window.android.showServiceButton(true);
                        }
                    }
                    else if(status == "11"){
                        clearInterval(getStatus);
                        $(".bg").show();
                        $(".tuiFalse").show();
                        /*$(".return-txt").show();
                        $(".return-ticket-status").text("退票失败").css("color","#ff600a");
                        $(".feeCont").text("预计退票费");
                        $(".yuTicketFee").show().find(".yuTikFee").text(yuFee);
                        $(".returnTicketFee").hide();
                        $(".reality").hide();
                        $(".bookAgain").hide();*/

                        $(".bg").on("tap",function(){
                            $(this).hide();
                            $(".tuiFalse").hide();
                            window.location.href="order-info.html?orderUuid=" + orderUuid + "&status=11";
                        });
                        $(".tuiFalse .yes").on("tap",function(){
                            $(".bg").hide();
                            $(".tuiFalse").hide();
                            window.location.href="order-info.html?orderUuid=" + orderUuid + "&status=11";
                        });
                    }

                    if(data.content.flightAccidentInsurance == "0" || data.content.flightAccidentInsurance == "" || data.content.flightAccidentInsurance == null){
                        $(".insure").hide();
                    }else{
                        $(".insure").show();
                    }

                    if(type==1) {
                        $(".flightListBottom").append('<i class="font-10"></i>');
                    } else if(type==2) {
                        $(".flightListBottom").append('<i class="qucheng-color font-10">去程</i>');
                    } else if(type==3) {
                        $(".flightListBottom").append('<i class="fancheng-color font-10">返程</i>');
                    }

                    var detailSwitch = true;
                    $("#module").on("tap",function(){
                        if (detailSwitch == false) {
                            $(".payDetail").css("height","16px");
                            $(".order-money-detail").hide();
                            $(".payFee").hide();
                            $(".totelFee").css("margin-top","-12px");
                            $(".returnFee").css("margin-top","-12px");
                            detailSwitch = true;
                        } else {
                            $(".payDetail").css("height","48px");
                            $(".order-money-detail").show();
                            $(".payFee").show();
                            $(".totelFee").css("margin-top","0");
                            $(".returnFee").css("margin-top","0");
                            detailSwitch = false;
                        }
                    })
                });
            }else{
                clearInterval(getStatus);
                window.location.href = "order-list.html?orderType=0";
                /*if(isiOS) {
                    toOrderList();
                }else if(isAndroid){
                    window.android.toOrderList();
                }*/
            }
        }

        $(".goOldOrder").on("tap",function(){
            var oldUuid = $(this).attr("data-uuid");
            window.location.href = "return-ticket-status.html?orderUuid=" + oldUuid + "&isOldOrder=1&status=14";
        });

        /*申请退票*/
        $(".tui").live("tap",function(){
            console.log(reTicket2);
            if(reTicket2){
                reTicket2 = false;
                $(".reTrue").show();
                $(".bg").show();
            }
        });

        $(".reTrue .yes").on("tap",function(){
            $(".bg").hide();
            $(".yesNo").hide();
            window.location.href = "return-ticket-status.html?orderUuid=" + orderUuid+"&orderType='1'&refundApply=''";
        });
    }
};

function detail(orderUuid,status){
    var isOldOrder = getQueryString("isOldOrder");//去看之前的订单
    /*if(status != "14"){
        var logRequestList = {url:API.AIR_TICKER.GET_REFUND_FEE,"orderUuid": orderUuid};
        logRequest(logRequestList);
        ajaxRequest({url:API.AIR_TICKER.GET_REFUND_FEE,data:{"orderUuid": orderUuid}},function(data){
            $(".bg").hide();
            $(".loading").hide();
            if(data.content == "0" || data.content == 0 || data.content == null){
                $(".yuTicketFee").find(".yuTikFee").text("0");
            }else{
                $(".yuTicketFee").find(".yuTikFee").text("-" + data.content);
            }
        });
    }*/
    var logRequestList = {url:API.AIR_TICKER.ORDER_DETAIL,"orderUuid": orderUuid};
    logRequest(logRequestList);
    ajaxRequest({url:API.AIR_TICKER.ORDER_DETAIL,data:{"orderUuid": orderUuid}},function(data){
        console.log(data);
        var tpl = "",item = {};
        var status = data.content.orderStatus,
            travelFlight = data.content.travelFlight,
            travelPassenger = data.content.travelPassenger,
            orderChangeInfo = "",
            remark = travelPassenger.remark;

        if(status == "14" && isOldOrder == null){
            orderChangeInfo = data.content.orderChangeInfo;
            var timesDepart = new Date(orderChangeInfo.changedDepartTime *1000),
                weekDepart = moment(orderChangeInfo.changedDepartTime *1000).format('dddd');
            var timesArrive = new Date(orderChangeInfo.changedArriveTime *1000),
                weekArrive = moment(orderChangeInfo.changedArriveTime *1000).format('dddd');

            var perCode = orderChangeInfo.idCard;
            var perCodeStr = perCode.substring(6,14);
            var perCodeNew = perCode.replace(perCodeStr,"********");

            var disRate;
            if(orderChangeInfo.changedDiscountRate == 100) {
                disRate = "全价";
            }else if(orderChangeInfo.changedDiscountRate == 0 || orderChangeInfo.changedDiscountRate == null || orderChangeInfo.changedDiscountRate > 100) {
                disRate = "";
            }else{
                disRate = (orderChangeInfo.changedDiscountRate)/10 + "折";
            }

            var changedOrderStatus = orderChangeInfo.changedOrderStatus;

            var originalbuildFee,originalOrderFlightAccidentInsurance;
            if(orderChangeInfo.originalOrderAirportConstructionFee == null){
                orderChangeInfo.originalOrderAirportConstructionFee = "0";
            }
            if(orderChangeInfo.originalOrderAirportFuelFee == null){
                orderChangeInfo.originalOrderAirportFuelFee = "0";
            }
            originalbuildFee = (orderChangeInfo.originalOrderAirportConstructionFee*1+orderChangeInfo.originalOrderAirportFuelFee*1).toFixed(2);

            if(orderChangeInfo.originalOrderFlightAccidentInsurance == null){
                originalOrderFlightAccidentInsurance = "0";
            }else{
                originalOrderFlightAccidentInsurance = orderChangeInfo.originalOrderFlightAccidentInsurance;
            }

            item = {
                date: (timesDepart.getMonth()+1) + '月' + timesDepart.getDate() + "日 " + weekDepart,
                beginTime: moment(orderChangeInfo.changedDepartTime * 1000).format("HH:mm"),
                //arriveAirport: travelFlight.arriveAirport,
                arriveAirportNameArriveTerminal: orderChangeInfo.changedArriveAirport + orderChangeInfo.changedArriveTerminal,
                diffTime: orderChangeInfo.changedDiffTime,
                carrierCode: orderChangeInfo.carrier,
                carrierNameFlightNo: orderChangeInfo.carrierName + " " + orderChangeInfo.carrier + orderChangeInfo.flightNo,
                planeType: orderChangeInfo.changedPlaneType,
                //mealCode: mealCode,
                dateArrive: (timesArrive.getMonth()+1) + '月' + timesArrive.getDate() + "日 " + weekArrive,
                endTime: moment(orderChangeInfo.changedArriveTime * 1000).format("HH:mm"),
                //departAirport: travelFlight.departAirport,
                departAirportNameDepartTerminal: orderChangeInfo.changedDepartAirport + orderChangeInfo.changedDepartTerminal,
                //minPrice: travelFlight.minPrice,
                passageNo:orderChangeInfo.changedOrderNumber,
                //createTime: moment(orderChangeInfo.createTime * 1000).format("YYYY/MM/DD HH:mm:ss"),
                cabinCode:orderChangeInfo.baseCabinName,
                space:flightCabin[orderChangeInfo.baseCabinName],
                discountRate: disRate,
                //planPrice: travelFlight.flightFee,
                //buildFee: buildFee,
                //insure: insure,
                //totalFee: data.content.totalFee,
                perCode: perCodeNew,
                personName: orderChangeInfo.passengerName,
                departmentName: orderChangeInfo.departmentName,
                cause: orderChangeInfo.travelReason,
                ticketNo: orderChangeInfo.changedTicketNo,
                remark: orderChangeInfo.remark,
                changedJourneyType: orderChangeInfo.changedJourneyType,
                originalOrderFlightFee: orderChangeInfo.originalOrderFlightFee,
                originalbuildFee: originalbuildFee,
                originalOrderFlightAccidentInsurance: originalOrderFlightAccidentInsurance,
                originalOrderMoney: (orderChangeInfo.originalOrderMoney*1).toFixed(2),
                changeFee: orderChangeInfo.changeFee,
                changeTotalFee: (orderChangeInfo.originalOrderMoney*1 + orderChangeInfo.changeFee*1).toFixed(2)
            };
            if(data.content.casApprove){
                item.casApproveNo=data.content.casApprove.casApproveNo||""
            }
            else{
                item.casApproveNo=""
            }
            if(item.casApproveNo=""){
                $(".casApproveNo").hide();
            }

            $(".goOldOrder").show().attr("data-uuid",orderChangeInfo.originalOrderUuid);
            $(".return-txt").hide();
            $(".return-ticket-status").show().text("已改签");
            $(".bookAgain").hide();

            /*$(".returnFee").html("");
            $(".reality").hide();
            $(".order-money-detail").append('<div class="clearfix"></div><p><label class="fontColor-777">改签费</label><span class="font-12 fontColor-ff6" style="float:right;">' + orderChangeInfo.changeFee + '<a href="javascript:;" class="font-11" style="margin-left: 3px;color: #ff600a;">元</a></span></p>');*/
        }else{
            var perCode = travelPassenger.certificateNumber;
            var perCodeStr = perCode.substring(6,14);
            var perCodeNew = perCode.replace(perCodeStr,"********");

            if(remark == null){
                remark = "";
            }
            var mealCode,disRate;
            if(travelFlight.mealCode != ""){
                mealCode = "有餐食";
            }else{
                mealCode = "无餐食";
            }

            if(travelFlight.discountRate == 100) {
                disRate = "全价";
            }else if(travelFlight.discountRate == 0 || travelFlight.discountRate == null || travelFlight.discountRate > 100) {
                disRate = "";
            }else{
                disRate = (travelFlight.discountRate)/10 + "折";
            }

            var buildFee,insure;
            if(travelFlight.airportConstructionFee == null){
                buildFee = "0";
            }else{
                buildFee = travelFlight.airportConstructionFee;
            }
            if(data.content.flightAccidentInsurance == null){
                insure = "0";
            }else{
                insure = data.content.flightAccidentInsurance;
            }

            console.log(getHourAndMM((BASE.lang.getLocalTime(new Date(travelFlight.beginTime *1000))).replace("-","/").replace("-","/")));
            console.log(getHourAndMM(BASE.lang.getLocalTime(new Date(travelFlight.beginTime *1000))));

            var times = new Date(travelFlight.startDate *1000),
                week = moment(travelFlight.startDate *1000).format('dddd');
            var endTimes = new Date(travelFlight.endDate *1000),
                endWeek = moment(travelFlight.endDate *1000).format('dddd');
            item = {
                //date: times.getFullYear()+ '-' + (times.getMonth()+1) + '-' + times.getDate() + " " + week,
                date: (times.getMonth()+1) + '月' + times.getDate() + "日 " + week,
                //beginTime: getHourAndMM((BASE.lang.getLocalTime(new Date(travelFlight.beginTime *1000))).replace("-","/").replace("-","/")),
                beginTime: moment(travelFlight.beginTime * 1000).format("HH:mm"),
                arriveAirport: travelFlight.arriveAirport,
                arriveAirportNameArriveTerminal: travelFlight.arriveAirportName + travelFlight.arriveTerminal,
                diffTime: data.content.diffTime,
                carrierCode: travelFlight.carrierCode,
                carrierNameFlightNo: travelFlight.carrierName + " " + travelFlight.carrierCode + travelFlight.flightNo,
                planeType: travelFlight.flightType,
                mealCode: mealCode,
                //endTime: getHourAndMM((BASE.lang.getLocalTime(new Date(travelFlight.endTime *1000))).replace("-","/").replace("-","/")),
                dateArrive: (endTimes.getMonth()+1) + '月' + endTimes.getDate() + "日 " + endWeek,
                endTime: moment(travelFlight.endTime * 1000).format("HH:mm"),
                departAirport: travelFlight.departAirport,
                departAirportNameDepartTerminal: travelFlight.departAirportName + travelFlight.departTerminal,
                minPrice: travelFlight.minPrice,
                passageNo:data.content.orderNumber,
                createTime: moment(travelFlight.createTime * 1000).format("YYYY/MM/DD HH:mm:ss"),
                cabinCode:travelFlight.freightSpaceType,
                space:flightCabin[travelFlight.baseCabin]||travelFlight.baseCabin,
                discountRate: disRate,
                payWay: payType[data.content.payWay],
                planPrice: travelFlight.flightFee,
                buildFee: buildFee,
                insure: insure,
                totalFee:data.content.totalFee,
                perCode: perCodeNew,
                personName:travelPassenger.passengerName,
                departmentName:travelPassenger.departmentName,
                cause:travelPassenger.travelReason || "",
                ticketNo:data.content.ticketNo,
                remark:remark
            };
            if(data.content.casApprove){
                item.casApproveNo=data.content.casApprove.casApproveNo||""
            }
            else{
                item.casApproveNo=""
            }
        }

        //console.info(returnTicket.config.html);
        //console.info(item);
        tpl += BASE.lang.sub(returnTicket.config.html, item);
        //console.info(tpl);
        $(".ticketCon").html(tpl);
        if(status == "14" && isOldOrder == null){
            $(".order-detail-bottom").show();
        }

        if(changedOrderStatus == "10"){
            $(".return-ticket-status").show().text("已改签票退票成功");
            $(".order-detail-bottom").hide();
        }else if(changedOrderStatus == "9"){
            $(".return-ticket-status").show().text("已改签票退票中");
            $(".order-detail-bottom").hide();
        }

        if(!item.casApproveNo){
            $(".casApproveNo").hide();
        }
        $(".casApproveNo").on("tap",function () {
            window.location.href="zhfApproInfo.html?approvalNo="+item.casApproveNo;
        });

        //判断是否有机型
        if($(".planeType").text() == "null"){
            $(".planeType").hide();
        }

        if(status == "9"){
            $(".return-txt").hide();
            $(".return-ticket-status").show().text("退票中");
            //$(".feeCont").text("预计退票费");
            //$(".yuTicketFee").show();
            $(".returnTicketFee").hide();
            $(".reality").hide();
            $(".bookAgain").hide();
        }else if(status == "10"){
            var totelFee = $(".totelFee").find("b").html();
            console.log(totelFee);
            var realityFee = (totelFee - data.content.refundFee).toFixed(2);
            var refundFee;
            if(data.content.refundFee == "0" || data.content.refundFee == 0){
                refundFee = "0";
            }else{
                refundFee = "-" + data.content.refundFee;
            }
            $(".return-txt").hide();
            $(".return-ticket-status").show().text("退票成功");
            $(".feeCont").show().html("退票费");
            $(".yuTicketFee").hide();
            $(".returnTicketFee").show().find(".returnTikFee").text(refundFee);
            $(".reality").show().find(".reaFee").text(realityFee);
            $(".bookAgain").show();

            if(isiOS){
                showServiceButton(true);
            }else if(isAndroid){
                window.android.showServiceButton(true);
            }
        }else if(status == "14"){
            if(isOldOrder == "1"){
                $(".goOldOrder").hide();
                $(".return-txt").hide();
                $(".return-ticket-status").hide();
                $(".returnFee").html("");
                $(".reality").hide();
                $(".bookAgain").hide();
            }else{
                $(".createTime").hide();
                $(".changeReason").hide();
                $("#module").hide();
                $("#change").show();
            }
        }
        // else if(status == "11"){
        //     $(".return-txt").show();
        //     $(".return-ticket-status").text("退票失败").css("color","#ff600a");
        //     $(".feeCont").text("预计退票费");
        //     $(".yuTicketFee").show();
        //     $(".returnTicketFee").hide();
        //     $(".reality").hide();
        //     $(".bookAgain").hide();
        // }
        else if(status == "12"){
            $(".return-ticket-status").show().text("行程结束");
        }

        if(data.content.flightAccidentInsurance == "0" || data.content.flightAccidentInsurance == "" || data.content.flightAccidentInsurance == null){
            $(".insure").hide();
        }else{
            $(".insure").show();
        }

        /*if(type==1) {
            $(".flightListBottom").append('<i class="font-10"></i>');
        } else if(type==2) {
            $(".flightListBottom").append('<i class="qucheng-color font-10">去程</i>');
        } else if(type==3) {
            $(".flightListBottom").append('<i class="fancheng-color font-10">返程</i>');
        }*/

        var detailSwitch = true;
        $("#module").on("tap",function(){
            if (detailSwitch == false) {
                $(".payDetail").css("height","16px");
                $(".order-money-detail").hide();
                $(".payFee").hide();
                $(".totelFee").css("margin-top","-12px");
                $(".returnFee").css("margin-top","-12px");
                detailSwitch = true;
            } else {
                $(".payDetail").css("height","48px");//48
                $(".order-money-detail").show();
                $(".payFee").show();
                $(".totelFee").css("margin-top","0");
                $(".returnFee").css("margin-top","0");
                detailSwitch = false;
            }
        })
    });
}

//重新预订
$(".bookAgain").on("click",function(){
    var token = localStorage.getItem("token");
    var casUserIdx = localStorage.getItem("casUserIdx");
    var appId = localStorage.getItem("appId");
    window.location.href = "home.html?init=2&cas_access_token=" + token + "&appId=" + appId + "&casUserIdx=" + casUserIdx;
});

$(".no").on("tap",function(){
    reTicket2 = true;
    /*if(isiOS){
     window.location.href = "tel:4000513568";
     }else if(isAndroid){
     window.android.callWaiter();
     }*/
});

$(".bg").on("tap",function(){
    $(".bg").hide();
    $(".yesNo").hide();
});

$(".goBack").on("tap",function(){
    window.history.back();
});

returnTicket.init();