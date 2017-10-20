var filterParam ={};
var userInsureList ="userInsureList";
var currentItem ={
    list:[],
    currentInfo:{},
    subIndex:0
};
var isBookClick = true;
var list = {
    config: {
        localStart: "localStart",
        localEnd: "localEnd",
        listDay: 'listDay',
        queryFlowNo: "queryFlowNo",
        jouryType: "jouryType",
        searchData: "searchData",
        airlineCompany: [],
        departAirport: [],
        arriveAirport: [],
        searchDataBack: "searchDataBack",
        flag: true,
        globData: "",
        globDateGo: "",
        globDateBack: "",
        dataHtml: '<li class="flightList" data-current-index="{current_index}">' +
            '<div class="flightList-top">' +
            '<input type="hidden" class="hideJson" value=\'{json}\'/>' +
            '<ul class="flightListTop clearfix">' +
            '<li>' +
            '<p class="startTime font-16 fontColor-ff6" style="margin-bottom:0;">{beginTime}</p>' +
            '<p class="font-11 fontColor-666 departAirport" style="margin-bottom:5px;" data-code="{departAirport}">{beginAddress}</p>' +
            '</li>' +
            '<li style="margin-top:0.5rem;">' +
            '<img src="./img/img_time_consuming_plane.png" alt="" style="margin-bottom:0.2rem;" />' +
            '<div style="text-align: center;">' +
            /*'<img class="icon-clock" src="./img/img_time_consuming_clock.png" alt="" />' +*/
            '<span class="flytime font-10-m fontColor-999 runTime">{diffTime}</span>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<p class="font-16 fontColor-333" style="margin-bottom:0;">{endTime}</p>' +
            '<p class="font-11 fontColor-666 arriveAirport" style="margin-bottom:5px;" data-code="{arriveAirport}">{endAddress}</p>' +
            '</li>' +
            '<li>' +
            '<p class="font-18 fontColor-ff6" style="margin-bottom:0;">{minPrice}<span class="font-16 fontColor-ff6" style="margin-left: 3px;">元</span></p>' +
            '<p class="font-10-r fontColor-666" style="margin-bottom:5px;">{minDiscountRate}</p>' +
            '</li>' +
            '</ul>' +
            '<div class="flightListBottom font-10 fontColor-999">' +
            '<img src="./img/logo/{carrierCode}.png" alt="" />' +
            '<span>{carrierName} <b class="carrierCode" style="font-weight:normal;">{carrierCode}</b><b class="flightNo" style="font-weight:normal;">{flightNo}</b></span><span class="planeType">{planeType}</span><span class="mealCode">{mealCode}</span>' +
            '</div>' +
            '<img class="upWarn" src="./img/img_passengerticket_Coupon_guan.png" alt="" style="display: none;"/>' +
            '</div>' +
            '{hidetpl}' +
            '</li>',
        hideHtml: '<div class="flightList-detail">' +
        '<div class="flightList-detail-list clearfix">' +
        '<div data-channelFlag="{channelFlag}" data-protocalFlag="{protocalFlag}" class="channelFlagClass">' +
        '<span class="font-17 fontColor-ff6 asc_">{cabinPrice}</span><span class="font-14 fontColor-ff6" style="margin-left: 3px;">元</span><span class="font-12 fontColor-ff6 flag" style="vertical-align: top;margin-left: 1rem;display: none;"><img src="img/zhf/xie.png" alt="" style="width: 1.7rem;height: auto;vertical-align: middle;margin-top: -5px;"><!--&nbsp;&nbsp;航司官网价--></span>' +
        '<p class="fontColor-666 yuanJia" style="font-size: 11px;" data-code="{cabinCode}">({cabinCode}) {cabinName} {discountRate}<a href="javascript:;" class="look-info font-11 fontColor-49b">查看退改签</a></p>' +
        '</div>' +
        '<div class="yuding" data-index={count} data-seat="{cabinIndex}">' +
        '<a href="javascript:;" class="yudingBtn fontColor-fff">预订</a>' +
        '<a href="javascript:;" class="yudingNot fontColor-fff">已售罄</a>' +
        '<span class="surplus">{remainTicketNum}</span>' +
        '</div>' +
        '</div>' +
        '</div>',
        airlineHtml: '<div class="font-12 fontColor-666" carrierCode="{carrierCode}">{airport}</div>'
    },
    init: function() {
        var self = this;
        self.eventFn();
        self.initSearch();
    },
    initSearch:function () {
        var self = this;

        //判断title
        var startPlace = JSON.parse(localStorage.getItem("sPlace"))["startPlace"],
            endPlace = JSON.parse(localStorage.getItem("sEnd"))["endPlace"];
        $(".Loading").show();

        var str = "";
        if(localStorage.getItem("flag") == "false" || !self.config.flag){
            str = decodeURIComponent(localStorage.getItem(self.config.searchDataBack));
            self.config.flag = false;

            document.title = "返: " + endPlace + " —— " + startPlace;
            $(".header h1").html("返: " + endPlace + " —— " + startPlace);
        }else{
            if (localStorage.getItem(self.config.jouryType) == "OW") {
                document.title = startPlace + " —— " + endPlace;
                $(".header h1").text(startPlace + " —— " + endPlace);
            }else{
                document.title = "去: " + startPlace + " —— " + endPlace;
                $(".header h1").text("去: " + startPlace + " —— " + endPlace);
            }
            str = decodeURIComponent(localStorage.getItem(self.config.searchData));
        }
        var objectStr = JSON.parse(str);
        $("#date").text(objectStr.departDate);
        var oldOrderNumber = "";
        if(localStorage.getItem("oldOrderNumber") != null){
            oldOrderNumber = localStorage.getItem("oldOrderNumber");
        };
        objectStr.oldOrderNumber = oldOrderNumber;
        console.log(objectStr);
        self.loadHtml(objectStr);
    },
    //加载模板
    loadHtml: function(objectStr) {
        window.scrollTo(0,0);
        clearAirPortInfoAndAirLineCompanyStorAge();
        var self = this;
        objectStr.departDate = $("#date").text();
        console.log(objectStr);
        initFilter(self);
        var logObjectStr = $.extend({url:API.AIR_TICKER.FLIGHT_LIST},objectStr);
        logRequest(logObjectStr);
        ajaxRequest({url:API.AIR_TICKER.FLIGHT_LIST,data:objectStr},function (data) {
            $(".Loading").hide();
            $(".prev").show();
            $(".prevNot").hide();
            $(".next").show();
            $(".nextNot").hide();
            var content = data.content;
            console.log(content);
            if(content == null){
                $(".noFlight").show();
            }else{
                $(".noFlight").hide();

                for(var index =0;index<content.flightList.length;index++){
                    var obj = content.flightList[index];

                    var diffTime = obj.diffTime;

                    var hour = diffTime.substring(0,diffTime.indexOf('小'));
                    var m = diffTime.substring(diffTime.indexOf('时')+1,diffTime.indexOf('分'));
                    content.flightList[index]['diffTime_'] =(hour*60)+(m*1);
                }
                $(".filtrate").on("tap",function(){
                    showSift(1);
                });
            }

            localStorage.setItem(self.config.queryFlowNo, content.queryFlowNo);

            self.config.globData = content.flightList;
            //判断是否为往返程分别保存往返程信息
            self.config.globDataGo = content.flightList[0];
            if(content.flightList.length>1){
                self.config.globDataBack = content.flightList[1];
            }
            self.template(self.config.globData,1);
        },function(data){
            console.log(data);
            $(".Loading").hide();
            $(".bg").show();
            $(".busy").show();
        });
    },
    eventFn: function() {
        var self = this;
        var orderUuid = getQueryString("orderUuid"),
            oldFltNo = getQueryString("flightNo"),
            journeyType = getQueryString("journeyType");
        console.log(oldFltNo);
        if(orderUuid != null && oldFltNo != null && journeyType != null){
            localStorage.setItem("listOrderUuid",orderUuid);
            localStorage.setItem("listOldFltNo",oldFltNo);
            localStorage.setItem("listJourneyType",journeyType);
        }
        var casAppNo = localStorage.getItem("casAppNo");
        console.log(casAppNo);
        //获取日期
        var goDate = "",toDay = "";
        if(localStorage.getItem("flag") == "true"){
            toDay = localStorage["goTime"];
        }else if((localStorage.getItem("flag") == "false" || !self.config.flag) && localStorage["backtime"]){
            toDay = localStorage["backtime"];
        }
        else{
            toDay = localStorage["goBackTime"];
        }

        console.info(toDay);
        goDate = JSON.parse(toDay);
        $("#date").text(goDate.date);
        $("#week").text(goDate.week);
        changeLocalStorageDate(goDate.date,goDate.week);
        localStorage.setItem(self.config.listDay, "");

        $(".goBack").on("tap",function(){
            window.location.href = "home.html";
        });

        //前一天，后一天
        function fadeOut(){
            $(".warnText").fadeOut('slow');
        }

        $(".prev").on("tap",function(){
            $(".prev").hide();
            $(".prevNot").show();
            $(".next").hide();
            $(".nextNot").show();
            initOrderByStyle();
            var timeShow = $("#date").text();
            console.log(timeShow);
            if(timeShow == curDate){
                $(".warnText").fadeIn('slow').find("p").text("昨天的票不能再买了哦！");
                setTimeout(fadeOut,2000);
                $(".prev").show();
                $(".prevNot").hide();
                $(".next").show();
                $(".nextNot").hide();
                return false;
            }else{
                $(".noFlight").hide();
                $(".planeList").html("");
                var date = moment(timeShow).subtract(1, 'days').format('YYYY-MM-DD'),
                    week = moment(timeShow).subtract(1, 'days').format('dddd');
                $("#date").text(date);
                $("#week").text(week);

                changeLocalStorageDate(date,week);
                clearFilter();
                initFilter(self);
                self.initSearch();
            }
        });

        $(".next").on("tap",function(){
            $(".prev").hide();
            $(".prevNot").show();
            $(".next").hide();
            $(".nextNot").show();
            initOrderByStyle();
            var timeShow = $("#date").text();
            if(timeShow == maxDay){
                $(".warnText").fadeIn('slow').find("p").text("超出选择范围了，请重新选择日期！");
                setTimeout(fadeOut,2000);
                $(".prev").show();
                $(".prevNot").hide();
                $(".next").show();
                $(".nextNot").hide();
                return false;
            }else{
                $(".noFlight").hide();
                $(".planeList").html("");
                var date = moment(timeShow).add(1, 'days').format('YYYY-MM-DD'),
                    week = moment(timeShow).add(1, 'days').format('dddd');
                $("#date").text(date);
                $("#week").text(week);

                changeLocalStorageDate(date,week);
                clearFilter();
                initFilter(self);
                self.initSearch();
            }
        });

        function changeLocalStorageDate(date,week){
            var timeType = "goTime";
            if(localStorage.getItem("flag")=='false'){
                timeType = "backtime";
                var strBack = decodeURIComponent(localStorage.getItem("searchDataBack")),
                    objectStrBack = JSON.parse(strBack);
                objectStrBack.departDate = date;
                localStorage.setItem("searchDataBack",encodeURIComponent(JSON.stringify(objectStrBack)));
            }else{
                var str = decodeURIComponent(localStorage.getItem("searchData")),
                    objectStr = JSON.parse(str);
                console.log(objectStr);
                objectStr.departDate = date;
                localStorage.setItem("searchData",encodeURIComponent(JSON.stringify(objectStr)));
            }
            localStorage.setItem(timeType,JSON.stringify({"date":date,"week":week}))
        }
        //不同条件排序
        $(".arrayMode>div").on('tap',function () {
                var this_= $(this);
                var sibilings = this_.siblings();
                this_.addClass('arrayModeActive');
                sibilings.removeClass('arrayModeActive');
                this_.siblings().find('span:visible').hide();
                this_.siblings().find('.first').show();

                var span_show =this_.find("span:visible");
                var orderBy ='asc';
                if(span_show.hasClass('asc_'))
                {
                    orderBy ="desc";
                }
                this_.find("span").hide();
                this_.find("."+orderBy+'_').show();
                var data = this_.data('code');

            orderByType(orderBy,data);
        });

        function orderByType(orderBy,filed) {
            var resultList_OrderBy =  _.orderBy(self.config.globData,[filed], [orderBy]);
            self.template(resultList_OrderBy,0);
        }
        //显示隐藏详情信息
        $(".planeList").on('tap', '.flightList .flightList-top', function(event) {
            var this_ = $(this);
            var prevClientHeight =document.body.clientHeight;
            var prevScrollTop = $(window).scrollTop();
            var offsetTop = event.detail.target.offsetTop;
            $(this).siblings(".flightList-detail").toggle(300);
            var currentClientHeight =document.body.clientHeight;
            var currentIndexArray = this_.parent().attr("data-current-index").split('_');
            var currentIndex = currentIndexArray[0];

            var clientHeight = window.innerHeight;
            var isUpdate = $(this).siblings(".flightList-detail").is(":visible");
            var clientY = event.detail.touches[0].clientY;
            console.info(offsetTop);
            console.info(currentClientHeight-prevClientHeight);
            if(currentIndex!=1 &&currentClientHeight-prevClientHeight>0){
                var temp = (currentClientHeight-prevClientHeight)+clientY;
                var dd = temp>clientHeight?clientY:0;

                dd=dd==0?0:(dd-offsetTop-30);
                window.scrollTo(0,(prevScrollTop+dd));
            }
        });
        //查看退改签说明
        $(".look-info").live('tap',function() {
            var startCode = $(this).parents(".flightList").find(".departAirport").attr("data-code"),
                endCode = $(this).parents(".flightList").find(".arriveAirport").attr("data-code"),
                flightDate = $("#date").text(),
                carrierCode = $(this).parents(".flightList").find(".carrierCode").text(),
                cabinType = $(this).parent().attr("data-code"),
                flightNo = $(this).parents(".flightList").find(".flightNo").text();
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

        /*筛选条件TAB切换*/
        $(".condition-screening-menu").on('tap', function(event) {
            $(this).addClass("condition-borderColor").siblings().removeClass("condition-borderColor");
            $(".condition-screening-menu-info").eq($(this).index()).show().siblings().hide();
        });

        /*对勾图片的显示隐藏*/
        $(".condition-screening-menu-info").each(function() {
                var this_ = $(this);
                $(this).on('tap', 'div', function(event) {
                    if ($(this).index() == 0) {
                        $(this).toggleClass("check-pic").siblings().removeClass("check-pic");
                        $(".condition-borderColor .selec").hide();
                    } else {
                        $(this).toggleClass("check-pic");
                        $(this).parent().find("div").eq(0).removeClass("check-pic");
                        $(".condition-borderColor .selec").show();
                    }

                    if(this_.find(".check-pic").length==0){
                        this_.find("div:eq(0)").addClass("check-pic");
                        $(".condition-borderColor .selec").hide();
                    }
                });
            })
        /*筛选确定点击*/
        $(".confirm-btn").on('tap', function(event) {
            filterFunction(1);
        });

        /*筛选*/
        function filterFunction(isFilter){
            var data = {
                "queryFlowno": localStorage.getItem(self.config.queryFlowNo),
                "pageNum": pageInfo.initPageNo,
                "pageSize": pageInfo.perpage,
                "departTimeList": [],
                "cabinTypeList": [],
                "carrierCodeList": [],
                "departAirportCodeList": [],
                "arriveAirportCodeList": [],
                "discountRateList": []
            };

            if(isFilter==1){
                filterTime(data);
                filterCabinSeat(data);
                filtercarrierCompany(data);
                filterDiscount(data);
                filterAirPort(data);
            }
            //把选择的条件存储在全局变量中
            var param =['departTimeList','cabinTypeList','carrierCodeList','departAirportCodeList','arriveAirportCodeList','discountRateList'];

            var key =null;
            for(var index=0,key;key=param[index];index++){
                filterParam[key] =data[key];
            }
            console.info(data);
            $(".condition-screening-mask").hide();
            $("html").css("overflow-y","auto");
            $(".planeList").html("");
            $(".Loading").show();
            var logData = $.extend({url:API.AIR_TICKER.FLIGHT_LIST_BY_CONDITION},data);
            logRequest(logData);
            ajaxRequest({url:API.AIR_TICKER.FLIGHT_LIST_BY_CONDITION,data:data},function (data) {
                console.log(data);
                $(".Loading").hide();
                var flightList =[];
                if(data.content){
                    flightList = data.content.flightList;
                    $(".noFlight").hide();
                }else{
                    $(".noFlight").show();
                }

                for(var index =0;index<flightList.length;index++)
                {
                    var obj = flightList[index];
                    var diffTime = obj.diffTime;
                    var hour = diffTime.substring(0,diffTime.indexOf('小'));
                    var m = diffTime.substring(diffTime.indexOf('时')+1,diffTime.indexOf('分'));
                    flightList[index]['diffTime_'] =(hour*60)+(m*1);
                }

                var currentDiv = $(".arrayMode").find(".arrayModeActive");
                var orderFiled = currentDiv.attr("data-code");
                var isAOD = currentDiv.find("span:visible").attr("class");
                flightList =  _.orderBy(flightList,orderFiled,isAOD.substring(0,isAOD.length-1));
                self.config.globData = flightList;
                self.template(flightList,0);
            });
        }
        /*筛选取消点击*/
        $(".cancel-btn").on('tap', function(event) {
            //如果取消筛选的时候，把以前的筛选条件去掉，变成以前的
            $(".condition-screening-mask").hide();
            $("html").css("overflow-y","auto");
            //初始化过滤条件选项
            initFilterCondition();
        });
        /*清空筛选点击*/
        $(".empty-btn").on('tap', function(event) {
            $(".condition-screening-ul li div").removeClass('check-pic');
            $(".selec").hide();
            $.each($(".condition-screening-ul li"), function(index, val) {
                $(val).find('div').eq(0).addClass('check-pic');
            });
            //如果清空筛选条件之后，从新请求一下
            filterFunction(0);
            //如果单击清空筛选点击的情况下把全局的存储变量对象也清空
            clearFilter();

        });
        //预订
        var reChangeData = {};
        $(".planeList").on('tap', '.yuding', function() {
            if(isBookClick){
                //isBookClick=!isBookClick;
                var this_ = $(this);
                var hideJson = JSON.parse(this_.parents('.flightList').find('.hideJson').val());
                var count = this_.attr("data-index");
                var dateWeek = hideJson.departureDate,
                    dateD = new Date(dateWeek),
                    week = moment(dateWeek).format('dddd'),
                    endDateWeek= hideJson.endDate,
                    endDateD = new Date(endDateWeek),
                    endWeek = moment(endDateWeek).format('dddd');
                var dateDay = dateD.getMonth()+1 + '月' + dateD.getDate() + '日' + " " + week;
                var endDay = endDateD.getMonth()+1 + '月' + endDateD.getDate() + '日' + " " + endWeek;
                hideJson.countIndex = count;
                hideJson.dateDay = dateDay;
                hideJson.endDay = endDay;

                /*//判断是否售罄，zhf没这一步，暂时不删，怕后期会加上
                var cabinIndex = this_.attr("data-seat");
                //requestCabinIndex(cabinIndex);
                var resData = {"cabinIndex":cabinIndex},
                    data = JSON.stringify(resData);
                var logData = $.extend({url:API.AIR_TICKER.FLIGHT_VALID_SEAT},data);
                logRequest(logData);
                $.ajax({
                    url:API.AIR_TICKER.FLIGHT_VALID_SEAT,
                    data:JSON.stringify(resData),
                    type:'POST',
                    contentType:'application/json',
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                        if(data.status == 200 || data.status == "200"){*/

                var causeType = JSON.parse(localStorage.getItem("causeType")),
                    causeCode = causeType.causeCode;

                            currentItem ={
                                list:self.config.globData,
                                currentInfo:hideJson,
                                subIndex:count
                            };

                            console.log(currentItem);
                            //保存当前预订票信息
                            this_.parents('.flightList').find('.hideJson').val(JSON.stringify(hideJson));

                            //判断单程往返程 单程预订一张即可 往返程需预订去之后继续请求返程信息
                            if (localStorage.getItem(self.config.jouryType) == "OW") {
                                var flightInfo = this_.parents('.flightList').find('.hideJson').val();
                                console.log(flightInfo);
                                var changeFlight = JSON.parse(flightInfo);
                                console.log(changeFlight.departureDate);
                                var departTime = changeFlight.departureDate +" "+ changeFlight.beginTime,
                                    arriveTime = changeFlight.endDate +" "+ changeFlight.endTime,
                                    departAirport = changeFlight.departAirport,
                                    arriveAirport = changeFlight.arriveAirport;
                                localStorage.removeItem(self.config.localStart);
                                localStorage.setItem(self.config.localStart, encodeURIComponent(flightInfo));

                                if(orderUuid == null){
                                    if(causeCode == "1" && casAppNo == null){
                                        checkApproveStatus("OW",departTime,arriveTime,departAirport,arriveAirport);
                                    }else{
                                        //comparePrice("OW");
                                        goOnPrice("OW","","");
                                    }
                                }else{//去改期的预订
                                    var changedDate = moment(changeFlight.departureDate).format('YYYY年MM月DD日'),
                                        flightNo = changeFlight.carrierCode + changeFlight.flightNo,
                                        planPrice = localStorage.getItem("planPrice");
                                    $(".changedDate").text(changedDate);
                                    $(".changedFlight").text(flightNo);
                                    $(".bg").show();

                                    var flightInfo = changeFlight.freightList[changeFlight.countIndex];
                                    
                                    if(flightInfo.cabinPrice < planPrice){
                                        $(".changeTic").show().css({"height": "21rem","margin-top": "-10rem"});
                                        $(".diJia").show();
                                    }else{
                                        $(".changeTic").show().css({"height": "17rem","margin-top": "-8rem"});
                                        $(".diJia").hide();
                                    }
                                    reChangeData = {

                                        "ticketPrice": flightInfo.cabinPrice,
                                        "airportTax": flightInfo.airportBuildFee,
                                        "flightNo": oldFltNo,
                                        "orderUuid": orderUuid,
                                        "benginTime":changeFlight.departureDate+" "+changeFlight.beginTime.substr(0,2)+":"+changeFlight.beginTime.substr(2,2)+":00",
                                        "newCarrierCode": changeFlight.carrierCode,
                                        "newFltNo": changeFlight.flightNo,
                                        "newCabinLevel": flightInfo.cabinCode,
                                        "newCabin": flightInfo.baseCabin,
                                        "departAirport": changeFlight.departAirport,
                                        "arriveAirport": changeFlight.arriveAirport,
                                        "departTerminal": changeFlight.departTerminal,
                                        "arriveTerminal": changeFlight.arriveTerminal,
                                        "journeyType": journeyType,
                                        "arriveTime": changeFlight.endDate+" "+changeFlight.endTime.substr(0,2)+":"+changeFlight.endTime.substr(2,2)+":00",
                                        "planeType": changeFlight.planeType
                                    };

                                    $(".bg").off().on("tap",function(){
                                        $(".bg").hide();
                                        $(".changeTic").hide();
                                    });
                                    $(".no").on("tap",function(){
                                        $(".bg").hide();
                                        $(".changeTic").hide();
                                    });
                                }
                            } else if (localStorage.getItem(self.config.jouryType) == "RT") {
                                if(localStorage.getItem("flag") == "false" || !self.config.flag) {
                                    localStorage.setItem(self.config.listDay, "");
                                    console.log(this_.parents('.flightList').find('.hideJson').val());
                                    localStorage.removeItem(self.config.localEnd);
                                    localStorage.setItem(self.config.localEnd, encodeURIComponent((this_.parents('.flightList').find('.hideJson').val())));
                                    localStorage.setItem("flag","true");
                                    //setTimeout(changePage,300);
                                    //comparePrice("RT_2");
                                    var needApprove = localStorage.getItem("needApprove");
                                    console.log(needApprove);
                                    if(causeCode == "1" && needApprove == "true"){
                                        comparePrice("RT_2");
                                    }else{
                                        goOnPrice("RT_2","","");
                                    }
                                } else {
                                    var flightInfoRt = this_.parents('.flightList').find('.hideJson').val();
                                    console.log(flightInfoRt);
                                    var changeFlightRt = JSON.parse(flightInfoRt);
                                    console.log(changeFlightRt.departureDate);
                                    var departTimeRt = changeFlightRt.departureDate +" "+ changeFlightRt.beginTime,
                                        arriveTimeRt = changeFlightRt.endDate +" "+ changeFlightRt.endTime,
                                        departAirportRt = changeFlightRt.departAirport,
                                        arriveAirportRt = changeFlightRt.arriveAirport;
                                    localStorage.removeItem(self.config.localStart);
                                    localStorage.setItem(self.config.localStart, encodeURIComponent((this_.parents('.flightList').find('.hideJson').val())));

                                    if(causeCode == "1" && casAppNo == null){
                                        checkApproveStatus("RT",departTimeRt,arriveTimeRt,departAirportRt,arriveAirportRt);
                                    }else{
                                        //comparePrice("RT");
                                        goOnPrice("RT","","");
                                    }

                                    clearFilter();
                                }
                            }
                        /*}else{
                            this_.find(".yudingBtn").hide();
                            this_.find(".yudingNot").show();
                            isBookClick =true;
                            return false;
                        }
                    },
                    error:function(data){
                        $(".warnText").fadeIn('slow').find("p").text(data.message);
                        setTimeout(fadeOut,2000);
                        isBookClick =true;
                    }
                });*/
            }
        });

        //确认去改期
        var tap = true;
        $("#yesChange").on("tap",function(){
            if(tap){
                tap = false;
                $(".bg").show();
                $(".changeTic").hide();
                $(".loading").show();
                wantToChange(reChangeData);
            }
        });

        //渲染审批列表
        function checkApproveStatus(type,departTime,arriveTime,departAirportCode,arriveAirportCode){
            $(".approval ul").html("");
            var casUserIdx = localStorage.getItem("casUserIdx");
            var reqData = {
                "clientUserIndex": casUserIdx,
                "departTime": departTime,
                "arriveTime": arriveTime,
                "departAirportCode": departAirportCode,
                "arriveAirportCode": arriveAirportCode,
                "expireFlag": true
            };
            ajaxRequest({url:API.AIR_TICKER.QUERY_CAS_APPROVES,data:reqData},function(data){
                localStorage.setItem("needApprove",data.content.needApprove);
                if(data.content.needApprove){
                    console.log(data.content.casApproveList);
                    var casAppList = data.content.casApproveList;
                    if(casAppList.length > "0"){
                        $(".bg").show();
                        $(".approval").show();
                        for(var i=0,len=casAppList.length;i<len;i++){
                            var sel = "",overSel = "";
                            if(casAppList[i].status == "1"){
                                sel = "canSel";
                            }else{
                                sel = "noSel";
                            }

                            if(localStorage.getItem("casAppNo") != null){
                                var casAppNo = localStorage.getItem("casAppNo");
                                if(casAppList[i].casApproveNo == casAppNo){
                                    overSel = "select";
                                }
                            }
                            $(".approval ul").append('<li id="'+ i +'" class="'+ sel +' '+  overSel+'"><p>'+ casAppList[i].clientUserName　+'的审批单<span>已通过</span></p><small>审批单号：</small><small class="casAppNo">'+ casAppList[i].casApproveNo +'</small><small>出发：'+ casAppList[i].originBeginDate +'-'+ casAppList[i].returnEndDate +'  '+ casAppList[i].originCity +'</small><small>到达：'+ casAppList[i].originBeginDate +'-'+ casAppList[i].returnEndDate +'  '+ casAppList[i].arriveCity +'</small></li>');
                        }

                        $(".canSel").on("tap",function(){
                            var this_ = $(this);
                            if(this_.hasClass("select")){
                                this_.removeClass("select").siblings().removeClass("select");
                                localStorage.removeItem("casAppNo");
                            }else{
                                this_.addClass("select").siblings().removeClass("select");
                            }
                        });
                        $(".appSure").on("tap",function(){
                            var haveSel = false,
                                casApproveNo = "";
                            $.each($(".canSel"),function(index,item){
                                var this_ = $(item);
                                console.log(this_);
                                if(!haveSel && this_.hasClass("select")){
                                    haveSel = true;
                                    casApproveNo = this_.find(".casAppNo").text();
                                }
                            });
                            if(haveSel){
                                localStorage.setItem("casAppNo",casApproveNo);
                                var newIndex=-1;
                                $.each($(".canSel"),function (index,item) {
                                    if($(".canSel").hasClass("select")){
                                        newIndex=index
                                    }

                                })
                                if(newIndex>-1){
                                    var newObj=casAppList[newIndex];
                                    localStorage.setItem("casAppList",JSON.stringify(casAppList));
                                }
                                else{
                                    localStorage.setItem("casAppList",JSON.stringify(casAppList));
                                }

                                $(".bg").hide();
                                $(".approval").hide();

                                comparePrice(type);
                            }else{
                                $(".approval").hide();
                                $(".changeCause").show();
                            }
                        });

                        $(".bg").on("tap",function(){
                            $(".bg").hide();
                            $(".approval").hide();
                        });
                    }else{
                        $(".bg").show();
                        $(".changeCause").show();
                    }
                }else{
                    goOnPrice(type,"","");
                }

                $(".no").on("tap",function(){
                    $(".bg").hide();
                    $(".changeCause").hide();
                    //goOnPrice(type,"","");
                });
                $(".bg").on("tap",function(){
                    $(".bg").hide();
                    $(".changeCause").hide();
                });

                $(".yes").on("tap",function(){
                    $(".bg").hide();
                    $(".changeCause").hide();
                    localStorage.setItem("causeType",JSON.stringify({"causeText":"因私出行","causeCode":"0"}));
                    //comparePrice(type);
                    goOnPrice(type,"","");
                });
            });
        }

        //预改期接口请求
        function wantToChange(reData){
            ajaxRequest({url: API.AIR_TICKER.PRE_RESCHEDULED,data: reData},function(data){
                console.log(data);
              if(data.status==200){
                  window.location.href = "changingTicket.html?orderUuid=" + orderUuid+"&fromChange=true";
              }
            },function(data){
                $(".warnText").fadeIn('slow').find("p").text("预改期失败，请稍候重试！");
                setTimeout(fadeOut,2000);
                return false;
            })
        }

        //点击系统繁忙弹框里的“确定”按钮
        $(".busy .yes").on("tap",function(){
            $(".bg").hide();
            $(".busy").hide();
            $(".prev").show();
            $(".prevNot").hide();
            $(".next").show();
            $(".nextNot").hide();
        })
    },
    //获取筛选信息
    airDataFn: function(arg) {
        if (arg == ".departTimeList div") {
            var departTimeArr = [];
            $.each($(arg), function(index, val) {
                if ($(val).html() != "不限") {
                    if ($(val).hasClass('check-pic')) {
                        var json = {};
                        var startTime = $(val).attr("startTime"),
                            endTime = $(val).attr("endTime");
                        json.minDepartTime = startTime;
                        json.maxDepartTime = endTime;
                        departTimeArr.push(json);
                    }
                }
            });
            return departTimeArr;
        } else if (arg == ".space div") {
            var arrBase = [];
            $.each($(arg), function(index, val) {
                if ($(val).html() != "不限") {
                    if ($(val).hasClass('check-pic')) {
                        arrBase.push($(val).attr("data-code"));
                    }
                }
            });
            return arrBase;
        } else if (arg == ".airline div") {
            var arrAirline = [];
            $.each($(arg), function(index, val) {
                if ($(val).html() != "不限") {
                    if ($(val).hasClass('check-pic')) {
                        arrAirline.push($(val).attr("carriercode"));
                    }
                }
            });
            return arrAirline;
        }else if(arg == ".departAirport"){
            var arrDepartAirport = [];
            $.each($(arg), function(index, val) {
                if ($(val).html() != "不限") {
                    if ($(val).hasClass('check-pic')) {
                        arrDepartAirport.push($(val).attr("airpirtCode"));
                    }
                }
            });
            return arrDepartAirport;
        }else if(arg == ".arriveAirport"){
            var arrArriveAirport = [];
            $.each($(arg), function(index, val) {
                if ($(val).html() != "不限") {
                    if ($(val).hasClass('check-pic')) {
                        arrArriveAirport.push($(val).attr("arriveAirport"));
                    }
                }
            });
            return arrArriveAirport;
        }else if(arg == ".discount div"){
            var arrDiscount = [];
            $.each($(arg), function(index, val) {
                if ($(val).html() != "不限") {
                    if ($(val).hasClass('check-pic')) {
                        arrDiscount.push({minDiscountRate:$(val).attr("startDiscount"),maxDiscountRate:$(val).attr("endDiscount")});
                    }
                }
            });
            return arrDiscount;
        }
    },
    template: function(result,isOrderBy) {
        var self = this;
        //生成模板
        var item = {};
        var hideitem = {};
        var airlineItem = {};
        var airlineHtml = '<div class="font-12 fontColor-666 check-pic">不限</div>';
        var listT = "";
        var listB = "";
        var data = result;

        var sPlace = JSON.parse(localStorage.getItem("sPlace")).startPlace;
        var sEnd = JSON.parse(localStorage.getItem("sEnd")).endPlace;

        if(isOrderBy===1 || isOrderBy==='1'){
            data =  _.orderBy(data,'beginTime', 'asc');
        }

        var len_ = data.length;
        $.each(data, function(index, val) {
            self.config.arriveAirport.push(val.arriveAirport);
            self.config.departAirport.push(val.departAirport);
            self.config.airlineCompany.push(val.carrierName + '-' + val.carrierCode);
            //生成往返程模板
            var freightList = _.orderBy(val.freightList,'cabinPrice', 'asc');
            $.each(freightList, function(index2, val2) {
                var disRate,
                    cabinName = val2.cabinName;
                if(val2.discountRate == 100) {
                    disRate = "全价";
                }else if(val2.discountRate == 0 || val2.discountRate == null || val2.discountRate > 100) {
                    disRate = "";
                }else{
                    disRate = (val2.discountRate)/10 + "折";
                }
                if(val2.discountRate > 100){
                    cabinName = "高端" + val2.cabinName;
                }
                hideitem = {
                    cabinCode: val2.cabinCode,
                    cabinName: cabinName,
                    //cheapFlag: val2.cheapFlag,
                    discountRate: disRate,
                    cabinPrice: val2.cabinPrice,
                    channelFlag: val2.channelFlag,
                    protocalFlag: val2.protocalFlag,
                    remainTicketNum: val2.remainTicketNum,
                    cabinIndex: val2.cabinTmpIndex,
                    count: index2
                };
                listB += BASE.lang.sub(self.config.hideHtml, hideitem);
            });

            var minDisRate;
            if(val.minDiscountRate == 100) {
                minDisRate = "全价";
            }else if(val.minDiscountRate == 0 || val.minDiscountRate == null || val.minDiscountRate > 100) {
                minDisRate = "";
            }else{
                minDisRate = "最低" + (val.minDiscountRate)/10 + "折";
            }

            var mealCode;
            if(val.mealCode != "" && val.mealCode != null){
                mealCode = "有餐食";
            }else{
                if(val.mealCode == ""){
                    mealCode = "无餐食";
                }else{
                    mealCode = "null";
                }
            }

            data[index].freightList = freightList;

            if(val.departTerminal == null){
                val.departTerminal = " ";
            }
             if(val.arriveTerminal == null){
                val.arriveTerminal = " ";
            }

            item = {
                current_index:(index+1)+"_"+len_,
                departAirport: val.departAirport,
                beginAddress: val.departAirportName + val.departTerminal,
                beginTime: switchTime(val.beginTime),
                diffTime: val.diffTime,
                arriveAirport: val.arriveAirport,
                endAddress:val.arriveAirportName + val.arriveTerminal,
                endTime: switchTime(val.endTime),
                flightNo: val.flightNo,
                planeType: val.planeType,
                hidetpl: listB,
                minPrice: val.minPrice,
                carrierCode: val.carrierCode,
                carrierName: val.carrierName,
                mealCode: mealCode,
                minDiscountRate: minDisRate,
                json: JSON.stringify(data[index])
            };
            listT += BASE.lang.sub(self.config.dataHtml, item);
            listB = "";
        });
        $(".planeList").html(listT);

        $.each($(".planeType"),function(index,val){
            var this_ = $(this);
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

        $.each($(".surplus"),function (index,val) {
            var this_ = $(this);
            if(this_.html() == "仅剩0张"){
                this_.parent().find(".yudingNot").show();
                this_.parent().find(".yudingBtn").hide();
            }

        });

        //判断是否航司官网价
        $.each($(".flightList"),function (index,val) {
            var this_ = $(this);
            $.each(this_.find(".channelFlagClass"),function (i,item) {
                var item_ = $(item);
                if(item_.attr("data-channelFlag") == null || item_.attr("data-channelFlag") == ""){//用来测试，后台返的数据的问题
                    item_.next("div").find(".yudingBtn").hide();
                    item_.next("div").find(".yudingNot").show();
                }
                else if(item_.attr("data-protocalFlag") == "true"){
                    item_.find(".flag").show();
                }
            });
        });

        //生成机场
        var tempSplace =sPlace;
        var tempSEnd=sEnd;
        if(localStorage.getItem("flag") == "false" || !self.config.flag) {
            tempSplace = sEnd;
            tempSEnd = sPlace;
        }

        var airPortInfo = {
            "start":{
                "name":tempSplace,
                "array_":[]
            },
            "end":{
                "name":tempSEnd,
                "array_":[]
            }
        };
        $(".airport").empty();


        var airPortInfoStorAge =  localStorage.getItem("airPortInfoStorAge");

        if(airPortInfoStorAge)
        {
            airPortInfo = JSON.parse(airPortInfoStorAge);
        }
        else{
            var data = self.config.globData;
            console.info(data);

            var tempObject ={},startAirPoint ={},endAriPoint ={};
            for(var index =0,len=data.length;index<len;index++){
                tempObject = data[index];
                if(!startAirPoint.hasOwnProperty(tempObject.departAirport)){
                    airPortInfo.start.array_.push({'airport':tempObject.departAirport,'airportName':tempObject.departAirportName});
                    startAirPoint[tempObject.departAirport] =tempObject.departAirport;
                }
                if(!endAriPoint.hasOwnProperty(tempObject.arriveAirport)){
                    airPortInfo.end.array_.push({'airport':tempObject.arriveAirport,'airportName':tempObject.arriveAirportName});
                    endAriPoint[tempObject.arriveAirport] =tempObject.arriveAirportName;
                }
            }
            localStorage.setItem("airPortInfoStorAge",JSON.stringify(airPortInfo));
        }
        if(data.length>0){
            $(".airport").append(baidu.template("airPortList",airPortInfo));
        }

        //生成航空公司
        $(".airline").html("");
        var airlineCompanyStorAge =  localStorage.getItem("airLineCompanyStorAge");

        var airlineCompany =[];
        if(airlineCompanyStorAge)
        {
            airlineCompany = JSON.parse(airlineCompanyStorAge);
        }
        else{
            airlineCompany = BASE.util.unique(self.config.airlineCompany);
            localStorage.setItem("airLineCompanyStorAge",JSON.stringify(airlineCompany));
        }

        $.each(airlineCompany, function(index, val) {
            var  airlineArr = BASE.lang.subMark(val);
            airlineItem = {
                airport: airlineArr[0],
                carrierCode: airlineArr[1]
            };
            airlineHtml += BASE.lang.sub(self.config.airlineHtml, airlineItem);
        });
        $(".airline").html(airlineHtml);
    }
};

list.init();

$("#choiceDate").live("tap",function(){
    var flag = localStorage.getItem("flag");
    choiceDateFunction(flag==="true"?1:2);
});

function initOrderByStyle(){
    var firstDiv = $(".arrayMode>div").first();
    firstDiv.addClass("arrayModeActive").find('span').hide();
    firstDiv.find('span.asc_').show();
    var sublingsDiv = firstDiv.siblings();
    sublingsDiv.removeClass("arrayModeActive").find("span").hide();
    sublingsDiv.find("span.first").show();
}

//判断title
var startPlace = JSON.parse(localStorage.getItem("sPlace"))["startPlace"],
    endPlace = JSON.parse(localStorage.getItem("sEnd"))["endPlace"];
console.log(startPlace,endPlace);
function changeTitle(startPlace,endPlace){
    document.title = "返: " + endPlace + " —— " + startPlace;
    $(".header h1").html("返: " + endPlace + " —— " + startPlace);
}
//showSift(1);
function showSift(back){
    if(back == "1" || back == 1){
        $(".condition-screening-ol").find('li').removeClass("condition-borderColor");
        $(".condition-screening-ol").find('li:eq(0)').addClass("condition-borderColor");
        $(".condition-screening-ul").find('li').hide();
        $(".departTimeList").show();
        $(".condition-screening-mask").show();
        $("html").css("overflow","hidden");
        //把过滤条件存储在一个全局变量中，以便单击取消时把以前选择的还原
        initFilterCondition();
    }else if(back == "0" || back == 0){
        $(".condition-screening-mask").hide();
        $("html").css("overflow-y","auto");
    }
}

//查看前后一小时内是否为最低价
function comparePrice(type){
    var result = false;
    var subIndex = currentItem.subIndex;
    var currentInfo = currentItem.currentInfo;
    var currentSubItem = currentItem.currentInfo.freightList[subIndex];
    var list_ = _.filter(currentItem.list ,function (o) {
        var result_ = false;
        if(((o.beginTime*1+100)>=(currentInfo.beginTime*1) && (o.beginTime*1)<=(currentInfo.beginTime*1)) || ((o.beginTime*1-100)<=(currentInfo.beginTime*1) && (o.beginTime*1)>=(currentInfo.beginTime*1))){

            if(o.minPrice<currentSubItem.cabinPrice){
                result_ = true;
            }
        }
        return result_;
    });
    console.log(list_);
    if(list_.length>0){
        result = true;
    }
    if(result){
        checkMinPrice(type);
    }
    else{
        goOnPrice(type,"","");
    }
}

function goOnPrice(type,reason,remark){
    if(type ==="OW" || type==="RT_2"){
        localStorage.setItem("noBuyMinPriceReason",reason);
        localStorage.setItem("minFlightPriceRemark",remark);
        setTimeout(changePage,300);
    }else if(type ==="RT"){
        localStorage.setItem("goNoBuyMinPriceReason",reason);
        localStorage.setItem("goMinFlightPriceRemark",remark);
        changeTitle(startPlace,endPlace);
        backHtml();
        isBookClick = true;
    }
}

function changePage(){
    localStorage.removeItem("cause");
    localStorage.removeItem("noApply");
    localStorage.removeItem("mobile");
    localStorage.removeItem("userList");
    localStorage.removeItem("urlHaveId");
    localStorage.removeItem("urlId");
    localStorage.removeItem("isAppend");
    localStorage.removeItem("insure");
    localStorage.removeItem("insureCode");
    localStorage.removeItem(userInsureList);
    localStorage.setItem("isAppendLogin","1");
    window.location.href = "fill-in-order.html";
}

function backHtml(){
    var str = decodeURIComponent(localStorage.getItem("searchDataBack")),
        objectStr = JSON.parse(str);
    list.config.flag = false;
    localStorage.setItem("flag",false);
    $(".planeList").html("");
    $(".Loading").show();
    initOrderByStyle();
    console.info(localStorage["goBackTime"]);
    var goDay = localStorage["goTime"],
        backDay = localStorage["backTime"],
        goBackDay = localStorage["goBackTime"];

    if(backDay != null || backDay != undefined){
        var goDate = JSON.parse(goDay);
        var backDate = JSON.parse(backDay);
        var goBackDate = JSON.parse(goBackDay);
        if(backDate.date < goDate.date){
            $("#date").text(goBackDate.date);
            $("#week").text(goBackDate.week);
        }else{
            $("#date").text(backDate.date);
            $("#week").text(backDate.week);
        }
    }else{
        var goBackDate = JSON.parse(goBackDay);
        $("#date").text(goBackDate.date);
        $("#week").text(goBackDate.week);
    }
    list.loadHtml(objectStr);
}

//过滤时间
function filterTime(param){
    var departTimeList = $(".departTimeList");

    //查看是否选择了过滤条件
    if(isCondition(departTimeList)){
        var condition = [];
        departTimeList.find(".check-pic").each(function(index,item){
            var this_ = $(this);
            condition.push({"minDepartTime":this_.attr("startTime"),"maxDepartTime":this_.attr("endTime")});
        });
        param['departTimeList']=condition;
    }
}
//过滤舱位
function filterCabinSeat(param){
    var space = $(".space");
    //查看是否选择了过滤条件
    if(isCondition(space)){
        var condition = [];
        space.find(".check-pic").each(function(index,item){
            var this_ = $(this);
            condition.push(this_.attr('data-code'));
        });
        param['cabinTypeList'] =condition;
    }
}
//过滤航空公司
function filtercarrierCompany(param){
    var airline = $(".airline");
    //查看是否选择了过滤条件
    if(isCondition(airline)){
        var condition = [];
        airline.find(".check-pic").each(function(index,item){
            var this_ = $(this);
            condition.push(this_.attr('carrierCode'));
        });
        param['carrierCodeList'] =condition;
    }
}
//过滤机场
function filterAirPort(param){
    var airport = $(".airport");
    if(isCondition(airport)){
        //起飞机场代码
        $(".departAirport").each(function (index,item) {

            var this_=$(this);

            if(this_.hasClass("check-pic")){
                param["departAirportCodeList"].push(this_.attr("airpirtCode"));
            }

        });
        //降落机场代码
        $(".arriveAirport").each(function (index,item) {

            var this_=$(this);
            if(this_.hasClass("check-pic"))
            {
                param["arriveAirportCodeList"].push(this_.attr("arriveAirport"));
            }
        })
    }
}
//过滤折扣
function filterDiscount(param) {
    var discount = $(".discount");
    if(isCondition(discount)){
        var condition = [];
        discount.find(".check-pic").each(function(index,item){
            var this_ = $(this);
            condition.push({"minDiscountRate":this_.attr("startDiscount"),"maxDiscountRate":this_.attr("endDiscount")});
        });
        param['discountRateList'] =condition;
    }
}

function initFilterCondition() {

    console.info(filterParam);
    var condition_screening_menu = $(".condition-screening-menu");
    //渲染 时间
    var $departTimeListDiv = $(".departTimeList").find("div");

    $departTimeListDiv.removeClass("check-pic");

    var isChoiceDepartTimeList = false;
    if(filterParam.departTimeList && filterParam.departTimeList.length>0){
        for(var index=0,obj;obj =filterParam.departTimeList[index];index++){
            $departTimeListDiv.each(function(i,item){
                var _this = $(this);
                if(_this.attr("startTime") ===obj.minDepartTime){
                    _this.addClass("check-pic");
                    isChoiceDepartTimeList = true;

                }
            })
        }
    }
    if(!isChoiceDepartTimeList){
        $(".departTimeList").find("div:eq(0)").addClass("check-pic");
        condition_screening_menu.eq(0).find(".selec").hide();
    }else{
        condition_screening_menu.eq(0).find('span').show();
    }
    //舱位
    var $spaceDiv = $(".space").find("div");
    $spaceDiv.removeClass("check-pic");
    var isChoicespaceDiv= false;
    if(filterParam.cabinTypeList && filterParam.cabinTypeList.length>0){
        for(var index=0,obj;obj =filterParam.cabinTypeList[index];index++){

            $spaceDiv.each(function(i,item){
                var _this = $(this);
                if(obj==='ALL'){
                    $('.space').find("div:eq(0)").addClass('check-pic');
                }else if (_this.attr("data-code") ===obj){
                        _this.addClass("check-pic");
                    isChoicespaceDiv = true;
                }
            })
        }
    }

    if(!isChoicespaceDiv){
        $(".space").find("div:eq(0)").addClass("check-pic");
        condition_screening_menu.eq(1).find(".selec").hide();
    }
    else{
        condition_screening_menu.eq(1).find('span').show();
    }
    //航空公司
    var $airLineDiv = $(".airline").find("div");
    $airLineDiv.removeClass("check-pic");

    var isChoiceAirLineDiv = false;
    if(filterParam.carrierCodeList && filterParam.carrierCodeList.length>0){
        for(var index=0,obj;obj =filterParam.carrierCodeList[index];index++){

            $airLineDiv.each(function(i,item){
                var _this = $(this);
                if(_this.attr("carriercode") ===obj){
                    _this.addClass("check-pic");
                    isChoiceAirLineDiv =true;

                }
            })
        }
    }
    if(!isChoiceAirLineDiv){
        $(".airline").find("div:eq(0)").addClass("check-pic");

        condition_screening_menu.eq(2).find(".selec").hide();
    }
    else{
        condition_screening_menu.eq(2).find('span').show();
    }
    var isChoiceAirPort = false;
    $(".airport").find('div').removeClass("check-pic");
    var $departAirport = $(".departAirport");
    $departAirport.removeClass("check-pic");
    if(filterParam.departAirportCodeList && filterParam.departAirportCodeList.length>0){
        for(var index=0,obj;obj =filterParam.departAirportCodeList[index];index++){
            $departAirport.each(function(i,item){
                var _this = $(this);
                if(_this.attr("airpirtCode") ===obj){
                    _this.addClass("check-pic");
                    isChoiceAirPort = true;
                }
            })
        }
    };
    var $arriveAirport = $(".arriveAirport");
    $arriveAirport.removeClass("check-pic");
    if(filterParam.arriveAirportCodeList && filterParam.arriveAirportCodeList.length>0){
        for(var index=0,obj;obj =filterParam.arriveAirportCodeList[index];index++){
            $arriveAirport.each(function(i,item){
                var _this = $(this);
                if(_this.attr("arriveAirport") ===obj){
                    _this.addClass("check-pic");
                    isChoiceAirPort = true;
                }
            })
        }
    };
    if(!isChoiceAirPort){
        $(".airport").find('div:eq(0)').addClass("check-pic");
        condition_screening_menu.eq(3).find(".selec").hide();
    }else{
        condition_screening_menu.eq(3).find('span').show();
    }
    //折扣
    var $discountDiv = $(".discount").find("div");

    $discountDiv.removeClass("check-pic");

    var isChoiceDisCount = false;
    if(filterParam.discountRateList && filterParam.discountRateList.length>0){
        for(var index=0,obj;obj =filterParam.discountRateList[index];index++){

            $discountDiv.each(function(i,item){
                var _this = $(this);
                if(_this.attr("startDiscount") ===obj.minDiscountRate){
                    _this.addClass("check-pic");
                    isChoiceDisCount = true;
                }
            })
        }
    }

    if(!isChoiceDisCount){
        $(".discount").find("div:eq(0)").addClass("check-pic");
        condition_screening_menu.eq(4).find(".selec").hide();
    }else{
        condition_screening_menu.eq(4).find('span').show();
    }

}

function initFilter(self) {
    var str = "";
    if(localStorage.getItem("flag") == "false"){
        str = decodeURIComponent(localStorage.getItem(self.config.searchDataBack));
    }else{
        str = decodeURIComponent(localStorage.getItem(self.config.searchData));
    }
    var objectStr = JSON.parse(str);
    filterParam ={
        cabinTypeList:[]
    };

    if(objectStr.cabinClass!='ALL'){
        $(".space").find("div").each(function (index,item) {
            var this_ = $(item);
            if(this_.attr("data-code") !=objectStr.cabinClass){
               this_.hide();
            }
        });
    }
    filterParam['cabinTypeList'].push(objectStr.cabinClass);
}
//清空起落机场缓存以及航司
function clearAirPortInfoAndAirLineCompanyStorAge() {
    localStorage.setItem("airPortInfoStorAge","");
    localStorage.setItem("airLineCompanyStorAge","");
}

function clearFilter(){
    filterParam ={};
}
function isCondition(obj){
    return obj.find(".check-pic").length>0 && !(obj.find("div:eq(0)").hasClass("check-pic"))
}

//如果app点击遮罩层的时候，回调js方法
function closeBlack() {
    isBookClick = true;
}

//日期选择
function choiceDateFunction(isStartDate){
    var endDay = 180;
    var startDate= JSON.parse(localStorage.getItem("goTime")).date;
    try{
        if(localStorage.getItem("jouryType") == "OW"){
            if(isiOS){
                choiceDate(startDate,endDate,isStartDate,endDay);
            }else if(isAndroid){
                window.android.choiceDate(startDate,endDate,isStartDate,endDay);
            }
        }else{
            var backDate =JSON.parse(localStorage.getItem("backTime")).date;
            if(isiOS){
                choiceDate(startDate,backDate,isStartDate,endDay);
            }else if(isAndroid){
                window.android.choiceDate(startDate,backDate,isStartDate,endDay);
            }
        }
    }catch(err){
        if(isStartDate===1){
            setTimeout(changePageGo,300);
        }
        else{
            setTimeout(changePageTime,300);
        }
    }
}

//返回的结果
function returnChoiceDate(currentDate,isStartDate){
    var dateObject = {
        "date":currentDate,"week":moment(currentDate).format('dddd')
    };
    var itemName ="goTime";
    //如果返程日期，只需要格式化week就可以了
    if(isStartDate=='2'){
        itemName ="backTime";
        if(localStorage.getItem("goTime") != null){
            var goTime = JSON.parse(localStorage.getItem("goTime")),
                goDay = goTime.date;
            if(currentDate <goDay){
                mui.alert("返程时间不能早于出发时间");
                $(".noFlight").hide();
                return;
            }else{
                $("#date").html(currentDate);
                $("#week").html(dateObject.week);
            }
        }

        localStorage.setItem("flag","false");
        var strBack = decodeURIComponent(localStorage.getItem("searchDataBack")),
            objectStrBack = JSON.parse(strBack);
        objectStrBack.departDate = currentDate;
        localStorage.setItem("searchDataBack",encodeURIComponent(JSON.stringify(objectStrBack)));
    }
    else{
        var backDate = moment(currentDate).add(2,'day').format('YYYY-MM-DD');
        var setBackDate = {
            "date":backDate,"week":moment(backDate).format('dddd')
        };

        var str = decodeURIComponent(localStorage.getItem("searchData")),
            objectStr = JSON.parse(str),
            strBack = decodeURIComponent(localStorage.getItem("searchDataBack")),
            objectStrBack = JSON.parse(strBack);
        objectStr.departDate = currentDate;
        localStorage.setItem("searchData",encodeURIComponent(JSON.stringify(objectStr)));

        if(localStorage.getItem("backTime") != null){
            var backTime = JSON.parse(localStorage.getItem("backTime")),
                backDay = backTime.date;
            if(currentDate > backDay){
                objectStrBack.departDate = setBackDate.date;
                localStorage.setItem("goBackTime",JSON.stringify(setBackDate));
            }else{
                objectStrBack.departDate = backDay;
                localStorage.setItem("goBackTime",JSON.stringify(backTime));
            }
        }else{
            objectStrBack.departDate = setBackDate.date;
            localStorage.setItem("goBackTime",JSON.stringify(setBackDate));
        }
        localStorage.setItem("searchDataBack",encodeURIComponent(JSON.stringify(objectStrBack)));
    }

    localStorage.setItem(itemName,JSON.stringify(dateObject));
    window.location.href = "list.html";
}

function changePageGo(){
    localStorage.setItem('backUrl','list.html');
    window.location.href = "time.html?time=gotime";
}
function changePageTime(){
    localStorage.setItem('backUrl','list.html');
    window.location.href = "time.html?time=backtime";
}

function checkMinPrice(type) {
    $(".bg").show();
    $(".zhf_low").show();
    $(".zhf_select_left,.zhf_select_right").off().on("tap",
    function () {
        $(".zhf_select_left,.zhf_select_right").removeClass("selectNew");
        $(this).addClass("selectNew")
    });
    $(".zhf_submit_goon").off().on("tap",function () {
        $(".bg").hide();
        $(".zhf_low").hide();
        var reason=$(".selectNew").text();
        var remark=$(".zhf_beizhu_area textarea").val();
        console.log(reason,remark);
        goOnPrice(type,reason,remark);
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
