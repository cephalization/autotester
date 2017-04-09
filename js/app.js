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


var auth2; // The Sign-In object.
var googleUser; // The current user.

/**
 *  * Calls startAuth after Sign in V2 finishes setting up.
 *   */
window.appStart = function () {
    gapi.load('auth2', initSigninV2);
};

/**
 *  * Initializes Signin v2 and sets up listeners.
 *   */
var initSigninV2 = function() {
    auth2 = gapi.auth2.init({
        client_id: '1066733352092-ctl742vq5g703nlugmvhugfdrfo1egr8.apps.googleusercontent.com',
        scope: 'profile'
    });

    // Listen for sign-in state changes.
        auth2.isSignedIn.listen(signinChanged);

    // Listen for changes to current user.
    auth2.currentUser.listen(userChanged);

    // Sign in the user if they are currently signed in.
    if (auth2.isSignedIn.get() == true) {
        auth2.signIn();
    }

    // Start with the current live values.
    refreshValues();
};

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function (val) {
    console.log('Signin state changed to ', val);
    if (!val) {
        window.location.href='index';
    }
};

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
var userChanged = function (user) {
    var profile = user.getBasicProfile();
    console.log('User now: ', profile);
    document.getElementById('curr-user').innerText = profile.getGivenName();
};

/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
var refreshValues = function() {
    if (auth2){
        console.log('Refreshing values...');

        googleUser = auth2.currentUser.get();

        console.log(JSON.stringify(googleUser, undefined, 2));
    }
}

// Angular declarations
var mainApp = angular.module("mainApp", []);
mainApp.controller("mainCtrl", function($scope){
    $scope.test = "This signifies that angular is working!";
});
