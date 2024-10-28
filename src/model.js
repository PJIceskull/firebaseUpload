import {
  getAuth,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { app } from "./firebaseConfig.js";

import * as $ from "jquery";

const auth = getAuth(app);
const storage = getStorage(app);

export function upload() {
  let file = $("#myImage").get(0).files[0];
  let fileName = +new Date() + "-" + file.name;

  let pathRef = ref(storage, "images/" + fileName);
  const storageRef = ref(storage, pathRef);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // console.log("uploading...");
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");

      //This is where we adjust the bar
      $(".bar").css("width", progress + "%");
      switch (snapshot.state) {
        case "paused":
          console.log("Uploading is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.error("error uploading file", error.code);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(function (downloadURL) {
        console.log("File available at", downloadURL);

        // Adjust bar here again
        $(".bar").css("width", 0);

        $("#myImage").val(null);
        $(".imageHolder").html(
          `<img src="${downloadURL}" alt="Upload Image" />`
        );
      });
    }
  );
}

onAuthStateChanged(auth, function (user) {
  if (user) {
    console.log("User is signed in.");
  } else {
    console.log("No user is signed in.");
  }
});

export function login() {
  signInAnonymously(auth)
    .then(function () {
      console.log("User signed in anonymously");
    })
    .catch(function (error) {
      console.error("Error Signing in", error.code);
    });
}

export function logout() {
  signOut(auth)
    .then(function () {
      console.log("User signed out");
    })
    .catch(function (error) {
      console.error("Error Signing out", error.code);
    });
}
