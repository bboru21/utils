function Utils() { }

Utils.httpGet = function(url, callback) {
	var callback = callback || function() {};

	var oReq = new XMLHttpRequest();
	oReq.onload = function() {
		callback( oReq.responseText );
	};
	oReq.open("get", url, true);
	oReq.send();
	return;
};

Utils.getScript = function(js, callback) {
	
	var callback = callback || function() {};
	
	var s = document.createElement("script");
	s.setAttribute("language","javascript");
	s.setAttribute("type","text/javascript");
	s.setAttribute("src", js);
	s.onload = callback;
	document.body.appendChild(s);
	return;
};

Utils.getTime = function() {
	return new Date().getTime();
};

Utils.log = function() {

	var elem = null;

	if (arguments.length > 0 && typeof arguments[0] === "string") {
		
		var selector = arguments[0];
		
		if (selector.indexOf("#") === 0) {
			elem = document.getElementById( selector.substr(1, selector.length));
		} else if (selector.indexOf(".") === 0) {
			elem = document.getElementsByClassName(selector.substr(1, selector.length))[0];
		}
	}
	
	if (!!elem) {
		var str = elem.innerHTML;
		elem.innerHTML = Array.prototype.slice.call(arguments, 1) + "\n" + str;
	} else {
		try {
			console.log.apply(console, arguments);
		} catch (e) {
			try {
				opera.postError.apply(opera, arguments);
			} catch(e) {
				alert(Array.prototype.join.call( arguments, " "));
			}
		}
	}
};

Utils.parseUri = function(key) {
	var val = null,
	search = window.location.search,
	search = search.substr(1,search.length);
	
	var arr1 = search.split("&"), i = arr1.length, arr2;
	while(i--) {
		arr2 = arr1[i].split("=");
		if (arr2[0] == key) { val = arr2[1]; break; }
	}
	return val;
};

Utils.forEach = function(list, callback) {
	for(var i = 0, len = list.length; i < len; i++) {
		callback.call(list[i], i);
	}
};

Utils.assert = function(value, desc) {
	var li = document.createElement("li");
	li.style.color = value ? "green" : "red";
	li.style.textDecoration = value ? "none" : "line-through";
	li.appendChild(document.createTextNode(desc));

	var results = document.getElementById("results");
	if (!results) {
		results = document.createElement("ul");
		results.setAttribute("id", "results");
		document.getElementsByTagName("body")[0].appendChild(results); 
	}
	
	results.appendChild(li);
};

Utils.isFunction = function(fn) {
	return Object.prototype.toString.call(fn) === "[object Function]";
};
