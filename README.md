Enhanced `cplusplus.com`
========================

This is a Chrome extension which modifies pages on [cplusplus.com](http://www.cplusplus.com/) to make the forums easier to use.

* Adds a quote button to each post on the last page of a topic
* Adds a code-ize button to each post on the last page of a topic - opens a new window with the entire post in code tags
* Makes quotes, code sections, and output sections act like spoiler tags

## Screenshots
[![](http://i.imgur.com/kBou8R8.png)](http://i.imgur.com/kBou8R8.png)

## Rationale
Why are these features not part of the site already? The site owner is very busy and does not have time to add these features for us. These features don't require any server-side work so we can implement them ourselves. Plus, it effectively means the community can make the site look and act as they wish.

## Installation
Download the [latest release](https://github.com/cpluspluscom/EnhancedCpp.com/releases), open `chrome://extensions` and drag-and-drop the .crx file in that page.
By default, Chrome now disables non-store extensions, such as this extension. To enable them, you have to whitelist the extensions. To enable whitelisting, we need to copy two files. You can download a zip [here](https://dl.dropboxusercontent.com/u/83943521/publicaccess/Files/admx.zip).
* Go to `%windir%/policydefinitions` and copy the `chrome.admx` file. Find your language in the zip, and copy the inner `chrome.adml` to `%windir%/policydefinitions/yourlanguage` .
* Find the Extension ID. Go to `chrome://extensions` and enable Developer Mode. Note down the Extension ID for the extension you want to whitelist.
* Run `gpedit.msc` (Win+R) and browse to: `User Configuration/Administrative Templates/Google/Google Chrome/Extensions`
* Double click `Configure extension installation whitelist` (this is usually localized to your own language), choose `Enable` and click on `Show`.
* In the list, paste the Extension IDs to whitelist. On my system, this extension has the ID `gcgeapgjphgeiaibnolfidoilmnjcjeb` . I have no idea if it changes from system to system. Make sure to check in your Extensions page.
* Click OK and Restart Chrome. In the extensions page, it will take some seconds before the Enable checkbox is ungreyed.
To further whitelist more extensions, restart from point 2.
