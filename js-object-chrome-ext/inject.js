(function() {
	var scriptToInject = `// Define JSON.decycle function
	if (typeof window.JSON.decycle !== "function") {

		window.JSON.decycle = function decycle(object, replacer) {
			"use strict";

			var objects = new WeakMap();     // object to path mappings

			return (function derez(value, path) {


				var old_path;  
				var nu;  

				if (replacer !== undefined) {
					value = replacer(value);
				}

				if (
					typeof value === "object" && value !== null &&
					!(value instanceof Boolean) &&
					!(value instanceof Date) &&
					!(value instanceof Number) &&
					!(value instanceof RegExp) &&
					!(value instanceof String)
				) {


					old_path = objects.get(value);
					if (old_path !== undefined) {
						return {$ref: old_path};
					}

					objects.set(value, path);

					if (Array.isArray(value)) {
						nu = [];
						value.forEach(function (element, i) {
							nu[i] = derez(element, path + "[" + i + "]");
						});
					} else {

						nu = {};
						Object.keys(value).forEach(function (name) {
							nu[name] = derez(
								value[name],
								path + "[" + JSON.stringify(name) + "]"
							);
						});
					}
					return nu;
				}
				return value;
			}(object, "$"));
		};
		
	}


	if (typeof window.JSON.retrocycle !== "function") {
		
		window.JSON.retrocycle = function retrocycle($) {
			"use strict";

			var px = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\([\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;

			(function rez(value) {



				if (value && typeof value === "object") {
					if (Array.isArray(value)) {
						value.forEach(function (element, i) {
							if (typeof element === "object" && element !== null) {
								var path = element.$ref;
								if (typeof path === "string" && px.test(path)) {
									value[i] = eval(path);
								} else {
									rez(element);
								}
							}
						});
					} else {
						Object.keys(value).forEach(function (name) {
							var item = value[name];
							if (typeof item === "object" && item !== null) {
								var path = item.$ref;
								if (typeof path === "string" && px.test(path)) {
									value[name] = eval(path);
								} else {
									rez(item);
								}
							}
						});
					}
				}
			}($));
			return $;
		};
		
	}

	if (typeof window.console.download !== "function") {
		
		// define console.download method
		window.console.download = function(argObject, filename){
			let data = {...argObject};

			if(!data) {
				console.error('Console.download: No data')
				return;
			}

			data = JSON.decycle( data );
			
			if(!filename) filename = 'console.json'

			if(typeof data === "object"){
				data = JSON.stringify(data, undefined, 4)
			}

			var blob = new Blob([data], {type: 'text/json'}),
				e    = document.createEvent('MouseEvents'),
				a    = document.createElement('a')

			a.download = filename
			a.href = window.URL.createObjectURL(blob)
			a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
			e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
			a.dispatchEvent(e)
		}
			
	}`;
	var elt = document.createElement("script");
	elt.innerHTML = scriptToInject;
	document.head.appendChild(elt);
})();
