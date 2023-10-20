var cellColor = ["white", "#E1E1FF", "#C8C8FF", "#AFAFFF", "#9696FF", "#7D7DFF", "#6464FF", "#4B4BFF", "#3232FF", "#1919FF", "#0000FF"]


//백엔드에서 주는 정보
var date = day_count;



var a = 0;
var max_member = 2;

// JSON을 파싱하여 JavaScript 배열로 변환
var timetable = parseListData(timetable);
var day = parseListData(day);
//timetable 만들기
var $tableWrap = $('#table-wrap');

// 테이블 엘리먼트를 생성하고 #table-wrap 내에 추가합니다.
var $table = $('<table>');
$tableWrap.append($table);
var $row = $('<tr>').appendTo($table)
$('<th>').appendTo($row)
for (var j = 0; j <= 23; j++) {
  var $cell = $('<td>').text(String(j)).appendTo($row);
}
for (var i = 0; i <= date - 1; i++) //행반복
{
  var $row = $('<tr>').appendTo($table);
  $('<th>').html(day[i]).appendTo($row);
  for (var j = 0; j <= 23; j++) //열반복
  {
    var a = i * 24 + j;
    var $cell = $('<td>').appendTo($row);

    if (timetable[a].length != 0) {
      var member = timetable[a];
      var $des = $('<div>').appendTo($cell);
      $des.addClass("des");
      $des.text(String(member));
      $cell
        .mouseout(
          function (event) {
            $(this).find(".des").css('visibility', 'hidden');
            event.stopPropagation();
          })
        .mouseover(
          function (event) {
            $(this).find(".des").css('visibility', 'visible');
            event.stopPropagation();
          })

    }

    $cell.css('background-color', cellColor[timetable[a].length]);

  }
}

function parseListData(data) {
  var jsonString = data.replace(/'/g, '"');
  var result = JSON.parse(jsonString);
  return result;
}

$(document).on('click', function (event) {
  var currentURL = window.location.href;
    var urlParts = currentURL.split('/');
    var id = urlParts[urlParts.length - 1];
  // 그룹원 초대 눌렀을때
  if ($("#invite-btn").is(event.target) || $("#invite-btn").has(event.target).length !== 0) {
    $("#invite-modal").css("display", "flex");
    document.querySelector(".total").classList.toggle("blur");
  }

  //초대 메일 보내기 눌렀을때
  else if ($("#mail-btn").is(event.target) || $("#mail-btn").has(event.target).length !== 0) {
    var email = $("#email").val()
    
    $.ajax({
      url: "/wwmgroup/invite/",
      type: "POST",
      contentType: "application/json",  // contentType 설정 변경
      dataType: "json",
      data: JSON.stringify({
        "email": email,
        "id": id
      }),

      success: function (data) {
        alert("이메일로 초대 링크가 전송되었습니다.")
        $("#invite-modal").css("display", "none");
        document.querySelector(".total").classList.toggle("blur");
      },
      error: function (xhr, status, error) {
        // 요청이 실패하면 실행되는 콜백 함수
        console.error("요청 실패:", status, error);
        $("#invite-modal").css("display", "none");
        document.querySelector(".total").classList.toggle("blur");
      }
    });

    

  }

  else if ($("#transfer-btn").is(event.target) || $("#transfer-btn").has(event.target).length !== 0) {
    $.ajax({
      url: "/wwmgroup/members/",
      type: "POST",
      contentType: "application/json",  // contentType 설정 변경
      dataType: "json",
      data: JSON.stringify({
        "id": id
      }),

      success: function (data) {
        $('#transfer-member-wrap').empty();
        data["members"].forEach(function (member) {
          makeMember(member, "transfer");
        });
      },
      error: function (xhr, status, error) {
      }
    });
    $("#transfer-modal").css("display", "flex");
    document.querySelector(".total").classList.toggle("blur");
  }
  
  //양도 눌렀을때
  else if ($("#transfer-submit").is(event.target) || $("#transfer-submit").has(event.target).length !== 0) {
    var username;
    $(".modal-radio").each(function () {
      if ($(this).is(":checked")) {
        username = $(this).attr("id");
      }
    });
    console.log(username)
    $.ajax({
      url: "/group/change_master/",
      type: "POST",
      contentType: "application/json",  // contentType 설정 변경
      dataType: "json",
      data: JSON.stringify({
        "name": name,
        "username": username
      }),

      success: function (data) {
        alert("양도되었습니다.")
        location.reload();
      },
      error: function (xhr, status, error) {
        console.log(error)
      }
    });
  }

  //바깥쪽 눌렀을때
  else if (!($(".modal-area").is(event.target)) && $(".modal-area").has(event.target).length === 0) {
    if ($(".total").hasClass("blur")) {
      document.querySelector(".total").classList.toggle("blur");
    }
    $(".modal-area").css("display", "none");
  }

});

function makeMember(member, type) {
  if (type === "eject") {
    // 새로운 memberList 요소를 생성합니다.
    var memberList = $('<div class="memberList">');
    var checkbox = $('<input id = "' + member["username"] + '"  class="modal-checkbox" type="checkbox">');
    var paragraph = $('<p class = "member-text"></p>');
    $(paragraph).text(member['name'])

    // memberList 요소 안에 checkbox와 paragraph를 추가합니다.
    memberList.append(checkbox);
    memberList.append(paragraph);

    // modal 요소 안에 생성한 memberList를 추가합니다.
    $('#member-wrap').append(memberList);
  }
  else{
    // 새로운 memberList 요소를 생성합니다.
    var memberList = $('<div class="transMemberList">');
    var checkbox = $('<input id = "' + member["username"] + '"  class="modal-radio" type="radio">');
    var paragraph = $('<p class = "transfer-member-text"></p>');
    $(paragraph).text(member['name'])

    // memberList 요소 안에 checkbox와 paragraph를 추가합니다.
    memberList.append(checkbox);
    memberList.append(paragraph);

    // modal 요소 안에 생성한 memberList를 추가합니다.
    $('#transfer-member-wrap').append(memberList);
  }
  }
