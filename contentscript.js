document.addEventListener('contextmenu', function(evt) {
    getLinkTitle(evt);
    getSelectionLinks(evt);
}, true);


function getSelectionLinks(evt) {
    var sel = evt.currentTarget.getSelection();
    if (sel.type == "Range") {
      var rng = sel.getRangeAt(0);
      rng.setStart(rng.startContainer, 0);
      rng.setEnd(rng.endContainer, rng.endContainer.length);
      var dfg = rng.cloneContents();
      var selectionLinks = dfg.querySelectorAll("a, img");
      
      if (selectionLinks.length > 0) {
          var port = chrome.runtime.connect({name:"Link to Bookmark"});
          var msg = convertToJSON(selectionLinks);
          port.postMessage(msg);
      }
    }
}


function getLinkTitle(evt) {
    var target = evt.currentTarget.activeElement;
    var linkTitle = target.textContent.trim() || target.innerText.trim() || target.alt.trim() || target.src;
    chrome.runtime.sendMessage({linkTitle: encodeURIComponent(linkTitle)});
}


function convertToJSON(allLinks) {
    var JSONStr = "";
    var commaStr = "";
    var linkTitle = "";
    var linkUrl = "";
    
    JSONStr += "[";
    var allLinksLength = allLinks.length;
    for (linkCnt=0; linkCnt < allLinksLength; linkCnt++) {
        if (linkCnt > 0) {commaStr=", ";}
        switch(allLinks[linkCnt].tagName) {
            case "A":
                linkUrl = allLinks[linkCnt].href;
                if (linkUrl != "") {
                    linkTitle = allLinks[linkCnt].textContent.trim() || allLinks[linkCnt].innerText.trim();
                    if (linkTitle != "") {
                        JSONStr += commaStr + "{" + "\"linkTitle\": \"" + encodeURIComponent(linkTitle) + "\", " + "\"linkUrl\": \"" + linkUrl + "\"}";
                    }
                }                
                break;
            case "IMG":
                linkUrl = allLinks[linkCnt].src;
                if (linkUrl != "") {
                    linkTitle = allLinks[linkCnt].alt.trim();
                    if (linkTitle != "") {
                        JSONStr += commaStr + "{" + "\"linkTitle\": \"" + encodeURIComponent(linkTitle) + "\", " + "\"linkUrl\": \"" + linkUrl + "\"}";
                    }
                }                
                break;
        }
    }
    JSONStr += "]";
    return JSONStr;
}