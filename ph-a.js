
console.log('Loading a web page');
var page = require('webpage').create();

//var url = 'http://baidu.com/';
var url = "https://en.wikipedia.org/wiki/Main_Page";

// you must include height for it to work
page.viewportSize = {width:1920, height:1280};

page.open(url, function (status) {

    console.log("Status: " + status);
    if(status === "success") {
        page.render('example.png', {quality:100});
        //page.render('example.pdf', {format:'pdf', quality:100});
        console.log("Page is renderred!");
        phantom.exit();
    }


});
