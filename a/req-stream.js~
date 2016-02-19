
var request = require("request");
var conv    = require("./conv-link.js");

var p = console.log;

function prepare(req, res, prefix, callback){
    var prefix_re = RegExp('^' + prefix + '\/*', 'i');
    var address   = req.url.replace(prefix_re, '');

    if(address[0] === '/') address = address.slice(1);
    if(address.search(/^http/i) !== 0){
        p('add http://');
        address = "http://" + address;
    }

    p('go do_request: ', address);

    do_request(address, prefix, callback);
    //do_request(address, prefix, function(err, res1, html){
    //    if(err) return callback(err);
    //    
    //    //if(res1.headers['content-type'].search(/html/i) >= 0){
    //    //    if(res1.headers){
    //    //        u.each(res1.headers, function(value, name){
    //    //            p('to set header: ', name, value);
    //    //            res.setHeader(name, value);
    //    //        })
    //    //    }
    //    //}
    //    return callback(null, html);
    //});

}

function do_request(address, prefix, callback){
    request(address, function(err, _res, body){
        if(err) return callback(err);

        var converted = conv.convert(body, address, prefix);

        return callback(null,  _res, converted);
    });
}


module.exports.prepare = prepare;
module.exports.do_request = do_request;

if(require.main === module){
    function test2(){
        var address = "http://yahoo.com";
        var prefix = "http://localhost:3030/prox";

        do_request(address, prefix, function(err, html){
            if(err) return p(err);
            p(html.slice(0, 500));
        });
    }

    function test1(){
    }

    test2();
}
