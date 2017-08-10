const npmModuleRegEx = /@.+\..+\..+#/;

module.exports = function(identifier, moduleNames = []){
	if(!Array.isArray(moduleNames)) {
		let result;
		if((result = moduleNames[identifier]) !== undefined) {
			return result;
		}

		let keys = Object.keys(moduleNames);
    
		result = fuzzyNormalize(identifier, keys);

		if(result) {
			return moduleNames[result]; 
		}
	} else {
		return fuzzyNormalize(identifier, moduleNames);
	}
};

function fuzzyNormalize(identifier, keys) {
	let isMatch = id => identifier === id;

	for(let key of keys) {
		let match = findMatch(key, identifier);

		if(match) {
			return key;
		}
	}
}

function findMatch(moduleName, identifier) {
	// If it ends in a slash, go ahead and add that on
	if(identifier[identifier.length - 1] === "/") {
		let identifierParts = identifier.split("/");
		identifier += identifierParts[identifierParts.length - 2];
	}

	if(identifier === moduleName) {
		return true;
	}

	// Remove any npm bits
	moduleName = moduleName.replace(npmModuleRegEx, () => "/");

	if(moduleName === identifier) {
		return true;
	}

	// Remove the first part (package name) in case that's not used
	moduleName = moduleName.substr(moduleName.indexOf("/") + 1);

	if(moduleName === identifier) {
		return true;
	}
}
