document.addEventListener('contextmenu', function(evt) {
    var target = evt.target || evt.srcElement, linkText = target.textContent || target.innerText || target.alt || target.src;
    chrome.runtime.sendMessage({linkText: linkText});
}, false);