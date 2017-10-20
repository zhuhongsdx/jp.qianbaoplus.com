//全局的返回码
var globalResponseStatus = {
    "success_Int" :200,//请求成功的返回的status
    "success_String":'200',//请求成功的返回的status
    "force_Int" :400,//请求成功的返回的status
    "force_String":'400',//请求成功的返回的status
    "planeFlight_Int" :300,//飞机规则验证失败
    "planeFlight_String":'300',
    "planeApply_Int" :2001,//行程单审批不通过
    "planeApply_String":'2001',
    "planeChangePrice_Int" :1001,//预订时变价
    "planeChangePrice_String":'1001',
    "busy_Int":0,//返回系统繁忙的status
    "busy_String":'0',//返回系统繁忙的status
    "token_Int" :"aaa",//token失效的status
    "token_String":'',
    "zhfToken_Int" :301,//zhf token失效的status
    "zhfToken_String":'301',
    "zhfNoApproval_Int" :302,//zhf 查询不到审批单的status
    "zhfNoApproval_String":'302'
};

//设置全局的页面分页，以前页面初始化的当前请求page值
var pageInfo = {
    perpage :"100",
    initPageNo :1
};

//订单状态值
// var orderStatus = {
//     "0":"预订中",
//     "1":"预订成功",
//     "2":"预订失败",
//     "3":"取消占座中",
//     "4":"取消占座成功",
//     "5":"预订成功",//取消占座失败
//     "6":"出票中",
//     "7":"出票成功",
//     "8":"出票失败",
//     "9":"退票中",
//     "10":"退票成功",
//     "11":"退票失败",
//     "12":"已结束"
// };
var orderStatus = {
    "-2":"已取消",
    "-1":"待支付",
    "0":"出票中",
    "1":"待支付",//占座成功,出票中
    "2":"出票失败",
    "3":"出票中",
    "4":"已取消",/*出票失败*/
    "5":"出票中",
    "6":"出票中",
    "7":"出票成功",
    "8":"出票失败",
    "9":"退票中",
    "10":"退票成功",
    "11":"出票成功",
    "12":"出票成功",
    "14":"已改签",
    "15":"改签中",
    "16":"出票成功",
    "17":"改签中",
    "18":"改签中",
    "19":"出票成功"
};

//舱位
var flightCabin = {
    "Y":"经济舱",
    "C":"公务舱",
    "F":"头等舱",
    "ALL":"不限舱位"
};

//预定类型
var reverseType = {
    "0":"因私出行",
    "1":"因公出行"
};

//航司渠道
var ditch = {
    "ZHF":"1",
    "51BOOK":"2",
    "51GENERAL":"3"
};

var fromSumbitType ={
    type:'POST',
    contentType:'application/x-www-form-urlencoded;charset=UTF-8',
    dataType:'json',
    data:{},
    url:""
};
var logType = "h5";

//支付方式
var payType = {
    "1":"银票垫付",
    "2":"公司垫付",
    "3":"UATP支付",
    "4":"支付宝支付"
};
////支付方式
//var payType = {
//    "1":"银票垫付",
//    "2":"公司垫付",
//    "3":"UATP支付",
//    "4":"支付宝支付"
//};