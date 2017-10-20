;(function($){
    //判断城市页标题
    var cityListArray = [];

    var historyCity =[];
    var nextUrl = getQueryString("area");

    if(nextUrl==1){
        document.title = "选择出发城市";
        $(".header h1").text("选择出发城市");
    }else{
        document.title = "选择目的城市";
        $(".header h1").text("选择目的城市");
    }

    $(".goBack").on("tap",function(){
        window.history.back();
    });
    
    var topHeight =260;

    function back() {
        if(arguments.length>0)
        {
            var arg1 =arguments[0];
            var isExit =_.findIndex(historyCity,function (o) {
            return o.code == arg1.code;
            });
            if(isExit<0)
            {
                historyCity.push(arg1);
                if(historyCity.length>8)
                {
                    historyCity =_.drop(historyCity,(historyCity.length-8));
                }
            }
            localStorage.setItem("historyCity",JSON.stringify(historyCity));
        }
        window.location.href = "home.html";
    }

    var SName = JSON.parse(localStorage.getItem("sPlace"))["startPlace"],
        EName = JSON.parse(localStorage.getItem("sEnd"))["endPlace"],
        redCity = $("#cityList li");
    if (nextUrl == 1){
        for(var i=0,len=redCity.length;i<len;i++){
            if(redCity.eq(i).text() == SName){
                redCity.eq(i).addClass("red").siblings().removeClass("red");
            }
        }
    }else if (nextUrl == 2){
        for(var i=0,len=redCity.length;i<len;i++){
            if(redCity.eq(i).text() == EName){
                redCity.eq(i).addClass("red").siblings().removeClass("red");
            }
        }
    }

    //热门城市选取
    $(".city li").live("tap",function(){
        var city = $(this).text(),
            code = $(this).attr("data-code");
        if (nextUrl ==1){
            localStorage.setItem("sPlace",JSON.stringify({"startPlace":city,"startCode":code}));
            if(city != EName){
            }else{
                /*$(".warnText").fadeIn('slow').find("p").text("目的地不能与出发地一致");
                setTimeout(fadeOut,2000);
                return false;*/
            }
        }else if (nextUrl ==2){
            localStorage.setItem("sEnd",JSON.stringify({"endPlace":city,"endCode":code}));
            if(city != SName){
            }else{
                /*$(".warnText").fadeIn('slow').find("p").text("出发地不能与目的地一致");
                setTimeout(fadeOut,2000);
                return false;*/
            }
        }
        $(this).addClass("red").siblings().removeClass("red");

        back({'name':city,'code':code});
    });

    $(".town li").live("tap",function(){
        $(this).addClass("areaRed").siblings().removeClass("areaRed");
        $(this).parents("dd").siblings().find("li").removeClass("areaRed");
    });

    //获取城市
    $.each(city.content,function(index,val){
        showCityInfo(val);
    });

    function showCityInfo (cityInfo){
        if(cityInfo.letter){
            $(".zimu").append('<a href="#city_'+cityInfo.letter+'" dataInfo="city_info_'+cityInfo.letter+'">'+cityInfo.letter+'</a>');
            $(".town").append('<dt id="city_'+cityInfo.letter+'">'+cityInfo.letter+'</dt><dd><ul id="city_info_'+cityInfo.letter+'"></ul></dd>');
            if(cityInfo['value'] && cityInfo['value'].length>0){
                addCity(cityInfo['value'],cityInfo.letter);
            }
        }
    }

    function addCity (cityArray,letter) {
        //把JSON中的城市数组放到一个大的数组中
        cityListArray = _.concat(cityListArray,cityArray);
        for(var index= 0,len=cityArray.length;index<len;index++) {
            $("#city_info_"+letter).append('<li data-code="'+cityArray[index].cityCode+'">'+cityArray[index].cityName+'</li>');
        }
    }

    $(function(){
        //$('dl').groupList();      //相对窗口顶部
        $('.cityList').groupList(true);
    });
    $.fn.groupList = function(selfScroll){
        var list = this;
        //var listTopOffset = list.offset().top - 20;
        var listTopOffset = 60;
        var titleHeight = 10;
        console.log(listTopOffset);
        console.log(titleHeight);

        var currentContext = selfScroll ? list : window;
        
        if(selfScroll){
            list.css({
                'height':$(window).height() - listTopOffset,
                'overflow':'auto'
            });
        }
        $(currentContext).on('scroll',function(){
            if($(currentContext).scrollTop()>topHeight){
                if($(currentContext).scrollTop()-(selfScroll ? 0 : listTopOffset) < titleHeight){
                    clearFixed();
                }else{
                    var lis = list.find('li');
                    for(var i = 0, len = lis.length ; i < len ; i++){
                        if(isOnSight(lis[i])){
                            clearFixed().filter('.clone').remove();
                            lis.eq(i).closest("dd").prev().clone(true).addClass('clone').css({
                                'top': selfScroll ? listTopOffset : 0,
                                'position':'fixed',
                                'width':'100%'
                            }).appendTo($('.town'));
                            break;
                        }
                    }
                }
            }else{
                clearFixed().filter('.clone').remove();
            }
        });
        var isOnSight = function(item){
            return selfScroll ? listTopOffset < $(item).offset().top + $(item).height() : $(currentContext).scrollTop() <  $(item).offset().top + $(item).height();
        };
        var clearFixed = function(){
            return $(list).find('dt').css({
                'position':''
            });
        }
    };

    //搜索城市
    $("#searchTown").on("focus",function(){
        $(".bg").show();
        $("#cancelSer").show();
        $(".search").css("width","80%");
    });
    $("#searchTown").on("blur",function(){
        $(".bg").hide();
        $("#cancelSer").hide();
        $(".search").css("width","94%");
    });
    $("#cancelSer").on("tap",function(){
        $(".bg").hide();
        $("#cancelSer").hide();
        $(".search").css("width","94%");
        $("#searchTown").val("").blur();
        $(".zimu").show();
        $("#cityList").show();
        $(".newList").hide();
        $(".newListH").hide();
    });

    var zimu = /[A-Za-z]/;
    $("#searchTown").on('input',function(){

        var search = $(this).val();
        var searchResult = [];
        if(search!='' && search.match(zimu)==null)
        {
            searchResult =searchCity(search);
            appendResultCityList(searchResult);
        }
    });

    function searchCity (search){
        return _.filter(cityListArray, function(city) {
            return city.cityName.indexOf(search)>-1;
        });
    }

    function appendResultCityList(searchResult) {

        $(".newList ul").html("");
        //把以前的数据清空
        if(searchResult.length>0)
        {
            $(".zimu").hide();
            $("#cityList").hide();
            $(".newListH").show();
            $(".newList").show();
            $(".bg").hide();
            $.each(searchResult,function(index,val){
                $(".newList ul").append('<li data-code="'+val.cityCode+'">'+val.cityName+'</li>');
            });
        }else{
            $(".warnText").fadeIn('slow').find("p").text("该城市不支持此服务");
            setTimeout(fadeOut,3000);
            return false;
        }
    }

    function initHistoryCity() {
        if(localStorage.getItem("historyCity")!=null && localStorage.getItem("historyCity")!='' )
        {
            historyCity = JSON.parse(localStorage.getItem("historyCity"));
            _.forEachRight(historyCity,function (value) {
                $("#history").append('<li data-code="'+value.code+'">'+value.name+'</li>');
            });
        }
    };
    initHistoryCity();

    $(".zimu").bind('touchmove',function () {
        findStart(event);
    });
    $(".zimu").bind('touchstart',function () {
        findStart(event);
    });
    $(".zimu").bind('touchend',function () {
        findEnd(event);
    });
    $(".zimu").bind('touchcancel',function () {
        findEnd(event);
    });
    function findStart(event) {
        var point = event.changedTouches ? event.changedTouches[0] : event;
        var pointElement = document.elementFromPoint(point.pageX, point.pageY);

        $(pointElement).click();

        event.preventDefault();
    }
    function findEnd(event) {
        console.info('findEnd');
    }
})(Zepto);

