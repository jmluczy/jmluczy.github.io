var stops = {
    url: data.static.urlPre + "stops" + data.static.urlPost,
    icon: "image/blue.png",
    data: null,
    
    get: function(){
        if (this.data === null)
            this.data = util.request(this.url);
        return this.data;
    },
    
    displayCloseToStart: function(){
        if (map.start.marker !== null){
            this.displayClose(map.start.pos, 4);
        }
    },
    
    displayClose(center, radius){
        var stops = this.get();
        var closeStops = [];
        var pos;
        for (var i = 0; i < stops.length; i++){
            pos = new google.maps.LatLng(stops[i].stop_lat*1, stops[i].stop_lon*1);
            if (util.distance(center, pos) < radius){
                closeStops.push(this.addMarker(stops[i], pos));
            }
        }
        map.add(closeStops);
    },
    
    addMarker: function(stop, pos){
        var newMarker = new google.maps.Marker({
            map: theMap,
            position: pos,
            icon: this.icon
        });
        return newMarker;
    }, 
    
    something: function(){
        util.update("SSSSSSSSSSSSSSSSSSSSSS");
    }
};    

