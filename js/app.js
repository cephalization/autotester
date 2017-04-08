// Google gapi functionality
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  window.location.href = 'dashboard';
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
       console.log('user signed out');
       window.location.href = 'index';
    });
}

var auth = gapi.auth2.getAuthInstance();
if (auth) {
    console.log('user is signed in!');
} else {
    console.log('user is no longer signed in!');
}

// Angular declarations
var mainApp = angular.module("mainApp", []);
mainApp.controller("mainCtrl", function($scope){
    $scope.test = "This signifies that angular is working!";
});
