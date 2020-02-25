const Poi = require('./app/controllers/poi-controller')


module.exports = [
    { method: 'GET', path: '/', config: Poi.index },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        }
    }
];