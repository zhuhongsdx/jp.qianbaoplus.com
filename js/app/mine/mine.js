$(document).ready(function(){
    personDetails();
});

function personDetails(){
    var casUserIdx = localStorage.getItem("casUserIdx");
    var data = {
        "userId" : casUserIdx
    };
    $.ajax({
        url :  API.AIR_TICKER.PREVITE_DETAILS,
        type : 'POST',
        contentType:'application/json',
        dataType:'json',
        data : JSON.stringify(data),
        success : function(res){
            $(".v_name").html(res.content.name);
            $(".v_phone").html(res.content.phone);
            $(".enterpriseName").html(res.content.enterpriseName);
            $(".department").html(res.content.departmentNmae);
        }
    })
}

$(".first_section").on("tap",function(){
    window.location.href = "personal_details.html";
});
$(".orderList").on("tap",function(){
    window.location.href = "order-list.html?orderType=0";
});
$(".approvalList").on("tap",function(){
    window.location.href = "myApproval.html";
});
