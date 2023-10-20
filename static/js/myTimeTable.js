let weekdays = ["월", "화", "수", "목", "금", "토", "일"]
//날짜 포맷 조작 함수
function leftPad(value) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

//초기 테이블 출력
makeTable();
function makeTable() {
  var row = 25; //행 개수 입력
  var col = 7;
  const table = document.getElementById("our_table"); //our_table 선택
  for (var i = 0; i < 7; i++) {
    //열 개수 만큼
    const newRow = table.insertRow(); //tr태그 삽입
    const newCell1 = newRow.insertCell(); //1행에는 날짜 출력하는 td
    newCell1.id = "tableDays";
    newCell1.innerText = weekdays[i];
    for (var j = 0; j < row - 1; j++) {
      const newCell2 = newRow.insertCell(); //2행부터는 빈 타임테이블 출력
      newCell2.classList.add("checkbox");
    }

  }

  // //myCal list받아오기 ~ 아래의 이 데이터를 받아왔다고 가정했을 때.
  $(document).ready(function () {
    console.log(timetable)
    var row = 24;
    const table = document.getElementById("our_table"); //our_table 선택

    for (var i = 1; i <= col; i++) {
      
      for (var j = 1; j <= row; j++) {
        if (timetable[weekdays[i-1]][j] === '1') {
          console.log(1)
          //1이면 색칠하기
          table.rows[i].cells[j].classList.add("highlighted");
        }
      }
    }

    //타임테이블 초기화
    $("#init-btn").click(function () {
      $("td").removeClass("highlighted"); //highlighted class 삭제
    });

    //저장하기 버튼 - 셀이 선택되어있으면 1, 선택되어있지않으면 0 리스트로 표시
    $("#save_button").click(function () {
      const mytable = document.getElementById("our_table");
      var req = {}

      for (var i = 1; i <= col; i++) {
        var scheduleData=[]
        for (var j = 1; j <= row; j++) {
          //일정 있는 시간 드래그 모드
          if (mytable.rows[i].cells[j].classList.contains("highlighted")) {
            scheduleData.push("1");
          } else {
            scheduleData.push("0");
          }
        }
        req[weekdays[i-1]] = scheduleData
      }
      console.log(req)
      $.ajax({
        //요청이 전송될 URL 주소
        url: "/whenmeet/edit_personal_timetable/",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(req),
        success: function () {
          alert("성공적으로 저장되었습니다.")
          location.href = "/";
        },
        error: function (xhr, textStatus, thrownError) {
          alert(
            "Could not send URL to Django. Error: " +
            xhr.status +
            ": " +
            xhr.responseText
          );
        },
      });
    });
  });

  // 드래그했을 때 table 색깔이 변함 - 가능시간 / 불가능 시간
  function is_checked() {
    const checkbox = document.getElementsByClassName("checkbox");
    const is_checked = checkbox.checked;
    console.log(is_checked);
  }

  $(function () {
    var isMouseDown = false;
    $("#our_table td")
      .mousedown(function () {
        isMouseDown = true;
        $(this).toggleClass("highlighted"); //highlighted class 토글 방식으로 추가
        return false; // prevent text selection
      })
      .mouseover(function () {
        if (isMouseDown) {
          $(this).toggleClass("highlighted");
        }
      })
      .bind("selectstart", function () {
        return false; // prevent text selection in IE
      });

    $(document).mouseup(function () {
      isMouseDown = false;
    });
  });

  function show(id) {
    document.getElementById(id).style.display = "block";
  }

  function hide(id) {
    document.getElementById(id).style.display = "none";
  }
}
