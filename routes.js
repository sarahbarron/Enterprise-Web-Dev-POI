const Poi = require('./app/controllers/poi-controller')


module.exports = [
    // signup route
    { method: 'GET', path: '/signup', config: Poi.signup },
    // login route
    { method: 'GET', path: '/login', config: Poi.login },
    // Route to home page
    { method: 'GET', path: '/', config: Poi.index },


    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                // set the path for the public folder
                path: './public'
            }
        }
    }
];