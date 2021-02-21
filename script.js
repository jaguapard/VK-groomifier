// ==UserScript==
// @name         VK groomifier
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Убирает away.vk.com и возращает "Сообщения" вместо "Мессенджера"
// @author       groomyjohny
// @match        https://*.vk.com/*
// @grant        none
// ==/UserScript==

const linkBeginning = "https://vk.com/away.php";
const linkEnding = "&";
let nextLinkId = 0;

(setInterval( function() {
    'use strict';

    console.log("VK groomifier started");

    if (document.title == "Мессенджер") document.title = "Сообщения";
    document.querySelectorAll('.left_label, inl_bl').forEach(el => {
        if (el.innerHTML == "Мессенджер") el.innerHTML = "Сообщения";
    });

    let links = document.getElementsByTagName("a");
    console.log("Found ",links.length," links on the page");
    for (let i = nextLinkId; i < links.length; ++i, ++nextLinkId)
    {
        let href = links[i].href;
        if (href.startsWith(linkBeginning))
        {
            let url = new URL(href);
            let searchParams = new URLSearchParams(url.search);
            if (searchParams.has("to")) links[i].href = searchParams.get("to");
        }
    }
},500));