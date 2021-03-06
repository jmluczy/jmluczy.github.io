var places = {
    type: "restaurant",
    icon: "image/orange.png",
    //infowindow: null,
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
        //Place all data needed for listeners in the marker object
        var newMarker = new google.maps.Marker({
            map: theMap,
            position: place.geometry.location,
            icon: places.icon,
            name: place.name  //for listener
        }); 
        this.addListener(newMarker);     
        return newMarker;
    },
    
    addListener: function (marker){
        marker.addListener('click', function(){
            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(marker.name);
            infoWindow.open(theMap, marker);
        });
    }
};