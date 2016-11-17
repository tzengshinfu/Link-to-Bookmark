document.addEventListener('contextmenu', function(evt) {
    getLinkTitle(evt);
}, true);

function getLinkTitle(evt) {
    let target = evt.currentTarget.activeElement;
    let linkTitle = target.textContent.trim() || target.innerText.trim() || target.alt.trim() || target.src;
    chrome.runtime.sendMessage({linkTitle: encodeURIComponent(linkTitle)});
}