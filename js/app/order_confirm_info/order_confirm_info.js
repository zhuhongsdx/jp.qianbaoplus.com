var order = {
    config: {
        localStart: "localStart",
        localEnd: "localEnd",
        personName:"personName",
        jouryType: "jouryType",
        queryFlowNo: "queryFlowNo",
        remark: "remark",
        cause: "cause",
        identity_card: "identity_card",
        result: "",
        resultBack: "",
        passage:"passage",
        passageNo:"",
        dataRe:"",
        Html: '<div class="order-info-list order-confirm-list" data-code="{orderStatus}">' +
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
            '<span class="flightNo" data-code="{carrierCode}">{carrierNameFlightNo}</span><span class="planeType">{planeType}</span><span class="mealCode">{mealCode}</span>' +
            '</div>' +
            '<a href="javascript:;" class="look-info font-12 fontColor-49b">查看退改签</a>' +
            '</div>' +
            '<div class="order-detail-switch">' +
            '<span class="font-12 fontColor-999">订单编号&nbsp;&nbsp;&nbsp;{passageNo}</span><br>' +
            '<span class="font-12 fontColor-999">下单时间&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="createTime font-12" style="color:#999;"></a></span>' +
            /*'<a href="javascript:;" class="order-detailBtn font-12"><span>详细信息</span><img src="./img/img_bluearrow_down.png" alt="详细信息"/></a>' +*/
            '<div class="order-confirm">' +
            '<div class="order-confirm-top">' +
            '<p class="font-14 userList"><label class="fontColor-777">乘机人</label><span class="fontColor-666">{personName}</span><br><span class="fontColor-666" style="font-size: 12px;padding-left: 7rem;">身份证&nbsp;&nbsp;{perCode}</span></p><!--<br><span class="fontColor-666" style="padding-left: 7rem;">{personName}</span><br><span class="fontColor-666" style="font-size: 12px;padding-left: 7rem;">身份证  {perCode}</span>-->' +
        '<p class="font-14 casApproveNo" style="padding-top: 0.5rem;"><label class="fontColor-777">审批单号</label><span class="fontColor-666" >{casApproveNo}</span></p>'+
            /*'<p class="font-14"><label class="fontColor-777">证件号码</label><span class="fontColor-666">{perCode}</span></p>' +*/
            '<p class="font-14" style="padding-top: 0.5rem;"><label class="fontColor-777">舱位</label><span class="fontColor-666 cabinCode" data-code="{cabinCode}">({cabinCode}) {space} {discountRate}</span></p>' +
            '</div>' +
            /*'<div class="order-confirm-middle clearfix">' +
            '<div class="font-14 fontColor-666">金额详情</div>' +
            '<p class="font-12"><label class="fontColor-777">机票</label><span class="fontColor-ff6">{planPrice}</span></p>' +
            '<p class="font-12"><label class="fontColor-777">民航基金/燃油</label><span class="fontColor-ff6">{buildFee}</span></p>' +
            '<p class="font-12 insure" style="display: none;"><label class="fontColor-777">保险</label><span class="fontColor-ff6">{insure}</span></p>' +
            '<p class="font-12"><label class="fontColor-777">手续费</label><span class="fontColor-ff6">44</span></p>' +
            '<p class="font-14"><label class="fontColor-777">总额</label><span class="fontColor-ff6">{totalFee}</span></p>' +
            '</div>' +*/
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
        OWHtml: '<div class="order-info-list order-confirm-list" data-code="{orderStatus}">' +
        /*'<img class="bookRes bookSuccess" style="display: none;" src="./img/img_Bsuccess.png" alt="" />'+
        '<img class="bookRes bookFailed" style="display: none;" src="./img/img_Bfailed.png" alt="" />'+*/
        '<div>' +
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
        '</div>' +
        '<a href="javascript:;" class="look-info font-12 fontColor-49b">查看退改签</a>' +
        '</div>' +
        '<div class="order-detail-switch">' +
        '<span class="font-12 fontColor-999">订单编号&nbsp;&nbsp;&nbsp;{passageNo}</span><br>' +
        '<span class="font-12 fontColor-999">下单时间&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="createTime font-12" style="color:#999;"></a></span>' +
        '<div class="order-confirm">' +
        '<div class="order-confirm-top">' +
        '<p class="font-14 userList"><label class="fontColor-777">乘机人</label><span class="fontColor-666">{personName}</span><br><span class="fontColor-666" style="font-size: 12px;padding-left: 7rem;">身份证&nbsp;&nbsp;{perCode}</span></p>' +
        '<p class="font-14 casApproveNo" style="padding-top: 0.5rem;"><label class="fontColor-777">审批单号</label><span class="fontColor-666" >{casApproveNo}</span></p>'+
        '<p class="font-14" style="padding-top: 0.5rem;"><label class="fontColor-777">舱位</label><span class="fontColor-666 cabinCode" data-code="{cabinCode}">({cabinCode}) {space} {discountRate}</span></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
        feeHtml:'<div class="order-info-list order-confirm-list" id="feeInfo" data-code="{orderStatus}">' +
        '<div>' +
        '<div class="order-confirm-middle clearfix">' +
        '<div class="font-14 fontColor-666">金额详情</div>' +
        '<p class="font-12"><label class="fontColor-777">机票</label><span class="fontColor-ff6">{planPrice}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;">元</a></span></p>' +
        '<p class="font-12"><label class="fontColor-777">民航基金/燃油</label><span class="fontColor-ff6">{buildFee}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;">元</a></span></p>' +
        '<p class="font-12 insure" style="display: none;"><label class="fontColor-777">保险</label><span class="fontColor-ff6">{insure}<a href="javascript:;" class="font-11 fontColor-ff6" style="margin-left: 3px;">元</a></span></p>' +
        '<p class="font-14"><label class="fontColor-777">总额</label><span class="fontColor-ff6"><small class="font-14 totalFee">{totalFee}</small><a href="javascript:;" class="font-12 fontColor-ff6" style="margin-left: 3px;">元</a></span></p>' +
        '</div>' +
        '</div>' +
        '</div>'
    },
    init: function() {
        var self = this;
        var orderUuid = getQueryString("orderUuid");
        console.log(orderUuid);
        if(orderUuid != null){
            self.fromListHtml(orderUuid);
        }else{
            self.loadHtml();
            self.eventFn();
        }
    },
    loadHtml: function() {
        var self = this;
        var tpl = "";
        var item = {};
        var itemBack = {};
        var feeItem = {};
        //var flightPayItemsList = [];
        var passengerList = JSON.parse(localStorage.getItem("passengerList"));
        self.config.result = JSON.parse(decodeURIComponent(localStorage.getItem(self.config.localStart)));

        console.log(self.config.result);
        console.log(passengerList);

        //var num = passengerList.length;

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

        var bookList = JSON.parse(localStorage.getItem("bookList"));
        var len = bookList.length;
        console.log(len/2);
        console.log(bookList);

        /*var orderStatusList=[];
        for(var i=0;i<bookList.length;i++){
            orderStatusList.push(bookList[i].orderStatus);
        }
        console.log(orderStatusList);*/

        $.each(passengerList,function(index,val){
            console.log(val);
            if(localStorage.getItem(self.config.jouryType) == "RT"){
                for(var i=0;i<len/2;i++){
                    if((val.passengerUserIndex == bookList[i].clientUserIndex || val.passengerUserIndex == bookList[i].passengerUserIndex) && bookList[i].orderStatus == -1){
                        console.info('xxxx2');
                        /*personName = passengerList[i].psrName;
                        perCode = passengerList[i].idCode;
                        console.log(personName);*/
                        htmlCon(bookList[i].orderStatus,bookList[i].orderNumber,val.psrName,val.idCode);
                    }
                }
                for(var l=len/2;l<len;l++){

                    if((val.passengerUserIndex == bookList[l].clientUserIndex || val.passengerUserIndex == bookList[l].passengerUserIndex) && bookList[l].orderStatus == -1){

                        console.info('xxxx');
                        htmlConBack(bookList[l].orderStatus,bookList[l].orderNumber,val.psrName,val.idCode);
                    }
                }
            }else{
                for(var i=0;i<len;i++){
                    if((val.passengerUserIndex == bookList[i].clientUserIndex || val.passengerUserIndex == bookList[i].passengerUserIndex) && bookList[i].orderStatus == -1){
                        htmlCon(bookList[i].orderStatus,bookList[i].orderNumber,val.psrName,val.idCode);
                    }
                }
            }
        });
        /*var personName = passengerList[0].psrName;
         var perCode = passengerList[0].idCode;*/
        function htmlCon(orderStatus,passageNo,personName,perCode){
            console.log(perCode);
            var perCodeStr = perCode.substring(6,14);
            console.log(perCodeStr);
            var perCodeNew = perCode.replace(perCodeStr,"********");
            console.log(perCodeNew);
            if(localStorage.getItem(self.config.jouryType) == "RT") {
                item = {
                    orderStatus: orderStatus,
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
                    minPrice: self.config.result.minPrice,
                    passageNo:passageNo,
                    cabinCode:self.config.result.freightList[self.config.result.countIndex].cabinCode,
                    space:self.config.result.freightList[self.config.result.countIndex].cabinName,
                    discountRate: disRate,
                    personName:personName,
                    perCode:perCodeNew,
                    casApproveNo: casAppNo
                    /*planPrice:planPrice*num,
                    buildFee:buildFee*num,
                    insure:insure*num,
                    totalFee:planPrice*num*1 + buildFee*num*1+insure*num*1*/
                };
                tpl += BASE.lang.sub(self.config.Html, item);
            }else{
                item = {
                    orderStatus: orderStatus,
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
                    minPrice: self.config.result.minPrice,
                    passageNo:passageNo,
                    cabinCode:self.config.result.freightList[self.config.result.countIndex].cabinCode,
                    space:self.config.result.freightList[self.config.result.countIndex].cabinName,
                    discountRate: disRate,
                    perCode:perCodeNew,
                    personName:personName,
                    casApproveNo: casAppNo
                };
                tpl += BASE.lang.sub(self.config.OWHtml, item);
            }
        }

        function htmlConBack(orderStatusBack,passageNoBack,personNameBack,perCodeBack){
            var perCodeBackStr = perCodeBack.substring(6,14);
            var perCodeBackNew = perCodeBack.replace(perCodeBackStr,"********");
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
            /*var planPriceBack = self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinPrice,
                buildFeeBack = self.config.resultBack.freightList[self.config.resultBack.countIndex].airportBuildFee,
                insureBack = localStorage.getItem("insureBack");
            localStorage.setItem("backTotelPrice",planPriceBack*num*1 + buildFeeBack*num*1+insureBack*num*1);*/
            //localStorage.setItem("backPrice",planPriceBack);
            //var backNo = self.config.passageNo[1].orderNumber;
            itemBack = {
                orderStatus: orderStatusBack,
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
                minPrice: self.config.resultBack.minPrice,
                passageNo:passageNoBack,
                space:self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinName,
                cabinCode:self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinCode,
                discountRate: disRateBack,
                /*perCode:localStorage.getItem(self.config.identity_card),
                personName:localStorage.getItem(self.config.personName),*/
                personName:personNameBack,
                perCode:perCodeBackNew,
                casApproveNo: casAppNo
                /*planPrice:planPriceBack*num,
                buildFee:buildFeeBack*num,
                insure:insureBack*num,
                totalFee:planPriceBack*num*1 + buildFeeBack*num*1+insureBack*num*1*/
            };
            tpl += BASE.lang.sub(self.config.Html, itemBack);
        }
        }

        $(".wrapTop").html(tpl);
        /*if(passengerList.length > 1){
            for(var i=1,len=passengerList.length;i<len;i++){
                /!*var personNameMore = passengerList[i].psrName;
                 var perCodeMore = passengerList[i].idCode;
                 console.log(personNameMore);*!/
                console.log(passengerList[i].psrName);
                $(".userList").append('<br><span class="fontColor-666" style="padding-left: 7rem;">'+ passengerList[i].psrName +'</span><br><span class="fontColor-666" style="font-size: 12px;padding-left: 7rem;">身份证  '+ passengerList[i].idCode +'</span>');
            }
        }*/

        //显示费用
        var successStatus = [],
            goSucStatus = [],
            backSucStatus = [],
            failedStatus = [];
        var planPrice = self.config.result.freightList[self.config.result.countIndex].cabinPrice,
            buildFee = self.config.result.freightList[self.config.result.countIndex].airportBuildFee,
            insure = localStorage.getItem("insure"),
            insureNum = localStorage.getItem("insureNum");
        console.log(insure);
        var totalInsure = insure*insureNum;
        if (localStorage.getItem(self.config.jouryType) == "RT" && self.config.resultBack!=''){
            console.info(self.config.resultBack);
            var planPriceBack = self.config.resultBack.freightList[self.config.resultBack.countIndex].cabinPrice,
                buildFeeBack = self.config.resultBack.freightList[self.config.resultBack.countIndex].airportBuildFee,
                insureBack = localStorage.getItem("insureBack");
            //localStorage.setItem("backTotelPrice",planPriceBack*num*1 + buildFeeBack*num*1+insureBack*num*1);
            /*$.each($(".direction-go"),function(index,val){
                var this_ = $(this),
                    orderSta = this_.parents(".order-info-list").attr("data-code");
                if(orderSta == "1"){
                    goSucStatus.push(orderSta);
                }
            });
            var GOnum = goSucStatus.length;*/
            var GOnum = $(".direction-go").length;
            /*$.each($(".direction-back"),function(index,val){
             var this_ = $(this),
             orderSta = this_.parents(".order-info-list").attr("data-code");
             if(orderSta == "1"){
             backSucStatus.push(orderSta);
             }
             });
             var BACKnum = backSucStatus.length;*/
            var BACKnum = $(".direction-back").length;
            
            var totalPlanPrice = planPrice*GOnum*1 + planPriceBack*BACKnum*1,
                totalBuildFee = buildFee*GOnum*1 + buildFeeBack*BACKnum*1;
                //totalInsure = insure*GOnum*1 + insureBack*BACKnum*1;

            feeItem = {
                planPrice:totalPlanPrice,
                buildFee:totalBuildFee,
                insure:totalInsure,
                totalFee:totalPlanPrice*1 + totalBuildFee*1 + totalInsure*1
            };
            tpl += BASE.lang.sub(self.config.feeHtml, feeItem);
            $(".wrapTop").html(tpl);
            //if(insure == "0" && insureBack == "0"){
            if(totalInsure == "0"){
                $(".insure").hide();
            }else{
                $(".insure").show();
            }

            if(casAppNo == ""){
                $(".casApproveNo").hide();
            }else{
                $(".casApproveNo").show();
            }
        }else{
            /*$.each($(".order-info-list"),function(index,val){
             var this_ = $(this),
             orderSta = this_.attr("data-code");
             if(orderSta == "1"){
             successStatus.push(orderSta);
             }
             console.log(successStatus);
             });
             console.log(successStatus.length);
             var OWnum = successStatus.length;*/
            var OWnum = $(".order-info-list").length;
            feeItem = {
                planPrice:planPrice*OWnum,
                buildFee:buildFee*OWnum,
                //insure:insure*OWnum,
                insure:totalInsure,
                totalFee:planPrice*OWnum*1 + buildFee*OWnum*1 + totalInsure*1
            };
            tpl += BASE.lang.sub(self.config.feeHtml, feeItem);
            $(".wrapTop").html(tpl);
            if(totalInsure == "0"){
                $(".insure").hide();
            }else{
                $(".insure").show();
            }

            if(casAppNo == ""){
                $(".casApproveNo").hide();
            }else{
                $(".casApproveNo").show();
            }
        }


        /*if(insure != "0" && insure !=""){
         $(".insure").eq(0).show();
         }
         if(insureBack != "0" && insureBack !=""){
         $(".insure").eq(1).show();
         }*/

        //判断是否显示支付按钮
        /*$.each($(".order-info-list"),function(index,val){
            var this_ = $(this),
                orderSta = this_.attr("data-code");
            if(orderSta == "1"){
                this_.find(".bookSuccess").show();
            }else if(orderSta == "2"){
                this_.find(".bookFailed").show();
                failedStatus.push(orderSta);
            }
        });
        console.log(failedStatus.length);
        if (localStorage.getItem(self.config.jouryType) == "RT" && failedStatus.length == 2){
            $(".go-pay-wrap").hide();
        }else if(localStorage.getItem(self.config.jouryType) == "OW" && failedStatus.length == 1){
            $(".go-pay-wrap").hide();
        }else{
            $(".go-pay-wrap").show();
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


        if (localStorage.getItem(self.config.cause)) {
            $(".evection").html(localStorage.getItem(self.config.cause)).css("color", "#333");
        }
        if (localStorage.getItem(self.config.identity_card)) {
            $(".identity_card").val(localStorage.getItem(self.config.identity_card)).css("color", "#333");
        }

        console.info(Times);

        //var time = self.config.passageNo[0].createTime + self.config.passageNo[0].timeoutTime - Times;
        //var time = self.config.passageNo[0].timeoutTime;

        var orderUuidTime = localStorage.getItem("orderUuid");
        var logRequestList = {url:API.AIR_TICKER.ORDER_DETAIL,"orderUuid": orderUuidTime};
        logRequest(logRequestList);
        ajaxRequest({url:API.AIR_TICKER.ORDER_DETAIL,data:{"orderUuid": orderUuidTime}},function(data){
            console.log(data);
            var time = data.content.timeoutTime;
            console.info(time);
            self.timeFn(time);

            var crTime = data.content.travelFlight.createTime * 1000,
                createTime = moment(crTime).format("YYYY/MM/DD HH:mm:ss");
            $(".createTime").text(createTime);
            localStorage.setItem("createTime",createTime);
        });
    },
    fromListHtml: function(orderUuid){
        var self = this,
            tpl = "",
            item = {};
        var logRequestList = {url:API.AIR_TICKER.ORDER_DETAIL,"orderUuid": orderUuid};
        logRequest(logRequestList);
        ajaxRequest({url:API.AIR_TICKER.ORDER_DETAIL,data:{"orderUuid": orderUuid}},function(data){
            console.log(data);
            localStorage.setItem("orderDetail",JSON.stringify(data.content));
            localStorage.setItem("mobile",data.content.travelPassenger.phone);
            localStorage.setItem("causeType",data.content.causeType);
            var status = data.content.orderStatus,
                travelFlight = data.content.travelFlight,
                travelPassenger = data.content.travelPassenger;

            var perCode = travelPassenger.certificateNumber;
                var perCodeStr = perCode.substring(6,14);
            var perCodeNew = perCode.replace(perCodeStr,"********");

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
            
            var mealCode,
                buildFee,
                disRate;
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

            if(travelFlight.airportConstructionFee != "" && travelFlight.airportConstructionFee != null){
                buildFee = travelFlight.airportConstructionFee;
            }else{
                buildFee = 0;
            }

            var crTime = travelFlight.createTime * 1000,
                createTime = moment(crTime).format("YYYY/MM/DD HH:mm:ss");

            item = {
                /*direction: "direction-go font-12 fontColor-49b",
                goText: "去程",
                route: "go_channel",*/
                orderStatus: data.content.orderStatus,
                direction: "font-12 fontColor-49b",
                goText: "",
                route: "",
                //date: times.getFullYear()+ '-' + (times.getMonth()+1) + '-' + times.getDate() + " " + week,
                flightDate: times.getFullYear()+ '-' + (times.getMonth()+1) + '-' + times.getDate(),
                date: (times.getMonth()+1) + '月' + times.getDate() + "日 " + week,
                //beginTime: getHourAndMM((BASE.lang.getLocalTime(new Date(travelFlight.beginTime *1000))).replace("-","/").replace("-","/")),
                beginTime: moment(travelFlight.beginTime * 1000).format("HH:mm"),
                arriveAirport: travelFlight.arriveAirport,
                arriveAirportNameArriveTerminal: travelFlight.arriveAirportName + travelFlight.arriveTerminal,
                diffTime: data.content.diffTime,
                carrierCode:travelFlight.carrierCode,
                flightNo:travelFlight.flightNo,
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
                cabinCode:travelFlight.freightSpaceType,
                space:flightCabin[travelFlight.baseCabin]||travelFlight.baseCabin,
                discountRate: disRate,
                perCode:perCodeNew,
                personName:travelPassenger.passengerName,
                planPrice: travelFlight.flightFee,
                buildFee: buildFee,
                insure:data.content.flightAccidentInsurance,
                totalFee:(travelFlight.flightFee)*1 + (travelFlight.airportConstructionFee)*1+(data.content.flightAccidentInsurance)*1
            };
            if(data.content.casApprove){
                item.casApproveNo=data.content.casApprove.casApproveNo||""
            }
            else{
                casApproveNo=""
            }

                tpl += BASE.lang.sub(self.config.OWHtml, item);
                tpl += BASE.lang.sub(self.config.feeHtml, item);
                $(".wrapTop").html(tpl);

                $(".createTime").text(createTime);

            if(!item.casApproveNo){
                $(".casApproveNo").hide();
            }
            $(".casApproveNo").on("tap",function () {
                window.location.href="zhfApproInfo.html?approvalNo="+item.casApproveNo;
            });

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

                self.eventFn();

                if(data.content.flightAccidentInsurance != "0"){
                    $(".insure").show();
                }else{
                    $(".insure").hide();
                }

                // if(status == 0){
                //     $(".return-txt").show().text("正在帮您预订，请稍候");
                //     $(".return-ticket-status").show().text("预订中");
                //     $(".go-pay-wrap").hide();
                // }else if(status == 2){
                //     $(".return-txt").show().text("很抱歉！预订失败，请重新预订");
                //     $(".return-ticket-status").show().text("预订失败");
                //     $(".go-pay-wrap").hide();
                // }else if(status == 4){
                //     $(".go-pay-wrap").show();
                //     $(".yuDingTime").show().html("支付已超时，请重新预订。");
                //     /*$(".countDown").text("00:00");
                //     $(".warnText").show().find("p").text("支付已超时，请重新预订。");*/
                //     $(".reserve-btn-not").show();
                // }else{
                //     $(".yuDingTime").show();
                //     $(".reserve-btn").show();
                //     $(".go-pay-wrap").show();
                //     var time = data.content.timeoutTime;
                //     self.timeFn(time);
                // }

                if(status == -2){
                    $(".go-pay-wrap").show();
                    $(".yuDingTime").hide();
                    $(".reserve-btn").hide();
                    $(".reserve-not").hide();
                    $(".reserve-btn-not").show();
                }else if(status == -1 || status == 1){
                    $(".yuDingTime").show();
                    $(".reserve-btn").show();
                    $(".go-pay-wrap").show();
                    var time = data.content.timeoutTime;
                    self.timeFn(time);
                }
        });
    },
    timeFn: function(time){
        //支付倒计时
        console.log(time);
        var minutes,seconds;
        var pay = setInterval(function(){
            time = time - 1;
            if(time > 0){
                $(".yuDingTime").show();
                $(".reserve-btn").show();
                minutes = Math.floor(time/60);
                if(minutes<10){
                    minutes = "0" + minutes;
                }
                seconds = Math.floor(time-minutes*60);
                if(seconds<10){
                    seconds = "0" + seconds;
                }
                $(".countDown").text(minutes + ":" + seconds);
                $(".yuDingTime").hide();
            }else{
                clearInterval(pay);
                $(".yuDingTime").show().html("支付已超时，请重新预订。");
                /*$(".countDown").text("00:00");
                $(".warnText").fadeIn('slow').find("p").text("支付已超时，请重新预订。");*/
                $(".reserve-btn-not").show();
                $(".reserve-btn").hide();
                /*if(isiOS){
                    showServiceButton(false);
                }else if(isAndroid){
                    window.android.showServiceButton(false);
                }*/
                return false;
                /*$(".footer").hide();
                 $(".canceling").hide();
                 $(".status").hide();
                 $(".ticketStatus").text("已取消");
                 $(".buying").css("margin-top","0.8rem");
                 $(".sucTime").hide();*/
            }
        },1000);
    },
    eventFn: function() {
        var self = this;
        //保存身份证信息
        $(".identity_card").on('keyup', function(event) {
            localStorage.setItem(self.config.identity_card, $(this).val());
        });

        //取消订单
        $(".cancel-btn").on("tap",function(){
            cancelOrder();
        });

        //去支付
        $(".pay-btn").on('click', function() {
            $(".reserve-btn").hide();
            $(".reserve-not").show();
            var totalFee = $(".totalFee").text();
            localStorage.setItem("totalFee",totalFee);
            if($(".countDown").text() != "00:00"){
                //var nextPage = "pay-table.html";
                var nextPage = "casPay.html";
                if(getQueryString("orderUuid")!=null){
                    nextPage +="?orderUuid="+ getQueryString("orderUuid");
                }
                window.location.href = nextPage;
            }
        });
        //重新预订
        $(".reserve-btn-not").on("click",function(){
            // localStorage.setItem("sPlace",JSON.stringify({"startPlace":city,"startCode":code}));
            // localStorage.setItem("sEnd",JSON.stringify({"endPlace":city,"endCode":code}));
            // localStorage.setItem("goTime",JSON.stringify({"date":backDay,"week":this.getDateInfo(backDay)}));
            // localStorage.setItem("cabinClass",JSON.stringify({"cabinText":cabinText,"cabinCode":cabinCode}));
            // localStorage.setItem("jouryType","OW");
            var token = localStorage.getItem("token");
            var casUserIdx = localStorage.getItem("casUserIdx");
            var appId = localStorage.getItem("appId");
            //window.location.href = "home.html?init=2&cas_access_token=" + token;
            window.location.href = "home.html?init=2&cas_access_token=" + token + "&appId=" + appId + "&casUserIdx=" + casUserIdx;
        });

        $(".credentials-txt").click(function() {
            $(".credentials-mask").show();
        });

        $(".credentials-info-list").click(function() {
            $(".credentials-mask").hide();
            $(".credentials-txt span").text($(this).text());
        });

        /*查看退改签*/
        $(".look-info").click(function(){
            var startCode = $(this).parents(".order-info-list").find(".departAirport").attr("data-code"),
                endCode = $(this).parents(".order-info-list").find(".arriveAirport").attr("data-code"),
                flightDate = $(this).parents(".order-info-list").find(".flightDate").attr("data-code"),
                carrierCode = $(this).parents(".order-info-list").find(".flightNo").attr("data-code"),
                cabinType = $(this).parents(".order-info-list").find(".cabinCode").attr("data-code"),
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
            //$(".return-info").show();
        });
        /*$(".return-info").click(function(){
            $(this).hide();
        });*/

        /*详细信息的展开收起*/

        $(".order-detailBtn").click(function(){
            var siblings = $(this).siblings(".order-confirm");
            if(siblings.is(":visible")){
                $(this).find("span").text("详细信息");
                $(this).find("img").removeClass("order-detailBtn-imgRotate");
            }else{
                $(this).find("span").text("收起信息");
                $(this).find("img").addClass("order-detailBtn-imgRotate");
            }
            siblings.toggle();
        });

        $(".goBack").on("tap",function(){
            window.location.href = "order-list.html?orderType=0";
        });
    }
};

