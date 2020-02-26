const Poi = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Points of Interest' });
        }
    },
    allpois: {
        handler: function(request, h) {
            return h.view('allpois', { title: 'All created POIs' });
        }
    }
};

module.exports = Poi;