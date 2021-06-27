const btn = document.getElementById("btn1");

var input = $("#input");

const timeNow = new Date();

var IP;
let apiURL = "https://ipinfo.io/json";

const getIP = async () => {
  let IPData = await fetch(apiURL).then((j) => j.json());
  console.log(IPData.ip);
  IP = IPData.ip;
  // {ip: "167.99.230.64", city: "North Bergen",  …}
};

getIP();

function writeData() {
  alert("to server");

  firebase.database().ref("User").set({
    name: input.val(),
    time: timeNow.toDateString(),
    ip: IP,
  });
}

btn.addEventListener("click", writeData);
