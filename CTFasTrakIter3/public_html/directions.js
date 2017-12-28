var directions = {
    service: null,
    renderer: null,
    travelMode: "TRANSIT",
    rendererOptions: null,
    isInit: false,
    
    init: function(){
        this.isInit = true;
        this.service = new google.maps.DirectionsService();
        this.rendererOptions = {
            map: theMap,
            panel: document.getElementById("directions-panel"),
            hideRouteList: false,
            preserveViewPort: false
        };
        this.renderer = new google.maps.DirectionsRenderer();
        this.renderer.setOptions(directions.rendererOptions);
    },
    
    request: function(){
        if (map.start.pos !== null && map.end.pos !== null){
            if (!directions.isInit){
                this.init();
            }else{
                this.clear();
            }            
            this.renderer.setOptions(this.rendererOptions);

            this.service.route({
                origin: map.start.pos,
                destination: map.end.pos,
                travelMode: this.travelMode
            }, this.display); 
        }
        
    },
    display: function(response, status){
        if (status === 'OK')
            directions.renderer.setDirections(response);
        else
            window.alert('Directions request failed due to ' + status);        
    },
    
    pushMap: function(){
       //push something on map.visibles so that ...
    },
    
    clear: function(){
        this.renderer.setMap(null);
        this.renderer.setPanel(null);
    }
};