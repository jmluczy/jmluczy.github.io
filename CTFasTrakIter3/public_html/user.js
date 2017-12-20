/* global map, util, google, theMap */
var user = {
    getStart : function(){
        util.update("Function called");
        //var address = document.start.value;
        util.update(address);
        var geoCode = util.geoCode(address);
        if (map.start.marker !== null)
            map.start.marker.setMap(null);
        map.start.address = address;
        map.start.pos = geoCode.results[0].geometry.location;
        map.start.marker = new google.maps.Marker({
            map: theMap,
            position = geoCode.results[0].geometry.location
        });        
    },
    something: function(){
        util.update("WTF");
    }
};



function distance(pos1, pos2){  
//pos1, pos2: LatLng     NO LatLng literals
//returns distance (in miles) between the two positions entered
    var dist = google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2); //in meters
    dist = dist / 1609.34; //convert to miles
    return dist;
}
      

      
