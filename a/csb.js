var fs = require('fs');

//var inputFile  = '/tmp/man';
var inputFile  = '/tmp/cal';
var outputFile = '/tmp/man.gz';

//var readableStream = fs.createReadStream('file.txt');
var readableStream = fs.createReadStream(inputFile);


var data = '';
var chunk;

//readableStream.on('readable', function() {
//    while ((chunk=readableStream.read()) != null) {
//        data += chunk;
//    }
//});
//
//readableStream.on('end', function() {
//        console.log(data)
//});