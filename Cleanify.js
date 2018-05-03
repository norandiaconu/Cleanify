// ==UserScript==
// @name         Cleanify
// @version      1.2
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
                    list[0].parentNode.parentNode.appendChild(list[j]);
                    list[j].setAttribute("style", "min-width:100px; max-width:100px;");
                }
            }
        }
        for (i=0; i<list.length; i++)
        {
            list[0].parentNode.removeChild(list[0].parentNode.firstChild);
        }
        var list3 = document.getElementsByClassName("media-object mo-artist");
        list3[0].parentNode.appendChild(list3[list3.length - 1]);
        var ads = document.getElementsByClassName("ads-container")[0];
        ads.style.visibility = "hidden";
    }, 400);
});