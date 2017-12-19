/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var theMap;
var centerLatLng;

function initMap(){
    map.init();
    map.initControls();
}

var map = {
    init : function(){
        centerLatLng = new google.maps.LatLng(41.7, -72.7);
        theMap = new google.maps.Map(document.getElementById('map-div'),{
            zoom: 9,
            disableDefaultUI: true,
            center: centerLatLng,
            mapTypeId: 'terrain'
        });
    },
    
    initControls : function(){
        var div = document.getElementById("user-input");
        theMap.controls[google.maps.ControlPosition.TOP_LEFT].push(div);
        div = document.getElementById("toggle-button");
        theMap.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(div);
        div = document.getElementById("directions-panel");
        //theMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(div);
    },
    
    toggleUI : function(){
        var ui = document.getElementById("user-input");
        ui.style.display = ui.style.display === "none" ? "block" : "none";
    }
};

function toggleUI(){
    var ui = document.getElementById("user-input");
    ui.style.display = ui.style.display === "none" ? "block" : "none";
}


