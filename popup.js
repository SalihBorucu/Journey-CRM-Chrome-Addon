document.addEventListener('DOMContentLoaded', function () {

    function something(){
        console.log('lololo')
    }
    let iframeUrl = `http://journeycrm.test/login-iframe`;

    chrome.storage.sync.get(['accessToken', 'user'], function (result) {
        const options = {
            method: 'GET',
            headers: { authorization: 'Bearer ' + result.accessToken },
        };

        fetch('http://journeycrm.test/api/login-iframe', options)
            .then((response) => {
                return response.text().then((textResponse) => {
                    if (textResponse !== 'done') {
                        createNewToken();
                        return;
                    }
                    document.getElementById('login-component').innerHTML = `
                        <h4 style="text-align: center;">Welcome</h4>
                        <hr>
                        <h4><strong>${result.user.name}</strong></h4>
                        `;
                });
            })
            .catch((error) => {});

        function createNewToken() {
            let elt = document.createElement('iframe');
            elt.id = 'auth_iframe';
            elt.src = iframeUrl;
            document.getElementsByTagName('body')[0].appendChild(elt);

            let eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';

            let eventer = window[eventMethod];
            let messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

            eventer(messageEvent, function (e) {
                //if not signed in
                if (e.data.connectStatus !== 'connected') {
                    window.open('http://journeycrm.test/login');
                    console.error('not logged in');
                    return;
                }
                let user = JSON.parse(e.data.user);
                let accessToken = e.data.accessToken;
                chrome.storage.sync.set({ accessToken, user }, function () {});
                document.getElementById('login-component').innerHTML = `
                                                        <h4 style="text-align: center;">Welcome</h4>
                                                        <hr>
                                                        <h4><strong>${user.name}</strong></h4>
                                                        `;
            });
        }
    });
});


