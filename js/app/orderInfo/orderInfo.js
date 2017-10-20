var reTicket = true;
var orderInfo = {
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
        html : '<div class="order-info-list" data-code="{orderStatus}">'+
            '<div>'+
            '<div class="{direction}">{goText}</div>' +
            '<div class="order-info-gotime">'+
            '<p class="font-12 fontColor-999 flightDate" data-code="{flightDate}">{date}</p>'+
                '<p class="font-22 fontColor-333">{beginTime}</p>'+
                '<p class="font-12 fontColor-666 departAirport" data-code="{departAirport}" data-city="{departCity}">{departAirportNameDepartTerminal}</p>'+
                '</div>'+
                '<div class="order-info-middtime">'+
                    '<img style="width:6rem;margin-top:0.8rem;" src="./img/img_time_consuming_plane.png" alt="" />'+
                    '<div style="text-align: center;">'+
                        '<img class="icon-clock" src="./img/img_time_consuming_clock.png" alt="" />'+
                        '<span class="flytime font-10-m fontColor-999">{diffTime}</span>'+
                    '</div>'+
                '</div>'+
                '<div class="order-info-backtime">'+
                    '<p class="font-12 fontColor-999">{dateArrive}</p>'+
                    '<p class="font-22 fontColor-333">{endTime}</p>'+
                    '<p class="font-12 fontColor-666 arriveAirport" data-code="{arriveAirport}" data-city="{arriveCity}">{arriveAirportNameArriveTerminal}</p>'+
                '</div>'+
                '<div class="clearfix"></div>'+
                '<div class="order-info-price">'+
                    '<div class="flightListBottom font-12 fontColor-999">'+
                        '<img src="./img/logo/{carrierCode}.png" alt="" />'+
                        '<span class="flightNo" data-code="{carrierCode}" data-flight="{flightNo}">{carrierNameFlightNo}</span><span class="planeType">{planeType}</span><span class="mealCode">{mealCode}</span>'+
                        '<em><a href="javascript:;" class="font-17 fontColor-ff6">{planPrice}</a><a href="javascript:;" class="font-15 fontColor-ff6" style="margin-left: 3px;">元</a></em>'+
                    '</div>'+
                '</div>'+
                '<div class="order-detail-switch">'+
                    '<a href="javascript:;" class="look-info font-12">查看退改签</a>'+
                    '<a href="javascript:;" class="order-detailBtn font-12"><span>详细信息</span><img src="./img/img_bluearrow_down.png" alt="详细信息"/></a>'+
                    '<div class="order-detail">'+
                        '<div class="order-detail-top">'+
                            '<p class="font-12">'+
                                '<label class="fontColor-777">订单编号</label><span class="fontColor-666">{passageNo}</span></p>'+
                            '<p class="font-12">'+
                                '<label class="fontColor-777">下单时间</label><span class="fontColor-666 createTime"></span></p>'+
                            '<p class="font-12">'+
                                '<label class="fontColor-777">机票票号</label><span class="fontColor-666">{ticketNo}</span></p>'+
                            '<p class="font-12">'+
                                '<label class="fontColor-777">乘机人</label><span class="fontColor-666">{perName}</span></p>'+
                            '<p class="font-12">'+
                                '<label class="fontColor-777">证件号码</label><span class="fontColor-666">{perCodeId}</span></p>'+
                            '<p class="font-12 casApproveNo">'+
                                '<label class="fontColor-777">审批单号></label><span class="fontColor-666" style="color:#49B0FF">{casApproveNo}></span></p>'+
                            '<p class="font-12">'+
                                '<label class="fontColor-777">出差原因</label><span class="fontColor-666">{cause}</span></p>'+
                            '<p class="font-12">'+
                                '<label class="fontColor-777">舱位</label><span class="fontColor-666 cabinCode" data-code="{cabinCode}" data-base="{baseCabin}">({cabinCode}) {space} {discountRate}</span></p>'+
                        '</div>'+
                        '<div class="order-detail-middle clearfix">'+
                            '<p class="font-12">'+
                                '<label class="fontColor-777">支付方式</label><span class="fontColor-666">{payWay}</span></p>'+
                            '<div class="font-12">'+
                                '<label class="fontColor-777">金额详情</label>'+
                                '<div class="order-money-detail fontColor-666">'+
                                    '<p><label class="font-12 fontColor-777">机票</label><span class="font-12 fontColor-ff6">{planPrice}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
                                    '<p><label class="font-12 fontColor-777">民航基金/燃油</label><span class="font-12 fontColor-ff6">{buildFee}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
                                    '<p class="insure"><label class="font-12 fontColor-777">保险</label><span class="font-12 fontColor-ff6">{insure}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
                                    /*'<p><label class="fontColor-777">手续费</label><span class="font-12 fontColor-ff6">44</span></p>'+*/
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="order-detail-bottom" style="padding: 0;">'+
                            '<a href="javascript:;" class="font-12 fontColor-ff6 reTicket" data-code="{orderUuid}" data-ordertype="{orderType}" data-orderNo="{passageNo}" data-planPrice="{planPrice}"><small class="tui">退票</small>&nbsp;&nbsp;|&nbsp;&nbsp;<small class="gai">改期</small></a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '<img style="width:100%;" src="./img/img_redBG.png" alt="" />'+
        '<img class="bookRes bookSuccess" style="display: none;" src="./img/img_bookingsuccess.png" alt="" />'+
        '<img class="bookRes bookFailed" style="display: none;" src="./img/img_bookingfailed.png" alt="" />'+
        '</div>',
        OWHtml: '<div class="order-info-list" data-code="{orderStatus}">'+
        '<div>'+
        '<div class="{direction}">{goText}</div>' +
        '<div class="order-info-gotime">'+
        '<p class="font-12 fontColor-999 flightDate" data-code="{flightDate}">{date}</p>'+
        '<p class="font-22 fontColor-333">{beginTime}</p>'+
        '<p class="font-12 fontColor-666 departAirport" data-code="{departAirport}" data-city="{departCity}">{departAirportNameDepartTerminal}</p>'+
        '</div>'+
        '<div class="order-info-middtime">'+
        '<img style="width:6rem;margin-top:0.8rem;" src="./img/img_time_consuming_plane.png" alt="" />'+
        '<div style="text-align: center;">'+
        '<img class="icon-clock" src="./img/img_time_consuming_clock.png" alt="" />'+
        '<span class="flytime font-10-m fontColor-999">{diffTime}</span>'+
        '</div>'+
        '</div>'+
        '<div class="order-info-backtime">'+
        '<p class="font-12 fontColor-999">{dateArrive}</p>'+
        '<p class="font-22 fontColor-333">{endTime}</p>'+
        '<p class="font-12 fontColor-666 arriveAirport" data-code="{arriveAirport}" data-city="{arriveCity}">{arriveAirportNameArriveTerminal}</p>'+
        '</div>'+
        '<div class="clearfix"></div>'+
        '<div class="order-info-price">'+
        '<div class="flightListBottom font-12 fontColor-999">'+
        '<img src="./img/logo/{carrierCode}.png" alt="" />'+
        '<span class="flightNo" data-code="{carrierCode}" data-flight="{flightNo}" data-num="{flightNum}">{carrierNameFlightNo}</span><span class="planeType">{planeType}</span><span class="mealCode">{mealCode}</span>'+
        '<em><a href="javascript:;" class="font-17 fontColor-ff6">{planPrice}</a><a href="javascript:;" class="font-15 fontColor-ff6" style="margin-left: 3px;">元</a></em>'+
        '</div>'+
        '</div>'+
        '<div class="order-detail-switch">'+
        '<a href="javascript:;" class="look-info font-12">查看退改签</a>'+
        '<a href="javascript:;" class="order-detailBtn font-12"><span>详细信息</span><img src="./img/img_bluearrow_down.png" alt="详细信息"/></a>'+
        '<div class="order-detail">'+
        '<div class="order-detail-top">'+
        '<p class="font-12">'+
        '<label class="fontColor-777">订单编号</label><span class="fontColor-666">{passageNo}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">下单时间</label><span class="fontColor-666 createTime"></span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">机票票号</label><span class="fontColor-666">{ticketNo}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">乘机人</label><span class="fontColor-666">{perName}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">证件号码</label><span class="fontColor-666">{perCodeId}</span></p>'+
        '<p class="font-12 casApproveNo" >'+
        '<label class="fontColor-777 ">审批单号></label><span class="fontColor-666" style="color:#49B0FF">{casApproveNo}></span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">所属部门</label><span class="fontColor-666">{departmentName}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">出差原因</label><span class="fontColor-666">{cause}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">舱位</label><span class="fontColor-666 cabinCode" data-code="{cabinCode}" data-base="{baseCabin}">({cabinCode}) {space} {discountRate}</span></p>'+
        '</div>'+
        '<div class="order-detail-middle clearfix">'+
        '<p class="font-12">'+
        '<label class="fontColor-777">支付方式</label><span class="fontColor-666">{payWay}</span></p>'+
        '<div class="font-12">'+
        '<label class="fontColor-777">金额详情</label>'+
        '<div class="order-money-detail fontColor-666">'+
        '<p><label class="font-12 fontColor-777">机票</label><span class="font-12 fontColor-ff6">{planPrice}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
        '<p><label class="font-12 fontColor-777">民航基金/燃油</label><span class="font-12 fontColor-ff6">{buildFee}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
        '<p class="insure"><label class="font-12 fontColor-777">保险</label><span class="font-12 fontColor-ff6">{insure}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;color: #ff600a;">元</a></span></p>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="order-detail-bottom" style="padding: 0;">'+
        '<a href="javascript:;" class="font-12 fontColor-ff6 reTicket" data-code="{orderUuid}" data-ordertype="{orderType}" data-orderNo="{passageNo}" data-planPrice="{planPrice}"><small class="tui">退票</small>&nbsp;&nbsp;|&nbsp;&nbsp;<small class="gai">改期</small></a>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<img style="width:100%;" src="./img/img_redBG.png" alt="" />'+
        '<img class="bookRes bookSuccess" style="display: none;" src="./img/img_bookingsuccess.png" alt="" />'+
        '<img class="bookRes bookFailed" style="display: none;" src="./img/img_bookingfailed.png" alt="" />'+
        '</div>'
    },
    init: function() {
        var self = this;
        var orderUuid = getQueryString("orderUuid");
        console.log(orderUuid);
        if(orderUuid != null){
            self.fromListHtml(orderUuid);
        }else{
            self.locadHtml();
            self.bindEvent();
        }
    },
    locadHtml : function () {
        var self = this;
        var tpl = "";
        var item = {};
        var itemBack = {};
        var flightPayItemsList = [];
        var cause = localStorage.getItem('cause'),
            departCity = JSON.parse(localStorage.getItem("sPlace"))["startPlace"],
            arriveCity = JSON.parse(localStorage.getItem("sEnd"))["endPlace"];
         /*var personName = localStorage.getItem('personName');
        var identity_card = localStorage.getItem('identity_card');*/
        self.config.result = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.localStart)));
        console.log(self.config.result);
        console.log(self.config.result.departureDate);

        //zhf审批单号
        var casAppNo = localStorage.getItem("casAppNo");
        if(casAppNo == null){
            casAppNo = "";
        }

        var mealCode,disRate;
        if(self.config.result.mealCode != "" && self.config.result.mealCode != null){
            mealCode = "有餐食";
        }else{
            if(self.config.result.mealCode == ""){
                mealCode = "无餐食";
            }
            else{
                mealCode = "null";
            }
        }

        if(self.config.result.freightList[self.config.result.countIndex].discountRate == 100) {
            disRate = "全价";
        }else if(self.config.result.freightList[self.config.result.countIndex].discountRate == 0 || self.config.result.freightList[self.config.result.countIndex].discountRate == null || self.config.result.freightList[self.config.result.countIndex].discountRate > 100) {
            disRate = "";
        }else{
            disRate = (self.config.result.freightList[self.config.result.countIndex].discountRate)/10 + "折";
        }

        var planPrice = self.config.result.freightList[self.config.result.countIndex].cabinPrice,
            buildFee = self.config.result.freightList[self.config.result.countIndex].airportBuildFee;
        /*if(localStorage.getItem("insure") == null){
            insure = 0;
        }else{
            insure = localStorage.getItem("insure");
        }*/
        //self.config.passageNo = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.passage)));
        self.config.passageNo = JSON.parse(localStorage.getItem("bookList"));
        for (var i = 0; i < self.config.passageNo.length; i++) {
            flightPayItemsList.push({"orderUuid":self.config.passageNo[i].orderUuid});
        }
        self.config.dataRe = {
            flightPayItemsList:flightPayItemsList
        };
        //goNo = self.config.passageNo[0].orderNumber,
        var ticketContent = JSON.parse(localStorage.getItem("ticketContent"));
        console.log(ticketContent);
        var len = ticketContent.length;

        var ticketNoList =[],orderUuidList = [],orderStatusList=[];
        for(var i=0;i<ticketContent.length;i++){
            if(ticketContent[i].ticketNo == null || ticketContent[i].ticketNo == "null"){
                ticketContent[i].ticketNo = "";
            }
            ticketNoList.push(ticketContent[i].ticketNo);
            orderUuidList.push(ticketContent[i].orderUuid);
            orderStatusList.push(ticketContent[i].orderStatus);
        }
        console.log(orderStatusList);

        var passengerList = JSON.parse(localStorage.getItem("passengerList"));
        /*var bookList = JSON.parse(localStorage.getItem("bookList"));
        var len = bookList.length;*/
        console.log(len/2);

        /*var orderStatusList=[];
         for(var i=0;i<bookList.length;i++){
         orderStatusList.push(bookList[i].orderStatus);
         }
         console.log(orderStatusList);*/

        $.each(passengerList,function(index,val){
            console.log(val);
            console.log(val.passengerUserIndex);
            if(localStorage.getItem(self.config.jouryType) == "RT"){
                for(var i=0;i<len/2;i++){
                    if(val.passengerUserIndex == ticketContent[i].passengerUserIndex){
                        htmlCon(ticketContent[i].orderStatus,ticketContent[i].orderNumber,ticketContent[i].ticketNo,ticketContent[i].orderUuid,val.psrName,val.idCode,val.departmentName,val.travelReason,val.flightAccidentInsurance);
                    }
                }
                for(var l=len/2;l<len;l++){
                    if(val.passengerUserIndex == ticketContent[l].passengerUserIndex){
                        htmlConBack(ticketContent[l].orderStatus,ticketContent[l].orderNumber,ticketContent[l].ticketNo,ticketContent[l].orderUuid,val.psrName,val.idCode,val.departmentName,val.travelReason,val.flightAccidentInsurance);
                    }
                }
            }else{
                for(var i=0;i<len;i++){
                    if(val.passengerUserIndex == ticketContent[i].passengerUserIndex){
                        console.log(111111111111);
                        htmlCon(ticketContent[i].orderStatus,ticketContent[i].orderNumber,ticketContent[i].ticketNo,ticketContent[i].orderUuid,val.psrName,val.idCode,val.departmentName,val.travelReason,val.flightAccidentInsurance);
                    }
                }
            }
        });

        function htmlCon(orderStatus,passageNo,ticketNo,orderUuid,personName,perCode,departmentName,cause,insure){
            var perCodeStr = perCode.substring(6,14);
            var perCodeNew = perCode.replace(perCodeStr,"********");

            if(insure == null || insure == ""){
                insure = 0;
            }
            localStorage.setItem("goTotelPrice",planPrice*1 + buildFee*1+insure*1);

            if(localStorage.getItem(self.config.jouryType) == "RT"){
                item = {
                    orderStatus: orderStatus,
                    direction: "direction-go font-12 fontColor-49b",
                    goText: "去程",
                    route: "go_channel",
                    flightDate: self.config.result.departureDate,
                    date: self.config.result.dateDay,
                    departureDate: self.config.result.departureDate,
                    beginTime: switchTime(self.config.result.beginTime),
                    arriveAirport: self.config.result.arriveAirport,
                    arriveCity: arriveCity,
                    arriveAirportNameArriveTerminal: self.config.result.arriveAirportName + self.config.result.arriveTerminal,
                    diffTime: self.config.result.diffTime,
                    carrierCode:self.config.result.carrierCode,
                    flightNum:self.config.result.flightNo,
                    flightNo:self.config.result.carrierCode + self.config.result.flightNo,
                    carrierNameFlightNo: self.config.result.carrierName + " " + self.config.result.carrierCode + self.config.result.flightNo,
                    planeType:self.config.result.planeType,
                    mealCode: mealCode,
                    dateArrive: self.config.result.endDay,
                    endTime: switchTime(self.config.result.endTime),
                    departAirportName: self.config.result.departAirportName,
                    departAirport: self.config.result.departAirport,
                    departCity: departCity,
                    departAirportNameDepartTerminal: self.config.result.departAirportName + self.config.result.departTerminal,
                    minPrice: self.config.result.minPrice,
                    passageNo: passageNo,
                    ticketNo: ticketNo,
                    baseCabin: self.config.result.freightList[self.config.result.countIndex].baseCabin,
                    cabinCode:self.config.result.freightList[self.config.result.countIndex].cabinCode,
                    space:self.config.result.freightList[self.config.result.countIndex].cabinName,
                    discountRate: disRate,
                    perCode:localStorage.getItem(self.config.identity_card),
                    personName:localStorage.getItem(self.config.personName),
                    payWay:payType[localStorage.getItem("payType")],
                    planPrice:planPrice,
                    buildFee:buildFee,
                    insure:insure,
                    totalFee:planPrice*1 + buildFee*1 + insure*1,
                    perName: personName,
                    perCodeId: perCodeNew,
                    casApproveNo: casAppNo,
                    departmentName: departmentName,
                    cause:cause || "",
                    orderUuid: orderUuid,
                    orderType:2
                };

                tpl += BASE.lang.sub(self.config.html, item);
            } else {
                item = {
                    orderStatus: orderStatus,
                    direction: "",
                    goText: "",
                    route: "",
                    flightDate: self.config.result.departureDate,
                    date: self.config.result.dateDay,
                    departureDate: self.config.result.departureDate,
                    beginTime: switchTime(self.config.result.beginTime),
                    arriveAirport: self.config.result.arriveAirport,
                    arriveCity: arriveCity,
                    arriveAirportNameArriveTerminal: self.config.result.arriveAirportName + self.config.result.arriveTerminal,
                    diffTime: self.config.result.diffTime,
                    carrierCode:self.config.result.carrierCode,
                    flightNum:self.config.result.flightNo,
                    flightNo:self.config.result.carrierCode + self.config.result.flightNo,
                    carrierNameFlightNo: self.config.result.carrierName + " " + self.config.result.carrierCode + self.config.result.flightNo,
                    planeType:self.config.result.planeType,
                    mealCode: mealCode,
                    dateArrive: self.config.result.endDay,
                    endTime: switchTime(self.config.result.endTime),
                    departAirportName: self.config.result.departAirportName,
                    departAirport: self.config.result.departAirport,
                    departCity: departCity,
                    departAirportNameDepartTerminal: self.config.result.departAirportName + self.config.result.departTerminal,
                    minPrice: self.config.result.minPrice,
                    passageNo: passageNo,
                    ticketNo: ticketNo,
                    baseCabin: self.config.result.freightList[self.config.result.countIndex].baseCabin,
                    cabinCode:self.config.result.freightList[self.config.result.countIndex].cabinCode,
                    space:self.config.result.freightList[self.config.result.countIndex].cabinName,
                    discountRate: disRate,
                    perCode:localStorage.getItem(self.config.identity_card),
                    personName:localStorage.getItem(self.config.personName),
                    payWay:payType[localStorage.getItem("payType")],
                    planPrice:planPrice,
                    buildFee:buildFee,
                    insure:insure,
                    totalFee:planPrice*1 + buildFee*1+insure*1,
                    perName: personName,
                    perCodeId: perCodeNew,
                    casApproveNo: casAppNo,
                    departmentName: departmentName,
                    cause:cause || "",
                    orderUuid: orderUuid,
                    orderType:1
                };
                tpl += BASE.lang.sub(self.config.OWHtml, item);
            }
            $(".wrapper").html(tpl);
            if(insure == null || insure == "" || insure == "0"){
                $(".insure").hide();
            }

            if(casAppNo == ""){
                $(".casApproveNo").hide();
            }else{
                $(".casApproveNo").show();
            }
        }

        function htmlConBack(orderStatusBack,passageNoBack,ticketNoBack,orderUuidBack,personNameBack,perCodeBack,departmentNameBack,causeBack,insureBack){
            var perCodeBackStr = perCodeBack.substring(6,14);
            var perCodeBackNew = perCodeBack.replace(perCodeBackStr,"********");

            if(insureBack == null || insureBack == ""){
                insureBack = 0;
            }

            if (localStorage.getItem(self.config.jouryType) == "RT") {
            self.config.resultBack = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.localEnd)));
            var mealCodeBack,disRateBack;
            if(self.config.resultBack.mealCode != "" && self.config.resultBack.mealCode != null){
                mealCodeBack = "有餐食";
            }else{
                if(self.config.resultBack.mealCode == ""){
                    mealCodeBack = "无餐食";
                }
                else{
                    mealCodeBack = "null";
                }
            }

            if(self.config.resultBack.freightList[self.config.resultBack.countIndex].discountRate == 100) {
                disRateBack = "全价";
            }else if(self.config.resultBack.freightList[self.config.resultBack.countIndex].discountRate == 0 || self.config.resultBack.freightList[self.config.resultBack.countIndex].discountRate == null || self.config.resultBack.freightList[self.config.resultBack.countIndex].discountRate > 100) {
                disRateBack = "";
            }else{
                disRateBack = (self.config.resultBack.freightList[self.config.resultBack.countIndex].discountRate)/10 + "折";
            }

            var planPriceBack = self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinPrice,
                buildFeeBack = self.config.resultBack.freightList[self.config.resultBack.countIndex].airportBuildFee;
                /*if(localStorage.getItem("insure") == null){
                    insureBack = 0;
                }else{
                    insureBack = localStorage.getItem("insure");
                }*/
            localStorage.setItem("backTotelPrice", planPriceBack * 1 + buildFeeBack * 1 + insureBack * 1);
            var backNo = self.config.passageNo[1].orderNumber;
            itemBack = {
                orderStatus: orderStatusBack,
                goText: "返程",
                direction: "direction-back font-12 fontColor-ffb",
                route: "back_channel",
                flightDate: self.config.resultBack.departureDate,
                date: self.config.resultBack.dateDay,
                departureDate: self.config.resultBack.departureDate,
                beginTime: switchTime(self.config.resultBack.beginTime),
                arriveAirport: self.config.resultBack.arriveAirport,
                arriveCity: departCity,
                arriveAirportNameArriveTerminal: self.config.resultBack.arriveAirportName + self.config.resultBack.arriveTerminal,
                diffTime: self.config.resultBack.diffTime,
                carrierCode:self.config.resultBack.carrierCode,
                flightNum:self.config.resultBack.flightNo,
                flightNo:self.config.resultBack.carrierCode + self.config.resultBack.flightNo,
                carrierNameFlightNo: self.config.resultBack.carrierName + " " + self.config.resultBack.carrierCode + self.config.resultBack.flightNo,
                planeType:self.config.resultBack.planeType,
                mealCode: mealCodeBack,
                dateArrive: self.config.resultBack.endDay,
                endTime: switchTime(self.config.resultBack.endTime),
                departAirport: self.config.resultBack.departAirport,
                departCity: arriveCity,
                departAirportNameDepartTerminal: self.config.resultBack.departAirportName + self.config.resultBack.departTerminal,
                minPrice: self.config.resultBack.minPrice,
                passageNo: passageNoBack,
                ticketNo: ticketNoBack,
                baseCabin: self.config.resultBack.freightList[self.config.resultBack.countIndex].baseCabin,
                cabinCode:self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinCode,
                space: self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinName,
                discountRate: disRateBack,
                perCode: localStorage.getItem(self.config.identity_card),
                personName: localStorage.getItem(self.config.personName),
                payWay:payType[localStorage.getItem("payType")],
                planPrice: planPriceBack,
                buildFee: buildFeeBack,
                insure: insureBack,
                totalFee: planPriceBack * 1 + buildFeeBack * 1 + insureBack * 1,
                perName: personNameBack,
                perCodeId: perCodeBackNew,
                casApproveNo: casAppNo,
                departmentName: departmentNameBack,
                cause:causeBack || "",
                orderUuid: orderUuidBack,
                orderType:3
            };
            tpl += BASE.lang.sub(self.config.html, itemBack);
        }
            $(".wrapper").html(tpl);
            if(insureBack == null || insureBack == "" || insureBack == "0"){
                $(".insure").hide();
            }

            if(casAppNo == ""){
                $(".casApproveNo").hide();
            }else{
                $(".casApproveNo").show();
            }
        }
        //$(".wrapper").html(tpl);
        $(".casApproveNo").on("tap",function () {
            window.location.href="zhfApproInfo.html?approvalNo="+item.casApproveNo;
        });

        var createTime;
        if(localStorage.getItem("createTime") != null){
            createTime = localStorage.getItem("createTime");
        }else{
            createTime = 0;
        }
        $(".createTime").text(createTime);

        var isSuccess = false;
        var isFaild =0;
        var isIng=0;

        var orderInfoListLength =$(".order-info-list").length;
        $.each($(".order-info-list"),function(index,val){
            console.log(val);
            var this_ = $(this),
                orderSta = this_.attr("data-code");
            console.log(orderSta);
            if(orderSta == "7" || orderSta == "11" || orderSta == "12"){
                this_.find(".bookSuccess").show();
                isSuccess = true;

                console.log(item);
                console.log(item.departureDate);
                var date = self.config.result.departureDate.split("-");
                var Time = switchTime(self.config.result.beginTime).split(":");
                self.timeFn(date,Time);
            }else if(orderSta == "2" || orderSta == "4" || orderSta == "8"){
                isFaild++;
                this_.find(".bookFailed").show();
                $(".overplus-time").hide();
            }else if(orderSta == "0" || orderSta == "3" || orderSta == "5" || orderSta == "6"){
                $(".overplus-time").hide();
                isIng++;
            }else if(orderSta == "1"){
                this_.find(".order-detail-middle").hide();
                this_.find(".order-detail-bottom").hide();
            }
        });

        if(isSuccess){
            $(".order-info-head").show();
            //$(".overplus-time").show();
            $(".reTicket").show();
        }else{
            if(orderInfoListLength ==isFaild){
                $("order-info-head-fail").show();
            }else if(isIng==orderInfoListLength){
                $(".order-info-head-ing").show();
            }
        }

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

        /*console.log(insure);
        if(insure != "0"){
            $(".insure").show();
        }*/

        /*console.log(item);
        console.log(item.departureDate);
        //var date = item.departureDate.split("-");
        var date = self.config.result.departureDate.split("-");
        //var Time = item.beginTime.split(":");
        var Time = switchTime(self.config.result.beginTime).split(":");*/
        var station = JSON.parse(localStorage.getItem("sPlace"))["startPlace"];
        console.log(station);

        /*预约用车*/
        /*$(".orderCar").on("tap",function(){
         console.log(item.departAirportName);
         var station = item.departAirportName + item.airPortHtml;
         if(isiOS){
         window.location.href = "manage.html?airStation="+station;
         }else if(isAndroid){
         window.android.dateCar(station);
         }
         });*/
        $(".orderCar").show();
        $(".orderCar").on("tap",function(){
            if(isiOS){
                //window.location.href = "manage.html?airStation="+station;
                dateCar(station);
            }else if(isAndroid){
                window.android.dateCar(station);
            }
        });
        //self.timeFn(date,Time);
    },
    fromListHtml: function(orderUuid){
        var self = this,
            tpl = "",
            item = {};
        $(".goBack").show();
        var logRequestList = {url:API.AIR_TICKER.ORDER_DETAIL,"orderUuid": orderUuid};
        logRequest(logRequestList);
        ajaxRequest({url:API.AIR_TICKER.ORDER_DETAIL,data:{"orderUuid": orderUuid}},function(data){
            console.log(data);
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

            var times = new Date(travelFlight.startDate *1000),
                listMonth = times.getMonth()+1,
                listDate = times.getDate(),
                week = moment(travelFlight.startDate *1000).format('dddd');
            if(listMonth < 10){
                listMonth = "0"+listMonth
            }
            if(listDate < 10){
                listDate = "0"+listDate
            }

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

            var mealCode,disRate;
            if(travelFlight.mealCode != "" && travelFlight.mealCode != null){
                mealCode = "有餐食";
            }else{
                if(travelFlight.mealCode == ""){
                    mealCode = "无餐食";
                }
                else{
                    mealCode = "null";
                }
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

            if(data.content.ticketNo == null || data.content.ticketNo == "null"){
                data.content.ticketNo = "";
            }
            
            item = {
                orderStatus: data.content.orderStatus,
                direction: "font-12 fontColor-49b",
                goText: "",
                route: "",
                //date: times.getFullYear()+ '-' + (times.getMonth()+1) + '-' + times.getDate() + " " + week,
                flightDate: times.getFullYear()+ '-' + listMonth + '-' + listDate,
                date: (times.getMonth()+1) + '月' + times.getDate() + "日 " + week,
                //beginTime: getHourAndMM((BASE.lang.getLocalTime(new Date(travelFlight.beginTime *1000))).replace("-","/").replace("-","/")),
                beginTime: moment(travelFlight.beginTime * 1000).format("HH:mm"),
                arriveAirport: travelFlight.arriveAirport,
                arriveCity: travelFlight.arriveCity,
                arriveAirportNameArriveTerminal: travelFlight.arriveAirportName + travelFlight.arriveTerminal,
                diffTime: data.content.diffTime,
                carrierCode: travelFlight.carrierCode,
                flightNum: travelFlight.flightNo,
                flightNo:travelFlight.carrierCode + travelFlight.flightNo,
                carrierNameFlightNo: travelFlight.carrierName + " " + travelFlight.carrierCode + travelFlight.flightNo,
                planeType: travelFlight.flightType,
                mealCode: mealCode,
                //endTime: getHourAndMM((BASE.lang.getLocalTime(new Date(travelFlight.endTime *1000))).replace("-","/").replace("-","/")),
                dateArrive: (endTimes.getMonth()+1) + '月' + endTimes.getDate() + "日 " + endWeek,
                endTime: moment(travelFlight.endTime * 1000).format("HH:mm"),
                departAirport: travelFlight.departAirport,
                departCity: travelFlight.departCity,
                departAirportNameDepartTerminal: travelFlight.departAirportName + travelFlight.departTerminal,
                minPrice: travelFlight.minPrice,
                passageNo:data.content.orderNumber,
                baseCabin: travelFlight.baseCabin,
                cabinCode:travelFlight.freightSpaceType,
                space:flightCabin[travelFlight.baseCabin]||travelFlight.baseCabin,
                discountRate: disRate,
                payWay: payType[data.content.payWay],
                planPrice: travelFlight.flightFee,
                buildFee: buildFee,
                insure: insure,
                totalFee:(travelFlight.flightFee)*1 + buildFee*1 + insure*1,
                perCodeId: perCodeNew,
                perName:travelPassenger.passengerName,
                departmentName:travelPassenger.departmentName,
                cause:travelPassenger.travelReason || "",
                remark:remark,
                orderUuid:orderUuid,
                orderType:data.content.jourytype,
                ticketNo:data.content.ticketNo,
                departureDate:moment(travelFlight.startDate * 1000).format("YYYY-MM-DD")
            };
            if(data.content.casApprove){
                item.casApproveNo=data.content.casApprove.casApproveNo||""
            }
            else{
                item.casApproveNo=""
            }

            tpl += BASE.lang.sub(self.config.OWHtml, item);
            $(".wrapper").html(tpl);

            var orderSta = $(".order-info-list").attr("data-code");
            console.log(item)
            if(!item.casApproveNo){
                $(".casApproveNo").hide();
            }


            if(orderSta == "7" || orderSta == "11" || orderSta == "12"){
                $(".order-info-head").show();
                $(".bookSuccess").show();
                $(".reTicket").show();

                console.log(item.departureDate);
                console.log(item.beginTime);
                var date = item.departureDate.split("-");
                var Time = item.beginTime.split(":");
                self.timeFn(date,Time);
            }else if(orderSta == "2" || orderSta == "8"){
                $(".order-info-head-fail").show();
                $(".bookFailed").show();
                $(".reTicket").hide();
                $(".overplus-time").hide();
            }else if(orderSta == "0" || orderSta == "3" || orderSta == "5" || orderSta == "6"){
                $(".order-info-head-ing").show();
                $(".reTicket").hide();
                $(".overplus-time").hide();
            }
            /*else if(orderSta == "1"){
                $(".order-detail-middle").hide();
                $(".order-detail-bottom").hide();
            }*/

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

            if(data.content.flightAccidentInsurance == "0" || data.content.flightAccidentInsurance == "" || data.content.flightAccidentInsurance == null){
                $(".insure").hide();
            }else{
                $(".insure").show();
            }

            var crTime = travelFlight.createTime * 1000,
                createTime = moment(crTime).format("YYYY/MM/DD HH:mm:ss");
            $(".createTime").text(createTime);

            /*console.log(item.departureDate);
            console.log(item.beginTime);
            var date = item.departureDate.split("-");
            var Time = item.beginTime.split(":");*/
            /*var station = JSON.parse(localStorage.getItem("sPlace"))["startPlace"];
            console.log(station);*/
            //if(station == null && status == "7"){
            if(status == "7"){
                $(".orderCar").show();
            }else{
                $(".orderCar").hide();
            }

            if(!item.casApproveNo){
                $(".casApproveNo").hide();
            }
            $(".casApproveNo").on("tap",function () {
                window.location.href="zhfApproInfo.html?approvalNo="+item.casApproveNo;
            });

            $(".orderCar").on("tap",function(){
                if(isiOS){
                    //window.location.href = "manage.html?airStation=''";
                    dateCar("");
                }else if(isAndroid){
                    window.android.dateCar("");
                }
            });

            //self.timeFn(date,Time);

            self.bindEvent();
        });
    },
    timeFn: function(date,Time){
        //乘车倒计时
        var ai=setInterval(auto,1000);
        function auto(){
            var time,newTime,tt,day,hours,minutes,seconds,times = 2*24*60*60*1000;
            time=new Date();
            newTime = new Date(date[0],date[1]*1-1,date[2],Time[0],Time[1]);
            tt=newTime.getTime()-time.getTime();
            if(tt > 0 && tt <= times){
                //$(".overplus-time").show();
                /*if(tt > times){
                    day=Math.ceil(tt/1000/60/60/24);
                    $(".okCount").text(day + " 天");
                }else{*/
                hours=Math.floor(tt/1000/60/60);
                if(hours<10){
                    hours="0"+hours
                }
                minutes=Math.floor((tt-hours*60*60*1000)/1000/60);
                if(minutes<10){
                    minutes="0"+minutes
                }
                seconds=Math.floor((tt-hours*60*60*1000-minutes*60*1000)/1000);
                if(seconds<10){
                    seconds="0"+seconds
                }
                $(".okCount").text(hours + ":" + minutes + ":" + seconds);
                if(hours== 00 && minutes== 00 && seconds== 00){
                    clearInterval(ai);
                }
                //}
            }else{
                clearInterval(ai);
                $(".overplus-time").hide();
            }
        }
    },
    bindEvent: function(){
        var detailSwitch = true;
        $(".order-detailBtn").on('tap', function(event) {
            $(this).siblings(".order-detail").toggle();
            if (detailSwitch == false) {
                $(this).find("span").text("详细信息");
                $(this).find("img").removeClass("order-detailBtn-imgRotate");
                detailSwitch = true;
            } else {
                $(this).find("span").text("收起信息");
                $(this).find("img").addClass("order-detailBtn-imgRotate");
                detailSwitch = false;
            }
        });
        /*查看退改签*/
        $(".look-info").on('tap', function() {
            var startCode = $(this).parents(".order-info-list").find(".departAirport").attr("data-code"),
                endCode = $(this).parents(".order-info-list").find(".arriveAirport").attr("data-code"),
                flightDate = $(this).parents(".order-info-list").find(".flightDate").attr("data-code"),
                carrierCode = $(this).parents(".order-info-list").find(".flightNo").attr("data-code"),
                cabinType = $(this).parents(".order-info-list").find(".cabinCode").attr("data-code"),
                flightNum = $(this).parents(".order-info-list").find(".flightNo").attr("data-num");
            var rule = {
                "fromCityCode":startCode,
                "toCityCode":endCode,
                "flightDate":flightDate,
                "carrierCode":carrierCode,
                "cabinType":cabinType,
                "flightNo":flightNum
            };
            getRule(rule);
        });

        /*申请退票*/
        $(".tui").on("tap",function(){
            console.log(reTicket);
            if(reTicket){
            reTicket = false;
            var this_ = $(this);
            var orderUuid = this_.parent().attr("data-code");
            var orderNo = this_.parent().attr("data-orderNo");
            /*$(".loading").show();
            $(".bg").show();
                var logRequestList = {url:API.AIR_TICKER.GET_REFUND_FEE,"orderUuid": orderUuid};
                logRequest(logRequestList);
            ajaxRequest({url:API.AIR_TICKER.GET_REFUND_FEE,data:{"orderUuid": orderUuid}},function(data){
                console.log(data);
                var yuFee;
                if(data.content == null || data.content == ""){
                    yuFee = "0";
                }else{
                    yuFee = data.content;
                }
                localStorage.setItem("yuFee",yuFee);
                $(".loading").hide();
                $(".bg").hide();
                if(isiOS) {
                    refundPlaneTicket(orderNo,yuFee);
                }else if(isAndroid){
                    window.android.refundPlaneTicket(orderNo,yuFee);
                }
            },function(){
                $(".loading").hide();
                $(".bg").show();
                $(".reFalse").show();
                reTicket = true;
            });*/

            /*if(isiOS) {
                refundPlaneTicket(orderNo);
            }else if(isAndroid){
                window.android.refundPlaneTicket(orderNo);
            }*/
            var orderType = this_.parent().attr("data-ordertype");
            //var orderType = $(".reTicket").length>1?this_.attr("data-ordertype"):0;
            var refundInfo = {"orderUuid":orderUuid,"orderType":orderType};
            localStorage.setItem("refundInfo",JSON.stringify(refundInfo));

            goonRefundAirTicket("");

            /*var btnArray = ['立即退票', '联系客服'];
            mui.confirm('退票前请详细查看退票政策，以免造成不必要的损失', '您确定要退票吗', btnArray, function(e) {
                if (e.index == 0) {
                    ajaxRequest({url:API.AIR_TICKER.REFUND_TICKET,data:data},function (data) {
                        console.log(data);
                        mui.alert(data.content.returnMsg);
                    });
                } else {
                    alert(2);
                }
            });*/
            }
        });


        $(".bg").on("tap",function(){
            $(this).hide();
            $(".yesNo").hide();
        });

        $(".changeTic .no").on("tap",function(){
            $(".bg").hide();
            $(".yesNo").hide();
            /*if(isiOS){
             window.location.href = "tel:4000513568";
             }else if(isAndroid){
             window.android.callWaiter();
             }*/
        });

        //申请改期
        var list_startName,list_startCode,list_endName,list_endCode,list_date,list_cabinClass,list_causeCode,listUuid,listFltNo,journeyType,oldOrderNumber,planPrice;
        $(".gai").on("tap",function(){
            $(".bg").show();
            $(".changeTic").show();

            var this_ = $(this);
            list_startName = this_.parents().find(".departAirport").attr("data-city");
            list_startCode = this_.parents().find(".departAirport").attr("data-code");
            list_endName = this_.parents().find(".arriveAirport").attr("data-city");
            list_endCode = this_.parents().find(".arriveAirport").attr("data-code");
            list_date = this_.parents().find(".flightDate").attr("data-code");
            list_cabinClass = this_.parents().find(".cabinCode").attr("data-base");
            list_causeCode = "1";
            listUuid = this_.parent().attr("data-code");
            listFltNo = this_.parents().find(".flightNo").attr("data-flight");
            journeyType = this_.parent().attr("data-ordertype");
            oldOrderNumber = this_.parent().attr("data-orderNo");
            planPrice = this_.parent().attr("data-planPrice");
        });
        $(".changeTic .yes").on("tap",function(){
            localStorage.setItem("oldOrderNumber",oldOrderNumber);
            localStorage.setItem("planPrice",planPrice);
            //if(localStorage.getItem("jouryType") != "OW"){
                localStorage.setItem("jouryType","OW");
                localStorage.setItem("sPlace",JSON.stringify({"startCode":list_startCode,"startPlace":list_startName}));
                localStorage.setItem("sEnd",JSON.stringify({"endCode":list_endCode,"endPlace":list_endName}));
                localStorage.setItem("flag","true");
                localStorage.setItem("goTime",JSON.stringify({"date": list_date, "week": moment(list_date).format('dddd')}));
                localStorage.setItem("causeType",JSON.stringify({"causeText":"","causeCode":list_causeCode}));

                var jsonGo = JSON.stringify({ "pageNum": pageInfo.initPageNo, "pageSize": pageInfo.perpage, "bordPoint": list_startCode, "offPoint": list_endCode, "departDate": list_date, "jouryType": "OW", "cabinClass": list_cabinClass, "casQueryFlag": "CAS", "causeType": list_causeCode}),
                    jsonStr = encodeURIComponent(jsonGo);
                localStorage.setItem("searchData", jsonStr);
            //}
            $(".bg").hide();
            $(".yesNo").hide();
            window.location.href = "list.html?orderUuid=" + listUuid + "&flightNo=" + listFltNo + "&journeyType=" + journeyType;
        });

        $(".goBack").on("tap",function(){
            window.history.back();
        });
    }
};
orderInfo.init();

function goonRefundAirTicket(refundApply) {
    reTicket = true;
    //if(arguments.length===1){
        //var yuFee = localStorage.getItem("yuFee");
        $(".reTrue").show();
        //$(".yuFee").text(yuFee);
        $(".bg").show();
        var refundTic = JSON.parse(localStorage.getItem("refundInfo"));

        $(".reTrue .yes").on("tap",function(){
            $(".bg").hide();
            $(".yesNo").hide();
            window.location.href = "return-ticket-status.html?orderUuid=" + refundTic.orderUuid+'&orderType=' + refundTic.orderType+'&refundApply=' + refundApply;
        });
    //}
}
