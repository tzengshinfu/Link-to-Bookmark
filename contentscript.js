var allLinks = document.getElementsByTagName("a");
var allLinksAmount = allLinks.length;
var linkText;

for (currentLinkCount = 0; currentLinkCount < allLinksAmount; currentLinkCount++) {
    allLinks[currentLinkCount].addEventListener('contextmenu', function(evt) {
    var target = evt.target || evt.srcElement, linkText = target.textContent || linkText.innerText;   
        chrome.runtime.sendMessage({linkText: linkText});
        return false;
    }, false);
}