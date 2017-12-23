var shapes = {
    data: null,
    
    get: function(){
        if (this.data === null){
            var url = data.static.urlPre + "shapes" + data.static.urlPost;
            this.data = util.request(url);
        }
        return this.data;        
    }, 
    
    clearData: function(){
        this.data = null;
    }
};
