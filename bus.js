var busses = {
    url: data.realtime.urlPre + "vehiclepositions" + data.realtime.urlPost,
    data: null,
    icon: "image/yellowbus.png",
    
    get: function(){
        if (this.data === null){
            this.data = util.request(this.url);
        } else if ( (util.time() - this.data.header.timestamp*1) > 60){  //if this data is "old"
            this.data = util.request(this.url);
        }
        return this.data;
    },
    
    displayCloseToStart: function(){
        if (map.start.marker !== null)
            this.displayClose(map.start.pos, user.radius());
    },
    
    displayClose: function(center, r){
        var data = this.get().entity;
        var pos;
        var closeBusses = [];
        for (var i = 0; i < data.length; i++){
            pos = {
                lat: data[i].vehicle.position.latitude*1,
                lng: data[i].vehicle.position.longitude*1
            };
            if (util.distance(center, pos) < r){
                closeBusses.push(this.newMarker(data[i], pos));
            }
        }
        map.add(closeBusses);
    },
    
    newMarker: function(bus, pos){
        //add all necesarry data for listeners in marker object
        var newMarker = new google.maps.Marker({
            map: theMap,
            position: pos,
            busId: bus.id,
            tripId: bus.vehicle.trip.trip_id,
            routeId: bus.vehicle.trip.route_id,
            icon: this.icon
        });
        this.addListener(newMarker);
        return newMarker;
    },
    
    addListener: function(marker){
        marker.addListener('click', function(){
            busses.displayStopsOfBus(marker.busId, marker.tripId, marker.routeId);
        });
    },
    
    displayStopsOfBus: function (busId, tripId, routeId){
        var newStops = []; //to be added
        var tripData = data.realtime.get("tripupdates");
        //var currentTime = util.time();
        var currentTime = tripData.header.timestamp*1;
        
        tripData = tripData.entity;

        var i = 0;
        
        //find trip that matches tripId argument
        while(tripId !== tripData[i].id) i++;

        //this is the trip that we are interested in
        var trip = tripData[i].trip_update.stop_time_update;
        
        i = 0;

        //skip stops bus as already stopped at
        while (1*trip[i].departure.time < currentTime) i++;
        
        for (var j = i; j < trip.length; j++){
            var stop = stops.getByID(trip[j].stop_id);
            var pos = new google.maps.LatLng(stop.stop_lat*1, stop.stop_lon*1);
                newStops.push(stops.newMarker(stop, pos));
        }
        map.add(newStops);
    }
};
