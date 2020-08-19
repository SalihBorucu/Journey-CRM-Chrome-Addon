chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.from === 'content' && msg.subject === 'showPageAction') {
        if (msg.lead) {
            var bkg = chrome.extension.getBackgroundPage();

            chrome.storage.sync.get(['accessToken'], function (result) {
                let obj = msg.lead;

                const options = {
                    method: 'POST',
                    headers: { authorization: 'Bearer ' + result.accessToken },
                    body: JSON.stringify(obj),
                };

                fetch('https://journey-crm.salihborucu.com/api/incomplete-leads', options)
                    .then((response) => {
                        return response.text();
                    })
                    .then((textReponse) => {
                        if (textReponse !== 'done') {
                            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, { action: 'API error' });
                            });
                            return;
                        }
                        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                            chrome.tabs.sendMessage(tabs[0].id, { action: 'Successful' });
                        });
                    })
                    .catch(() => {
                        bkg.console.error(`Couldn't connect to API, or authorize user.`);
                    });
            });
        }
        chrome.pageAction.show(sender.tab.id);
    }
});

//To alert content that the page has changed
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        chrome.tabs.sendMessage(tabId, {
            message: 'changed',
            url: changeInfo.url,
        });
    }
});