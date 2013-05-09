var _ = require('underscore');
var sax = require("sax"),
	strict = true;


function Parser(str,cb) {  
		
	parser = new sax.parser(strict);

	var taglist = [];
	var xpath = [];

	parser.onerror = function (e) {
	  	  	  
	};

	parser.ontext = function (t) {
		
		if(typeof(taglist[taglist.length - 1]["value"]) == "undefined")
		taglist[taglist.length - 1]["value"] = "";

		taglist[taglist.length - 1]["value"] += t;

	};
	parser.onopentag = function (node) {
		
		if(typeof(xpath[xpath.length-1]) != "undefined")
			node['xpath'] = xpath[xpath.length-1];
		else
			node['xpath'] = "";
		node['level'] = xpath.length;
		taglist.push(node);
		xpath.push(node.name);		

	};

	parser.onclosetag = function(tag) {
				
		if(xpath[xpath.length - 1] == tag) {
			
			xpath.pop();
			
		}

	};

	parser.onend = function () {
		
	  cb(taglist);

	};
	
	try{
		
		parser.write(str).close();
	
	} 
	catch(e) {
		 
		console.log(e);
		cb(e);
	
	}
	
}


function differencer(obj1,obj2) {
	
	var A = _.clone(obj1);
	var B = _.clone(obj2);
	
	diff = [];
	
	for(i=0; i < A.length; i++) {
		
		found = 0;
		
		for(j=0; j < B.length; j++) {
			
			
			if(_.isEqual(A[i],B[j])) {
				
				B.splice(j, 1);
				found = 1;
			
			}
			
			
		}
		
		if(!found)
			diff.push(i);
		
		
	}
	
	return(diff);
	
}


module.exports = function(xml1,xml2,cb) { 

	Parser(xml1,function(k1){ 
		
		Parser(xml2,function(k2){ 
			
			var j = differencer(k1,k2);
			var k = differencer(k2,k1);
			
			fxml1 = formatxml(k1,j,"color:#A82400;background:#E5BDB2;text-decoration: line-through;");
			fxml2 = formatxml(k2,k,"background:#D1E1AD;color:#405A04;");		
			
			cb({"-":fxml1,"+":fxml2});
			
			
		});	
		
	});
	
}


function formatxml(xml,keys,style) {
	
	leveler = {};
	
	for(x in xml) {
		
		top = -1;
		if(typeof(leveler[xml[x].level]) == "undefined") {
			
			leveler[xml[x].level] = [];
							
		}
		
		if(keys.indexOf(parseInt(x)) != -1)			
			xml[x]["diff"] = true;
		
		
		if(xml[x].level > top)
			top = xml[x].level;
		
		leveler[xml[x].level].push(xml[x]);
		
	}
	
	format = "";
	
	for(x in leveler[0]) {
		
		format += buildnode(leveler[0][x],top,style);
		
	}
	
	return(format);
		
}

function nochilds(node,leveler) {

	d = 1;

	if(typeof(leveler) != "undefined"){
		
		for(x in leveler) {
		
			if(leveler[x].xpath == node)
				d = 0;			
		
		}
		
		return d;
	
	} else {
	
		return d;
	
	}

}


function buildnode(node,top,style) {
	
	attr = "";
	out = "";
	
	for(x in node.attributes) {
			
			attr += " "+x+"=&quot;"+node.attributes[x]+"&quot;";
			
	}
	
	if(node.level == top || nochilds(node.name,leveler[node.level+1])) {
	
		if(typeof(node.value)!="undefined") {
			
			out = "&lt;"+node.name+attr+"&gt;"+node.value+"&lt;/"+node.name+"&gt;\r\n";
			
		} else {
			
			out = "&lt;"+node.name+attr+" /&gt;\r\n";
			
		}
		
	} else {
	
		out = "&lt;"+node.name+attr+"&gt;\r\n"
		
		for(x in leveler[node.level+1]) {
			
			if(leveler[node.level+1][x].xpath == node.name)
			out += buildnode(leveler[node.level+1][x],top,style);

		}
		
		out += "&lt;/"+node.name+"&gt;\r\n"
				
	}
	
	if(typeof(node.diff) != "undefined")
		return "<span style=\""+style+"\">\r\n"+out+"</span>\r\n";
	else
		return out;
	
	
}
