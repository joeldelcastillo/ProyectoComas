const btn = document.getElementById("btn1");

var input = $("#input");

const timeNow = new Date();

var IP;
let apiURL = "https://ipinfo.io/json";

const getIP = async () => {
  let IPData = await fetch(apiURL).then((j) => j.json());
  console.log(IPData);
  IP = IPData;
  // {ip: "167.99.230.64", city: "North Bergen",  …}
};

getIP();

function writeData() {
  alert("to server");

  firebase.database().ref("User").set({
    name: input.val(),
    day: timeNow.toDateString(),
    hour: timeNow.getHours(),
    ip: IP.ip,
    city: IP.city,
    country: IP.country,
  });
}

btn.addEventListener("click", writeData);
