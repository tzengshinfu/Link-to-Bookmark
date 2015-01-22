function onInitial() {
    if (isfolderIdExisted() == false) {
        window.open("options.html");
    }
}


function addBookmark(info) {
    if (isfolderIdExisted() == true) {
        var title = sessionStorage["linkTitle"];
        var url = info.linkUrl;
        chrome.bookmarks.create({
                "parentId": localStorage["folderId"],
                "title": title != "" ? title : url,
                "url": url
        });
    }
    else {
        alert('Not yet set the folder you want to save Bookmarks!');
    }
}


function addBookmarks(info) {
    if (isfolderIdExisted() == true) {
        var selectionLinks = JSON.parse(sessionStorage["selectionLinks"]);
        var selectionLinksLength = selectionLinks.length;
        for (linkCnt = 0; linkCnt < selectionLinksLength; linkCnt++) {
            chrome.bookmarks.create({
                "parentId": localStorage["folderId"],
                "title": selectionLinks[linkCnt].linkTitle,
                "url": selectionLinks[linkCnt].linkUrl
            });
        }
    }
    else {
        alert('Not yet set the folder you want to save Bookmarks!');
    }
}


function isfolderIdExisted() {
    var folderIdExisted = typeof localStorage["folderId"] !== "undefined";
    return folderIdExisted;
}


onInitial();


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    sessionStorage["linkTitle"] = request.linkTitle;
});


chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        sessionStorage["selectionLinks"] = msg;
  });
});


chrome.contextMenus.create({title: "Add this link to bookmark", contexts:["link"], onclick: addBookmark});


chrome.contextMenus.create({title: "Add this link[s] to bookmark", contexts:["selection"], onclick: addBookmarks});


chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.executeScript(null, {file: "contentscript.js"});
});