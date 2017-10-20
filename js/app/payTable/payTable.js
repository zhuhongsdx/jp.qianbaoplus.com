
var payTbale = {
    config:{
        data:"",
        dataList:"",
        passageNo:"passageNo",
        passage:"passage",
        html : '<div class="order-card" data-code="{orderStatus}">'+
    '<div class="order-card-title font-14 fontColor-333"><label class="fontColor-333">订单信息 {planType}</label><span class="fontColor-333"></span></div>'+
    '<p class="order-card-info font-12"><label class="fontColor-777">订单编号</label><span class="fontColor-666">{orderNo}</span></p>'+
    '<p class="order-card-info font-12" style="display: none;"><label class="fontColor-777">支付单号</label><span class="fontColor-666 payNo"></span></p>'+
    '<p class="order-card-info font-12"><label class="fontColor-777">订单金额</label><span class="fontColor-666">{price}<a href="javascript:;" class="font-11 fontColor-777" style="margin-left: 3px;">元</a></span></p>'+
    '<p class="order-card-info font-12"><label class="fontColor-777">服务类型</label><span class="fontColor-666">机票</span></p>'+
    '</div>',
        priceHtml :'<div class="order-card">'+
    '<div class="order-card-title order-card-money font-14 fontColor-333">应付金额<span class="font-20 fontColor-ff6">{totelPrice}<a href="javascript:;" class="font-18 fontColor-ff6" style="margin-left: 3px;">元</a></span></div>'+
    '<p class="order-card-info font-12"><label class="fontColor-777">机票</label><span class="fontColor-ff6">{planePrice}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;">元</a></span></p>'+
    '<p class="order-card-info font-12 insure" style="display: none;"><label class="fontColor-777">保险</label><span class="fontColor-ff6">{insurePrice}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;">元</a></span></p>'+
    '<p class="order-card-info font-12"><label class="fontColor-777">机建/燃油</label><span class="fontColor-ff6">{airTaxPrice}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;">元</a></span></p>'+
    // '<p class="order-card-info font-12"><label class="fontColor-777">预订手续费</label><span class="fontColor-ff6">¥{handlingCharge}</span></p>'+
    '</div>'
    },
    init:function(){
        var self = this;
        if(getQueryString("orderUuid")!=null){
            self.formListHtml();
            self.bindEven(getQueryString("orderUuid"));
        }else{
            self.loadHtml();
            self.bindEven();
        }
    },
    loadHtml:function(){
        var self = this;
        var item = {};
        var itemBack = {};
        var itemPrice = {};
        var html = "";
        /*var passengerList = JSON.parse(localStorage.getItem("passengerList"));
        var num = passengerList.length;*/
        //var goPrice = parseInt(localStorage.getItem("goTotelPrice"));
        //var bookList = JSON.parse(localStorage.getItem("bookList"));
        //var goOrderNo = JSON.parse(decodeURIComponent(localStorage.getItem("passage")))[0].orderNumber;bookList
        //var goOrderNo = JSON.parse(localStorage.getItem("bookList"))[0].orderNumber;
        self.config.result = JSON.parse(decodeURIComponent(localStorage.getItem("localStart")));
        self.config.resultBack = JSON.parse(decodeURIComponent(localStorage.getItem("localEnd")));
        console.log(self.config.result);
        var goPlanePrice = "",
            airTaxPrice = self.config.result.freightList[self.config.result.countIndex].airportBuildFee,
            insurePrice = localStorage.getItem("insure");
        //var goPrice = goPlanePrice*1 + insurePrice*1 + airTaxPrice*1;
        //var backPrice = parseInt(localStorage.getItem("backTotelPrice"));

        //变价流程，获取价格
        if(getQueryString("goJouryType") == "1" || getQueryString("goJouryType") == 1 || getQueryString("goJouryType") == "2" || getQueryString("goJouryType") == 2){
            goPlanePrice = getQueryString("newFlightFeeGo");
        }else{
            goPlanePrice = self.config.result.freightList[self.config.result.countIndex].cabinPrice;
        }

        var bookList = JSON.parse(localStorage.getItem("bookList"));
        var len = bookList.length;
        var statusNum = _.filter(bookList, function(n) {
            return n.orderStatus == -1;
        });
        console.log(statusNum);
        var num = statusNum?statusNum.length:0;
        var insureNum = localStorage.getItem("insureNum");

        /*var orderStatusList=[];
        for(var i=0;i<bookList.length;i++){
            orderStatusList.push(bookList[i].orderStatus);
        }
        console.log(orderStatusList);*/
        //判断往返程
        if(localStorage.getItem("jouryType") == "OW"){
            $.each(statusNum,function(index,val){
                console.log(val.orderStatus);
                    item = {
                        orderStatus: val.orderStatus,
                        planType : "",
                        orderNo:val.orderNumber,
                        price:goPlanePrice*1 + val.goInsure*1 + airTaxPrice*1
                    };
                html += BASE.lang.sub(self.config.html,item);
            });
            /*item = {
                orderStatus: orderStatusList[0],
                planType : "",
                orderNo:goOrderNo,
                price:goPrice
            };*/
            itemPrice = {
                totelPrice:goPlanePrice*num + insurePrice*insureNum + airTaxPrice*num,
                planePrice:goPlanePrice*num,
                insurePrice:insurePrice*insureNum,
                airTaxPrice:airTaxPrice*num
                //handlingCharge:44
            };
            html += BASE.lang.sub(self.config.priceHtml,itemPrice);
        }else{
            //var backOrderNo = JSON.parse(decodeURIComponent(localStorage.getItem("passage")))[1].orderNumber,
            var backAirTaxPrice = self.config.resultBack.freightList[self.config.resultBack.countIndex].airportBuildFee,
                backPlanePrice = "",
                insurePriceBack = localStorage.getItem("insureBack");
            //var backPrice = backAirTaxPrice*1 + backPlanePrice*1 + insurePriceBack*1;

            if(getQueryString("returnJouryType") == "3" || getQueryString("returnJouryType") == 3){
                backPlanePrice = getQueryString("newFlightFeeReturn");
            }else{
                backPlanePrice = self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinPrice;
            }
            var goStatusNum = _.filter(bookList, function(n,index) {
                return n.orderStatus == -1 && index<(bookList.length/2);
            });
            var goNum = goStatusNum?goStatusNum.length:0;
            var backStatusNum = _.filter(bookList, function(n,index) {
                return n.orderStatus == -1 && index>=(bookList.length/2);
            });
            var backNum = backStatusNum?backStatusNum.length:0;

            for(var i=0;i<goNum;i++){
                //if(goStatusNum[i].orderStatus == 1){
                    console.log(typeof bookList[i].orderStatus);
                    item = {
                        orderStatus: goStatusNum[i].orderStatus,
                        planType : "(去程)",
                        orderNo: goStatusNum[i].orderNumber,
                        price: goPlanePrice*1 + goStatusNum[i].goInsure*1 + airTaxPrice*1
                    };
                //}
                html += BASE.lang.sub(self.config.html,item);//拼去程
            }
            for(var l=0;l<backNum;l++){
                //if(backStatusNum[l].orderStatus == 1){
                    itemBack = {
                        orderStatus: backStatusNum[l].orderStatus,
                        planType : "(返程)",
                        orderNo: backStatusNum[l].orderNumber,
                        price: backAirTaxPrice*1 + backPlanePrice*1 + backStatusNum[l].backInsure*1
                    };
                //}
                html += BASE.lang.sub(self.config.html,itemBack);//拼返程
            }
            /*itemBack = {
                orderStatus: orderStatusList[1],
                planType : "(返程)",
                orderNo:backOrderNo,
                price:backPrice
            };*/
            var totelPlane = goPlanePrice*goNum*1 + backPlanePrice*backNum*1,
                totelAirTax = airTaxPrice*goNum*1 + backAirTaxPrice*backNum*1;
            itemPrice = {
                totelPrice:totelPlane + totelAirTax + insurePrice*insureNum,
                planePrice:totelPlane,
                //insurePrice:insurePrice*goNum*1 + insurePriceBack*backNum*1,
                insurePrice:insurePrice*insureNum,
                airTaxPrice:totelAirTax
            };
            html += BASE.lang.sub(self.config.priceHtml,itemPrice);//拼总价

            /*if(orderStatusList[0] == 1 && orderStatusList[1] == 1){
                itemPrice = {
                    totelPrice:goPrice + backPrice,
                    planePrice:goPlanePrice*num*1 + backPlanePrice*num*1,
                    insurePrice:insurePrice*num*1 + insurePriceBack*num*1,
                    airTaxPrice:airTaxPrice*num*1 + backAirTaxPrice*num*1
                };
                html += BASE.lang.sub(self.config.html,item);//拼去程
                html += BASE.lang.sub(self.config.html,itemBack);//拼返程
                html += BASE.lang.sub(self.config.priceHtml,itemPrice);//拼总价
            }else{
                if(orderStatusList[0] == 2){
                    itemPrice = {
                        totelPrice:backPrice,
                        planePrice:backPlanePrice*num,
                        insurePrice:insurePrice*num,
                        airTaxPrice:backAirTaxPrice*num
                    };
                    html += BASE.lang.sub(self.config.html,itemBack);//拼返程
                    html += BASE.lang.sub(self.config.priceHtml,itemPrice);//拼总价
                }else if(orderStatusList[1] == 2){
                    itemPrice = {
                        totelPrice:goPrice,
                        planePrice:goPlanePrice*num,
                        insurePrice:insurePrice*num,
                        airTaxPrice:airTaxPrice*num
                    };
                    html += BASE.lang.sub(self.config.html,item);//拼去程
                    html += BASE.lang.sub(self.config.priceHtml,itemPrice);//拼总价
                }
            }*/
        }
        //支付金额模板
        $(".wrap").html(html);
        /*if(insurePrice == "0" && insurePriceBack == "0"){
            $(".insure").hide();
        }else{
            $(".insure").show();
        }*/
        if(insureNum == "0"){
            $(".insure").hide();
        }else{
            $(".insure").show();
        }
    },
    formListHtml:function(){//从订单列表进来的
        var self = this;
        var item = {};
        var itemPrice = {};
        var html = "";
        var orderDetail = JSON.parse(localStorage.getItem("orderDetail"));
        item = {
            orderStatus: orderDetail.orderStatus,
            planType : "",
            orderNo: orderDetail.orderNumber,
            price: orderDetail.totalFee
        };
        html += BASE.lang.sub(self.config.html,item);

        /*var planePrice = "";
        if(getQueryString("newFlightFeeGo") != null && getQueryString("newFlightFeeReturn") != null){
            planePrice = getQueryString("newFlightFeeGo")*1 + getQueryString("newFlightFeeReturn")*1;
        }else if(getQueryString("newFlightFeeGo") != null){
            planePrice = getQueryString("newFlightFeeGo");
        }else if(getQueryString("newFlightFeeReturn") != null){
            planePrice = getQueryString("newFlightFeeReturn");
        }else{
            planePrice = orderDetail.travelFlight.flightFee;
        }*/

        itemPrice = {
            totelPrice: orderDetail.totalFee,
            planePrice: orderDetail.travelFlight.flightFee,
            insurePrice: orderDetail.flightAccidentInsurance,
            airTaxPrice: orderDetail.travelFlight.airportConstructionFee
        };
        html += BASE.lang.sub(self.config.priceHtml,itemPrice);
        //支付金额模板
        $(".wrap").html(html);
        if(orderDetail.flightAccidentInsurance == "0" || orderDetail.flightAccidentInsurance == null){
            $(".insure").hide();
        }else{
            $(".insure").show();
        }
    },
    bindEven:function(orderUuid){
        var arg = arguments.length>0;
        var self = this;
        //支付
        var orderUuidList = [],
            flightTicketItemList = [];
        /*self.config.passageNo = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.passage)));//订单号
        for (var i = 0; i < self.config.passageNo.length; i++) {
            orderUuidList.push(self.config.passageNo[i].orderUuid);
            flightTicketItemList.push({"orderUuid":self.config.passageNo[i].orderUuid});
        }*/


        if(arg){
            orderUuidList.push(orderUuid);
            flightTicketItemList.push({"orderUuid":orderUuid});
        }
        else{
            var bookList = JSON.parse(localStorage.getItem("bookList"));
            for (var i = 0; i < bookList.length; i++) {
                if(bookList[i].orderStatus == -1){
                    orderUuidList.push(bookList[i].orderUuid);
                    flightTicketItemList.push({"orderUuid":bookList[i].orderUuid});
                }
            }
        }
        var mobile = localStorage.getItem("mobile");
        /*var dataMsm = {
                "mobile" : mobile
            };*/
        self.config.dataList = {
            flightTicketItemList:flightTicketItemList
        };
        console.log(self.config.dataList);
        localStorage.setItem("flightTicketItemList",JSON.stringify(self.config.dataList));
        var requestList = {
            orderUuidList : orderUuidList
        };

        $(".pay-way-list").on("click",function(){
            console.log(requestList);
            localStorage.setItem("requestList",JSON.stringify(requestList));
            //getStatus = setInterval(getFlightOrderStatus,2000);
            if(isiOS){
                window.location.href = "planeSmsTemp.html?mobile="+mobile+"&orderUuidList="+orderUuidList;
            }else if(isAndroid){
                window.android.getMsgCode(mobile,orderUuidList);
            }

            /*localStorage.setItem("ticketContent",JSON.stringify([
                {
                    "orderUuid": "94ac62cf-83e6-4712-97df-dca5deb5ccea",
                    "ticketNo": "AAA-9051871031",
                    "returnMsg": "出票成功",
                    "orderStatus": "7",
                    "clientUserIndex": "945",
                    "orderNumber": "YB147738757900329607",
                    "buyInsuranceMsg": "购买保险成功"
                },
                {
                    "orderUuid": "1080b50c-0e6c-44cf-a4ce-7b183504cab9",
                    "ticketNo": "AAA-9055988758",
                    "returnMsg": "出票成功",
                    "orderStatus": "8",
                    "clientUserIndex": "956",
                    "orderNumber": "YB147738757900314579",
                    "buyInsuranceMsg": "购买保险成功"
                },
                {
                    "orderUuid": "94ac62cf-83e6-4712-97df-dca5deb5ccea",
                    "ticketNo": "AAA-9051871031",
                    "returnMsg": "出票成功",
                    "orderStatus": "7",
                    "clientUserIndex": "945",
                    "orderNumber": "YB147738757900329607",
                    "buyInsuranceMsg": "购买保险成功"
                },
                {
                    "orderUuid": "1080b50c-0e6c-44cf-a4ce-7b183504cab9",
                    "ticketNo": "AAA-9055988758",
                    "returnMsg": "出票成功",
                    "orderStatus": "8",
                    "clientUserIndex": "956",
                    "orderNumber": "YB147738757900314579",
                    "buyInsuranceMsg": "购买保险成功"
                }
            ]));*/
            /*localStorage.setItem("ticketContent",JSON.stringify([
                {
                    "orderUuid": "94ac62cf-83e6-4712-97df-dca5deb5ccea",
                    "ticketNo": "AAA-8008283344",
                    "returnMsg": "出票成功",
                    "orderStatus": "7",
                    "clientUserIndex": "20256",
                    "orderNumber": "YB147738757900314579",
                    "buyInsuranceMsg": "购买保险成功"
                },{
                "orderUuid": "94ac62cf-83e6-4712-97df-dca5deb5ccea",
                    "ticketNo": "AAA-8008283344",
                    "returnMsg": "出票成功",
                    "orderStatus": "7",
                    "clientUserIndex": "20256",
                    "orderNumber": "YB147738757900314579",
                    "buyInsuranceMsg": "购买保险成功"
            }
            ]));
            window.location.href = "order-info.html";*/
            /*ajaxRequest({url:API.AIR_TICKER.SENDSMS,data:dataMsm},function(data){
                console.log(data);
            });
            var smsCode = "123456";
            if(smsCode!=null){
                self.config.data = {
                    "mobile" : mobile,
                    "smsCode" :smsCode,
                    orderUuidList:orderUuidList
                };
                ajaxRequest({url:API.AIR_TICKER.PAY_FLIGHT,data:self.config.data},function (data) {
                    console.log(data);
                    if(data.content[0].freezeUnfreezeStatus == "2"){
                        ajaxRequest({url:API.AIR_TICKER.GET_FLIGHT_TICKET,data:self.config.dataList},function(data){
                            console.log(data);
                            if(data.status == "200"){
                                window.location.href = "order-info.html";
                            }else{
                                alert(data.message);
                            }
                        })
                    }
                });
            }*/
        });


    }
};
var num = 0;
var getStatus = "";
payTbale.init();

