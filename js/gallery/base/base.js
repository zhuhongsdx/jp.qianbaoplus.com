var BASE = {
    init: function() {
        var self = this;
        self.handler(document, window);
    },
    handler:function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 20 * (clientWidth / 750) + 'px';
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    }
}
BASE.util = {
    getFrameContent: function(iframeId) {
        var content = '';
        if (window.navigator.userAgent.indexOf('MSIE') != -1) {
            content = document.frames[iframeId].document.body.innerHTML;
        } else {
            content = document.getElementById(iframeId).contentDocument.body.innerHTML;
        }
        return content;
    },
    url2json: function() {
        var arr = [];
        var urlS = window.location.search.slice('1');
        arr = urlS.split("=");
        var json = {};
        for (var i = 0; i < arr.length; i++) {
            if (i < arr.length - 1) {
                json[arr[i]] = arr[i + 1];
            }
        }
        return json;
    },
    bind: function(fn, scope) {
        return function() {
            fn.apply(scope, arguments);
        };
    },
    //The counting of string length using a byte
    strConversionCharLength: function(str) {
        var bytesCount = 0;
        for (var i = 0; i < str.length; i++) {
            if (/^[\u0000-\u00ff]$/.test(str.charAt(i))) {
                bytesCount += 1;
            } else {
                bytesCount += 2;
            }
        }
        return bytesCount;
    },
    //验证必须为数字
    limitIsNum: function(target, callback) {
        var oldnum = Number($.trim(target.val()));
        target.unbind('blur').bind('blur', function() {
            var val = $.trim($(this).val());
            oldnum = (isNaN(val) || Number(val) < 0) ? oldnum : val;
            $(this).val(oldnum);
            callback && callback(Number($.trim($(this).val())), $(this));
        });
    },
    //验证必须为数字并且有特俗字符的舍弃掉
    limitIsNumfix: function(target, callback) {
        var oldnum = Number($.trim(target.val()));
        target.unbind('blur').bind('blur', function() {
            var val = $.trim($(this).val());
            oldnum = (val || Number(val) < 0) ? (isNaN(parseInt(val)) ? $(this).val(1) : $(this).val(parseInt(val))) : val;
            callback && callback(Number($.trim($(this).val())), $(this));
        });
    },





    /*处理浮点型数字*/
    transToFloat: function(num, exponent) {
        if (isNaN(num)) {
            alert('请传数字');
            return;
        }
        Number.prototype.toFixed = function(exponent) {
            return parseInt(this * Math.pow(10, exponent) + 0.5) / Math.pow(10, exponent);
        }
        return num.toFixed(exponent);
    },
    //验证时间先后
    timeCompares: function(endtime, starttime) { //返回true没有过期,结束时间大于开始时间 支持时分秒
        var today_parsedate;
        if (!starttime) {
            var today = new Date();
            today_parsedate = Date.parse(today);
        } else {
            today_parsedate = Date.parse(starttime);
        }
        var endtime_parsedate = Date.parse(endtime);
        if (endtime_parsedate < today_parsedate) {
            return false;
        } else {
            return true;
        }
    },
    timeCompare: function(endtime, starttime) { //返回true没有过期,结束时间大于开始时间 不支持时分秒
        var today_year, today_month, today_date;
        if (!starttime) {
            var today = new Date();
            today_year = today.getFullYear();
            today_month = today.getMonth() + 1;
            today_date = today.getDate()
        } else {
            var starttimeArr = starttime.split('-');
            today_year = starttimeArr[0];
            today_month = starttimeArr[1];
            today_date = starttimeArr[2];
        }
        var endtime_arr = endtime.split('-');
        var endtime_year = endtime_arr[0];
        var endtime_month = endtime_arr[1];
        var endtime_date = endtime_arr[2];
        if (endtime_year < today_year) {
            return false;
        } else if (endtime_year == today_year) {
            if (endtime_month < today_month) {
                return false;
            } else if (endtime_month == today_month) {
                if (endtime_date <= today_date) {

                    return false;
                }
            }
        }
        return true;
    },
    unique: function(arr) { //数组去重
        var _res = [];
        var _json = {};
        for (var i = 0; i < arr.length; i++) {
            if (!_json[arr[i]]) {
                _res.push(arr[i]);
                _json[arr[i]] = 1;
            }
        }
        return _res;
    }
};

