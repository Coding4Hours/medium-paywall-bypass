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
        return url.toLowerCase().includes("https://readcache.xyz/api/p?url=");
    }

        function replaceAllLinks(domain) {
            // Select all <a> elements
            const links = document.querySelectorAll('a');
            // Loop through each link and change the href attribute
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('/')) {
                    link.href = domain + href;
                }
            });
        }
        function extractDomain(originalURL) {
            const prefix = 'https://readcache.xyz/api/p?url=';
            // Remove the prefix
            const modifiedURL = originalURL.replace(prefix, '');
            // Extract the domain
            const url = new URL(modifiedURL);
            return "https://" + url.hostname;
        }
    // Main function
    (async function() {
        const currentUrl = location.href;

        // Check if the URL is already a readcache.xyz link
        if (!isReadcacheLink(currentUrl)) {
            if (await isMediumPost(currentUrl)) {
                location.href = "https://readcache.xyz/api/p?url=" + currentUrl;
            } else {
                console.log("The current webpage is not a Medium post.");
            }
        } else {
            console.log("The current URL is already a readcache link.");
            replaceAllLinks("https://readcache.xyz/api/p?url=" + extractDomain(location.href))
        }
    })();
})();
