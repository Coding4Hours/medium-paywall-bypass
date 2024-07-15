// ==UserScript==
// @name         make medium easy
// @namespace    http://tampermonkey.net/
// @version      2024-05-23
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=medium.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to check if the page is a Medium post by inspecting the HTML structure
    async function isMediumPost(url) {
        const response = await fetch(url);
        const text = await response.text();

        if(text.includes('class="meteredContent"')) return true;

    }

    // Function to check if the URL is a readcache.xyz link
    function isReadcacheLink(url) {
        return url.toLowerCase().includes("https://scribe.rip");
    }

        function replaceAllLinks(domain) {
            // Select all <a> elements
            const links = document.querySelectorAll('a');
            // Loop through each link and change the href attribute
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('/')) {
                    link.href = "https://scribe.rip" + link.href;
                }
            });
        }
        function extractDomain(originalURL) {
            return originalURL.replace("medium.com", "scribe.rip");
        }
    // Main function
    (async function() {
        const currentUrl = location.href;

        // Check if the URL is already a readcache.xyz link
        if (!isReadcacheLink(currentUrl)) {
            if (await isMediumPost(currentUrl)) {
                location.href = currentUrl.replace("medium.com", "scribe.rip");
            } else {
                console.log("The current webpage is not a Medium post.");
            }
        } else {
            console.log("The current URL is already a readcache link.");
            replaceAllLinks("https://scribe.rip" + extractDomain(location.href))
        }
    })();
})();
