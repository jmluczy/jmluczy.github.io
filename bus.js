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


//========================================================================
      //                           BUSSES
      //========================================================================
      function displayAllBusses(){
      //might not be the best way to display all busses
      //radius=75 is quite arbitrary
        displayCloseBusses(centerLatLng, 75);
      }
		
      function displayCloseBussesToStart(){
      //executed when 'display close busses' button is pushed
      //diplays all busses within 'radius' miles of the 'start' location
      //'radius' is the user enterd radius
      //'start' is the LatLng of the user entered start location
        displayCloseBusses(new google.maps.LatLng(start.position), getRadius());
      }
		
      function displayCloseBusses(center, r){
      //displays all busses that are within 'r' miles of 'center'
      //center: LatLng 
      //r: a number
        var data = readRealTimeData(1).entity;
        var pos;
        for (var i = 0; i < data.length; i++){
          pos = new google.maps.LatLng(data[i].vehicle.position.latitude*1, 
                                       data[i].vehicle.position.longitude*1);
          if (distance(center, pos) < r){
            addBusMarker(data[i], pos, mapVisibleKey);
          }                    
        }
        mapVisibleKey++;
      }
                
      function addBusMarker(bus, pos, _key){
      //bus: JSON object, element of the vehicle positions live feed array
      //pos: LatLng, the bus's position as a LatLng object
      //displays the bus with a marker
      //adds a listener to the marker so that when clicked, bus stops that this 
      //bus will stop at are displayd with markers
        newMarker = new google.maps.Marker({
          map: theMap,
          position: pos,
          busId: bus.id,
          tripId: bus.vehicle.trip.trip_id,
          routeId: bus.vehicle.trip.route_id,
          //title: bus.id,
          icon: "http://maps.google.com/mapfiles/ms/icons/bus.png"
        });
        mapVisible.push({key: _key, marker: newMarker});

        newMarker.addListener('click', function(){
        //I know this is messy, fix this soon
          var busStop, trip, pos;
          var id = this.tripId;   //tripId of the Marker that was clicked
          var tripData = readRealTimeData(0).entity;
          var i = 0;
          //find the trip update that matches the trip id of the clicked bus
          while (id !== tripData[i].id) 
            i++; 

          //this is the trip update we are interested in
          trip = tripData[i].trip_update.stop_time_update;
          i = 0;
          //skip the stops in this trip that the bus has already visited at
          var currentTime = util.time();
          util.update(currentTime + "");
          while (trip[i].departure < currentTime) {
              i++;
              util.update("Departure time: " + trip[i].departure);
          }

          //for each bus stop remaining, add a marker to display it
          for (var j = i; j < trip.length; j++){
            busStop = getStopDataById(trip[j].stop_id);
            pos = new google.maps.LatLng(busStop.stop_lat*1, busStop.stop_lon*1);
            addStopMarker(busStop, pos);
          }
        });
      }