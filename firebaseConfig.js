import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMHUy8j1vyYoMMUOVwU4rAgcZxgvyCung",
  authDomain: "senai-spotify.firebaseapp.com",
  databaseURL: "https://senai-spotify-default-rtdb.firebaseio.com",
  projectId: "senai-spotify",
  storageBucket: "senai-spotify.firebasestorage.app",
  messagingSenderId: "206791215454",
  appId: "1:206791215454:web:ffafd414a11a1fd7e327cf",
  measurementId: "G-RSP2286D0N"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };