function saveFolderName() {
    var folder_name = document.getElementById('folder_name').value;
    var folderName = folder_name != "" ? folder_name : "QuicklyBookmark";
    var parentId = "1";

    chrome.bookmarks.search({"title": folderName}, function(results) {
        if (typeof results[0] !== "undefined") {
            saveAndClose(results[0].id, folderName, chrome.i18n.getMessage("appSaved"));
        }
        else {
            chrome.bookmarks.create({"parentId": parentId, "title": folderName}, function(newFolder) {
                saveAndClose(newFolder.id, folderName, chrome.i18n.getMessage("appAdded"));
            });
        }
    });
}


function saveAndClose(fId, fName, sMessage) {
    localStorage["folderId"]=fId;
    localStorage["folderName"]=fName;
    alert(chrome.i18n.getMessage("appSaveSuccess") + sMessage + chrome.i18n.getMessage("appFolder") + fName);
    window.open('', '_self', '');
    window.close();
}


document.getElementById('save').addEventListener('click', saveFolderName);


document.getElementById("folderId").innerText = typeof localStorage["folderName"] !== "undefined" ? localStorage["folderName"] : chrome.i18n.getMessage("appNotYet");