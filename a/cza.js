
<!-- oo, what this line

const zlib = require("zlib");
const gzip = zlib.createGzip();
const fs = require('fs');

var inputFile  = '/tmp/man';
var outputFile = '/tmp/man.gz';

const inp = fs.createReadStream(inputFile);
const out = fs.createWriteStream(outputFile);

inp.pipe(gzip).pipe(out);

// -->
