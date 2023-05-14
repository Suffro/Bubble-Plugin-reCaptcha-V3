function(properties, context) {

	const fetch = require('node-fetch');
    
    const SITE_KEY = context.keys.site_key;
    const SECRET_KEY = context.keys.secret_key;
    const TOKEN = properties.token;
    
    return fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${TOKEN}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success && data.score >= 0.5 && data.action === 'submit') {
          return({
    		valid: true,
            response: JSON.stringify({...data, token: TOKEN})
          })
        } else {
          return({
              valid: false,
              response: JSON.stringify({...data, token: TOKEN})
			})
        }
      })
      .catch(error => {
    	return({
    		valid: false,
            response: JSON.stringify({token: TOKEN})
		})
    });

}