var connect = require('connect');
var http = require('http');

var app = connect();
var p   = console.log;

// gzip/deflate outgoing responses
//var compression = require('compression');
//app.use(compression());
//
//// store session state in browser cookie
//var cookieSession = require('cookie-session');
//app.use(cookieSession({
//    keys: ['secret1', 'secret2']
//}));
//
//// parse urlencoded request bodies into req.body
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded());



var request = require("request");

var conv    = require("./conv-link.js");
var fetch   = require("./fetch.js");


app.use('/prox', function simple_fetch(req, res, next) {
    p('in /prox');
    if(!this.oo) this.oo = {};
    oo.req = req;
    oo.res = res;

    fetch.proxy(req, res, 'http://localhost:3030/prox', function(err, _res, html){
        if(err) return res.end(err.toString());

        oo.err  = err;
        oo.r    = _res;
        oo.html = html;
        //res.end(html);
        //next();

        res.end('no for browser');
        //_res.pipe(res);
        //_res.resume();
    });
    
    //res.end('url: ' + req.url);
});


var sreq = require("./req-stream.js");

var o = {};
function prepare(req, res, prefix, callback){
    var prefix_re = RegExp('^' + prefix, 'i');
    var address   = req.url.replace(prefix_re, '');

    if(address[0] === '/') address = address.slice(1);
    if(address.search(/^http/i) !== 0){
        p('add http://');
        address = "http://" + address;
    }

    p('go do_request: ', address);
    o.address = address;

    do_request(res, address, prefix, callback);
}

function do_request(res, address, prefix, callback){
    var can_we_use_pipe = request(address, function(err, _res, body){
        o.err = err, o.r = _res, o.rbody = body;
        if(err) return callback(err);

        p(_res.readable, ' _res readable');
        p(can_we_use_pipe.readable, ' can_we_use_pipe readable');
        p('_res headers : ', _res.headers);
        p('is html: ', is_html(_res.headers));

        if(is_html(_res.headers)){
            var converted = conv.convert(body, address, prefix);
            o.body = converted;

            res.setHeader('content-type', 'text/html; charset=utf-8');
            res.setHeader('content-length', body.length);
            res.write(converted);
            res.end();
            return callback(null,  null);
        }else{
            request(address).pipe(res);
            callback(null, null);
        }
    });
}


function is_html(headers){
    if(!headers) return false;

    if (!headers['content-type'])     return false;

    var conttype = headers['content-type'];
    if (typeof conttype !== 'string') return false;

    if ( conttype.search(/text\/html/i) >= 0) {
        return true;
    }

    return false;
}

function requestHandler(req, res) {
    var writeHead = res.writeHead, write = res.write, end = res.end;

    res.writeHead = function(status, reason, headers) {
        // something went wrong; abort
        if (res.headersSent) return req.socket.destroy(); 

        if (typeof reason == 'object') headers = reason;
        headers = headers || {};
        res.headers = headers;

        // no content-type?
        if (!headers['content-type'])     return req.socket.destroy();

        var conttype = headers['content-type'];
        if (typeof conttype !== 'string') return req.socket.destroy();

        if (! conttype.search(/text\/html/i) >= 0) {
            // we should not do non html
            // how to pipe it?
            return writeHead.call(res, status, headers);
        }

        // we should only fiddle with HTML responses

        // since we buffer the entire response, we'll send a proper Content-Length later with no Transfer-Encoding.
        delete headers['transfer-encoding']; 

        var buf = new Buffer();
        res.write = function(data, encoding) {
            // append raw buffer
            if (Buffer.isBuffer(data)) buf = Buffer.concat([buf, data]); 
            // append string with optional character encoding (default utf8)
            else buf = Buffer.concat([buf, new Buffer(data, encoding)]); 

            // sanity check: if the response is huge, bail.
            if (buf.length > 10 * 1024 * 1024) error('Document too large'); 
            // ...we don't want to let someone bring down the server by filling up all our RAM.
        }

        p('change res.end');
        res.end = function(data, encoding) {
            if (data) res.write(data, encoding);

            //var $ = cheerio.load(buf.toString());

            //// This is where we can modify the response.  For example,
            //$('body').append('<p>Hi mom!</p>');

            // we have to convert back to a buffer
            // so that we can get the *byte count* (rather than character count) of the body
            buf = new Buffer($.html()); 

            // JS always deals in UTF-8.
            res.headers['content-type'] = 'text/html; charset=utf-8';
            res.headers['content-length'] = buf.length;

            // Finally, send the modified response out using the real `writeHead`/`end`:
            writeHead.call(res, status, res.headers);
            end.call(res, buf);
        }


    }

}


app.use('/req-stream', function simple_fetch(req, res, next) {
    p('in /req-stream');
    if(!this.o) this.o = {};
    o.req = req;
    o.res = res;

    var prefix = 'http://localhost:3030/req-stream/';
    o.prefix = prefix;

    prepare(req, res, prefix, function(err, reqres, body){
        if(err) return res.end('err ' + err.toString());

        ////res.headers['content-type'] = 'text/html; charset=utf-8';
        ////res.headers['content-length'] = body.length;
        //res.setHeader('content-type', 'text/html; charset=utf-8');
        //res.setHeader('content-length', body.length);
        //res.end(body);
        p('callback from prepare');
    });
    //?
    //sreq.fetch(req).pipe(res);
});

function toola(req, res, body){
    requestHandler(req, res);
    res.end(body, 'utf-8');
}

app.use('/foo', function(req, res){
    if(!this.foo) this.foo = {};
    foo.req = req, foo.res = res;
    //res.end('Hello from Connect!\n' + Date().toString());
});

//create node.js http server and listen on port
// var srv = http.createServer(app).listen(3030);
var srv;
function dosrv(){
    srv = http.createServer(app).listen(3030);
    // var srv = http.createServer(app).listen(3030);
}
dosrv();
p('ok start interact:');
