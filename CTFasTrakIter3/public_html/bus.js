var busses = {
    url: data.realtime.urlPre + "vehiclepositions" + data.realtime.urlPost,
    data: null,
    icon: "image/yellowbus.png",
    
    get: function(){
        if (this.data === null){
            this.data = util.request(this.url);
        } else if (util.time() - this.data.header.timestamp*1 > 60){  //if this data is "old"
            this.data = util.request(this.url);
        }
        return this.data;
    },
    
    displayCloseToStart: function(){
        update("function called");
        if (map.start.pos !== null)
            this.displayClose(map.start.pos, 10);
    },
    
    displayClose: function(center, r){
        util.update("in the right place");
        var data = this.get().entity;
        var pos;
        var closeBusses = [];
        for (var i = 0; i < data.length; i++){
            pos = {
                lat: data[i].vehicle.position.latitude*1,
                lng: data[i].vehicle.position.longitude*1
            };
            util.update(JSON.stringify(pos));
            if (util.distance(center, pos) < r){
                closeBusses.push(this.newMarker(data[i], pos));
            }
        }
        map.add(closeBusses);
    },
    
    newMarker(bus, pos){
        return new google.maps.Marker({
            map: theMap,
            position: pos,
            icon: this.icon
        });
    }
};