order.init();

function cancelOrder(){
    $(".bg").show();
    $(".loading").show();
    var orderUuidList = [],
        list = {};
    var orderUuid = getQueryString("orderUuid");
    if(orderUuid != null){
        orderUuidList.push({"orderUuid":orderUuid});
    }else{
        var bookList = JSON.parse(localStorage.getItem("bookList"));
        for (var i = 0; i < bookList.length; i++) {
            if(bookList[i].orderStatus == "-1" || bookList[i].orderStatus == -1){
                orderUuidList.push({"orderUuid":bookList[i].orderUuid});
            }
        }
    }
    list = {"list":orderUuidList};
    console.log(list);
    var logList =$.extend({url:API.AIR_TICKER.FLIGHT_CANCEL_SEAT},list);
    logRequest(logList);
    ajaxRequest({url:API.AIR_TICKER.FLIGHT_CANCEL_SEAT,data:list},function(data){
        console.log(data);
        //alert(JSON.stringify(data));
        $(".loading").hide();
        $(".bg").show();
        $(".sure").show();
        //$(".sureCon").text(data.content[0].returnMsg);
        $(".sureCon").text("取消成功");
        $(".yuDingTime").hide();
        $(".reserve-btn").hide();
        $(".go-pay-wrap").hide();
    },function(data){
        $(".warnText").fadeIn('slow').find("p").text(data.message);
        setTimeout(fadeOut,2000);
        return false;
    });

    $(".sureOk").on("tap",function(){
        $(".bg").hide();
        $(".sure").hide();
        window.location.href="home.html";
    })
}