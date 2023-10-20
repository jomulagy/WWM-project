var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$(document).ready(function () {
  //달력 만들기
  var curDate = new Date()
  var curYear = curDate.getFullYear();
  var curMonth = curDate.getMonth();
  $("#month-year").text(months[curMonth]+" "+curYear);
  makeCalander(curYear, curMonth);
});

//달력 만드는 함수
function makeCalander(year, month) {
 var firstDay = new Date(year, month, 1).getDay();
  var endDate = new Date(year, month + 1, 0).getDate()
  var table = $("<table>");
  for (var i = 0; i < endDate + firstDay; i++) {
    if (i % 7 === 0) {
      var newRow = $("<tr>");
      $("table").append(newRow);
    }
    var newCell = $("<td>");
    var newCellContent = $("<div>");
    if (i >= firstDay) {
      newCellContent.text(i + 1 - firstDay)
    }
    if (i % 7 == 0) {
      newCellContent.addClass("weekend")
    }
    newCell.append(newCellContent);
    newRow.append(newCell);

  }
  setEvents();
}

function setEvents(){
  $("td > div").click(function () {
    var checkStart = $(".startDate");
    var checkEnd = $(".endDate");
    if (checkStart.length !== 0 && checkEnd.length !== 0) {
      console.log(1)
      setStart(this);
    }
    else if (checkStart.length !== 0) {
      var start = parseInt($(checkStart[0]).text());
      var cur = parseInt($(this).text());
      if (cur <= start) {
        console.log(2)
        setStart(this);
      }
      else {
        console.log(3)
        $(this).addClass("endDate");
      }
    }
    else {
      console.log(4)
      setStart(this);
    }
  });
}
function setStart(elem) {
  $(".startDate").each(function(index,e){
    $(e).removeClass("startDate");
  });

  $(".endDate").each(function(index,e){
    $(e).removeClass("endDate")
  });

  $(".hovered").each(function (index, e) {
    $(e).removeClass("hovered");
  })
  $("td > div").off("mouseenter mouseleave");
  var cur = parseInt($(elem).text());
  $(elem).addClass("startDate");
  $("td > div").each(function (index, e) {
    var date = parseInt($(e).text())
    if (cur < date) {
      $(e).on("mouseenter", function () {
        if (!$(".endDate")[0]) {
          $("td > div").each(function (index, k) {
            var d = parseInt($(k).text())
            //console.log(cur,d,date,(cur < d && d < date))
            if (cur < d && d < date) {
              $(k).parent().addClass("hovered");
            }
          });
        }

      }).on("mouseleave", function () {
        if (!$(".endDate")[0]) {
          $(".hovered").each(function (index, e) {
            $(e).removeClass("hovered");
          })
        }

      }).on("clicked", function () {
        $("td > div").each(function (index, e) {
          var d = parseInt($(e).text())
          if (cur < d && d < date) {
            $(e).parent().addClass("hovered");
          }
        });
      });
    }

  });
}

function setMonth(type){
  var curYear = parseInt($("#month-year").text().match(/\d+/g)[0]);
  var curMonth = $("#month-year").text().replace(/\d+/g, '').trim();
  var curMonth = months.indexOf(curMonth);
  if(type === "prev"){
    var month;
      if(curMonth===0){
        month = 11
        curYear = curYear-1
      }
      else{
        month = curMonth-1;
      }
  }
  else{
    var month;
    if(curMonth === 12){
      month = 0
      curYear = curYear+1
    }
    else{
      month = curMonth + 1;
    } 
  }
  var trs = $("tr");
  for(var i=1;i<trs.length;i++){
    $(trs[i]).remove()
  }
  $("#month-year").text(months[month]+" "+curYear);
  makeCalander(curYear, month);
}

$(document).on('click', function(event) {
  var btn = $(".makeRoom")[0]
  var box = $(".hiddenbox")[0]
  if ($(btn).is(event.target) || $(btn).has(event.target).length !== 0){
    if(!$(".startDate")[0]){
        alert("시작 날짜를 입력해주세요.")
        return
    }
    else if(!$(".endDate")[0]){
        alert("종료 날짜를 입력해주세요.")
        return
    }
    $(box).css("display", "flex");
    document.querySelector(".total").classList.toggle("blur-effect");
  }
  else if ($(box).css("display") === "flex" && !$(box).is(event.target) && $(box).has(event.target).length === 0) {
      document.querySelector(".total").classList.toggle("blur-effect");
      $(box).css("display", "none");
  }
});
document.querySelector(".makeRoom2").addEventListener("click", function () {
  var curYear = $("#month-year").text().match(/\d+/g)[0];
  var curMonth = $("#month-year").text().replace(/\d+/g, '').trim();
  var curMonth = String(months.indexOf(curMonth)+1);
  var date = curYear + "-"+curMonth;
  $("#startdate").val(date + "-"+$($(".startDate")[0]).text());
  $("#enddate").val(date + "-" + $($(".endDate")[0]).text());
  document.getElementById("postSubmit").click();
});
