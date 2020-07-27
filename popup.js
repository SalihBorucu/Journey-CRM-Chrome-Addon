document.addEventListener('DOMContentLoaded', function () {
            let iframeUrl = `http://journeycrm.test/login-iframe?currentToken=null`;

            let elt = document.createElement('iframe');
            elt.id = 'auth_iframe';
            elt.src = iframeUrl;
            document.getElementsByTagName('body')[0].appendChild(elt);

            let eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
            let eventer = window[eventMethod];
            let messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

            eventer(messageEvent, function (e) {
                //if never been connected
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
        
    });
});

// function popup() {

// }
