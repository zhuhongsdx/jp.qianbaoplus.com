var home = {
    config:{
        "sPlace":"sPlace",
        "sEnd":"sEnd",
        "jouryType":"jouryType"
    },
    init: function() {
        var self = this;
        self.locadHtml();
        self.eventFn();
    },
    //生成模板
    locadHtml: function() {
        var self = this;

        //获取审批单
        var approveCode = getQueryString("approveNo");
        console.log(approveCode);

        //获取出发地信息
        if (localStorage.getItem(self.config.sPlace)) {
            var sPlace = JSON.parse(localStorage.getItem(self.config.sPlace));
        }
        //获取目的地信息
        if (localStorage.getItem(self.config.sEnd)) {
            var sEnd = JSON.parse(localStorage.getItem(self.config.sEnd));
        }
        //出发地目的地
        if (!!sPlace) {
            $(".startPlace").html(sPlace.startPlace).attr("data-code", sPlace.startCode);
        }
        if (!!sEnd) {
            $(".endPlace").html(sEnd.endPlace).attr("data-code", sEnd.endCode);
        }
        //显示选择的舱位
        if(localStorage.getItem("cabinClass")){
            var cabinClass = JSON.parse(localStorage.getItem("cabinClass"));
            $('.seat span').eq(0).html(cabinClass.cabinText).attr("data-code", cabinClass.cabinCode);
        }
        //显示预定类型
        if(localStorage.getItem("causeType")){
            var causeType = JSON.parse(localStorage.getItem("causeType"));
            $('.type span').eq(0).html(causeType.causeText).attr("data-num", causeType.causeCode);
        }

        var init = getQueryString('init');

        localStorage.setItem("flag","true");
        if (init != '2') {
            //从localstorage中得到日期
            var currentChoiceDate = localStorage["goTime"],
                goBackDate = localStorage["goBackTime"],
                backChoiceDate = localStorage["backTime"];
            console.log(backChoiceDate);
            if (currentChoiceDate != undefined && currentChoiceDate != '') {
                currentChoiceDate = JSON.parse(currentChoiceDate);
                var dates = currentChoiceDate.date;
                $("#today").text(dates);
                $("#week").text(currentChoiceDate.week);
            }
            if (goBackDate != undefined && goBackDate != '' && backChoiceDate == undefined) {
                goBackDate = JSON.parse(goBackDate);
                var goBackDates = goBackDate.date;
                $("#backtime").text(goBackDates);
                $("#backweek").text(goBackDate.week);
            }else if (goBackDate != undefined && goBackDate != '' && backChoiceDate != undefined && backChoiceDate != '') {
                goBackDate = JSON.parse(goBackDate);
                var goBackDates = goBackDate.date;
                backChoiceDate = JSON.parse(backChoiceDate);
                var dates = currentChoiceDate.date;
                var backDates = backChoiceDate.date;
                console.log(dates);
                console.log(backDates);
                if(backDates >= dates){
                    $("#backtime").text(backDates);
                    $("#backweek").text(backChoiceDate.week);
                    localStorage.setItem("goBackTime",JSON.stringify({"date":backDates,"week":backChoiceDate.week}));
                }else{
                    $("#backtime").text(goBackDates);
                    $("#backweek").text(goBackDate.week);
                }
            }
            localStorage.removeItem("noBuyMinPriceReason");
        } else {
            localStorage.clear();
            //默认值
            var token = getQueryString("cas_access_token");
            if(token!=null) {
                localStorage.setItem("token", token);
            }
            var appId = getQueryString("appId");
            if(appId!=null) {
                localStorage.setItem("appId", appId);
            }
            localStorage.setItem("identity_card","");
            localStorage.setItem("isAppendLogin","1");
            localStorage.setItem("flag","true");

            if(approveCode != null){
                localStorage.setItem("casAppNo",approveCode);
                fromApproval();
            }else{
                var casUserIdx = getQueryString("casUserIdx");
                if(casUserIdx != null){
                    localStorage.setItem("casUserIdx",casUserIdx);
                }

                $(".startPlace").text("北京");
                $(".startPlace").attr("data-code","BJS");
                $(".endPlace").text("上海");
                $(".endPlace").attr("data-code","SHA");
                localStorage.setItem(self.config.sPlace,JSON.stringify({"startPlace":"北京","startCode":"BJS"}));
                localStorage.setItem(self.config.sEnd,JSON.stringify({"endPlace":"上海","endCode":"SHA"}));

                var selectDay = {
                    "date": tomorrow,
                    "week": '明天'
                };
                var backDay = moment(tomorrow).add(2,'day').format('YYYY-MM-DD'),
                    backWeek = moment(backDay).format('dddd');
                $("#today").text(tomorrow);
                $("#week").text("明天");
                $("#backtime").text(backDay);
                $("#backweek").text(backWeek);
                localStorage.setItem("goBackTime",JSON.stringify({"date":backDay,"week":backWeek}));
                localStorage.setItem("goTime",JSON.stringify(selectDay));
                localStorage.setItem("jouryType","OW");

                $(".cause").attr("data-num","1");
                localStorage.setItem("cabinClass",JSON.stringify({"cabinText":"经济舱","cabinCode":"Y"}));
                localStorage.setItem("causeType",JSON.stringify({"causeText":"因公出行","causeCode":"1"}));
            }
        }

        function fromApproval(){
            var reData = {
                "accessToken" : token,
                "approveNo" : approveCode,
                "appId" : appId
            };
            ajaxRequest({url:API.AIR_TICKER.APPROVE_TO_QUERY_FLIGHTS,data:reData},function(data){
                console.log(data);
                var content = data.content;
                localStorage.setItem("casUserIdx",content.userIdx);

                $(".startPlace").text(content.startPlace);
                $(".startPlace").attr("data-code",content.startCode);
                $(".endPlace").text(content.endPlace);
                $(".endPlace").attr("data-code",content.endCode);
                localStorage.setItem(self.config.sPlace,JSON.stringify({"startPlace":content.startPlace,"startCode":content.startCode}));
                localStorage.setItem(self.config.sEnd,JSON.stringify({"endPlace":content.endPlace,"endCode":content.endCode}));

                var zhfSelectDay = {
                    "date": content.date,
                    "week": content.week
                };
                var zhfBackDate = {
                    "date": content.backDate,
                    "week": content.backWeek
                };
                $("#today").text(content.date);
                $("#week").text(content.week);
                $("#backtime").text(content.backDate);
                $("#backweek").text(content.backWeek);
                localStorage.setItem("goTime",JSON.stringify(zhfSelectDay));
                localStorage.setItem("goBackTime",JSON.stringify(zhfBackDate));

                if(content.jouryType == "RT"){
                    $(".mui-switch").addClass("mui-active");
                    $(".mui-switch").attr("data-jourytype", "RT");
                    $(".backtime").show();
                    $(".today p").show();
                }else if(content.jouryType == "OW"){
                    $(".mui-switch").removeClass("mui-active");
                    $(".mui-switch").attr("data-jourytype", "OW");
                    $(".backtime").hide();
                    $(".today p").hide();
                }
                localStorage.setItem("jouryType",content.jouryType);

                $(".cause").html(content.causeText).attr("data-num",content.causeCode);
                $('.seat span').eq(0).html(flightCabin[content.cabinCode]).attr("data-code", content.cabinCode);
                localStorage.setItem("cabinClass",JSON.stringify({"cabinText":flightCabin[content.cabinCode],"cabinCode":content.cabinCode}));
                localStorage.setItem("causeType",JSON.stringify({"causeText":content.causeText,"causeCode":content.causeCode}));
            },function(data){
                console.log(data);
                if(data.status == 301 || data.status == "301"){
                    $(".bg").show();
                    $(".yesNo").show().find("p").text("未登录，请重新登录!");

                    $(".yes").on("tap",function(){
                        $(".bg").hide();
                        $(".yesNo").hide();
                        fromApproval();
                    });
                    return;
                }else if(data.status == 302 || data.status == "302"){
                    $(".bg").show();
                    $(".yesNo").show().find("p").text(data.message);
                    
                    $(".yes").on("tap",function(){
                        $(".bg").hide();
                        $(".yesNo").hide();
                        window.location.href="homepage.html";
                    });
                    return;
                }
            });
        }

        $(".bg").on("tap",function(){
            $(".bg").hide();
            $(".yesNo").hide();
        });

        //判断是否为回程
        var jouryType = localStorage.getItem("jouryType");
        console.log(jouryType);
        if(jouryType == "RT"){
            $(".mui-switch").addClass("mui-active");
            $(".mui-switch").attr("data-jourytype", "RT");
            $(".backtime").show();
            $(".today p").show();
        }else if(jouryType == "OW"){
            $(".mui-switch").removeClass("mui-active");
            $(".mui-switch").attr("data-jourytype", "OW");
            $(".backtime").hide();
            $(".today p").hide();
        }
    },
    eventFn: function() {
        var self = this;
        //出发地目的地切换
        var isSwitch = true;
        $(".switch").on("tap", function() {
            if(isSwitch){
                isSwitch = false;
                var startPlace = $(".startPlace"),
                    endPlace = $(".endPlace");
                if ($(this).hasClass("tap")) {
                    $(this).removeClass("tap");
                    startPlace.css({"-webkit-transform":"translateX(0)","text-align":"left"});
                    endPlace.css({"-webkit-transform":"translateX(0)","text-align":"right"});
                    localStorage.setItem("sPlace",JSON.stringify({"startPlace":startPlace.text(),"startCode":startPlace.attr("data-code")}));
                    localStorage.setItem("sEnd",JSON.stringify({"endPlace":endPlace.text(),"endCode":endPlace.attr("data-code")}));
                } else {
                    var startX = startPlace.offset().left,
                        endX = endPlace.offset().left;
                    console.log(startX);
                    console.log(endX);
                    $(this).addClass("tap");
                    startPlace.css({"-webkit-transform":"translateX(" + (endX - startX)  + "px)","text-align":"right"});
                    endPlace.css({"-webkit-transform":"translateX(-" + (endX - startX)  + "px)","text-align":"left"});
                    localStorage.setItem("sPlace",JSON.stringify({"startPlace":endPlace.text(),"startCode":endPlace.attr("data-code")}));
                    localStorage.setItem("sEnd",JSON.stringify({"endPlace":startPlace.text(),"endCode":startPlace.attr("data-code")}));
                }
                setTimeout(function () {
                    isSwitch = true;
                },500);
            }
        });
        //选择出发-目的地
        $(".startF").on("tap", function() {

            choiceCityFunction(1);
        });

        $(".endF").on("tap", function() {

            choiceCityFunction(2);
        });

        //点击日期跳转
        $(".today a").on("tap", function() {
			choiceDateFunction(1);
        });
       
        $(".backtime a").on("tap", function() {
			choiceDateFunction(2);
        });

        //点击查询按钮
        $(".query").on("tap", function() {
            if($("#mySwitch").attr("data-jourytype") == "RT"){
                var todayTime = $("#today").html();
                var backTime = $("#backtime").html();
                var setBackDate = {
                    "date":backTime,"week":moment(backTime).format('dddd')
                };
                if(backTime == ""){
                    mui.alert("请选择返程时间");
                    return;
                }else if (todayTime > backTime) {
                    mui.alert("返程时间不能早于出发时间");
                    return;
                }
            }
            //保存请求信息
            var date = $("#today").text(),
                from = JSON.parse(localStorage.getItem("sPlace"))["startPlace"],
                to = JSON.parse(localStorage.getItem("sEnd"))["endPlace"],
                back = $("#backtime").text(),
                bordPoint = JSON.parse(localStorage.getItem("sPlace"))["startCode"],
                offPoint = JSON.parse(localStorage.getItem("sEnd"))["endCode"],
                jouryType = $(".mui-switch").attr('data-jourytype'),
                cabinClass = $(".berth").attr('data-code'),
                causeCode = $(".cause").attr('data-num'),
                jsonGo = JSON.stringify({ "pageNum": pageInfo.initPageNo, "pageSize": pageInfo.perpage, "bordPoint": bordPoint, "offPoint": offPoint, "departDate": date, "jouryType": jouryType, "cabinClass": cabinClass, "casQueryFlag": "CAS", "causeType": causeCode}),
                jsonBack = JSON.stringify({ "pageNum": pageInfo.initPageNo, "pageSize": pageInfo.perpage, "bordPoint":offPoint , "offPoint": bordPoint, "departDate": back, "jouryType": jouryType, "cabinClass": cabinClass, "casQueryFlag": "CAS", "causeType": causeCode}),
                jsonStr = encodeURIComponent(jsonGo),
                jsonStrBack = encodeURIComponent(jsonBack);
            console.log(jsonGo);
            console.log(jsonBack);

            if (from == to) {
                $(".warnText").fadeIn('slow');
                setTimeout(fadeOut,2000);
                return;
            } else {
                localStorage.setItem("searchData", jsonStr);
                localStorage.setItem("searchDataBack", jsonStrBack);
                localStorage.removeItem("insure");
                if($("#mySwitch").attr("data-jourytype") == "RT"){
                    localStorage.setItem("backTime", JSON.stringify(setBackDate));
                }
                window.location.href = "list.html";
            }
        });

        /*舱位选择*/
        $('.seat').on('tap', function(event) {
            $(".seatMask").show();
            $(".seat-list").animate({ "bottom": "0" }, 500);
        });
        $(".seatMask .secLi").on('tap', function(event) {
            var cabinText  = $(this).html(),
                cabinCode = $(this).attr('data-code');
            $(".seatMask").hide();
            $(".seat-list").css("bottom", "-250px");
            $('.seat span').eq(0).html(cabinText).attr("data-code", cabinCode);
            localStorage.setItem("cabinClass",JSON.stringify({"cabinText":cabinText,"cabinCode":cabinCode}));
        });
        $(".seatMask").on("tap",function(){
            $(".seatMask").hide();
            $(".seat-list").css("bottom", "-250px");
        });

        //预定类型
        /*$('.type').on('tap', function(event) {
            $(".causeType").show();
            $(".cause-list").animate({ "bottom": "0" }, 500);
        });*/
        $(".causeType .secLi").on('tap', function(event) {
            var causeText  = $(this).html(),
                causeCode = $(this).attr('data-num');
            $(".causeType").hide();
            $(".cause-list").css("bottom", "-250px");
            $('.type span').eq(0).html(causeText).attr("data-num", causeCode);
            localStorage.setItem("causeType",JSON.stringify({"causeText":causeText,"causeCode":causeCode}));
        });
        $(".causeType").on("tap",function(){
            $(".causeType").hide();
            $(".cause-list").css("bottom", "-250px");
        });

        //往返
        $("#mySwitch").on('toggle', function(event) {
            if(event.detail.isActive){
                $(this).attr("data-jourytype", "RT");
                localStorage.setItem("jouryType","RT");
                $(".backtime,.today p").show();
              }else{
                $(this).attr("data-jourytype", "OW");
                localStorage.setItem("jouryType","OW");
                $(".backtime,.today p").hide();
              }
        });

        $("#hbdt").on("tap",function(){
            window.location.href = /*"http://192.168.1.141:8088/xingyun_hangbandongtai/index.html?init=planeplus";*/
                "https://www.qianbaoplus.com/hangbandongtai/index.html?init=planeplus";
        });

        //点击退改签
        /*$(".refundPlaneTicket").on("tap",function(){
            if(isiOS) {
                refundPlaneTicket(1,2);
            }else if(isAndroid){
                window.android.refundPlaneTicket(1,2);
            }
        })*/
        $(".goBack").on("tap",function(){
            window.location.href = "homepage.html";
        });
    }
};

