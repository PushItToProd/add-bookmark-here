# Bookmark Here

Adds a context menu item to bookmarks allowing you to add a bookmark to a particular folder.

## Testing

- Run `make run`.
- Hit C-b to open the bookmarks sidebar.
- Right click on a bookmark or folder. There should be an "Add bookmark here" menu item.
- Click "Add bookmark here". A bookmark with the current page's URL and title should be added to the selected folder.

## References

- examples
  - https://github.com/mdn/webextensions-examples/blob/main/context-menu-copy-link-with-types/background.js
  - https://github.com/mdn/webextensions-examples/tree/main/menu-demo
  - https://github.com/mdn/webextensions-examples/tree/main/bookmark-it
- docs
  - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType