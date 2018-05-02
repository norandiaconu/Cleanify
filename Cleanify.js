// ==UserScript==
// @name         Cleanify
// @version      1.1
// @description  Clean Spotify artists page (Chrome/Firefox).
// @author       Noran D
// @match        https://open.spotify.com/collection/artists
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
$(function(){
    setTimeout(function(){
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
                    list[0].parentNode.parentNode.append(list[j]);
                }
            }
        }
        var ads = document.getElementsByClassName("ads-container")[0];
        ads.style.visibility = "hidden";
    }, 500);
});