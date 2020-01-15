

let mp3btn = document.getElementById('mp3_btn');
let mp4btn = document.getElementById('mp4_btn');
var youtube_link;
var download_video= false;


 // two functinos make sure that value of the link is given
//  before calling on another function
mp3btn.onclick = function() {
   chrome.tabs.getSelected(null, function(tab) {
    sendInfo(tab.url, true);});
}


mp4btn.onclick = function() {
   chrome.tabs.getSelected(null, function(tab) {
    sendInfo(tab.url, false);});
}




   function sendInfo(tablink, mp3_clicked) {

   chrome.storage.sync.set({utubelink: tablink}, function() {
      console.log("the youtube link has been stored");
   });

   chrome.storage.sync.set({previous_tab: true}, function() {
      console.log("the popup was clicked to open downloading site.");
   });

   if (mp3_clicked){
      chrome.storage.sync.set({mp3btnclick: true}, function() {
         console.log("the user wants to download an mp3");
      });
   }
   else {
      chrome.storage.sync.set({mp3btnclick: false}, function() {
         console.log("the user wants to download an mp4");
      });
   }

   //alternative to window.open as it opens a specific tab without focusing towards it. 
      chrome.tabs.create({url: 'https://ytmp3.cc/en1/', active: false});
     
      window.close();
   }





