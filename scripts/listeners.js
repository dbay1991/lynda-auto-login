chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var loginUrl = 'https://www.lynda.com/portal/sip?org=lapl.org';
        if (request.action == "login-redirect" && sender.url.trim() != loginUrl) {
            chrome.tabs.update({ url: loginUrl });
        }
        sendResponse({"message":"done"});
    }
);

// Toggle Enabled/Disabled state
chrome.browserAction.onClicked.addListener(
    function(tab) {
        chrome.storage.local.get({"enabled" : false}, function(results) {
            if (results.enabled === false) {
                setEnabled();
            }
            else {
                setDisabled();
            }
        });
    }
);

// Init state
chrome.storage.local.get({"enabled" : true}, function(results) {
    if (results.enabled === true) {
        setEnabled();
    }
    else {
        setDisabled();
    }
});
function setEnabled() {
    chrome.storage.local.set({"enabled" : true});
    chrome.browserAction.setIcon("../resources/lynda-enabled.png");
    chrome.browserAction.setBadgeText({text:"On"});
}

function setDisabled() {
    chrome.storage.local.set({"enabled" : false});
    chrome.browserAction.setIcon("../resources/lynda-enabled.png");
    chrome.browserAction.setBadgeText({text:"Off"});
}
