//获取url传来的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//请求log
function logRequest(objectStr) {
    var tempObject = fromSumbitType;
    tempObject.url=API.LOG;
    console.info(JSON.stringify(objectStr));
    tempObject.data={
        type:logType,
        content:JSON.stringify(objectStr)
    };
    console.info(tempObject);
    ajaxRequest(tempObject);
}
//ajax请求
function ajaxRequest(ajaxRequestObject,successCallBack,errorCallBack,httpError) {
    var arg = arguments;
    var opt = {
        type:'POST',
        contentType:'application/json',
        dataType:'json',
        data:{}
    };
    opt = $.extend(opt,ajaxRequestObject);

    if(typeof opt.data!='string' && opt.contentType=='application/json'){
        opt.data = JSON.stringify(opt.data);
    }
    if(opt.contentType!='application/json'){
        opt.data= $.param(opt.data);
    }
    console.info(JSON.stringify(opt));
    $.ajax({
        url:opt.url,
        data:opt.data,
        type:opt.type,
        contentType:opt.contentType,
        dataType:opt.dataType,
        success:function(data){
            var status = data.status;
            if(status == globalResponseStatus.success_Int || status == globalResponseStatus.success_String){
                successCallBack(data);
            }else if(status == globalResponseStatus.busy_Int || status == globalResponseStatus.busy_String || status == globalResponseStatus.force_Int || status == globalResponseStatus.force_String || status == globalResponseStatus.planeFlight_Int || status == globalResponseStatus.planeFlight_String || status == globalResponseStatus.planeApply_Int || status == globalResponseStatus.planeApply_String || status == globalResponseStatus.zhfToken_Int || status == globalResponseStatus.zhfToken_String || status == globalResponseStatus.zhfNoApproval_Int || status == globalResponseStatus.zhfNoApproval_String){
                if(arg.length > 2 && (typeof arg[2] ==='function')){
                    $(".bg").hide();
                    $(".loading").hide();
                    errorCallBack(data);
                }
            }
            else if(status == globalResponseStatus.token_Int || status == globalResponseStatus.token_String){
                $(".loading").hide();
                $(".warnText").fadeIn('slow').find("p").text("请重新登录！");
                setTimeout(fadeOut,5000);
                if(isiOS) {
                    enterLoginVC();
                }else if(isAndroid){
                    window.android.enterLoginVC();
                }
                return false;
            }
        },
        error:function(data){
            //alert(JSON.stringify(data));
            $(".bg").hide();
            $(".loading").hide();
            if(arg.length > 3 && (typeof arg[3] ==='function')){
                httpError(data);
            }
        }
    })
}

//获取明天日期
var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    week = date.getDay(),
    Times = Math.ceil(date.getTime() / 1000);


//console.log(times);
if(month < 10){
    month = "0" + month;
}
if(day < 10){
    day = "0" + day;
}
var curDate = year + "-" + month + "-" + day,
    tomorrow = moment(curDate).add(1,'day').format('YYYY-MM-DD'),
    maxDay = moment(curDate).add(179,'day').format('YYYY-MM-DD');

//转换出发到达时间格式
function switchTime(val){
    return val.substring(0,2)+":"+val.substring(2,4);
}
function getHourAndMM(val) {

    return val.substring(11,16);
}

//判断IOS还是Android
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

//提示框隐藏
function fadeOut(){
    $(".warnText").fadeOut('slow');
}

//查看退改签说明
function getRule(rule){
    //alert(rule);
    ajaxRequest({url:API.AIR_TICKER.GET_CHANGE_TICKET_RULE,data:rule},function (data) {
        console.log(data.content);
        if(data.content == null){
            data.content = "当前网络不稳定，请稍后再试";
        }
        $(".tuiInfo").show().find("div").html("<p>"+ data.content.changeEi +"</p><p>"+ data.content.refundEi +"</p><p>"+ data.content.rescheduledEi +"</p>");
        /*if(isAndroid){
            window.android.showEndorse(data.content);
        }else if(isiOS){
            showEndorse(data.content);
        }*/
    },function(data){
        $(".warnText").fadeIn('slow').find("p").text(data.message);
        setTimeout(fadeOut,2000);
        return false;
    });
    $(".tuiInfo").off().on("tap",function(){
        $(this).hide();
    })
}