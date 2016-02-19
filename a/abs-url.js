
// in browser
function resolve(url, base){

    if('string'!==typeof url || !url){
        return null;
        // wrong or empty url
    }else if(url.match(/^[a-z]+\:\/\//i)){ 
        // url is absolute already 
        return url;
    } else if(url.match(/^\/\//)){ 
        // url is absolute already 
        return 'http:'+url;
    } else if(url.match(/^[a-z]+\:/i)){ 
        // data URI, mailto:, tel:, etc.
        return url;
    } else if('string'!==typeof base){
        var a=document.createElement('a'); 
        // try to resolve url without base  
        a.href=url;
        if(!a.hostname || !a.protocol || !a.pathname){ 
            return null; // url not valid 
        }
        return 'http://'+url;

    } else{ 
        base=resolve(base); // check base
        if(base===null){
            return null; // wrong base
        }
    }

    var a=document.createElement('a'); 
    a.href=base;

    if(url[0]==='/'){ 
        // rooted path
        base=[];
    } else{ 
        // relative path
        base=a.pathname.split('/');
        base.pop(); 
    }

    url=url.split('/');
    for(var i=0; i<url.length; ++i){
        if(url[i]==='.'){ // current directory
            continue;
        }
        if(url[i]==='..'){ // parent directory
            if('undefined'===typeof base.pop() || base.length===0){ 
                return null; // wrong url accessing non-existing parent directories
            }
        }
        else{ // child directory
            base.push(url[i]); 
        }
    }
    return a.protocol+'//'+a.hostname+base.join('/');
}
