const REDIRECT_ACTION = 'login-redirect';

chrome.storage.local.get({"enabled" : true}, function(results) {
    if (results.enabled === true && !loggedIn()) {
        if (!onLoginPage()) {
            chrome.runtime.sendMessage({"action" : REDIRECT_ACTION});
        }
        else {
            login();
        }
    }
});

function loggedIn() {
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)LyndaLoginStatus\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    return cookieValue == 'Member-Logged-In';
}

function onLoginPage() {
   return window.location.href == 'https://www.lynda.com/portal/sip?org=lapl.org'; 
}

function login() {
    var login = document.getElementById('card-number');
    var pin = document.getElementById('card-pin');
    var form = document.getElementById('patron-form');

    login.value = '';
    pin.value = '';
    form.submit();
}
