var folderIdExisted = typeof localStorage["folderId"] !== "undefined";


if (folderIdExisted == false) {
    alert("Please set the folder you want to save Bookmarks first.");
}