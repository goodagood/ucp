
var request = require("request");
var conv    = require("./conv-link.js");

var p = console.log;


var address = "http://yahoo.com";

function creq(address){
    if(!this.o) this.o = {};
    o.rreq = request(address, function(err, res, body){
        o.err = err, o.res = res, o.body = body;

        if(err) return callback(err);

        p(`header from ${address} : `); p(res.headers);

        p('ok start interact:');
        return p('ok')
    });
}



creq('http://yahoo.com');

if(require.main === module){
    function test2(){
        var address = "http://yahoo.com";
        var prefix = "http://localhost:3030/prox";

        creq(address, prefix, function(err, html){
            if(err) return p(err);
            p(html.slice(0, 500));
        });
    }

    function test1(){
    }

    test2();
}