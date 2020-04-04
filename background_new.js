var commentstring = "comments";
var redditstring = "https://www.reddit.com"
var stringarr = ["top", "best", "hot", "new", "rising"];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  var urlstring = changeInfo.url;
  console.log("The URL just changed B");
  console.log("The Old URL was " + urlstring);
  console.log("The tab is.." + tab);
  console.log("The tab ID is.." + tabId);

 if (typeof(changeInfo.url) !== 'undefined' && !(urlstring.includes(commentstring) && urlstring.includes(redditstring))) {
    console.log("restarting scripts");
    chrome.tabs.executeScript({file: 'content.js'});
  }

});
