const btn = document.getElementById("btn1");

var input = $("#input");
const timeNow = new Date();

function writeData() {
  alert("to server");
  firebase.database().ref("User").set({
    name: input.val(),
    time: timeNow.toUTCString(),
  });
}

btn.addEventListener("click", writeData);
