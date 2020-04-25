# Download Object as a JSON file

This chrome extension allows to download object as a JSON File. It exposes the
api `console.download`. Object passed to `console.download` will be downloaded
in JSON format.

## How to install
1. Clone the repo or download the zip & extract zipped file somewhere.
2. Goto `chrome://extensions/` and click 'Load Unpacked' button on that page.
3. It will ask for a directory where extension was downloaded. Select the path
   of `js-object-chrome-ext` directory.
4. Done!

## How to use?
Open developer tools and call console.download with object you are interested in.

## Credits
This extension is based on this stackoverflow answer: https://stackoverflow.com/a/49606202/1994640


## Demo
![](demo.gif)