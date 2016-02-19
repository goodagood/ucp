var writestream = new stream.Stream();
writestream.writable = true;
writestream.write = function (data) {
    console.log(`received: ${data}`);
    return true;
    // true means 'yes i am ready for more data now'
    // OR return false and emit('drain') when ready later
}

writestream.end = function (data) {
   // no more writes after end
   // emit "close" (optional)
}
                
writestream.write({number: 1});


var rstream = new stream.Readable();

rstream.on('what', function(data){
    console.log(`feed back on what: ${data}`);
});

rstream.read = function (){
    if(!this.ri) this.ri = 0;
    return this.ri ++;
}

