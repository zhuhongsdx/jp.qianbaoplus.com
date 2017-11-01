//var baseUrl = "http://192.168.1.137:8098/xingyun_travel/",
//var baseUrl = "https://sit-apis.qianbao.com/",
var baseUrl = "https://apis.qianbao.com/",
//var baseUrl = "https://dev-apis.qianbao.com/",

    token = getQueryString("cas_access_token"),
    appId = getQueryString("appid");
if(token!=null) {
    localStorage.setItem("token",token);
}else{
    token = localStorage.getItem("token");
}
if(appId!=null) {
    localStorage.setItem("appId",appId);
}else{
    appId = localStorage.getItem("appId");
}

var API_MODULE={
    "AIR_TICKER":"xingyun_travel/v1/airTicker/"
};
var CAS_API_MODULE={
    "AIR_TICKER":"xingyun_travel/v1/casAirTicker/"
};

var API = {
    "AIR_TICKER":{
        "FLIGHT_CITY_AIRPORT_LIST":baseUrl+API_MODULE.AIR_TICKER+"flightCityAirportList?access_token="+token,
        //"FLIGHT_LIST":baseUrl+CAS_API_MODULE.AIR_TICKER+"flightList?access_token="+token,//机票列表
        "FLIGHT_LIST":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/flightList",//机票列表 copy
        "FLIGHT_VALID_SEAT":baseUrl+API_MODULE.AIR_TICKER+"flightValidSeat?access_token="+token,//判断是否售罄
        //"INSURANCE_LIST":baseUrl+CAS_API_MODULE.AIR_TICKER+"insuranceList?access_token="+token,//zhf获取保险价格
        "INSURANCE_LIST":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/insuranceList",//zhf获取保险价格 copy
        "FLIGHT_RULES_DETAIL":baseUrl+API_MODULE.AIR_TICKER+"flightRulesDetail?access_token="+token,//判断是否买保险
        //"GET_CHANGE_TICKET_RULE":baseUrl+CAS_API_MODULE.AIR_TICKER+"getChangeTicketRule?access_token="+token,//zhf查看退改签
        "GET_CHANGE_TICKET_RULE":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/getChangeTicketRule",//zhf查看退改签 copy
        //"FLIGHT_LIST_BY_CONDITION":baseUrl+CAS_API_MODULE.AIR_TICKER+"flightListByCondition?access_token="+token,//zhf机票列表筛选
        "FLIGHT_LIST_BY_CONDITION":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/flightListByCondition",//zhf机票列表筛选 copy
        'TRAIN_TEMPLATE':baseUrl+'train/template?access_token='+token,
        //"FLIGHT_BOOK":baseUrl+CAS_API_MODULE.AIR_TICKER+"flightBook?access_token="+token,//预订
        "FLIGHT_BOOK":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/flightBook",//预订
        //"SENDSMS":baseUrl+API_MODULE.AIR_TICKER+"sendSms?access_token="+token,
        "PAY_FLIGHT":baseUrl+CAS_API_MODULE.AIR_TICKER+"payFlight?access_token="+token,//zhf收银台支付
        "FLIGHT_CANCEL_SEAT":baseUrl+CAS_API_MODULE.AIR_TICKER+"flightCancelSeat?access_token="+token,//zhf取消订单
        "GET_FLIGHT_TICKET":baseUrl+API_MODULE.AIR_TICKER+"getFlightTicket?access_token="+token,
        "GET_FLIGHT_ORDER_STATUS":baseUrl+CAS_API_MODULE.AIR_TICKER+"getFlightOrderStatus?access_token="+token,//zhf查询订单状态
        "GET_REFUND_FEE":baseUrl+API_MODULE.AIR_TICKER+"getRefundFee?access_token="+token,
        "REFUND_TICKET":baseUrl+CAS_API_MODULE.AIR_TICKER+"refundTicket?access_token="+token,//zhf退票
        //"ORDER_LIST":baseUrl+CAS_API_MODULE.AIR_TICKER+"orderList?access_token="+token,   //查询zhf订单列表
        "ORDER_LIST":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/orderList",   //查询zhf订单列表
        //"ORDER_DETAIL":baseUrl+CAS_API_MODULE.AIR_TICKER+"orderDetail?access_token="+token,//zhf订单详情
        "ORDER_DETAIL":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/orderDetail",//zhf订单详情 copy
        "LOGIN":baseUrl+"xingyun/v1/h5/singleLogin?access_token="+token,
        //"REGISTER_TOKEN":baseUrl+CAS_API_MODULE.AIR_TICKER+"registerToken?cas_access_token="+token,//判断登录是否合法
        "REGISTER_TOKEN":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/registerToken",//判断登录是否合法copy
        //"QUERY_CAS_APPROVES":baseUrl+CAS_API_MODULE.AIR_TICKER+"queryCasApproves?access_token="+token,//获取zhf的审批列表
        "QUERY_CAS_APPROVES":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/queryCasApproves",//获取zhf的审批列表 copy
        //"QUERY_CAS_APPROVE_DETAIL":baseUrl+CAS_API_MODULE.AIR_TICKER+"queryCasApproveDetail?access_token="+token,//获取zhf的审批单详情
        "QUERY_CAS_APPROVE_DETAIL":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/queryCasApproveDetail",//获取zhf的审批单详情 copy
        "PRE_RESCHEDULED":baseUrl+CAS_API_MODULE.AIR_TICKER+"preRescheduled?access_token="+token,//zhf欲改期
        //"PREVITE_DETAILS":baseUrl+CAS_API_MODULE.AIR_TICKER+"queryCasUserInfo?access_token="+token,//个人信息详情
        "PREVITE_DETAILS":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/queryCasUserInfo",//个人信息详情 copy
        "CLICK_COUNT":baseUrl+CAS_API_MODULE.AIR_TICKER+"clickCount?access_token="+token,//银票支付统计
        "APPROVE_TO_QUERY_FLIGHTS":baseUrl+CAS_API_MODULE.AIR_TICKER+"approveToQueryFlights?access_token="+token//zhf从审批单进首页
    },
    //"LOG":baseUrl+"xingyun/v1/h5/log?access_token="+token
    // "LOG":baseUrl+"xingyun/v1/h5/log?access_token="+token
    "LOG":"http://ae0c00150f384ee9984a152c901e6076-cn-beijing.alicloudapi.com/log"  //copy
};
