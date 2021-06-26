// var v = document.getElementById("input");
// var output = document.getElementById("output");

// function addComas() {
//   output.innerHTML = v;
//   console.log(v);
// }

var output = $("#output");
$(document).ready(function () {
  // Get value on button click and show alert
  $("#btn1").click(function () {
    var str = $("#input").val().split(" ");
    var final = "";
    for (let i = 0; i < str.length; i++) {
      if (i < str.length - 1) {
        final = final + str[i] + ", ";
      } else {
        final = final + str[i];
      }
    }

    output.html(final);
  });
});
