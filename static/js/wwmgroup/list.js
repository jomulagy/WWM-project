$(document).ready(function(){

    $("#myGroup").click(function(){
        var req = {
            "type" : "myGroup"
        }

        $.ajax({
            type: "POST",
            url: "/accounts/user_grouplist/",
            dataType: "json",
            data:JSON.stringify(req),
            success:function(res){
                console.log(res)
                $('#list-wrap').empty()
                res["groups"].forEach(function (group) {
                    makeList(group);
                });
            },
            error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
            }
        });
    })

    $("#invitedGroup").click(function(){
        var req = {
            "type" : "invitedGroup"
        }

        $.ajax({
            type: "POST",
            url: "/accounts/user_grouplist/",
            dataType: "json",
            data:JSON.stringify(req),
            success:function(res){
                $('#list-wrap').empty()
                res["groups"].forEach(function (group) {
                    makeList(group);
                })
            },
            error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
            }
        });
    })
    // 기본으로 내 그룹 출력
    $("#myGroup").click();
});

function makeList(data){
    var groupList = $('<div class = "list"></div>');
    var groupName = $('<p class = "groupName"></p>');
    $(groupName).text(data["name"])
    var groupDate = $('<p class = "groupDate"></p>');
    var groupDateText = data["startDate"] + " - "+ data["endDate"]
    $(groupDate).text(groupDateText)

    // memberList 요소 안에 checkbox와 paragraph를 추가합니다.
    groupList.append(groupName);
    groupList.append(groupDate);

    //클릭 이벤트
    $(groupList).click(function(){
        var name = data["name"]
        location.href = "/group/timetable/"+name+"/"
    })
    // modal 요소 안에 생성한 memberList를 추가합니다.
    $('#list-wrap').append(groupList);
}