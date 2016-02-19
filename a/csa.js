var fs = require('fs');

//var inputFile  = '/tmp/man';
var inputFile  = '/tmp/cal';
var outputFile = '/tmp/man.gz';

//var readableStream = fs.createReadStream('file.txt');
var readableStream = fs.createReadStream(inputFile);
var data = '';

readableStream.on('data', function(chunk) {
        data+=chunk;
        setTimeout(function(){
            console.log(`one data: ${data} \n`);
        }, 2000);
});

readableStream.on('end', function() {
        console.log(data);
        console.log('on end');
});
