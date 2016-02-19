
var u       = require("underscore");
var url     = require("url");
var path    = require("path");
var cheerio = require("cheerio");


function convert(html, base, proxy_prefix){
    var $ = cheerio.load(html);

    $("a").each(function(){
        var jel  = $(this);

        var link = jel.attr('href');
        if(link){
            var chain = mk_chain(link, base, proxy_prefix);
            if (chain)  jel.attr("href", chain);
        }

    });

    $("img").each(function(){
        var jel  = $(this);

        var link = jel.attr('src');
        if(link){
            var chain = mk_chain(link, base, proxy_prefix);
            if (chain)  jel.attr("src", chain);
        }
    });

    $("link").each(function(){
        var jel  = $(this);

        var link  = jel.attr('href');
        if(link){
            var chain = mk_chain(link, base, proxy_prefix);
            if (chain)  jel.attr("href", chain);
        }
    });

    $("script").each(function(){
        var jel  = $(this);

        var link  = jel.attr('src');
        if(link){
            var chain = mk_chain(link, base, proxy_prefix);
            if (chain)  jel.attr("src", chain);
        }
    });

    return $.html();
}


function mk_chain(link, base, proxy_prefix){
    if(!link) return null;
    if(!u.isString(link)) return null;

    /*
     * we don't touch relative links, it will be processed by browsers.
     * only abs path will get treat:
     *  - http[s]://...
     *  - /path/to/some/where
     *  - //some-one-like-this-double-slash-way
     */
    if(link.search(/^http/i) !== 0 && link[0] !== '/') return link;

    var full = url.resolve(base, link);

    var escaped = encodeURI(full);

    var chain;
    if(proxy_prefix.endsWith('/')){
        chain = proxy_prefix + escaped;
    }else{
        chain = proxy_prefix + '/' + escaped;
    }
    return chain;
}

 
module.exports.convert = convert;


if(require.main === module){
    var p = console.log;
    function test2(){
        console.log(mk_chain('/some/path', 'http://yahoo.com', 'https://goodogood.me/proxy-ucp'));
        p(mk_chain('/some/path', 'http://yahoo.com', 'https://goodogood.me/proxy-ucp'));
    }

    function test1(){
    }
}
//console.log(mk_chain('/some/path', 'http://yahoo.com', 'https://goodogood.me/proxy-ucp'));
