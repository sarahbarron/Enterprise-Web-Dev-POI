'use strict';

const Accounts = {
    index: {
        auth: false,
        handler: function(request, h) {
            return h.view('main', { title: 'Welcome to Points of Interest' });
        }
    },
    showSignup: {

        auth: false,
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Points of Interest' });
        }
    },
    signup: {
        auth: false,
        handler: function(request, h) {
            const user = request.payload;
            this.users[user.email] = user;
            request.cookieAuth.set({ id: user.email });
            return h.redirect('/home');
        }
    },
    showLogin: {

        auth: false,
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Points of Interest' });
        }
    },
    login: {
        auth: false,
        handler: function(request, h) {
            const user = request.payload;
            if (user.email in this.users && user.password === this.users[user.email].password) {
                request.cookieAuth.set({ id: user.email });
                return h.redirect('/home');
            }
            return h.redirect('/');
        }
    },
    logout: {
        handler: function(request, h) {
            request.cookieAuth.clear();
            return h.redirect('/');
        }
    }
};

module.exports = Accounts;