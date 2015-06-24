
console.log('Loading a web page');
var page = require('webpage').create();

//var url = 'http://baidu.com/';
var url = "https://en.wikipedia.org/wiki/Main_Page";

// you must include height for it to work
page.viewportSize = {width:1920, height:1280};

page.open(url, function (status) {

    console.log("Status: " + status);
    if(status === "success") {

        //if (page.injectJs('do.js')) {
        //    var title = page.evaluate(function() {
        //        // returnTitle is a function loaded from our do.js file - see below
        //        return returnTitle();
        //    });
        //}

        var links = page.evaluate(function(){
            if(document.$){
                return document.$('a');
            }
        });

        console.log(links);
        console.log('got links?');

        phantom.exit();
    }
});
