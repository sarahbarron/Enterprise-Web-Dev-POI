'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

async function init() {
    await server.register(require('inert'));
    await server.register(require('vision'));

    // setup the paths to views, layouts and partials &
    // set the templating engine to handlebars
    server.views({
        engines: {
            hbs: require('handlebars'),
        },
        relativeTo: __dirname,
        path: './app/views',
        layoutPath: './app/views/layouts',
        partialsPath: './app/views/partials',
        layout: true,
        isCached: false,
    });

    server.route(require('./routes'));
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

init();