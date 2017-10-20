var currentDate,zhfSelectDay;

if(BASE.util.url2json().time =='gotime')
{
    var goTime = localStorage.getItem("goTime");
        currentDate = JSON.parse(goTime).date;
    document.title = "请选择出发日期";
    $(".header h1").text("请选择出发日期");

    /*var zhfSelectTime = localStorage.getItem("zhfSelectTime");
    zhfSelectDay = JSON.parse(zhfSelectTime).date;*/
}
else if (BASE.util.url2json().time =='backtime'){
    var goBackTime = localStorage.getItem("goBackTime"),
        backTime = localStorage.getItem("backTime");
    console.log(backTime);
    if(backTime == undefined){
        currentDate = JSON.parse(goBackTime).date;
    }else{
        var goBackDay = (JSON.parse(goBackTime)).date,
            backDay = (JSON.parse(backTime)).date;
        if(goBackDay >= backDay){
            currentDate = JSON.parse(goBackTime).date;
        }else{
            currentDate = JSON.parse(backTime).date;
        }
    }

    document.title = "请选择返程日期";
    $(".header h1").text("请选择返程日期");
}

var backUrl = localStorage.getItem('backUrl');

$(".goBack").on("tap",function(){
    window.location.href = backUrl;
});

var minDate = "",
    maxDate = "";
/*if(localStorage.getItem("casAppNo") != null){
    minDate = moment(zhfSelectDay).add(-1,'day').format('YYYY-MM-DD');
    maxDate = moment(zhfSelectDay).add(1,'day').format('YYYY-MM-DD');
}*/

YUI({
    modules: {
        'trip-calendar': {
            fullpath: './js/app/trip-calendar/trip-calendar.js',
            type    : 'js',
            requires: ['trip-calendar-css']
        },
        'trip-calendar-css': {
            fullpath: './css/trip-calendar.css',
            type    : 'css'
        }
    }
}).use('trip-calendar', function(Y) {

    /**
     * 非弹出式日历实例
     * 直接将日历插入到页面指定容器内
     */
    var oCal = new Y.TripCalendar({
        minDate: minDate,
        maxDate: maxDate,
        container   : '#J_Calendar', //非弹出式日历时指定的容器（必选）
        selectedDate: currentDate ,   //指定日历选择的日期
        count       : 7,
        afterDays   : 180
    });
    
    //日期点击事件
    oCal.on('dateclick', function() {
        var selectedDate = this.get('selectedDate');
        //console.log(this._getSiblingDate(selectedDate,1));

        //console.info(selectedDate + '\u3010' + this.getDateInfo(selectedDate) + '\u3011');
        //设置本地存储的url值为选中日期
        if(BASE.util.url2json().time == "gotime"){
            var selectDay = {
                "date" : selectedDate,
                "week" : this.getDateInfo(selectedDate)
            };
            console.log(selectDay);
            localStorage.setItem("goTime",JSON.stringify(selectDay));
            var backDay = moment(selectedDate).add(2,'day').format('YYYY-MM-DD');
            localStorage.setItem("goBackTime",JSON.stringify({"date":backDay,"week":this.getDateInfo(backDay)}));

        }
        if(BASE.util.url2json().time == "backtime"){
            console.info(selectedDate);
            var selectDay = {
                "date" : selectedDate,
                "week" : this.getDateInfo(selectedDate)
            };
            localStorage.setItem("backTime",JSON.stringify(selectDay));
        }
        /**if(BASE.util.url2json().list == "day"){
            var selectDay = {
                "date" : selectedDate,
                "week" : this.getDateInfo(selectedDate)
            };
            localStorage.setItem("listDay",JSON.stringify(selectDay));
            var listDay = moment(selectedDate).add(2,'day').format('YYYY-MM-DD'),
                listWeek = moment(listDay).format('dddd');
            localStorage.setItem("backtime",JSON.stringify({"date":listDay,"week":listWeek}));
            console.log(listDay);
            window.location.href = 'list.html';
        }*/
        var orderUuid = localStorage.getItem("listOrderUuid"),
            oldFltNo = localStorage.getItem("listOldFltNo"),
            journeyType = localStorage.getItem("listJourneyType");
        if(orderUuid != null && oldFltNo != null && journeyType != null){
            backUrl = backUrl+"?orderUuid=" + orderUuid + "&flightNo=" + oldFltNo + "&journeyType=" + journeyType;
        }
        window.location.href =backUrl;
    });
});
