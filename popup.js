document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['userEmail', 'userPassword'], function (result) {
        if (result.userEmail && result.userPassword) {
            document.getElementById('login-component').innerHTML = '';
            document.getElementById('login-component').innerHTML = `
                        <h1>Welcome!</h1>
                        <button class="btn btn-outline-light w-100 mb-3" id="sign-out-button">Log Out</button>`;
            document.getElementById('sign-out-button').addEventListener('click', function () {
                chrome.storage.sync.set({ userEmail: null, userPassword: null }, function () {
                    document.getElementById('login-component').innerHTML = '';
                    document.getElementById('login-component').innerHTML = `
                                        <input type="text" class="form-control mb-1" id="user-email" placeholder="example@example.com" />
                <input type="password" class="form-control mb-1" id="user-password"/>
                <button class="btn btn-outline-light w-100 mb-3" id="sign-in-button">Sign In</button>`;
                });
            });
        } else {
            document.getElementById('login-component').innerHTML = '';
            document.getElementById('login-component').innerHTML = `
                                        <input type="text" class="form-control mb-1" id="user-email" placeholder="example@example.com" />
                <input type="password" class="form-control mb-1" id="user-password"/>
                <button class="btn btn-outline-light w-100 mb-3" id="sign-in-button">Sign In</button>`;
            document.getElementById('sign-in-button').addEventListener('click', function () {
                let userEmail = document.getElementById('user-email').value;
                let userPassword = document.getElementById('user-password').value;

                const options = {
                    method: 'POST',
                    body: JSON.stringify({ userEmail, userPassword }),
                };

                fetch('http://journeycrm.test/api/login', options)
                    .then((response) => {
                        response.text().then((result) => {
                            // if (result === 'done') {
                            document.getElementById('login-component').innerHTML = '';
                            document.getElementById('login-component').innerHTML = `
                        <h1>Welcome!</h1>
                        <button class="btn btn-outline-light w-100 mb-3" id="sign-out-button">Log Out</button>`;
                            document.getElementById('sign-out-button').addEventListener('click', function () {
                                console.log('signing out');
                            });
                            chrome.storage.sync.set({ userEmail, userPassword }, function () {});
                        });
                    })
                    .catch((error) => {
                        console.error(`API error: Couldn't send data over.`);
                    });
            });
        }
    });

    document.getElementById('sign-in-button').addEventListener('click', function () {
        let userEmail = document.getElementById('user-email').value;
        let userPassword = document.getElementById('user-password').value;

        const options = {
            method: 'POST',
            body: JSON.stringify({ userEmail, userPassword }),
        };

        fetch('http://journeycrm.test/api/login', options)
            .then((response) => {
                response.text().then((result) => {
                    // if (result === 'done') {
                    document.getElementById('login-component').innerHTML = '';
                    document.getElementById('login-component').innerHTML = `
                        <h1>Welcome!</h1>
                        <button class="btn btn-outline-light w-100 mb-3" id="sign-out-button">Log Out</button>`;
                    document.getElementById('sign-out-button').addEventListener('click', function () {
                        console.log('signing out');
                    });
                    chrome.storage.sync.set({ userEmail, userPassword }, function () {});
                    // }
                    // console.log(result);
                });
            })
            .catch((error) => {
                console.error(`API error: Couldn't send data over.`);
            });
    });
});
