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
        if (map.start.pos !== null){
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
                closeStops.push(this.newMarker(stops[i], pos));
            }
        }
        map.add(closeStops);
    },
    
    newMarker: function(stop, pos){
        var newMarker = new google.maps.Marker({
            map: theMap,
            position: pos,
            icon: this.icon
        });
        this.addListener(newMarker);
        return newMarker;
    }, 
    
    addListener: function(marker){
        var pos = marker.position;
        marker.addListener('click', function(){
            places.displayClose(pos, 3000);
        });
    },
    
    getByID: function(id){
        var stops = this.get();
        var lo = 0;
        var hi = stops.length-1;
        var mid;
        while (lo <= hi){
            mid = Math.floor((lo+hi)/2);
            if (id === stops[mid].stop_id)
                return stops[mid];
            if (id < stops[mid].stop_id)
                hi = mid - 1;
            else
                lo = mid + 1;
        }        
    }
};    

