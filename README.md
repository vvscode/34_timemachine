# Timer for Websites That Steal Your Time

This project helps to control time was spent on sites. It requires special extension for Chrome browser. It can insert custom javascript code to website pages. Here is a link for [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija). You can find analogs for other browsers.


Script can be installed by url `https://raw.githack.com/vvscode/34_timemachine/master/index.js`


# Installing

Install extension for Chrome browser [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija).

Open configuration of [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension on the site you want to controll. Click on the link "your own external scripts", add path `https://raw.githack.com/vvscode/34_timemachine/master/index.js`. Don`t forget to press "enable cjs for this host" to enable custom JS.

For websites you enable this script you'll see a downcounter at top left corner. After 3 minutes it will start showing a messages to you, to notify that it's time to work.

For faster development you can use JS code hosted on localhost. Simple web server can be used for that, run:

```bash
python3 -m http.server
```

Add path `http://localhost:8000/index.js` to [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension. Done.


# Project Goals

The code is written for educational purposes. Training course for web-developers - [DEVMAN.org](https://devman.org)
