var util = {
    request : function(url){
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send(null);        
        if(req.status === 200){
            //update(req.responseText);
            return JSON.parse(req.responseText);
        }else{
            update("null returned");
            return null;
        }
    },
    
    update: function(message){
    //only purpose of this method is to aid in tracing. 
    //prints the argument message at the bottom of the webpage.
        var text = document.getElementById("testing").innerHTML;
        text = text + "<br>" + message;
        document.getElementById("testing").innerHTML = text;
    }, 
    
    time : function(){
        return Math.round((new Date()).getTime() / 1000);
    },
    
    distance: function(pos1, pos2){
    //pos1, pos2 MUST be LatLng objects    NO LatLng literals!
    //returns distance in miles.
        var dist = google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2); //in meters
        dist = dist / 1609.34; //convert to miles
        return dist;       
    },
    
    test: function(){
        this.update("sssssssssss");
    }
};