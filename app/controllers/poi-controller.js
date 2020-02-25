const Poi = {
    index: {
        handler: function(request, h) {
            return h.view('main', { title: 'Welcome to Points of Information' });
        }
    },
    signup: {
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Points of Information' });
        }
    },
    login: {
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Points of Information' });
        }
    }
};

module.exports = Poi;