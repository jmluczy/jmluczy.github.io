var user = {
    getLocations: function(){
        this.getStart();
        this.getEnd();
    },
    
    getStart: function(){
        var address = document.input_form.start.value;
        if (address !== map.start.address){
            if (map.start.marker !== null)
                map.start.marker.setMap(null);
            var geocode = this.geocode(address);
            map.start.address = address;
            map.start.pos = geocode.results[0].geometry.location;
            map.start.marker = new google.maps.Marker({
                map: theMap,
                position: map.start.pos,
                icon: "image/green.png"
            });
        }
    },
    
    getEnd: function(){
        var address = document.input_form.end.value;
        if (address !== map.end.address){
            if (map.end.marker !== null)
                map.end.marker.setMap(null);
            var geocode = this.geocode(address);
            map.end.address = address;
            map.end.pos = geocode.results[0].geometry.location;
            map.end.marker = new google.maps.Marker({
                map: theMap,
                position: map.end.pos,
                icon: "image/red.png"
            });
        }
    },
    
    geocode: function(address){
        address = address.replace(" ", "+");
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + address + '&components=state:CT&key=AIzaSyBezkqLyMpXAF9dBb4X5rZeQkyF8Y5_Te4';  
        return util.request(url);
    }
};


