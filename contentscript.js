document.addEventListener('contextmenu', function(evt) {
    var target = evt.target || evt.srcElement, text = target.textContent || target.innerText || target.alt || target.src;
    var linkText = text.trim();
    chrome.runtime.sendMessage({linkText: linkText});
}, false);