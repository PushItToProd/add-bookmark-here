# Bookmark Here

Adds a context menu item to bookmarks allowing you to add a bookmark to a particular folder.

## Testing

- Run `make run`.
- Hit C-b to open the bookmarks sidebar.
- Right click on a bookmark or folder. There should be an "Add bookmark here" menu item.
- Click "Add bookmark here". A bookmark with the current page's URL and title should be added to the selected folder.

## Publishing

- Increment the `version` field in manifest.json and commit the code.
- Run `git tag <version>`.
- Run `make build`.
- Go to the [Firefox add-on developer hub](https://addons.mozilla.org/en-US/developers/addon/1838e3f7df80431583fe/edit).
- Select [Upload New Version](https://addons.mozilla.org/en-US/developers/addon/1838e3f7df80431583fe/versions/submit/).

## References

- code examples and docs
  - https://github.com/mdn/webextensions-examples/blob/main/context-menu-copy-link-with-types/background.js
  - https://github.com/mdn/webextensions-examples/tree/main/menu-demo
  - https://github.com/mdn/webextensions-examples/tree/main/bookmark-it
  - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType
- packaging and publishing
  - https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#package-sign-and-publish-an-extension