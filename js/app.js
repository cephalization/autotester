// Google gapi functionality
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var email = profile.getEmail();

    // Reject the user if they are not a student in the database
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            var response = JSON.parse(this.response);
            if (response.success && response.exists) {
                // Create a cookie for the user
                // Create the expiration date of 10 days
                var date = new Date();
                date.setTime(date.getTime() + (10*24*60*60*1000));
                document.cookie = "username="+email+";expires="+date.toUTCString()+";path=/;";
                window.location.href = 'dashboard';
            } else {
                alert(response.message);
                signOut();
            }
        }
    }
    request.open('POST', 'php/checkSignIn.php', true);
    request.send(JSON.stringify({email:email}));
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('user signed out');
        var d = new Date();
        d = d.toUTCString();
        document.cookie = "username=;expires="+d+";path=/;";
        window.location.href = 'index';
    });
}

window.googleSignOut = signOut;

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
    console.log('the user is signed in:', auth2.isSignedIn.get());
    auth2.isSignedIn.listen(signinChanged);

    // Listen for changes to current user.
    auth2.currentUser.listen(userChanged);

    // Sign in the user if they are currently signed in.
    if (auth2.isSignedIn.get() == true) {
        auth2.signIn();
    }
    // else {
    //  if (window.location.pathname.split('/')[2] != 'index') {
    //     window.location.href = 'index';
    // }
    //}
    //
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
        if (googleUser != null && googleUser.isSignedIn()) {
            console.log(JSON.stringify(googleUser, undefined, 2));
        }
    }
}

// Angular declarations
var mainApp = angular.module("mainApp", ['ngCookies']);
