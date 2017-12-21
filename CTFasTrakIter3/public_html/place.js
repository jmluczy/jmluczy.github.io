var places = {
    type: "restaurant",
    icon: "image/orange.png",
    infoWindow: null,
    service: null,
    
    
    displayCloseToStart: function(){
        this.displayClose(map.start.pos, 2000);
    },
    
    displayClose(center, r){
        if (this.service === null)
            this.service = new google.maps.places.PlacesService(theMap);
        this.service.nearbySearch(
             {
                location: center,
                radius: r,
                type: this.type
             },this.addMarkers
        );
    },
    
    addMarkers: function(results, status){
        //executed as a callback, 'this' reference is unreliable
        if (status === google.maps.places.PlacesServiceStatus.OK){
            var closePlaces = [];
            for (var i = 0; i < results.length; i++){
                closePlaces.push(places.newMarker(results[i]));  //
            }
            map.add(closePlaces);
        }
    },
    
    newMarker: function(place){
        var newMarker = new google.maps.Marker({
            map: theMap,
            position: place.geometry.location,
            icon: places.icon,
            name: place.name
        }); 
        util.update(JSON.stringify(place) + "\n");
        newMarker.addListener('click', function(){
            infowindow = new google.maps.InfoWindow();
            infowindow.setContent(place.name);
            infowindow.open(theMap, this);
        });
        //google.maps.event.addListener(newMarker, 'click', onClick(place.name, newMarker.position));
        return newMarker;
    },
    
    onClick: function(marker){
        var window = new google.maps.InfoWindow();
        window.setContent(this.name);
        window.open(theMap, this.position);
    }
};