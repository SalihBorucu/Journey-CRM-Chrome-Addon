chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.from === 'content' && msg.subject === 'showPageAction') {
        if (msg.lead) {
            var bkg = chrome.extension.getBackgroundPage();

            chrome.storage.sync.get(['accessToken'], function (result) {
                let obj = msg.lead;

                const options = {
                    method: 'POST',
                    headers: {'authorization': 'Bearer ' + result.accessToken},
                    body: JSON.stringify(obj),
                };

                fetch('http://journeycrm.test/api/incomplete-leads', options)
                    .then((response) => {
                    })
                    .then((jsonObject) => {
                    })
                    .catch((error) => {
                        bkg.console.error(`Couldn't connect to API, or authorize user.`);
                    });
            });
        }
        chrome.pageAction.show(sender.tab.id);
    }
});
