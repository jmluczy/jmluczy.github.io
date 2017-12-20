
var stops = {
    url: data.static.urlPre + "stops" + data.static.urlPost,
    icon: "image/blue.png",
    data: null,
    
    get: function(){
        util.update(this.url);
        if (this.data === null)
            this.data = util.request(this.url);
        util.update(JSON.stringify(this.data));
        return data;
    },
    
    displayCloseToStart: function(){
        update("Close called");
        if (map.start.marker !== null){
            this.displayClose(map.start.pos, 4);
        }
    },
    
    displayClose(center, radius){
        var stops = this.get();
        var closeStops = [];
        var pos;
        for (var i = 0; i < stops.length; i++){
            pos = new google.maps.LatLng(stops[i].stop_lat, stops[i].stop_lon);
            if (util.distance(center, pos) < radius){
                closeStops.push(addMarker(stops[i], pos));
            }
        }
    },
    
    addMarker: function(stop, pos){
        var newMarker = new google.maps.Marker({
            map: theMap,
            position: pos,
            icon: this.icon,
            cursor: stop.stop_id
        });
        return newMarker;
    }, 
    something: function(){
        util.update("SSSSSSSSSSSSSSSSSSSSSS");
    }
};    

