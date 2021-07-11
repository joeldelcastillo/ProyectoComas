const btn = document.getElementById("btn1");
var input = $("#input");
const timeNow = new Date();
var IP;
var numIp;
let apiURL = "https://ipinfo.io/json";
var isFirstTime;

const getIP = async () => {
  let IPData = await fetch(apiURL).then((j) => j.json());
  console.log(IPData);
  IP = IPData;
  var str = IP.ip.split(".");
  var final = "";
  for (let i = 0; i < str.length; i++) {
    if (i < str.length - 1) {
      final = final + str[i] + "-";
    } else {
      final = final + str[i];
    }
  }
  numIp = final;
  console.log(numIp);
  // {ip: "167.99.230.64", city: "North Bergen",  …}
};

getIP();

function firstTime() {
  const dbRef = firebase.database().ref(`${timeNow.toDateString()}/${numIp}`);
  dbRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        isFirstTime = false;
      } else {
        console.log("No data available");
        isFirstTime = true;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

setTimeout(firstTime, 1000);

function addUses() {
  const updates = {};
  updates[`${timeNow.toDateString()}/${numIp}/used`] =
    firebase.database.ServerValue.increment(1);
  // updates[`user-posts/${key}/stars/${uid}`] = true;
  firebase.database().ref().update(updates);
}

function writeData() {
  alert("to server");

  if (isFirstTime == true) {
    firebase.database().ref(`${timeNow.toDateString()}/${numIp}`).set({
      city: IP.city,
      country: IP.country,
      name: input.val(),
      used: 1,
    });
    firstTime = false;
  } else {
    addUses();
  }
}

btn.addEventListener("click", writeData);

// dbRef.child(`${IP.ip}`).get().then((snapshot) => {
//   if (snapshot.exists()) {
//     const updates ={};
//     updates[`${timeNow.toDateString()}/used/${IP.ip}/`] = firebase.database.ServerValue.increment(1);

//   } else {
//     console.log("No data available");

//   }
// }).catch((error) => {
//   console.error(error);
// });
