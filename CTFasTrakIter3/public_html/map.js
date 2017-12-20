var theMap;

var map = {
    center : {lat: 41.7,lng: -72.7},
    visibles : [],
    visibleKey : 0,
    
    start : {
        marker: null,
        pos: null,
        address: null
    },
    
    end : {
        marker : null,
        pos: null,
        address: null
    },
    
    init : function(){
        theMap = new google.maps.Map(document.getElementById('map-div'),{
            zoom: 9,
            disableDefaultUI: true,
            center: this.center,
            mapTypeId: 'terrain'
        });
        this.initControls();
    },
    
    initControls : function(){
        var div = document.getElementById("user-input");
        theMap.controls[google.maps.ControlPosition.TOP_LEFT].push(div);
        div = document.getElementById("toggle-button");
        theMap.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(div);
        div = document.getElementById("directions-panel");
        //theMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(div);
    },
    
    add : function(array){
        //adds Marker to Map, stores reference in visibles so that they can be removed
        for (var i = 0; i < array.length; i++){
            this.visibles.push({
                marker: array[i],
                key: this.visibleKey
            });
        }
        this.visibleKey++;
    },
    
    remove : function(){
        var index = this.visibles[0].key;
        while(this.visibles[0].key === index){
            this.visibles[0].marker.setMap(null);
            this.visibles.shift();
        }
    },
    
    toggleUI: function(){
        var ui = document.getElementById("user-input");
        ui.style.display = ui.style.display === "none" ? "block" : "none";
    }
};
