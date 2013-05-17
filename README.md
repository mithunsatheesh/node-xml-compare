#[node-xml-compare](http://mithunsatheesh.github.io/node-xml-compare)

xml compare is a node.js package to compare two xml strings. 



##Description


xml compare is built on top of [sax-js](https://github.com/isaacs/sax-js/). It converts the input xml strings into json objects with the help of sax. Then It compares the json to calculate the difference between the parsed objects. The output is a json document with two attributes.

1. `-` : html encoded form of first xml string in which the nodes which are not in second xml are highlighted.
2. `+` : html encoded form of second xml string in which those additional nodes other than those in first are highlighted.


##Install

It can be installed via.

`npm install node-xml-compare`



##Usage


```javascript
var xmlcompare = require('node-xml-compare');

xml1 = '<?xml version="1.0"?>';
xml1 += '<catalog>';
xml1 += '<book id="bk101">';
xml1 += '<author>Gambardella, Matthew</author>';
xml1 += '<title>XML Developers Guide</title>';
xml1 += '<genre>Computer</genre>';
xml1 += '<price>44.95</price>';
xml1 += '<publish_date>2000-10-01</publish_date>';
xml1 += '<description>An in-depth look at creating applications with XML.</description>';
xml1 += '</book></catalog>';


xml2 = '<?xml version="1.0"?>';
xml2 += '<catalog>';
xml2 += '<book id="bk101">';
xml2 += '<author>Some one else</author>';
xml2 += '<title>XML Developers Guide</title>';
xml2 += '<genre>Computer</genre>';
xml2 += '<price>440.95</price>';
xml2 += '<publish_date>2000-10-01eee</publish_date>';
xml2 += '</book></catalog>';

xmlcompare(xml1, xml2, function(result) {

	
	//render result[-] to code blocks in html page to show the xml1 nodes that are not in xml2
	//render result[+] to code blocks in html page to show the xml2 nodes that are not in xml1


});

```
