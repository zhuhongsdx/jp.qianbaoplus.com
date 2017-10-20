var changeTicket = {
    config : {
        personName:"personName",
        cause: "cause",
        passageNo:"",
        html : '<div class="flight-info01">'+
        '<div class="flight-info01-con">'+
        '<div class="order-info-price">'+
        '<div class="flightListBottom font-12 fontColor-333">'+
        '<img src="./img/logo/{carrierCode}.png" alt="" />'+
        '<span>{carrierNameFlightNo}</span><span class="planeType">{planeType}</span>'+
        /*'<i class="qucheng-color font-10">去程</i>'+*/
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
        '<p class="font-12">'+
        '<label class="fontColor-777">机票票号</label><span class="fontColor-666">{ticketNo}</span></p>'+
        '</div>'+
        '<div class="module">'+

        '<p class="font-12">'+
        '<label class="fontColor-777">乘机人</label><span class="fontColor-666">{personName}</span></p>'+
        '<p class="font-12" style="margin-top:-2px;">'+
        '<label class="fontColor-777" style="color:transparent;">证件号码</label><span class="fontColor-666">{perCode}</span></p>'+
        '<p class="font-12 casApproveNo" style="margin-top:-2px;">'+
        '<label class=" fontColor-777">审批单号</label><span class="fontColor-666">{casApproveNo}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">所属部门</label><span class="fontColor-666">{departmentName}</span></p>'+
        '<p class="font-12">'+
        '<label class="fontColor-777">舱位</label><span class="fontColor-666">({cabinCode}) {space} {discountRate}</span></p>'+
        '</div>'+
        '<div class="module" style="display: none;">'+
        '<p class="font-12">'+
        '<label class="fontColor-777">出差原因</label><span class="fontColor-666">{cause}</span></p>'+
        '<p class="font-12" style="height:3.2rem;">'+
        '<label class="fontColor-777">备注</label><span class="fontColor-666" style="display: inline-block;height: 35px;margin-top: -2rem;">{remark}</span></p>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'
    },
    init: function() {
        var self = this;
        self.bindEvent();
    },
    bindEvent: function(){
        var status = getQueryString("status"),//从订单列表进
            nextStatus = "",
            causeCode = "",
            item = {};
        console.log(status);
        var orderUuid = getQueryString("orderUuid");//共有的
        var type = getQueryString("orderType");//从订单详情进
        //if(status == null){
            $(".bg").show();
            $(".loading").show();
            getTicInfo(orderUuid);
        //}
        var payOkChangeFee = getQueryString("payOkChangeFee");//支付宝支付完回来
        if(payOkChangeFee == "true"){
            $(".changePay").hide();
        }

        function getTicInfo(orderUuid){
            var logRequestList = {url:API.AIR_TICKER.ORDER_DETAIL,"orderUuid": orderUuid};
            logRequest(logRequestList);
            ajaxRequest({url:API.AIR_TICKER.ORDER_DETAIL,data:{"orderUuid": orderUuid}},function(data){
                console.log(data);
                $(".bg").hide();
                $(".loading").hide();
                var tpl = "";
                var status = data.content.orderChangeInfo.changedOrderStatus;
                nextStatus=status;
                causeCode=data.content.causeType;


                var orderChangeInfo = data.content.orderChangeInfo;
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

                item = {
                    date: (timesDepart.getMonth()+1) + '月' + timesDepart.getDate() + "日 " + weekDepart,
                    beginTime: moment(orderChangeInfo.changedDepartTime * 1000).format("HH:mm"),
                    //arriveAirport: travelFlight.arriveAirport,
                    arriveAirportNameArriveTerminal: orderChangeInfo.changedArriveAirportName,
                    diffTime: orderChangeInfo.changedDiffTime,
                    carrierCode: orderChangeInfo.carrier,
                    carrierNameFlightNo: orderChangeInfo.carrierName + " " + orderChangeInfo.carrier + orderChangeInfo.flightNo,
                    planeType: orderChangeInfo.changedPlaneType,
                    //mealCode: mealCode,
                    dateArrive: (timesArrive.getMonth()+1) + '月' + timesArrive.getDate() + "日 " + weekArrive,
                    endTime: moment(orderChangeInfo.changedArriveTime * 1000).format("HH:mm"),
                    //departAirport: travelFlight.departAirport,
                    departAirportNameDepartTerminal: orderChangeInfo.changedDepartAirportName,
                    //minPrice: travelFlight.minPrice,
                    passageNo:orderChangeInfo.changedOrderNumber,
                    //createTime: moment(travelFlight.createTime * 1000).format("YYYY/MM/DD HH:mm:ss"),
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
                    originalOrderMoney: (orderChangeInfo.originalOrderMoney*1).toFixed(0),
                    changeFee: orderChangeInfo.changeFee,
                    changeTotalFee: orderChangeInfo.originalOrderMoney*1 + orderChangeInfo.changeFee*1,
                    changedOrderNumber:orderChangeInfo.changedOrderNumber,

                };
                if(data.content.casApprove){
                    item.casApproveNo=data.content.casApprove.casApproveNo||""
                }
                else{
                    casApproveNo=""
                }
                if(orderChangeInfo.changedTicketNo===null){
                    item.ticketNo="无"
                }

                tpl += BASE.lang.sub(changeTicket.config.html, item);

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

                if(status == "17"){
                    $(".changePay").show();
                }else if(status == "18"){
                    $(".changeFee").text(data.content.orderChangeInfo.changeFee + "元");
                    $("#payBtn").addClass("changeToPay");
                    $(".changePay").show();
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
            });
        }

        $(".goOldOrder").on("tap",function(){
            window.location.href = "return-ticket-status.html?orderUuid=" + orderUuid + "&isOldOrder=1&status=14";
        });
        $("#payBtn").on("tap",function () {
            if(nextStatus==18){
                console.log(item.changeFee);
                console.log(item.changedOrderNumber);
                if(causeCode==0){
                    localStorage.setItem("causeType",JSON.stringify({"causeText":"因私出行","causeCode":causeCode}))
                }
                else{
                    localStorage.setItem("causeType",JSON.stringify({"causeText":"","causeCode":causeCode}))
                }

                window.location.href = "casPay.html?changedOrderNumber=" + item.changedOrderNumber+"&changeFee="+item.changeFee;
            }

            return

            // return;
            // window.location.href = "casPay.html?changedOrderNumber=" + orderChangeInfo.originalOrderNumber+"&changeFee="+orderChangeInfo.changeFee;
        });
        
        $(".goBack").on("tap",function(){
            //window.history.back();
            window.location.href = "order-list.html?orderType=0";
        });
    }
};


changeTicket.init();