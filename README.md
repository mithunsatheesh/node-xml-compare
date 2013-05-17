node-xml-compare
===========

xml compare is node.js package to compare two xml strings,
and generate their differences as a html encoded string sothat 
it could be directly duped into a code block in an html page.

Description
===========

xml compare is built on top of sax-js. 
[sax-js](https://github.com/isaacs/sax-js/).


Install
===========
It can be installed via.

`npm install node-xml-compare`



Usage
=====

To use this just pass the xml strings you want to compare into the xmlcompare variable.

```javascript
var xmlcompare = require('node-xml-compare');

xml1 = "<sample><a>1</a><a>2</a><a>4</a><b>4</b></sample>";
xml2 = "<sample><a>2</a><a>1</a><a>3</a><c>3</c></sample>";

xmlcompare(xml1, xml2, function(result) {

	//render result[-] to html page to show the xml1 nodes that are not in xml2
	//render result[+] to html page to show the xml2 nodes that are not in xml1

});


```

