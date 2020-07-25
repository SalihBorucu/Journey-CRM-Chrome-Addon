document.addEventListener('DOMContentLoaded', function () {
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
                    if(result === 'done'){
                        console.log(result)
                    }
                        console.log(result);
                });
            })
            .catch((error) => {
                console.error(`API error: Couldn't send data over.`);
            });
    });
});
