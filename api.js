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
    .then(response => response.text())
    .then(html => {
        console.log(html);
        document.body.innerHTML = html;
    })
    .catch(error => {
        console.error("Error: ", error);
    })
}

// sendData = () => {

//     const form = document.querySelector('form');
//     const submitResponse = document.querySelector('#response');

//     let data = {};
//     Array.from(form).map(input => (data[input.id] = input.value));
//     console.log('Sending: ', JSON.stringify(data));
//     submitResponse.innerHTML = 'Sending...'

//     fetch(
//         'https://fpajmmjq2m.execute-api.us-east-1.amazonaws.com/dev/services/events-post', 
//         {
//             method: "POST",
//             body: JSON.stringify({
//                 data
//             }),
//             headers: {
//                 'Content-Type': 'application/json',
//                 }
//         }
//     )
//     .then(response => response.json())
//     .then(result => {
//         if(result['statusCode'] == 200){
//             form.reset();
//             submitResponse.innerHTML = 'Form submitted. Success!';
//         }else{
//             submitResponse.innerHTML = 'Error! Please try again.';
//         }
//      })
//     .catch(error => console.log('error', error));
// }