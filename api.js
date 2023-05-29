const apiUrl = window.location.href;
const apiReplacedURL = apiUrl.replace('#', '&')
const apiFinalURL = new URLSearchParams(apiReplacedURL);

var api_access_token = apiFinalURL.get('access_token');

console.log(api_access_token);

getData = (random_string) => {

    fetch(
        'https://fpajmmjq2m.execute-api.us-east-1.amazonaws.com/dev/services/events', 
        {
            method: "GET", 
            headers: {
                    'auth': api_access_token
                    }
                }
    )
    .then((response) => {
        return response.text();
    })
    .then((html) => {
        document.body.innerHTML = html     
    });
}

sendData = () => {

    var api_access_token = apiFinalURL.get('id_token');

    const form = document.querySelector('form');
    const submitResponse = document.querySelector('#response');

    let data = {};
    Array.from(form).map(input => (data[input.id] = input.value));
    console.log('Sending: ', JSON.stringify(data));
    // submitResponse.innerHTML = 'Sending...'

    fetch(
        'https://fpajmmjq2m.execute-api.us-east-1.amazonaws.com/dev/services/events', 
        {
            method: "PUT",
            body: JSON.stringify({
                data
            }),
            headers: {
                'X-Forwarded-Host' : 'https://d1d0eflnejisbs.cloudfront.net/',
                'Content-Type': 'application/json',
                'auth': api_access_token
                }
        }
    )
    .then(response => response.json())
    .then(result => {
        if(result['statusCode'] == 200){
            // getData("lol");
        }else{
            // submitResponse.innerHTML = 'Error! Please try again.';
            console.log(result);
        }
     })
    .catch(error => console.log('error', error));
}