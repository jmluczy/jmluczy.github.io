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
    
    geoCode: function(address){
        address = address.replace(" ", "+");
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + address + '&components=state:CT&key=AIzaSyBezkqLyMpXAF9dBb4X5rZeQkyF8Y5_Te4';  
        return this.request(url);
    },
    
    time : function(){
        return Math.round((new Date()).getTime() / 1000);
    },
    
    test: function(){
        this.update(JSON.stringify(this.geoCode("ccsu")));;
    }
};