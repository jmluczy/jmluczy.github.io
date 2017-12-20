var data = {
    static: {
        urlPre: "https://raw.githubusercontent.com/jmluczy/CTFasTrakCS530/static-data/",
        urlPost: "_json.txt"
    },
    realtime:{
        urlPre: "https://raw.githubusercontent.com/jmluczy/CTFasTrakCS530/real-time-data-sample/",
        urlPost: ".txt"
    }
};



/*
var data = {
    static: {
        urlPre: "https://raw.githubusercontent.com/jmluczy/CTFasTrakCS530/static-data/",
        urlPost: "_json.txt",
        routes: null,
        shapes: null,
        stops: null,
        stoptimes: null,
        trips: null,
        get: function(fileType){
            var types = ["routes", "shapes", "stops", "stoptimes", "trips"];
            var i = types.indexOf(fileType);
            switch (i){
                case -1:
                    util.update("Invalid Static File Type: " + fileType);
                    return null;
                case 0:
                    if (this.routes === null)
                        this.routes = util.request(this.urlPre + "routes" + this.urlPost);
                    return this.routes;
                case 1:
                    if (this.shapes === null)
                        this.shapes = util.request(this.urlPre + "shapes" + this.urlPost);
                    return this.shapes;
                case 2:
                    if (this.stops === null)
                        this.stops = util.request(this.urlPre + "stops" + this.urlPost);
                    return this.stops;
                case 3:
                    if (this.stoptimes === null)
                        this.stoptimes = util.request(this.urlPre + "stoptimes" + this.urlPost);
                    return this.stoptimes;
                case 4:
                    if (this.trips === null)
                        this.trips = util.request(this.urlPre + "trips" + this.urlPost);
                    return this.trips;
            }
        }
    },
    real: {
        urlPre: "https://raw.githubusercontent.com/jmluczy/CTFasTrakCS530/real-time-data-sample/",
        urlPost: ".txt",
        alerts: null,
        combined: null,
        vehiclepositions: null,
        tripupdates: null,
        get: function (fileType){
            var types = ["alerts", "combined", "vehiclepositions", "tripupdates"];
            var i = types.indexOf(fileType);
            switch(i){
                case -1:
                    util.update("Invalid Real Time File Name: " + fileType);
                    return null;
                case 0:
                    if (this.alerts === null)
                        this.alerts = util.request(this.urlPre + "alerts" + this.urlPost);
                    else if (util.time() - Number(this.alerts.header.timestamp) > 60)
                        this.alerts = util.request(this.urlPre + "alerts" + this.urlPost);
                    return this.alerts;    
                case 1:
                    if (this.combined === null)
                        this.combined = util.request(this.urlPre + "combined" + this.urlPost);
                    else if (util.time() - Number(this.combined.header.timestamp) > 60)
                        this.combined = util.request(this.urlPre + "combined" + this.urlPost);
                    return this.alerts;   
                case 2:
                    if (this.vehiclepositions === null)
                        this.vehiclepositions = util.request(this.urlPre + "vehiclepositions" + this.urlPost);
                    else if (util.time() - Number(this.vehiclepositions.header.timestamp) > 60)
                        this.vehiclepositions = util.request(this.urlPre + "vehiclepositions" + this.urlPost);
                    return this.vehiclepositions;  
                case 3:
                    if (this.tripupdates === null)
                        this.tripupdates = util.request(this.urlPre + "tripupdates" + this.urlPost);
                    else if (util.time() - Number(this.alerts.header.timestamp) > 60)
                        this.tripupdates = util.request(this.urlPre + "tripupdates" + this.urlPost);
                    return this.tripupdates;   
            }
        }
    },
};

*/
