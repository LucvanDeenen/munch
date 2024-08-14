const customHeaders = {
    'User-Agent': 'Appie/8.22.3',
    'Content-Type': 'application/json',
    'X-Application': 'AHWEBSHOP',
    'Authorization': 'Bearer 323923742_fc3-465f-a223-14af00d8d8e6',
}

const clientDetails = {
    'clientId': 'appie'
}

export const authenticate = () => {
    fetch("https://api.ah.nl/mobile-auth/v1/auth/token/anonymous", {
        method: 'POST',
        headers: customHeaders,
        body: JSON.stringify(clientDetails),
    })
        .then(body => body.text())
        .then(text => JSON.parse(text))
        .then(result => {
            customHeaders['Authorization'] = 'Bearer ' + result['access_token']
        })
        .catch(error => {
            console.error(error);
        });

    fetch('https://api.ah.nl/mobile-services/product/search/v2', {
        method: 'GET',
        headers: customHeaders,
    })
        .then(body => body.text())
        .then(text => JSON.parse(text))
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
}