// Import
import * as $ from "jquery";
import { login, logout, upload } from "./model.js";

function initListeners() {
  $("#li").on("click", function () {
    // console.log("Login Button Clicked");
    login();
  });
  $("#lo").on("click", function () {
    // console.log("Logout Button Clicked");
    logout();
  });

  $("#submitBtn").on("click", function () {
    console.log("Image Submit Button Clicked");
    upload();
  });
}

$(document).ready(function () {
  initListeners();
});
