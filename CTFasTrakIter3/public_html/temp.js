function update(message){
//only purpose of this method is to aid in tracing. 
//prints the argument message at the bottom of the webpage.
    var text = document.getElementById("testing").innerHTML;
    text = text + "<br>" + message;
    document.getElementById("testing").innerHTML = text;
}