home.init();
//城市选择
function choiceCityFunction(isStart) {
    try{
        var cityInfo ={
            "cityCode":"",
            "cityName":""
        };
        var switchDiv = $(".switch");
        if(isStart===1){
            var sPlace = JSON.parse(localStorage.getItem("sPlace"));
            cityInfo ={
                "cityCode":sPlace.startCode,
                "cityName":sPlace.startPlace
            }
        }
        else{
            var sEnd = JSON.parse(localStorage.getItem("sEnd"));
            cityInfo ={
                "cityCode":sEnd.endCode,
                "cityName":sEnd.endPlace
            }
        }
        if(isiOS){
            choiceCity(cityInfo.cityCode,cityInfo.cityName,isStart);
        }else if(isAndroid){
            window.android.choiceCity(cityInfo.cityCode,cityInfo.cityName,isStart);
        }
    }catch(err){
        if(isStart===1){
            window.location.href = "citys.html?area=1";
        }
        else{
            window.location.href = "citys.html?area=2";
        }
    }

}
//城市选择返回的数据
function retrunChoiceCityResult(cityCode,cityName,isStart) {

    var switchDiv = $(".switch");

    var updateStart ="start";
    if(isStart==='1'){
        if(switchDiv.hasClass("tap")){
            updateStart ="end";
        }
        localStorage.setItem("sPlace",JSON.stringify({"startCode":cityCode,"startPlace":cityName}));
    }
    else{
        if(!switchDiv.hasClass("tap")){
            updateStart ="end";
        }
        localStorage.setItem("sEnd",JSON.stringify({"endCode":cityCode,"endPlace":cityName}));
    }
    updatePlaceInfo(cityCode,cityName,updateStart);
}
//此方法只是更新页面展示的信息
function updatePlaceInfo(cityCode,cityName,updateStart) {
    if(updateStart==='start'){
        var startPlace = $(".startPlace");
        startPlace.html(cityName);
        startPlace.attr('data-code',cityCode);
    }
    else{
        var endPlace = $(".endPlace");
        endPlace.html(cityName);
        endPlace.attr('data-code',cityCode);
    }
}
//日期选择
function choiceDateFunction(isStartDate){
    var endDay = 180;
	var startDate= JSON.parse(localStorage.getItem("goTime")).date;
	var endDate =JSON.parse(localStorage.getItem("goBackTime")).date;
    try{
        if(localStorage.getItem("backTime") == null){
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
            setTimeout(changePage,300);
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
	if(isStartDate==='2'){
        itemName ="backTime";
		$("#backtime").html(currentDate);
		$("#backweek").html(dateObject.week);
	}
	else{
        var backDate = moment(currentDate).add(2,'day').format('YYYY-MM-DD');
        var setBackDate = {
            "date":backDate,"week":moment(backDate).format('dddd')
        };
        if(localStorage.getItem("backTime") != null){
            var backTime = JSON.parse(localStorage.getItem("backTime")),
                backDay = backTime.date;
            if(currentDate > backDay){
                $("#backtime").html(setBackDate.date);
                $("#backweek").html(setBackDate.week);
            }else{
                $("#backtime").html(backTime.date);
                $("#backweek").html(backTime.week);
            }
        }else{
            $("#backtime").html(setBackDate.date);
            $("#backweek").html(setBackDate.week);
        }
		localStorage.setItem("goBackTime",JSON.stringify(setBackDate));
		$("#today").html(currentDate);
		$("#week").html(dateObject.week);
	}
	localStorage.setItem(itemName,JSON.stringify(dateObject));
		
}
function changePage(){
    localStorage.setItem('backUrl','home.html');
    window.location.href = "time.html?time=gotime";
}
function changePageTime(){
    localStorage.setItem('backUrl','home.html');
    window.location.href = "time.html?time=backtime";
}
