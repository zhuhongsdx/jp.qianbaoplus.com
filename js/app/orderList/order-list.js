var orderList = {
   /* config: {
        //airUrl: "http://192.168.1.137:8098/xingyun_travel",
        html: '<li class="order-list-li">' +
            '<a href="javascript:;" data-code="{orderUuid}">' +
            '<div class="order-list-li-top"><span class="font-16 fontColor-ff6">{flightNo}</span><span class="font-12 fontColor-666 orderNo">订单号：{orderNumber}</span></div>' +
            '<div class="order-list-li-bottom">' +
            '<div class="order-list-form-to">' +
            '<span class="order-list-status font-14 fontColor-ff6">{orderStatus}<img src="../img/img_rightarrow_orange.png"/></span>' +
            '<div><span class="font-14 fontColor-333">{departAirport}</span><img class="order-list-jiantou" src="../img/img_orderlist_passby.png" alt=""/><span class="font-14 fontColor-333">{arriveAirport}</span></div>' +
            '</div>' +
            '<p class="font-12 fontColor-999">出发时间<span class="order-list-formto-time">{.}</span></p>' +
            '<p class="font-12 fontColor-999">到达时间<span class="order-list-formto-time">{endTime}</span></p>' +
            '<span class="order-list-money font-14 fontColor-ff6">{totalFee}</span>' +
            '</div>' +
            '</a>' +
            '</li>'
    },*/
    init: function() {
        var self = this;
        self.loadHtml();
        self.bindEvent();
    },
    loadHtml: function() {
        /*$(".bg").show();
        $(".loading").show();*/
        $(".Loading").show();
        function fadeOut(){
            $(".warnText").fadeOut('slow');
        }

        var self = this,
            orderType = getQueryString("orderType");
        console.log(orderType);

        var currentPage = 1,resultList = [];
        /*var myScroll,
            pullDownEl, pullDownOffset,
            pullUpEl, pullUpOffset,
            generatedCount = 0;

        //下拉刷新 （自定义实现此方法）
        //myScroll.refresh();	// 数据加载完成后，调用界面更新方法

        function pullDownAction (){
            setTimeout(function (){	// <-- Simulate network congestion, remove setTimeout from production!
                queryShow(1);
                console.info('down---');
                myScroll.refresh();//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
            }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }


        //滚动翻页 （自定义实现此方法）
        //myScroll.refresh();	// 数据加载完成后，调用界面更新方法

        function pullUpAction (){
            setTimeout(function (){	// <-- Simulate network congestion, remove setTimeout from production!
                queryShow();
                console.log(JSON.parse(jsonStr));
                console.info('up---');
                myScroll.refresh();// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
            }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }

        //初始化iScroll控件

        function loaded(){
            pullDownEl = $('#pullDown');
            pullDownOffset = pullDownEl.offset().top;
            pullUpEl = $('#pullUp');
            pullUpOffset = pullUpEl.offset().top;

            myScroll = new iScroll('manageList',{
                scrollbarClass: 'myScrollbar', /!* 重要样式 *!/
                useTransition: false, /!* 此属性不知用意，本人从true改为false *!/
                topOffset: pullDownOffset,
                onRefresh: function (){
                    if (pullDownEl.hasClass('loading')){
                        pullDownEl.removeClass();
                        pullDownEl.find('.pullDownLabel').html('下拉刷新...');
                    } else if (pullUpEl.hasClass('loading')){
                        pullUpEl.removeClass();
                        pullUpEl.find('.pullUpLabel').html('上拉加载更多...');
                    }
                },
                onScrollMove: function (){
                    console.log(this);
                    if (this.y > 5 && !pullDownEl.hasClass('flip')){
                        console.info(pullDownEl);
                        pullDownEl.addClass('flip');
                        pullDownEl.find('.pullDownLabel').html('松手开始更新...');
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.hasClass('flip')){
                        pullDownEl.removeClass();
                        pullDownEl.find('.pullDownLabel').html('下拉刷新...');
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.hasClass('flip')){
                        pullUpEl.addClass('flip');
                        pullUpEl.find('.pullUpLabel').html('松手开始更新...');
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.hasClass('flip')){
                        pullUpEl.removeClass();
                        pullUpEl.find('.pullUpLabel').html('上拉加载更多...');
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function (){
                    if (pullDownEl.hasClass('flip')){
                        pullDownEl.addClass('loading');
                        pullDownEl.find('.pullDownLabel').html('加载中...');
                        pullDownAction();	// Execute custom function (ajax call?)
                    } else if (pullUpEl.hasClass('flip')){
                        pullUpEl.addClass('loading');
                        pullUpEl.find('.pullUpLabel').html('加载中...');
                        pullUpAction();	// Execute custom function (ajax call?)
                    }
                }
            });
            setTimeout(function (){ $('#manageList').css("left","0") }, 800);}

        //初始化绑定iScroll控件
        document.addEventListener('touchmove', function (e){
            e.preventDefault();
        }, false);
        document.addEventListener('DOMContentLoaded', loaded, false);*/

        var myScroll,
            pullDownEl, pullDownOffset,
            pullUpEl, pullUpOffset,
            generatedCount = 0;
        /**
         * 下拉刷新 （自定义实现此方法）
         * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
         */
        function pullDownAction (){
            setTimeout(function (){	// <-- Simulate network congestion, remove setTimeout from production!

                queryShow(1);
                console.info('down---');
                myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
            }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }

        /**
         * 滚动翻页 （自定义实现此方法）
         * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
         */
        function pullUpAction (){
            setTimeout(function (){	// <-- Simulate network congestion, remove setTimeout from production!

                queryShow();
                console.info('up---');
                myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
            }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }

        /**
         * 初始化iScroll控件
         */
        function loaded(){
            pullDownEl = document.getElementById('pullDown');
            pullDownOffset = pullDownEl.offsetHeight;
            pullUpEl = document.getElementById('pullUp');
            pullUpOffset = pullUpEl.offsetHeight;
            myScroll = new iScroll('manageList',{
                vScrollbar:false,
                scrollbarClass: 'myScrollbar', /* 重要样式 */
                useTransition: false, /* 此属性不知用意，本人从true改为false */
                topOffset: pullDownOffset,
                onRefresh: function (){
                    if (pullDownEl.className.match('loading')){
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    } else if (pullUpEl.className.match('loading')){
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    }
                },
                onScrollMove: function (){
                    if (this.y > 5 && !pullDownEl.className.match('flip')){
                        pullDownEl.className = 'flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')){
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')){
                        pullUpEl.className = 'flip';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')){
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function (){
                    if (pullDownEl.className.match('flip')){
                        pullDownEl.className = 'loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                        pullDownAction();	// Execute custom function (ajax call?)
                    } else if (pullUpEl.className.match('flip')){
                        pullUpEl.className = 'loading';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                        pullUpAction();	// Execute custom function (ajax call?)
                    }
                }
            });
            setTimeout(function (){ document.getElementById('manageList').style.left = '0'; }, 800);}

//初始化绑定iScroll控件
        document.addEventListener('touchmove', function (e){
            e.preventDefault();
        }, false);
        document.addEventListener('DOMContentLoaded', loaded, false);

        var data = {
            "queryType":orderType,
            "pageNum": currentPage,
            "pageSize": 10
        };

        function queryShow(){
            var downOrUp = 'up';
            if(arguments.length>0) {
                data.pageNum =pageInfo.initPageNo;
                downOrUp = 'down';
            }else{
                console.info('--up--------');
                data.pageNum = currentPage;
            }

            self.baseAjax({
                url: API.AIR_TICKER.ORDER_LIST,
                data: JSON.stringify(data),
                fn: function(result) {
                    /*$(".bg").hide();
                    $(".loading").hide();*/
                    $(".Loading").hide();
                    console.log(result.content.totalNumber);
                    var data = result.content.list;
                    var item = {};
                    var html = "";
                    console.log(data);

                    if(downOrUp==='down') {
                        resultList = _.concat(resultList,data.content);
                    } else if (downOrUp ==='up') {
                        resultList = _.concat(data.content,resultList);
                    }

                    if(data.length>0) {
                        if(downOrUp=='up'){
                            currentPage++;
                        }
                        appendResult(data.content,downOrUp);
                    } else {
                        if($("#orderList").find('section').size==0){
                            $(".warnText").fadeIn('slow').find("p").text("您的飞机票订单为空！");
                            setTimeout(fadeOut,3000);
                        }else{
                            $(".warnText").fadeIn('slow').find("p").text("您没有新的飞机票订单！");
                            setTimeout(fadeOut,3000);
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '数据已加载完毕';
                        }
                    }
                    function appendResult(list,downOrUp) {
                        $.each(data, function (index, val) {
                            $.each(val, function (index2, val2) {
                                /*item = {
                                 orderUuid: val2.orderUuid,
                                 flightNo: val2.flightNo,
                                 orderNumber: val2.orderNumber,
                                 orderStatus: val2.orderStatus,
                                 departAirport:val2.departAirportName + val2.departTerminal,
                                 arriveAirport: val2.arriveAirportName + val2.arriveTerminal,
                                 beginTime: BASE.lang.getLocalTime(new Date(val2.beginTime *1000)),
                                 endTime: BASE.lang.getLocalTime(new Date(val2.endTime *1000)),
                                 totalFee: val2.totalFee
                                 }
                                 html += BASE.lang.sub(self.config.html, item);*/

                                if($("#"+val2.orderUuid).length==0){

                                    val2.flightNo = val2.carrierCode + val2.flightNo;
                                    val2.departAirportName = val2.departAirportName + val2.departTerminal;
                                    val2.arriveAirportName = val2.arriveAirportName + val2.arriveTerminal;
                                    /*val2.beginTime = BASE.lang.getLocalTime(new Date(val2.beginTime * 1000));
                                     val2.endTime = BASE.lang.getLocalTime(new Date(val2.endTime * 1000));*/
                                    val2.beginTime = moment(val2.beginTime * 1000).format("YYYY-MM-DD HH:mm:ss");
                                    val2.endTime = moment(val2.endTime * 1000).format("YYYY-MM-DD HH:mm:ss");
                                    val2.orderStatus = orderStatus[val2.orderStatus];
                                    //console.info(val2);
                                    if(downOrUp == "up"){
                                        $(".order-list").append(baidu.template("orderDetail", val2));
                                    }else{
                                        var tmpl = baidu.template("orderDetail", val2);
                                        var fisrt_li = $(".order-list-li").first();
                                        $(tmpl).insertBefore(fisrt_li);
                                    }
                                }
                            });
                        });
                    }
                }
            });
        }
        queryShow();
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
                //alert("服务器请求失败");
            }
        });
    },
    bindEvent: function() {
        $(".order-list-li").live("tap",function(){
            var _this = $(this),
                orderUuid = _this.attr("data-code");
            console.log(orderUuid);
            var data = {
                orderUuid: orderUuid
            };
            var logData =$.extend({url:API.AIR_TICKER.ORDER_DETAIL},data);
            logRequest(logData);
            ajaxRequest({url:API.AIR_TICKER.ORDER_DETAIL,data:data},function(data){
                console.log(data);
                var status = data.content.orderStatus;

                var url = "";
                // if(status == "0" || status == "1" || status == "2" || status == "3" || status == "4" || status == "5"){
                //     url = "order-confirm-info.html";
                // }else if(status == "6" || status == "7" || status == "8"){
                //     url = "order-info.html";
                // }else if(status == "9" || status == "10" || status == "11" || status == "12"){
                //     url = "return-ticket-status.html";
                // }
                if(status == "-2" || status == "-1" || status == "1" || status == "4"){
                    url = "order-confirm-info.html";
                }else if(status == "0" || status == "2" || status == "3" || status == "5" || status == "6" || status == "7" || status == "8" || status == "11" || status == "12"){
                    url = "order-info.html";
                }else if(status == "9" || status == "10" || status == "14" || status == "16" || status == "19"){
                    url = "return-ticket-status.html";
                }else if(status == "15" || status == "17" || status == "18"){
                    url = "changingTicket.html";
                }
                window.location.href=url+"?orderUuid=" + orderUuid + "&status=" + status;
            });
        });

        $(".goBack").on("tap",function(){
            window.location.href = "mine.html";
        })
    }
};

orderList.init();
