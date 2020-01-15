//When installed the extension will have an available popup on pages containing: youtube.com
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        
        new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: '.youtube.com'},
      })],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});