
console.log("page has been opened");

//Creating targetnode/value to check for download link + what values to observe
const targetnode = document.getElementsByTagName("a")[5];
const config = { attributes: true, childList: false, subtree: false };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        console.log ("Checking For mutations with href download link");
        if (mutation.type === 'attributes') { //mutation has been observed
            console.log('The ' + mutation.attributeName + ' attribute was modified, download link generated ');
             document.getElementsByTagName('a')[5].click();
             observer.disconnect();
             
            chrome.storage.sync.set({previous_tab: false}, function() {
                console.log("the previous tab is no longer utube");
            });
            chrome.storage.sync.set({mp3btnclick: false}, function() {
                console.log("no previous button clicks stored. Thanks for using my app - Fahad Adnan");
            });
            setTimeout(function() {
                window.close();
              }, 1500);
            
        }
    }
};
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);



//Check whether any code should be executed on this page. 
chrome.storage.sync.get('previous_tab', function(should_execute) {
    if(should_execute.previous_tab){
        chrome.storage.sync.get('mp3btnclick', function(data) {
            if (data.mp3btnclick){ 
                GenerateDownloadLink();
            }
            else {
                document.getElementById("mp4").click();
                GenerateDownloadLink();
            }
        });
    }
});


//Generates a download link for a video which is observed until the link is ready.
function GenerateDownloadLink (){ 

    chrome.storage.sync.get('utubelink', function(data) {
        document.getElementById("input").value = data.utubelink; 
        console.log ("URL Has been entered into search bar"); 
        document.getElementById('submit').click();
        console.log ("confirm - generate download-link button has been clicked");
        // Start observing the target node for configured mutations
        observer.observe(targetnode, config);
       });
    }
    


















// Later, you can stop observing
//observer.disconnect();