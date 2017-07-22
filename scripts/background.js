chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "init") {
            init();
        }
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
        chrome.storage.local.get({"lapl-enabled" : false}, function(results) {
            if (results["lapl-enabled"] === false) {
                setEnabled();
            }
            else {
                setDisabled();
            }
        });
    }
);

function init() {
    // Init state
    chrome.storage.local.get({"lapl-enabled" : true}, function(results) {
        if (results["lapl-enabled"] === true) {
            setEnabled();
        }
        else {
            setDisabled();
        }
    });
}
function setEnabled() {
    chrome.storage.local.set({"lapl-enabled" : true});
    chrome.browserAction.setIcon({"path" : "../resources/lynda-enabled.png"});
}

function setDisabled() {
    chrome.storage.local.set({"lapl-enabled" : false});
    chrome.browserAction.setIcon({"path" : "../resources/lynda-disabled.png"});
}
