const btn = document.getElementById("btn1");
var input = $("#input");
const timeNow = new Date();
var IP;
let apiURL = "https://ipinfo.io/json";
var isFirstTime;

const getIP = async () => {
  let IPData = await fetch(apiURL).then((j) => j.json());
  console.log(IPData);
  IP = IPData;
  // {ip: "167.99.230.64", city: "North Bergen",  …}
};

getIP();

function firstTime() {
  const dbRef = firebase.database().ref(`${timeNow.toDateString()}/178958`);
  dbRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

isFirstTime = firstTime();
console.log(isFirstTime);

function addUses() {
  const updates = {};
  updates[`${timeNow.toDateString()}/178958/used`] =
    firebase.database.ServerValue.increment(1);
  // updates[`user-posts/${key}/stars/${uid}`] = true;
  firebase.database().ref().update(updates);
}

function writeData() {
  alert("to server");

  if (isFirstTime == true) {
    firebase.database().ref(`${timeNow.toDateString()}/178958`).set({
      // ip: IP.ip,
      // city: IP.city,
      // country: IP.country,
      country: "ecuador",
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
