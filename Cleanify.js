// ==UserScript==
// @name         Cleanify
// @version      1.9
// @description  Clean Spotify artists page with over 50 artists(Chrome/Firefox).
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
        $('.AdsContainer').hide();
        var htmlString = $('body').html().toString();
        var index = htmlString.indexOf("loading.gif");
        var scrollNodes = document.getElementsByClassName("main-view-container__scroll-node");
        var scroller = scrollNodes[0];
        scroller.scrollTop += 4000;
        if (index == -1) {
            setTimeout(function(){
                scroller.scrollTop += 4000;
            }, 2000);
            setTimeout(function(){
                scroller.scrollTop += 4000;
            }, 3000);
            setTimeout(function(){
                prepOrganize();
            }, 6000);
        }
    });
});
observer.observe(check, { childList: true });

function prepOrganize() {
    currButton = document.evaluate('//button[@title="Previous"]/following::button[1]/@title', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.nodeValue;
    if (currButton == oldButton) {
        currTitle = document.title;
        if (currTitle != oldTitle) {
            if (currTitle == "Spotify � Your Library") {
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
    var names2 = [];
    for (var i=0; i<list.length; i++)
    {
        names.push(list2[i].text);
    }
    names.sort();
    for (var j=0; j<names.length; j++) {
        for (var k=0; k<list.length; k++) {
            if (list[k].innerHTML.includes(names[j])) {
                list[k].setAttribute("style", "min-width:90px; max-width:90px;");
                if (!names2.includes(names[j])) {
                    list[0].parentNode.parentNode.parentNode.parentNode.appendChild(list[k]);
                    names2.push(names[j]);
                }
            }
            if (names[j].includes("&")) {
                if (list[k].innerHTML.includes("&amp;")) {
                  var tempName = names[j];
                  var tempList = list[k].innerHTML;
                  tempName = tempName.replace("&", "");
                  tempList = tempList.replace("&amp;", "");
                  if (tempList.includes(tempName)) {
                      list[k].setAttribute("style", "min-width:90px; max-width:90px;");
                      if (!names2.includes(names[j])) {
                          list[0].parentNode.parentNode.parentNode.parentNode.appendChild(list[k]);
                          names2.push(names[j]);
                      }
                  }
                }
            }
        }
    }
  	for (var l=0; l<list.length; l++)
    {
        list[0].parentNode.removeChild(list[0].parentNode.firstChild);
    }
    $('img[src="/static/assets/images/loading.gif"]').remove();
    return;
}
