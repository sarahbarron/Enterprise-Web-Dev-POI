'use strict';

const Accounts = {
    index: {
        handler: function(request, h) {
            return h.view('main', { title: 'Welcome to Points of Interest' });
        }
    },
    showSignup: {
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Points of Interest' });
        }
    },
    signup: {
        handler: function(request, h) {
            return h.redirect('/home');
        }
    },
    showLogin: {
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Points of Interest' });
        }
    },
    login: {
        handler: function(request, h) {
            return h.redirect('/home');
        }
    },
    logout: {
        handler: function(request, h) {
            return h.redirect('/');
        }
    }
};

module.exports = Accounts;