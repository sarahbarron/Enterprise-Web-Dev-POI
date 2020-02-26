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
    },

    addpoi:{
        handler: function(request, h) {
            const data = request.payload;
            this.poi.push(data);
            return h.redirect('/allpois');

    }
};

module.exports = Poi;