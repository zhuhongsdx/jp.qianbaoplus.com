var localStorageName = {
    "backUrlName":"backUrlName",
    "dateName":"dateName",
    "SName":"SName",
    "SCode":"SCode",
    "EName":"EName",
    "ECode":"ECode",
    "isHeight":"isHeight"
};

//获取当天日期
var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    week = date.getDay();
if(month < 10){
    month = "0" + month;
}
//var today = year + "-" + month + "-" + day;
var today = month + "-" + day;

//获取url传来的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}