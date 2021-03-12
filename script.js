// ==UserScript==
// @name         VK groomifier
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  "Причёсывает" vk.com
// @author       groomyjohny
// @match        https://*.vk.com/*
// @grant        none
// ==/UserScript==

const linkBeginning = "https://vk.com/away.php";
let debug = false;
if (document.title == "Мессенджер") document.title = "Сообщения";
    document.querySelectorAll('.left_label, inl_bl').forEach(el => {
        if (el.innerHTML == "Мессенджер") el.innerHTML = "Сообщения";
    });

const targetNode = document.body;
const config = { childList: true, subtree: true };
function callback(mutationList, observer)
{
    for (z in mutationList)
    {
        if (mutationList[z].addedNodes)
        for (let i = 0; i < mutationList[z].addedNodes.length; ++i)
        {
            let el = mutationList[z].addedNodes[i];
            recursivelyIterate(el);        
        }
    }    
}

function recursivelyIterate(el)
{
    if (debug) console.log(el);
    if (el.nodeName == "A") checkAndFixLink(el);
    if (el.children)
        for (let i = 0; i < el.children.length; ++i) 
            recursivelyIterate(el.children[i]);
}

function checkAndFixLink(el)
{
    let href = el.href;
    if (href.startsWith(linkBeginning))
    {
        let url = new URL(href);
        let searchParams = new URLSearchParams(url.search);
        if (searchParams.has("to")) 
        {
            el.href = searchParams.get("to");
            if (debug) el.style.background = "green";
        }
    }
    if (href.startsWith("https://vk.com/audios")) el.href += "?section=all"
}

let links = document.getElementsByTagName("a");
for (let i = 0; i < links.length; ++i) 
    checkAndFixLink(links[i]); //MutationObserver does not work on initial load. This will handle it, while the new loaded elements will go to MutationObserver
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);