/*var citys = {
    init: function() {
        var self = this;
        //self.loadHtml();
        self.eventFn();
    },
    //城市默认模板
    /!*loadHtml: function() {
        var html = "";
        var history = '<ul class="history mui-clearfix">' +
            '<div>历史选择</div>' +
            '<li>北京</li>' +
            '<li>上海</li>' +
            '<li>广州</li>' +
            '<li>深圳</li>' +
            '<li>西安</li>' +
            '<li>杭州</li>' +
            '<li>成都</li>' +
            '<li>武汉</li>' +
            '<li>南京</li>' +
            '<li>长沙</li>' +
            '</ul>' +
            '<ul class="hot-city mui-clearfix">' +
            '<div>热门城市<img class="icon-hotcity" src="img/img_hotcity.png"/></div>' +
            '<li>北京</li>' +
            '<li>上海</li>' +
            '<li>广州</li>' +
            '<li>深圳</li>' +
            '<li>西安</li>' +
            '<li>杭州</li>' +
            '<li>成都</li>' +
            '<li>武汉</li>' +
            '<li>南京</li>' +
            '<li>长沙</li>' +
            '</ul>';
        var cityList = city.content;
        for (var i = 0; i < cityList.length; i++) {
            html = '<li data-group="' + cityList[i].letter + '" class="mui-table-view-divider mui-indexed-list-group">' + cityList[i].letter + '</li>';
            for (var j = 0; j < cityList[i].value.length; j++) {
                html += '<li data-value="AT" data-tags="AKeSu" class="mui-table-view-cell mui-indexed-list-item carui-selectBrand-listLi-padd" href="#">' +
                    '<div class="mui-input-row mui-left town">' +
                    '<img data-original="img/carLogoMini.jpg?version=' + Math.random() * 1000 + '" class="car-brand-img"/>' +
                    '<span data-citycode=' + cityList[i].value[j].cityCode + '>' + cityList[i].value[j].cityName + '</span>' +
                    '</div>' +
                    '</li>';
            }
            $(".cities").append(html);
        }
    },*!/
    eventFn: function() {
        var self = this;
        $(".mui-indexed-list-search-input").on('input', function(event) {
            //先删除查询列表再添加
            var _this = $(this);
            $("ul.search").remove();
            var htmlSear ='<li>' +
                '<div class="citySearch" data-citycode="{cityCode}">{cityName}</div>' +
                '</li>' ;
            var data = {
                "queryStr": _this.val(),
                "isHotCity": ""
            }
            self.baseAjax({
                url: API.AIR_TICKER.FLIGHT_CITY_AIRPORT_LIST,
                data: JSON.stringify(data),
                fn: function(data) {
                    var re = data.content;
                    var item = {};
                    var list = "";

                    $.each(re, function(index, val) {
                        item = {
                            cityName: val.cityName,
                            cityCode: val.cityCode
                        }
                        list += BASE.lang.sub(htmlSear, item);
                    });
                    $(".mui-indexed-list").append('<ul class="search">'+ list +'</ul>');
                    if (_this.val() != "") {
                        $(".mui-indexed-list-inner,.mui-indexed-list-bar").hide();
                    } else if (_this.val() == "") {
                        $("ul.search").remove();
                        $(".mui-indexed-list-inner,.mui-indexed-list-bar").show();
                    }
                }
            })
        });
        //点击选择城市
        $(".mui-indexed-list").on('tap', '.search li', function(event) {
            if (BASE.util.url2json().area == "start") {
                localStorage.setItem("sPlace", JSON.stringify({ startPlace: $(this).find("div").html(), startCode: $(this).find("div").attr("data-citycode") }));
                window.location.href = "home.html";
            } else {
                localStorage.setItem("sEnd", JSON.stringify({ endPlace: $(this).find("div").html(), endCode: $(this).find("div").attr("data-citycode") }));
                window.location.href = "home.html";
            }
        });
        //点击历史记录
        $(".mui-content").on('tap', '.history li,.mui-indexed-list-item', function(event) {
            if ($(this).hasClass('mui-indexed-list-item')) {
                if (BASE.util.url2json().area == "start") {
                    localStorage.setItem("sPlace", JSON.stringify({ startPlace: $(this).find("span").html(), startCode: $(this).find("span").attr("data-citycode") }));
                    window.location.href = "home.html";
                } else {
                    localStorage.setItem("sEnd", JSON.stringify({ endPlace: $(this).find("span").html(), endCode: $(this).find("span").attr("data-citycode") }));
                    window.location.href = "home.html";
                }
            } else {
                if (BASE.util.url2json().area == "start") {
                    localStorage.setItem("sPlace", JSON.stringify({ startPlace: $(this).html(), startCode: $(this).attr("data-citycode") }));
                    window.location.href = "home.html";
                } else {
                    localStorage.setItem("sEnd", JSON.stringify({ endPlace: $(this).html(), endCode: $(this).attr("data-citycode") }));
                    window.location.href = "home.html";
                }
            }
        });
    },
    baseAjax: function(arg) {
        $.ajax({
            url: arg.url,
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            data: arg.data,
            success: function(result) {
                arg.fn && arg.fn(result);
            },
            error: function() {
                alert("服务器请求失败")
            }
        });
    },
}
citys.init();
mui.init();
mui.ready(function() {
    var list = $('#list')[0];
    //calc height
    list.style.height = (document.body.offsetHeight) / 12 + 'rem';
    //create
    window.indexedList = new mui.IndexedList(list);
});*/
