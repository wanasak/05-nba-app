import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDexF2iZCRIBWUmy_eRgFYQnWMq5meUrys",
  authDomain: "bugged-out-d7f9d.firebaseapp.com",
  databaseURL: "https://bugged-out-d7f9d.firebaseio.com",
  projectId: "bugged-out-d7f9d",
  storageBucket: "bugged-out-d7f9d.appspot.com",
  messagingSenderId: "591015233558"
};
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref("articles");
const firebaseTeams = firebaseDB.ref("teams");
const firebaseVideos = firebaseDB.ref("videos");

const firebaseLooper = snapshot => {
  let data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper
};
