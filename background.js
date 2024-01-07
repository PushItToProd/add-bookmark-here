const ADD_BOOKMARK_HERE_MENU_ID = "add-bookmark-here";

browser.contextMenus.create(
  {
    id: ADD_BOOKMARK_HERE_MENU_ID,
    title: "Add bookmark here",
    contexts: ["bookmark"]
  },
  () => void browser.runtime.lastError,
);

async function getBookmarkFolder(bookmarkId) {
  let [selectedBookmark] = await browser.bookmarks.get(bookmarkId);
  if (selectedBookmark.type === "folder") {
    return selectedBookmark;
  }
  let [bookmarkFolder] = await browser.bookmarks.get(selectedBookmark.parentId);
  return bookmarkFolder;
}

async function getActiveTab() {
  let activeTabs = await browser.tabs.query({active: true, currentWindow: true});
  if (!activeTabs[0]) {
    throw "unable to get active tab";
  }
  let activeTab = activeTabs[0];
  return activeTab;
}

browser.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== ADD_BOOKMARK_HERE_MENU_ID) return;

  // get the ID of the bookmark that was clicked on
  let {bookmarkId} = info;
  if (!bookmarkId) {
    throw "expected a bookmarkId but didn't get one";
  }

  let bookmarkFolder = await getBookmarkFolder(bookmarkId);
  console.debug("bookmark destination folder:", bookmarkFolder);

  // get current page info for bookmark creation
  let activeTab = await getActiveTab();
  console.debug("current tab:", activeTab);

  let bookmarkDetails = {
    parentId: bookmarkFolder.id,
    title: activeTab.title,
    url: activeTab.url,
    type: "bookmark",
  };

  browser.bookmarks.create(bookmarkDetails);
});
