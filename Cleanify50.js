// ==UserScript==
// @name         Cleanify50
// @version      1.61
// @description  Clean Spotify artists page with 50 artists or less(Chrome/Firefox).
// @author       Noran D
// @match        https://open.spotify.com/collection/artists
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
var currTitle = "1";
var oldTitle = "2";
var currButton = "3";
var oldButton = "Play";
var check = document.querySelector('head > title');
var observer = new window.MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var ads = document.getElementsByClassName("ads-container")[0];
        ads.style.visibility = "hidden";
        setTimeout(function(){
            prepOrganize();
        }, 100);
    });
});
observer.observe(check, { childList: true });

function prepOrganize() {
    currButton = document.evaluate('//button[@title="Previous"]/following::button[1]/@title', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.nodeValue;
    if (currButton == oldButton) {
        currTitle = document.title;
        if (currTitle != oldTitle) {
            if (currTitle == "Your Library - Artists") {
                organize();
            }
        }
        oldTitle = currTitle;
        oldButton = currButton;
    }
}

function organize() {
    var list = document.getElementsByClassName("media-object mo-artist");
    var list2 = document.getElementsByClassName("mo-info-name");
    var names = [];
    for (i=0; i<list.length; i++)
    {
        names.push(list2[i].text);
    }
    names.sort();
    for (i=0; i<names.length; i++) {
        for (j=0; j<list.length; j++) {
            if (list[j].innerHTML.includes(names[i])) {
                list[0].parentNode.parentNode.parentNode.parentNode.appendChild(list[j]);
                list[j].setAttribute("style", "min-width:100px; max-width:100px;");
            }
            if (names[i].includes("&")) {
                if (list[j].innerHTML.includes("&amp;")) {
                    var tempName = names[i];
                    var tempList = list[j].innerHTML;
                    tempName = tempName.replace("&", "");
                    tempList = tempList.replace("&amp;", "");
                    if (tempList.includes(tempName)) {
                        list[0].parentNode.parentNode.parentNode.parentNode.appendChild(list[j]);
                        list[j].setAttribute("style", "min-width:100px; max-width:100px;");
                    }
                }
            }
        }
    }
    for (i=0; i<list.length; i++)
    {
        list[0].parentNode.removeChild(list[0].parentNode.firstChild);
    }
    var list3 = document.getElementsByClassName("media-object mo-artist");
    list3[0].parentNode.appendChild(list3[list3.length - 1]);
}
