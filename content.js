
console.log("page has been opened");

// NOTE: typically nodes are const, but the page dynamically updates, so thye may change=>var. 
// nodes being observed on. 
var target_main_feed = document.getElementsByClassName("rpBJOHq2PR60pnwJlUyP0")[0];
var target_clicked_post = document.getElementsByTagName("BODY")[0];

//configuration of properties being observed.
var config_main_feed = { attributes: false, childList: true, subtree: false };
var config_clicked_post = { attributes: true, childList: false, subtree: false };


var side_bar = { attributes: false, childList: true, subtree: false };
var config_side_bar = { attributes: true, childList: false, subtree: false };

//start index of what post is being checked if its a promoted post.
var start =0;


function waitForElementToDisplay(selector, time, isAdRemoval) {
    
    if(document.querySelector(selector)!=null) {
        console.log("The Sidebar is loaded")
        if(isAdRemoval){
            setTimeout(function() { 
                 RemoveAds()
                }, 400);
        }
        return;
    }
    else {
        setTimeout(function() {
            waitForElementToDisplay(selector, time, isAdRemoval);
        }, time);
    }
}


function DeletePromotedPosts(start,end){
    var postDiv, classNamePost, lenClass, nodechild;
    console.log("The Start Value is " + start + "the end value is: " + end);

    for( i= start; i < end; ++i){
         postDiv = target_main_feed.childNodes[i];
        nodechild = target_main_feed.childNodes[i].childNodes[0].childNodes[0];
         if(typeof(nodecihld) !== 'undefined' && nodechlid != null){
             console.log("The element of: " + i + "does not exist");
             break;
         }
         if(typeof(target_main_feed.childNodes[i].childNodes[0].childNodes[0]) !== 'undefined'){
            classNamePost = target_main_feed.childNodes[i].childNodes[0].childNodes[0].className;
            lenClass = classNamePost.length;
            if ((classNamePost.substring(lenClass-12, lenClass)) == "promotedlink"){
                postDiv.remove();
                console.log("the post item: " + i + "is promoted and has been removed");
                --end;
            }
    }
}
}

function RemoveAds(){
    setTimeout(function() { // we need to wait for reddit to dynamically upload data before injecting our own script. 
    var ads = document.getElementsByClassName("_1rmObrmUCfC5t42SbwkzYC");
    if(typeof(ads) !== 'undefined'){
            while(ads.length !=0){
                console.log(ads.length + "This is JUSTICE");
                if(typeof(ads[0]) !== 'undefined'){
                    ads[0].remove();
                    console.log("A ad was removed!");
                }
            }
    }else{
        console.log("wait for element to load did NOT work// or there are no Ads")
    }
 }, 900);
}

var callback_clicked_post = function(mutationsList, observer_clicked_post) {
    for(let mutation of mutationsList) {  
        if (mutation.type === 'attributes') {
            console.log("Clicked on a post");
            waitForElementToDisplay('._1G4yU68P50vRZ4USXfaceV', 200, true)
        }
    }
};

var callback_main = function(mutationsList, observer_main_feed) {
    for(let mutation of mutationsList) {  
        if (mutation.type === 'childList') {
            console.log(target_main_feed.childElementCount)
                if(target_main_feed.childElementCount > start){
                    var numchild = target_main_feed.childElementCount;
                    observer_main_feed.disconnect();
                    DeletePromotedPosts(start, numchild);
                    start = numchild;
                    observer_main_feed.observe(target_main_feed, config_main_feed);
                    ads = document.getElementsByClassName("_1rmObrmUCfC5t42SbwkzYC");

                   if(typeof(ads) != 'undefined' && ads.length != 0){
                       RemoveAds();
                    }
                }
        }
    }
};


//creating mutation observers for each node.
var observer_clicked_post = new MutationObserver(callback_clicked_post);
var observer_main_feed = new MutationObserver(callback_main);


// check if nodes are undefined and if not observe.
function observe_nodes() {
    if(typeof(target_clicked_post) === 'undefined' || typeof(target_main_feed) === 'undefined'){
        setTimeout(function() { // wait for page to load main feed to observe. 
            console.log("rechecking if nodes loaded.");
             target_main_feed = document.getElementsByClassName("rpBJOHq2PR60pnwJlUyP0")[0];
             target_clicked_post = document.getElementsByTagName("BODY")[0];  
             observe_nodes();
        }, 200);
    }
     if(typeof(target_clicked_post) !== 'undefined'){
        observer_clicked_post.observe(target_clicked_post, config_clicked_post);
     }
     if(typeof(target_main_feed) !== 'undefined'){
        observer_main_feed.observe(target_main_feed, config_main_feed);
    }
    waitForElementToDisplay('._1FUNcfOeszr8eruqLxCMcR', 100, true)
}


// When the page updates dynamically, the window don't reload-  add this do what typically happens on a window reload
setTimeout(function() { // wait for al
    observe_nodes();
    
}, 800);
