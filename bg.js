var linkText;

function onInitial() {
    if (typeof localStorage["folderId"] === "undefined") {
        window.open("options.html");
    }
}


function addBookmark(info) {
    var title = linkText;
    var url = info.linkUrl;
    chrome.bookmarks.create({
            "parentId": localStorage["folderId"],
            "title": title?title:url,
            "url": url
    });
}


function addBookmarks(info) {
}


onInitial();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    linkText = request.linkText;
});
chrome.contextMenus.create({title: "Add this link to bookmark", contexts:["link"], onclick: addBookmark});
chrome.contextMenus.create({title: "Add this link[s] to bookmark", contexts:["selection"], onclick: addBookmarks});
chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.executeScript(null, {file: "contentscript.js"});
});