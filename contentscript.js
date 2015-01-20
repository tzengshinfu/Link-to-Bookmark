document.addEventListener('contextmenu', function(evt) {
    getLinkText(evt);
    getSelectionLinks();
}, false);


var allLinks = document.getElementsByTagName("a");
var allLinksAmount = allLinks.length;


function getSelectionLinks() {
    
    document.getSelection().containsNode(allLinks[10], false);
}


function getLinkText(evt) {
    var target = evt.target || evt.srcElement, linkText = target.textContent || target.innerText || target.alt || target.src;
    chrome.runtime.sendMessage({linkText: linkText});
}