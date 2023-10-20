function change_wheremeet() {
    // 토글 할 버튼 선택 (btn1)
    const wheremeet = document.getElementById("wheremeet_display");
    const whenmeet = document.getElementById("whenmeet_display");

    // btn1 숨기기 (display: none)
    if (wheremeet.style.display !== "none") {
      wheremeet.style.display = "none";
      whenmeet.style.display = "block";
    }
    // btn` 보이기 (display: block)
    else {
      wheremeet.style.display = "block";
      whenmeet_display.style.display = "none";
    }
  }

  function change_wheremmet() {
    // 토글 할 버튼 선택 (btn1)
    const wheremeet = document.getElementById("wheremeet_display");
    const whenmeet = document.getElementById("whenmeet_display");

    // btn1 숨기기 (display: none)
    if (whenmeet.style.display !== "none") {
      whenmeet.style.display = "none";
      wheremeet.style.display = "block";
    }
    // btn` 보이기 (display: block)
    else {
      whenmeet.style.display = "block";
      wheremeet.style.display = "none";
    }
  }