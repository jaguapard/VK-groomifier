// ==UserScript==
// @name         VK groomifier
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Removes pesky away.php wrapper for links in VKontakte social network.
// @author       groomyjohny
// @match        https://*.vk.com/*
// @grant        none
// ==/UserScript==

const linkBeginning = "https://vk.com/away.php";
const linkEnding = "&";
(function() {
    'use strict';

    console.log("Running from away.vk.com started");
    let links = document.getElementsByTagName("a");
    console.log("Found ",links.length," links on the page");
    for (let i = 0; i < links.length; ++i)
    {
        if (links[i].href.startsWith(linkBeginning))
        {
            let h = links[i].href;
            console.log("Link ",i,h);
            console.log("Links["+i+"] is spoofed by vk.com, fixing");
            let s1 = h.substring(h.indexOf("to=")+3);
            console.log("s1",s1);
            let endIndex = s1.indexOf(linkEnding);
            if (endIndex == -1) endIndex = s1.length;
            let uri = s1.substring(0,endIndex);
            console.log("Original URI:",uri);
            console.log("Decoded URI: ",decodeURIComponent(uri));
            links[i].href = decodeURIComponent(uri);
        }
    }
})();