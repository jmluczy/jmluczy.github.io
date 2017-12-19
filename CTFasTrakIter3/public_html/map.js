/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var map;



var map = {
    center : null,
    visibles : [],
    visibleKey : 0,
    start : {
        pos: null
    },
    end : {
        pos: null
    },
    
    init : function(){
        this.center = new google.maps.LatLng(41.7, -72.7);
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
    
    addMarker : function(array){
        //adds Marker to Map, stores reference in visibles so that they can be removed
        var newMarker;
        for (var i = 0; i < array.length; i++){
            newMarker = new google.maps.Marker({
                map: theMap,
                position: new google.maps.LatLng(array[i].lat, arra[i].lng),
            });
            this.visibles.push({
                object: newMarker,
                key: this.visibleKey
            });
        }
        visibleKey++;
    },
    
    remove : function(){
        var index = this.visibles[0].key;
        while(this.visibles[0].key === index){
            this.visibles[0].object.setMap(null);
            this.visibles.shift();
        }
    }    
};

function toggleUI(){
    var ui = document.getElementById("user-input");
    ui.style.display = ui.style.display === "none" ? "block" : "none";
}