function getTicket(orderUuid){
    //var freezeUnfreezeStatus = getQueryString("freezeUnfreezeStatus");
    //var orderUuid = getQueryString("orderUuid");
    console.info(localStorage.getItem("flightTicketItemList"));
    var flightTicketItemList = JSON.parse(localStorage.getItem("flightTicketItemList"));

    //if((freezeUnfreezeStatus == "2" || freezeUnfreezeStatus == "2,2") && orderUuid != ""){
    //alert(orderUuid);
    if(orderUuid != "" || orderUuid != null){
		
        //alert(flightTicketItemList);
        $(".bg").show();
        $(".ticket-mask").show();
		var requestList = localStorage.getItem("requestList");

        console.info(flightTicketItemList);
        var bookList = JSON.parse(localStorage.getItem("bookList"));

        getStatus = setInterval(getFlightOrderStatus,2000);

        for(var index =0;index<bookList.length;index++){
            bookList[index].orderStatus =-1;
            bookList[index].buyAccidentStatus =0;
            bookList[index].insuranceNo="";
            bookList[index].buyInsuranceMsg ="";
        }
        //alert(JSON.stringify(bookList));
        localStorage.setItem("ticketContent",JSON.stringify(bookList));
        // ajaxRequest({url:API.AIR_TICKER.GET_FLIGHT_TICKET,data:flightTicketItemList},function(data){
        //     console.log(data);
        //     var isSetInterval =0;
        //     //localStorage.setItem("ticketContent",JSON.stringify(data.content));
        //
        //     var tempContent = JSON.stringify(data.content);
        //
        //     for(var index =0;index<tempContent.length;index++){
        //
        //     }
        //
        //     var bookList = JSON.parse(localStorage.getItem("bookList"));
        //
        //     getStatus = setInterval(getFlightOrderStatus,2000);
        //     // $.each(data.content,function(index,val){
        //     //     localStorage.setItem("ticketContent",JSON.stringify(data.content));
        //     //     if(val.orderStatus == "6" || val.orderStatus == 6){
        //     //         $(".bg").show();
        //     //         $(".ticket-mask").show();
        //     //         isSetInterval =1;
        //     //     }
        //     // });
        //     // if(isSetInterval==1){
        //     //     var requestList = localStorage.getItem("requestList");
        //     //     getStatus = setInterval(getFlightOrderStatus,2000);
        //     // }
        //     // else{
        //     //     $(".bg").hide();
        //     //     $(".ticket-mask").hide();
        //     //     window.location.href = "order-info.html";
        //     // }
        //
        // },function(data){
        //     $(".warnText").fadeIn('slow').find("p").text(data.message);
        //     setTimeout(fadeOut,2000);
        //     return false;
        // })
    }
}

