function saveFolderName() {
    var folder_name = document.getElementById('folder_name').value;
    var folderName = folder_name != "" ? folder_name : "QuicklyBookmark";
    var parentId = "1";

    chrome.bookmarks.search({"title": folderName}, function(results) {
        if (typeof results[0] !== "undefined") {
            saveAndClose(results[0].id, folderName, "Saved");
        }
        else {
            chrome.bookmarks.create({"parentId": parentId, "title": folderName}, function(newFolder) {
                saveAndClose(newFolder.id, folderName, "Added");
            });
        }
    });
}


function saveAndClose(fId, fName, sMessage) {
    localStorage["folderId"]=fId;
    localStorage["folderName"]=fName;
    alert("Save success! " + sMessage + " folder: " + fName);
    window.open('', '_self', '');
    window.close();
}


document.getElementById('save').addEventListener('click', saveFolderName);


document.getElementById("folderId").innerText = typeof localStorage["folderName"] !== "undefined" ? localStorage["folderName"] : "Not yet set...";