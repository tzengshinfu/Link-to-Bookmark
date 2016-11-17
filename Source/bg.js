function onInitial() {
    if (isfolderIdExisted() == false) {
        window.open("options.html");
    }
}

function addBookmark(info) {
    if (isfolderIdExisted() == true) {
        let title = decodeURIComponent(sessionStorage["linkTitle"]);
        let url = info.linkUrl;
        chrome.bookmarks.create({
                "parentId": localStorage["folderId"],
                "title": title != "" ? title : url,
                "url": url
        });
    }
    else {
        alert(chrome.i18n.getMessage("appAlert"));
    }
}

function isfolderIdExisted() {
    let folderIdExisted = typeof localStorage["folderId"] !== "undefined";
    return folderIdExisted;
}


onInitial();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    sessionStorage["linkTitle"] = request.linkTitle;
});
chrome.contextMenus.create({title: chrome.i18n.getMessage("appAddAlink"), contexts:["link"], onclick: addBookmark});
chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.executeScript(null, {file: "contentscript.js"});
});