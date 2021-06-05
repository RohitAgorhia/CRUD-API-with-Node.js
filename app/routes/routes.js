const auth = require('./../middleware/auth');

module.exports = (app) => {
    const user = require('../controllers/user.controller.js');
   

    //User Controller
        app.post('/signup', user.signup);
        app.post('/login', user.login);
        app.post('/verify', user.verify);
        app.post('/socail_signup', user.socail_signup);
        app.post('/forgot', user.forgot);
        app.post('/reset_password', user.reset_password);      

}
