function(properties, context) {


const SITE_KEY = context.keys.site_key;
const SECRET_KEY = context.keys.secret_key;
const TOKEN = properties.token;

fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${TOKEN}`, {
  method: 'POST'
})
  .then(response => response.json())
  .then(data => {
    if (data.success && data.score >= 0.5 && data.action === 'your_action_name') {
      console.log('reCAPTCHA verification successful');
      // take appropriate action
    } else {
      console.log('reCAPTCHA verification failed');
      // handle the error
    }
  })
  .catch(error => console.error('Error occurred:', error));



}