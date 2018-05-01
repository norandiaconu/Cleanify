// ==UserScript==
// @name     Cleanify
// @version  1.0
// @grant    none
// @author	 Noran D
// @match 	 https://open.spotify.com/collection/artists
// ==/UserScript==
alert("START");

var list = document.getElementsByClassName("media-object mo-artist");
var list2 = document.getElementsByClassName("mo-info-name");
var names = new Array();

for (i=0; i<list.length; i++)
{
  names.push(list2[i].text);
}
names.sort();

//alert("Artists found: " + list.length);

for (i=0; i<names.length; i++) {
  for (j=0; j<list.length; j++) {
    if (list[j].innerHTML.includes(names[i])) {
    	list[0].parentNode.parentNode.append(list[j]);
    }
  }
}
var ads = document.getElementsByClassName("ads-container")[0];
ads.style.visibility = "hidden";
//alert("DONE");