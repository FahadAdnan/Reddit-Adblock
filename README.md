# Reddit-AdBlock

A chrome extension made to block ads and promoted posts on reddit, because they are pretty weird. 

Uses mutation observers, and a background script to detect a dynamic changes (e.g AJAX) to re-inject ad-blocking code when a Reddit web page dynamically reloads. The content script does not check for dynamic reloading, so I made a background page to do check for when that occurs.


Note: The chrome store isnt yet ACCEPTED by the chrome store.
So I made it possible for you to download it on your own.

# Icon Image
![alt text](https://github.com/FahadAdnan/Reddit-Adblock/blob/master/Images/start128.png)

# Small Tile Image
![alt text](https://github.com/FahadAdnan/Reddit-Adblock/blob/master/Images/start128.png)



Steps to get UtubeDownloader:

1) Download zip file of extension
2) Extract file which should give you a folder
3) Go to chrome://extensions
4) On the top right corner click the Developer mode switch
5) Press the new revelaed load unpacked button
6) Select the unzip folder and enjoy

Note: If you see an ad on the main feed sidebar, click a post and it will go away. 
      If you see promoted posts, refresh your page. (issue of object loading slowly dynamic loading)
Feel free to modify the code to your liking. :)









