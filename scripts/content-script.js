const REDIRECT_ACTION = 'login-redirect';
const INIT = 'init';

chrome.storage.local.get({"lapl-enabled" : true}, function(results) {
    chrome.runtime.sendMessage({"action" : INIT});
    if (results["lapl-enabled"] === true && !loggedIn()) {
        if (!onLoginPage()) {
            chrome.runtime.sendMessage({"action" : REDIRECT_ACTION});
        }
        else if (!loginFailed()) {
            login();
        }
    }
});

function loggedIn() {
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)LyndaLoginStatus\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    return cookieValue == 'Member-Logged-In';
}

function onLoginPage() {
   return window.location.href.startsWith('https://www.lynda.com/portal/sip?org=lapl.org');
}

function login() {
    var login = '';
    var pin = '';

    if (!login || !pin) {
        return;
    }

    var loginInput = document.getElementById('card-number');
    var pinInput = document.getElementById('card-pin');
    var form = document.getElementById('patron-form');

    loginInput.value = login;
    pinInput.value = pin;
    form.submit();
}

function loginFailed() {
    var url = new URL(window.location.href);
    return (url.searchParams.get("authfail") == "true") ? true : false;
}
