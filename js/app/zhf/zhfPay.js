;(function($){
    var aliPay = getQueryString("alipay");
    console.log(aliPay);
    if(aliPay == "alipay"){
        $(".bg").show();
        $(".ticket-mask").show();
        getStatus = setInterval(getFlightOrderStatus,2000);
    }

    if(localStorage.getItem("totalFee") != null){
        var totalFee = localStorage.getItem("totalFee");
        //改期跳转过来的  费用用下边的
        $(".totalFee").text(totalFee);
    }

   //改期跳转过来的  费用用下边的
    if(getQueryString("changeFee")){
        $(".totalFee").text(getQueryString("changeFee"));
    }

    var causeCode = "";
    if(localStorage.getItem("causeType") != null){
        var causeType = JSON.parse(localStorage.getItem("causeType"));
        causeCode = causeType.causeCode;
    }
    if(causeCode == "1" || causeType == "1"){
        $(".header").show();
        $(".payStyle").show();
        $("#uatp").hide();
        $(".yin").hide();
        $("#personal").hide();

        $(".bg").show();
        $(".payStatus h3").text("确认支付");
        $(".cancelPay").show();
        $(".startPay").show();
        $(".paying").hide();
        $(".paySuccess").hide();
        $(".payFailure").hide();
        $("#payImg").css({"left":"1px"});
        $(".surePay").animate({"bottom":"0"},500);
    }else if(causeCode == "0" || causeType == "0"){
        $(".header").show();
        $("#personal").show();
    }

    var orderUuidList = [],
        flightTicketItemList = [];
    var bookList = JSON.parse(localStorage.getItem("bookList"));
    //如果是重改期跳转过来的，那么会报错，所以会判断一下
    if(bookList){
        for (var i = 0; i < bookList.length; i++) {
            if(bookList[i].orderStatus == -1){
                orderUuidList.push(bookList[i].orderUuid);
                //flightTicketItemList.push({"orderUuid":bookList[i].orderUuid});
            }
        }
    }else{
        var orderUuid = getQueryString("orderUuid");
        orderUuidList.push(orderUuid);
    }

    /*var dataList = {
        "flightTicketItemList": flightTicketItemList
    };*/
    var requestList = {
        "orderUuidList": orderUuidList
    };

    var reqData = {
        "orderUuidList": orderUuidList,
        "payType": '2'
    };
    localStorage.setItem("payType","2");
    $(".payStyle li").on("tap",function(){
        var payType = $(this).attr("data-code");
        localStorage.setItem("payType",payType);
        if(payType == "1"){
            ajaxRequest({url: API.AIR_TICKER.CLICK_COUNT},function(data){
                console.log(data);
            });
            window.location.href = "yinpiao.html";
        }else{
            reqData.payType = payType;

            var payWay = $(this).parent("ul").siblings("h3").text();
            console.log(payWay);
            $(".payWay").text(payWay);

            $(".bg").show();
            $(".payStatus h3").text("确认支付");
            $(".cancelPay").show();
            $(".startPay").show();
            $(".paying").hide();
            $(".paySuccess").hide();
            $(".payFailure").hide();
            $("#payImg").css({"left":"1px"});
            $(".surePay").animate({"bottom":"0"},500);
        }

        $(".bg").on("tap",function(){
            $(".bg").hide();
            $(".surePay").animate({"bottom":"-18rem"},500);
        });
    });

    var startX = "",moveX = "",moveNextX = "",X = "",maxMove="",move = "";

    $(".toPay").on("touchstart",function(e){
        e.preventDefault();
        var toPayWidth = $(".toPay").width(),
            imgWidth = $("#payImg").width();
        maxMove = toPayWidth - imgWidth - 10;
        move = toPayWidth - imgWidth -2;
        startX = e.changedTouches[0].pageX;
        //moveNextX = moveX;
    });
    $(".toPay").on("touchmove",function(e){

        e.preventDefault();
        X = e.changedTouches[0].pageX - startX;
        moveX = moveNextX*1 + X*1;
        console.log(moveX);
        if(X < 1){
            $("#payImg").css("left","1px");
        }else if(X > move){
            $("#payImg").css("left",move + "px");
        }
        else{
            $("#payImg").css("left",moveX + "px");
        }
    });
    $(".toPay").on("touchend",function(e){
        e.preventDefault();
        X = e.changedTouches[0].pageX- startX;
        moveX = moveNextX*1 + X*1;
        if(X > maxMove){
            $("#payImg").css("left",maxMove + "px");
            $(".bg").show();
            $(".payStatus h3").text("支付中");
            $(".cancelPay").hide();
            $(".startPay").hide();
            $(".paying").show();
            setTimeout(payFlight,500);
        }else{
            $("#payImg").css("left","1px");
        }
    });

    function payFlight(){
        //if 语句里是加的改签的状态
        console.log(getQueryString("changedOrderNumber"));
        if(getQueryString("changedOrderNumber")){
            var newData={
                payOnly:true,
                rescheduleNo:getQueryString("changedOrderNumber"),
                payType:reqData.payType
            };
            ajaxRequest({url:API.AIR_TICKER.PAY_FLIGHT,data:newData},function (data) {
                console.log(data);
                // /*var content = data.content;
                //  var num = 0;
                //  console.log(content.length);
                //  for(var i=0,len=content.length;i<len;i++){
                //  if(!content[i].XINGYUN_TICKET_PREPARED_OUT){
                //  num++;
                //  console.log(num);
                //  }
                //  }
                if(!data.content.ticketPreparedOut){
                    $(".bg").show();
                    $(".payStatus h3").text("支付失败");
                    $(".cancelPay").show();
                    $(".startPay").hide();
                    $(".paying").hide();
                    $(".payFailure").show();
                }else{
                    if(data.content.alipayResult){//去支付宝支付
                        console.log(data.content.alipayResult);
                        localStorage.setItem("alipayResult",data.content.alipayResult);
                        window.location.href="zhfsyt.html";

                        //$(".aliPay").show().append(data.content.alipayResult);
                    }else if(aliPay == null){
                        $(".bg").show();
                        $(".payStatus h3").text("支付成功");
                        $(".cancelPay").hide();
                        $(".startPay").hide();
                        $(".paying").hide();
                        $(".paySuccess").show();
                        var orderUuid = data.content.returnList[0].orderUuid;
                        console.log(orderUuid);
                        goToOrder(orderUuid);
                    }
                }
            },function(data){
                $(".bg").show();
                $(".payStatus h3").text("支付失败");
                $(".cancelPay").show();
                $(".startPay").hide();
                $(".paying").hide();
                $(".payFailure").show();
            });

            return;
        }
        ajaxRequest({url:API.AIR_TICKER.PAY_FLIGHT,data:reqData},function (data) {
            console.log(data);
            /*var content = data.content;
            var num = 0;
            console.log(content.length);
            for(var i=0,len=content.length;i<len;i++){
                if(!content[i].XINGYUN_TICKET_PREPARED_OUT){
                    num++;
                    console.log(num);
                }
            }*/
            if(!data.content.ticketPreparedOut){
                $(".bg").show();
                $(".payStatus h3").text("支付失败");
                $(".cancelPay").show();
                $(".startPay").hide();
                $(".paying").hide();
                $(".payFailure").show();
            }else{
                if(data.content.alipayResult){
                    console.log(data.content.alipayResult);
                    localStorage.setItem("alipayResult",data.content.alipayResult);
                    window.location.href="zhfsyt.html";
                    //$(".aliPay").show().append(data.content.alipayResult);
                }else if(aliPay == null){
                    var reason = [],num = 0;
                    var returnList = data.content.returnList;
                    for(var i=0,len=returnList.length;i<len;i++){
                        if(returnList[i].XINGYUN_TICKET_PREPARED_OUT){
                            num++;
                        }else{
                            reason.push(returnList[i].XINGYUN_TICKET_PREPARED_FAILED_REASON);
                        }
                    }
                    if(num == len){
                        $(".bg").show();
                        $(".payStatus h3").text("支付成功");
                        $(".cancelPay").hide();
                        $(".startPay").hide();
                        $(".paying").hide();
                        $(".paySuccess").show();
                        getStatus = setInterval(getFlightOrderStatus,2000);
                    }else{
                        $(".bg").show();
                        $(".payStatus h3").text("支付失败");
                        $(".cancelPay").show();
                        $(".startPay").hide();
                        $(".paying").hide();
                        $(".payFail").show().find("p").text(reason.join(","));
                        $(".failOk").on("tap",function(){
                            getStatus = setInterval(getFlightOrderStatus,2000);
                        })
                    }
                }
            }
        },function(data){
            $(".bg").show();
            $(".payStatus h3").text("支付失败");
            $(".cancelPay").show();
            $(".startPay").hide();
            $(".paying").hide();
            $(".payFailure").show();
        });
    }

    $(".cancelPay").on("tap",function(){
        $(".bg").hide();
        $(".surePay").animate({"bottom":"-18rem"},500);
    });
    $(".sureFail").on("tap",function(){
        $(".bg").hide();
        $(".surePay").animate({"bottom":"-18rem"},500);
    });

    //出票中轮巡查状态
    var getStatus = "";
    var num = 0;
    function getFlightOrderStatus(){
        $(".bg").show();
        $(".ticket-mask").show();
        $(".surePay").hide();
        num++;
        if(num < 31){
            var logQequestList =$.extend({url:API.AIR_TICKER.GET_FLIGHT_ORDER_STATUS},requestList);
            logRequest(logQequestList);
            ajaxRequest({url:API.AIR_TICKER.GET_FLIGHT_ORDER_STATUS,data:requestList},function(data){
                console.log(data);
                //alert(data.content[0].payStatus);
                var isRequest = false;
                var tempArray = [],ticketNoArr = [], buyAccidentStatusArray=[],insuranceNoArray=[],buyInsuranceMsgArray=[];
                for(var i=0;i<data.content.length;i++){
                    if(data.content[i].orderStatus===6 || data.content[i].orderStatus==='6'
                        ||data.content[i].orderStatus===-1 || data.content[i].orderStatus==='-1'
                        || ((data.content[i].orderStatus==='1'|| data.content[i].orderStatus===1) && (data.content[i].payStatus != '3' ||　data.content[i].payStatus != 3))){
                        isRequest = true;
                    }

                    tempArray.push(data.content[i].orderStatus);
                    ticketNoArr.push(data.content[i].ticketNo);
                    buyAccidentStatusArray.push(data.content[i].buyAccidentStatus);
                    insuranceNoArray.push(data.content[i].insuranceNo);
                    buyInsuranceMsgArray.push(data.content[i].buyInsuranceMsg);
                }
                if(!isRequest){
                    /*var ticketContent = JSON.parse(localStorage.getItem("ticketContent"));
                    for(var index=0;index<ticketContent.length;index++){
                        ticketContent[index]['orderStatus'] = tempArray[index];
                        ticketContent[index]['ticketNo'] = ticketNoArr[index];
                        ticketContent[index]['buyAccidentStatus'] = buyAccidentStatusArray[index];
                        ticketContent[index]['insuranceNo'] = insuranceNoArray[index];
                        ticketContent[index]['buyInsuranceMsg'] = buyInsuranceMsgArray[index];
                    }*/
                    localStorage.setItem("ticketContent",JSON.stringify(data.content));
                    console.log(JSON.stringify(data.content));
                    clearInterval(getStatus);
                    $(".bg").hide();
                    $(".ticket-mask").hide();
                    var orderUuid = getQueryString("orderUuid");
                    if(orderUuid){
                        window.location.href = "order-info.html?orderUuid="+orderUuid;
                    }else{
                        window.location.href = "order-info.html";
                    }

                }
            });
        }else{
            clearInterval(getStatus);
            $(".bg").hide();
            $(".ticket-mask").hide();
            window.location.href = "order-list.html?orderType=0";
            /*if(isiOS) {
                toOrderList();
            }else if(isAndroid){
                window.android.toOrderList();
            }*/
        }
    }

    //改签支付成功后根据不同状态跳转相应页面
    function goToOrder(orderUuid){
        var reData = {
            orderUuid: orderUuid
        };
        ajaxRequest({url:API.AIR_TICKER.ORDER_DETAIL,data:reData},function(data){
            console.log(data);
            var status = data.content.orderStatus;
            var url = "";
            if(status == "14" || status == "16"){
                url = "return-ticket-status.html";
            }else if(status == "15"){
                url = "changingTicket.html";
            }
            window.location.href=url+"?orderUuid=" + orderUuid + "&status=" + status;
        });
    }

    $(".goBack").on("tap",function(){
        window.history.back();
    });
})(Zepto);
