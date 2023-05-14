function(instance, context) {
    
    const SITE_KEY = context.keys.site_key;
    
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.onload = function() {
        // create button element
        const button = document.createElement('button');
        button.className = 'g-recaptcha';
        button.setAttribute('data-sitekey', SITE_KEY);

        // append button to the end of the body
        document.body.appendChild(button);

        grecaptcha.ready(function() {
            grecaptcha.execute(SITE_KEY, {action: 'submit'}).then(function(token) {
                instance.publishState('token',token);
                instance.triggerEvent('token_retrieved');
            });
        });
	};
    document.body.appendChild(script);
}