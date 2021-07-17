const btn = document.getElementById("btn1");
var input = $("#input");

const timeNow = new Date();
var fDate = moment(timeNow).format("YYYY MM DD");
console.log(fDate);

var IP;
var numIp;
let apiURL = "https://ipinfo.io/json";
var isFirstTime = true;

//Fetch data from ipinfo.io for getting the ip from users
const getIP = async () => {
  let IPData = await fetch(apiURL).then((j) => j.json());
  console.log(IPData);
  IP = IPData;

  //Construct again the IP number replacing "." with "-"
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

//Call function one time to know if user has used the app at least once in the day
function firstTime() {
  //reference to day/ip/used data
  const dbRef = firebase.database().ref(`${fDate}/${numIp}`);
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

//function called after 1 second (it waits for the ip to be fetched)
setTimeout(firstTime, 1500);

//function that updates the used number incrementig by 1
function addUses() {
  const updates = {};
  updates[`${fDate}/${numIp}/used`] =
    firebase.database.ServerValue.increment(1);
  // updates[`user-posts/${key}/stars/${uid}`] = true;
  firebase.database().ref().update(updates);
}

//function that write data depending of user status
function writeData() {
  alert("Naciste para cambiar el mundo");

  //check if is fisrt time, then creates the data
  if (isFirstTime == true) {
    firebase.database().ref(`${fDate}/${numIp}`).set({
      city: IP.city,
      country: IP.country,
      name: input.val(),
      used: 1,
    });
    //it is not first time any more
    firstTime = false;
    console.log("No es la primera vez", firstTime);
  }
  if (isFirstTime == false) {
    //else, updates the  number of uses
    addUses();
  }
}

//handle event click with writeData function
btn.addEventListener("click", writeData);
