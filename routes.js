const Poi = require('./app/controllers/poi-ctrl')
const Accounts = require('./app/controllers/accounts-ctrl')

module.exports = [
    // Routes for authentication
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },

    // Routes for points of interest
    { method: 'GET', path: '/home', config: Poi.home },
    { method: 'GET', path: '/allpois', config: Poi.allpois},
    { method: 'POST', path: '/addpoi', config: Poi.addpoi},

    // routes for settings
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings},
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: { auth: false }
    }
];