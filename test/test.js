var assert = require("assert");
var normalize = require("../lib/index.js");

describe("normalize()", function(){
	describe("Against arrays", function(){
		var moduleNames = [
			"app@1.0.0#home/home",
			"app@1.0.0#orders/orders",
			"app@1.0.0#cart/cart"
		];

		var variations = [
			"app@1.0.0#orders/orders",
			"app/orders/orders",
			"app/orders/",
			"orders/",
			"orders/orders"
		];

		it("All variations resolve correctly", function(){
			variations.forEach(function(identifier){
				var match = normalize(identifier, moduleNames);

				assert.equal(match, "app@1.0.0#orders/orders",
					`${identifier} did not resolve`);
			});
		});
	});


	describe("Against objects", function(){
		var orderAssets = {
			"dist/bundles/app/orders/orders":{}
		};

		var manifest = {
			"app@1.0.0#orders/orders": orderAssets
		};

		var variations = [
			"app@1.0.0#orders/orders",
			"app/orders/orders",
			"app/orders/",
			"orders/",
			"orders/orders"
		];

		it("All variations resolve correctly", function(){
			variations.forEach(function(identifier){
				var assets = normalize(identifier, manifest);

				assert.equal(assets, orderAssets,
					`${identifier} did not resolve`);
			});
		});
	});
});
