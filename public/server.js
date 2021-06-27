document.addEventListener("DOMContentLoaded", function () {
  const loadEl = document.querySelector("#load");

  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.firestore().doc('/foo/bar').get().then(() => { });
  // firebase.functions().httpsCallable('yourFunction')().then(() => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  // firebase.analytics(); // call to activate
  // firebase.analytics().logEvent('tutorial_completed');
  // firebase.performance(); // call to activate
  //

  try {
    let app = firebase.app();
    let features = [
      "auth",
      "database",
      "firestore",
      "functions",
      "messaging",
      "storage",
      "analytics",
      "remoteConfig",
      "performance",
    ].filter((feature) => typeof app[feature] === "function");
    loadEl.textContent = `Firebase SDK loaded with ${features.join(", ")}`;
  } catch (e) {
    console.error(e);
    loadEl.textContent = "Error loading the Firebase SDK, check the console.";
  }
});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyC31-3bbWviCAbahXzDyAhidHBMKEFA_Q0",
  authDomain: "comas-dc34a.firebaseapp.com",
  databaseURL: "https://comas-dc34a-default-rtdb.firebaseio.com",
  projectId: "comas-dc34a",
  storageBucket: "comas-dc34a.appspot.com",
  messagingSenderId: "399418704280",
  appId: "1:399418704280:web:9c8fce2b671be40838ebed",
  measurementId: "G-JS7JZ1V2Q7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
