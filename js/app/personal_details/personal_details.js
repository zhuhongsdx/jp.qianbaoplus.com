$(document).ready(function(){
    getDetails();
});

function getDetails(){
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
            console.log(res.content);
            $(".person_name").html(res.content.name);
            $(".person_tel").html(res.content.phone);
            $(".enterprise_name").html(res.content.enterpriseName);
            $(".department").html(res.content.departmentNmae);
            $(".enterprise_email").html(res.content.enterpriseEmail);
        }
    })

    $(".goBack").on("tap",function(){
        window.history.back();
    });
}