BASE.lang = {
    //tem
    sub: function(s, o) {
        var SUBREGEX = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g;
        return s.replace ? s.replace(SUBREGEX, function(m, k) {
            return o[k] === 'undefined' ? m : o[k];
        }) : s;

    },
    //获取参数
    getUrlParam: function(name, url) {
        var search = url || document.location.search;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = search.substr(1).match(reg); //匹配目标参数
        if (r != null) {
            return unescape(r[2]);
        } else {
            return '';
        } //返回参数值
    },
    getLocalTime: function (nS) {
        function add0(m){return m<10?'0'+m:m };
        var time = new Date(nS+'000');
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    },
    //直接返回浏览器地址内的锚点数据
    getUrlHash: function() {
        var hash = window.location.hash;
        if (hash && hash.length > 0) {
            return hash.substring(1);
        }
        return '';
    },
    /*
     * @ method getRandom
     * */
    getRandom: function(name) {
        name = name || "";
        return name + (new Date().getTime());
    },
    subMark: function(arg) {
        var arr = [];
        arr = arg.split('-');
        return arr;
    },
    /*
     * @ method formatDate
     * @ param
     *    date ： Date/Date.getTime()
     *    format : string
     *    num : init
     *  @ return string '2000-00-00 00:00:00'
     * */
    formatDate: function(date, format, num) {
        if (!date) {
            return;
        }
        if (!format) {
            format = "yyyy-MM-dd";
        }
        switch (typeof date) {
            case "string":
                date = new Date(date.replace(/-/g, "/"));
                break;
            case "number":
                date = new Date(date);
                break;
        }
        num = num || 0;
        var newDate = date.getTime() + (num * 60 * 60 * 24 * 1000);
        newDate = new Date(newDate);
        if (!(date instanceof Date)) {
            return;
        }
        if (!(newDate instanceof Date)) {
            return;
        }
        var dict = {
            "yyyy": newDate.getFullYear(),
            "M": newDate.getMonth() + 1,
            "d": newDate.getDate(),
            "h": newDate.getHours(),
            "m": newDate.getMinutes(),
            "s": newDate.getSeconds(),
            "MM": ("" + (newDate.getMonth() + 101)).substr(1),
            "dd": ("" + (newDate.getDate() + 100)).substr(1),
            "hh": ("" + (newDate.getHours() + 100)).substr(1),
            "mm": ("" + (newDate.getMinutes() + 100)).substr(1),
            "ss": ("" + (newDate.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|hh?|ss?|mm?)/g, function() {
            return dict[arguments[0]];
        });
    }
};
/*
 * 正则
 * */
BASE.regexp = {
    //手机
    isMobile: function(t) {
        return /^1[34578]\d{9}$/.test(t);
    },
    //email
    isEmail: function(t) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(t);
    },
    //身份证
    isCardId: function(t) {
        return /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(t);
    },
    //密码
    isPassWord: function(t) {
        return /^(\w*(?=\w*\d)(?=\w*[A-Za-z])\w*){6,16}$/.test(t);
    },
    //固定电话
    isTel: function(t) {
        return /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/.test(t);
    }
};

BASE.methods = {
    /*
     *@param 用于和android IOS传递数据
     *@param 数据利用item对象来进行传递
     *example:item={
     *              a:1,
     *              b:2,
     *              c:aa
     *           }
     */
    doAction: function(item, key) {
        if (window.ANDROID_WODFAN_INSTANCE) {
            ANDROID_WODFAN_INSTANCE.doAction(JSON.stringify(item), 'javascript:' + key);
        }

        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
                    callback(WebViewJavascriptBridge)
                }, false)
            }
        }

        connectWebViewJavascriptBridge(function(bridge) {
            item.actionKey = key;
            window.WebViewJavascriptBridge.callHandler('doAction', item);

        })
    },
    doNative: function(item, key) {
        if (window.ANDROID_WODFAN_INSTANCE) {
            // e.preventDefault();
            ANDROID_WODFAN_INSTANCE.doNative(JSON.stringify(item), 'javascript:' + key);
        }

        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
                    callback(WebViewJavascriptBridge)
                }, false)
            }
        }

        connectWebViewJavascriptBridge(function(bridge) {
            item.actionKey = key;
            window.WebViewJavascriptBridge.callHandler('doNative', item);

        })
    }
};
BASE.init();
