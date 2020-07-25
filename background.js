chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.from === 'content' && msg.subject === 'showPageAction') {
        if (msg.lead) {
            var bkg = chrome.extension.getBackgroundPage();
            bkg.console.log(msg.lead);
            const options = {
                method: 'POST',
                body: JSON.stringify(msg.lead),
            };

            fetch('http://journeycrm.test/api/incomplete-leads', options)
                .then((response) => {
                    bkg.console.log(response.text());
                    bkg.console.log('done1');
                })
                .then((jsonObject) => {
                    bkg.console.log('done2');
                    bkg.console.log(jsonObject);
                })
                .catch((error) => {
                    bkg.console.error(`didn't work`);
                });
        }
        chrome.pageAction.show(sender.tab.id);
    }
});