function getFlightOrderStatus(){
    var requestList = localStorage.getItem("requestList");
    num++;
    if(num < 31){
        var logQequestList =$.extend({url:API.AIR_TICKER.GET_FLIGHT_ORDER_STATUS},requestList);
        logRequest(logQequestList);
        ajaxRequest({url:API.AIR_TICKER.GET_FLIGHT_ORDER_STATUS,data:requestList},function(data){
            console.log(data);
            var isRequest = false;
            var tempArray = [],ticketNoArr = [], buyAccidentStatusArray=[],insuranceNoArray=[],buyInsuranceMsgArray=[];
            for(var i=0;i<data.content.length;i++){
                if(data.content[i].orderStatus===6 || data.content[i].orderStatus==='6'
                    ||data.content[i].orderStatus===-1 || data.content[i].orderStatus==='-1'
                    || data.content[i].orderStatus==='1'|| data.content[i].orderStatus===1){
                    isRequest = true;
                }

                tempArray.push(data.content[i].orderStatus);
                ticketNoArr.push(data.content[i].ticketNo);
                buyAccidentStatusArray.push(data.content[i].buyAccidentStatus);
                insuranceNoArray.push(data.content[i].insuranceNo);
                buyInsuranceMsgArray.push(data.content[i].buyInsuranceMsg);
            }
            if(!isRequest){
                var ticketContent = JSON.parse(localStorage.getItem("ticketContent"));
                for(var index=0;index<ticketContent.length;index++){
                    ticketContent[index]['orderStatus'] = tempArray[index];
                    ticketContent[index]['ticketNo'] = ticketNoArr[index];
                    ticketContent[index]['buyAccidentStatus'] = buyAccidentStatusArray[index];
                    ticketContent[index]['insuranceNo'] = insuranceNoArray[index];
                    ticketContent[index]['buyInsuranceMsg'] = buyInsuranceMsgArray[index];
                }
                localStorage.setItem("ticketContent",JSON.stringify(ticketContent));
                console.log(JSON.stringify(ticketContent));
                clearInterval(getStatus);
                $(".bg").hide();
                $(".ticket-mask").hide();
                //alert(JSON.stringify(ticketContent));
                window.location.href = "order-info.html";
            }
        });
    }else{
        clearInterval(getStatus);
        $(".bg").hide();
        $(".ticket-mask").hide();
        //window.location.href = "order-list.html?orderType=0";
        if(isiOS) {
            toOrderList();
        }else if(isAndroid){
            window.android.toOrderList();
        }
    }
}
