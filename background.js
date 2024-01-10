const ADD_BOOKMARK_HERE_MENU_ID = "add-bookmark-here";
const ADD_FOLDER_HERE_MENU_ID = "add-folder-here";
const MENU_ITEM_IDS = [ADD_BOOKMARK_HERE_MENU_ID, ADD_FOLDER_HERE_MENU_ID];

browser.contextMenus.create(
  {
    id: ADD_BOOKMARK_HERE_MENU_ID,
    title: "Add bookmark here",
    contexts: ["bookmark"]
  },
  () => void browser.runtime.lastError,
);

browser.contextMenus.create(
  {
    id: ADD_FOLDER_HERE_MENU_ID,
    title: "Add folder here",
    contexts: ["bookmark"]
  },
  () => void browser.runtime.lastError,
);

async function getBookmarkDestination(selectedBookmarkId) {
  let [selectedBookmark] = await browser.bookmarks.get(selectedBookmarkId);

  // if the selected bookmark is a folder, return just the folder ID
  if (selectedBookmark.type === "folder") {
    return {parentId: selectedBookmark.id};
  }

  // if the selected bookmark is not a folder, return the parent folder ID and
  // set the index so the new bookmark will be added immediately after the
  // selected bookmark
  return {
    parentId: selectedBookmark.parentId,
    index: selectedBookmark.index + 1,
  };
}

async function getActiveTab() {
  let activeTabs = await browser.tabs.query({active: true, currentWindow: true});
  if (!activeTabs[0]) {
    throw "unable to get active tab";
  }
  let activeTab = activeTabs[0];
  return activeTab;
}

async function getCurrentTabBookmark() {
  let activeTab = await getActiveTab();
  console.debug("current tab:", activeTab);

  return {
    title: activeTab.title,
    url: activeTab.url,
    type: "bookmark",
  };
}

browser.contextMenus.onClicked.addListener(async ({menuItemId, bookmarkId} = info) => {
  if (!MENU_ITEM_IDS.includes(menuItemId)) return;

  if (!bookmarkId) {
    throw "expected a bookmarkId but didn't get one";
  }

  let bookmarkDestination = await getBookmarkDestination(bookmarkId);
  console.debug("bookmark destination:", bookmarkDestination);

  let bookmarkDetails;
  switch (menuItemId) {
    case ADD_BOOKMARK_HERE_MENU_ID:
      let tabBookmarkDetails = await getCurrentTabBookmark();
      bookmarkDetails = {
        ...bookmarkDestination,
        ...tabBookmarkDetails,
      };
      break;
    case ADD_FOLDER_HERE_MENU_ID:
      bookmarkDetails = {
        ...bookmarkDestination,
        type: 'folder',
        title: 'New folder',
      };
      break;
    default:
      throw `unsupported menu item ID: ${menuItemId}`;
  }

  console.debug("bookmark details:", bookmarkDetails);

  browser.bookmarks.create(bookmarkDetails);
});
