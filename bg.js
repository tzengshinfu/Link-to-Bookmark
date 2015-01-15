var linkText;

function onInitial() {
    if (typeof localStorage["folderId"] === "undefined") {
        window.open("options.html");
    }
}


function addBookmark(linkInfo) {
	var title = linkText;
	var url = linkInfo.linkUrl;
	chrome.bookmarks.create({
			"parentId": localStorage["folderId"], 
			"title": title?title:url,
			"url": url
	});
}


onInitial();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    linkText = request.linkText;
});
chrome.contextMenus.create({title: "Add this link to bookmark", contexts:["link"], onclick: addBookmark});