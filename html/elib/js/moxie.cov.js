/**
 * mOxie - multi-runtime File API & XMLHttpRequest L2 Polyfill
 * v1.2.1
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2014-05-14
 */
/**
 * Compiled inline version. (Library mode)
 */

/*jshint smarttabs:true, undef:true, latedef:true, curly:true, bitwise:true, camelcase:true */
/*globals $code */

(function(exports, undefined) {
	"use strict";

	var modules = {};

	function require(ids, callback) {
		var module, defs = [];

		for (var i = 0; i < ids.length; ++i) {
			module = modules[ids[i]] || resolve(ids[i]);
			if (!module) {
				throw 'module definition dependecy not found: ' + ids[i];
			}

			defs.push(module);
		}

		callback.apply(null, defs);
	}

	function define(id, dependencies, definition) {
		if (typeof id !== 'string') {
			throw 'invalid module definition, module id must be defined and be a string';
		}

		if (dependencies === undefined) {
			throw 'invalid module definition, dependencies must be specified';
		}

		if (definition === undefined) {
			throw 'invalid module definition, definition function must be specified';
		}

		require(dependencies, function() {
			modules[id] = definition.apply(null, arguments);
		});
	}

	function defined(id) {
		return !!modules[id];
	}

	function resolve(id) {
		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length; ++fi) {
			if (!target[fragments[fi]]) {
				return;
			}

			target = target[fragments[fi]];
		}

		return target;
	}

	function expose(ids) {
		for (var i = 0; i < ids.length; i++) {
			var target = exports;
			var id = ids[i];
			var fragments = id.split(/[.\/]/);

			for (var fi = 0; fi < fragments.length - 1; ++fi) {
				if (target[fragments[fi]] === undefined) {
					target[fragments[fi]] = {};
				}

				target = target[fragments[fi]];
			}

			target[fragments[fragments.length - 1]] = modules[id];
		}
	}

// Included from: src/javascript/core/utils/Basic.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/core/utils/Basic.js", "/**\n * Basic.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/core/utils/Basic', [], function() {\n\t/**\n\tGets the true type of the built-in object (better version of typeof).\n\t@author Angus Croll (http://javascriptweblog.wordpress.com/)\n\n\t@method typeOf\n\t@for Utils\n\t@static\n\t@param {Object} o Object to check.\n\t@return {String} Object [[Class]]\n\t*/\n\tvar typeOf = function(o) {\n\t\tvar undef;\n\n\t\tif (o === undef) {\n\t\t\treturn 'undefined';\n\t\t} else if (o === null) {\n\t\t\treturn 'null';\n\t\t} else if (o.nodeType) {\n\t\t\treturn 'node';\n\t\t}\n\n\t\t// the snippet below is awesome, however it fails to detect null, undefined and arguments types in IE lte 8\n\t\treturn ({}).toString.call(o).match(/\\s([a-z|A-Z]+)/)[1].toLowerCase();\n\t};\n\t\t\n\t/**\n\tExtends the specified object with another object.\n\n\t@method extend\n\t@static\n\t@param {Object} target Object to extend.\n\t@param {Object} [obj]* Multiple objects to extend with.\n\t@return {Object} Same as target, the extended object.\n\t*/\n\tvar extend = function(target) {\n\t\tvar undef;\n\n\t\teach(arguments, function(arg, i) {\n\t\t\tif (i > 0) {\n\t\t\t\teach(arg, function(value, key) {\n\t\t\t\t\tif (value !== undef) {\n\t\t\t\t\t\tif (typeOf(target[key]) === typeOf(value) && !!~inArray(typeOf(value), ['array', 'object'])) {\n\t\t\t\t\t\t\textend(target[key], value);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\ttarget[key] = value;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t});\n\t\treturn target;\n\t};\n\t\t\n\t/**\n\tExecutes the callback function for each item in array/object. If you return false in the\n\tcallback it will break the loop.\n\n\t@method each\n\t@static\n\t@param {Object} obj Object to iterate.\n\t@param {function} callback Callback function to execute for each item.\n\t*/\n\tvar each = function(obj, callback) {\n\t\tvar length, key, i, undef;\n\n\t\tif (obj) {\n\t\t\ttry {\n\t\t\t\tlength = obj.length;\n\t\t\t} catch(ex) {\n\t\t\t\tlength = undef;\n\t\t\t}\n\n\t\t\tif (length === undef) {\n\t\t\t\t// Loop object items\n\t\t\t\tfor (key in obj) {\n\t\t\t\t\tif (obj.hasOwnProperty(key)) {\n\t\t\t\t\t\tif (callback(obj[key], key) === false) {\n\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\t// Loop array items\n\t\t\t\tfor (i = 0; i < length; i++) {\n\t\t\t\t\tif (callback(obj[i], i) === false) {\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n\n\t/**\n\tChecks if object is empty.\n\t\n\t@method isEmptyObj\n\t@static\n\t@param {Object} o Object to check.\n\t@return {Boolean}\n\t*/\n\tvar isEmptyObj = function(obj) {\n\t\tvar prop;\n\n\t\tif (!obj || typeOf(obj) !== 'object') {\n\t\t\treturn true;\n\t\t}\n\n\t\tfor (prop in obj) {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t};\n\n\t/**\n\tRecieve an array of functions (usually async) to call in sequence, each  function\n\treceives a callback as first argument that it should call, when it completes. Finally,\n\tafter everything is complete, main callback is called. Passing truthy value to the\n\tcallback as a first argument will interrupt the sequence and invoke main callback\n\timmediately.\n\n\t@method inSeries\n\t@static\n\t@param {Array} queue Array of functions to call in sequence\n\t@param {Function} cb Main callback that is called in the end, or in case of error\n\t*/\n\tvar inSeries = function(queue, cb) {\n\t\tvar i = 0, length = queue.length;\n\n\t\tif (typeOf(cb) !== 'function') {\n\t\t\tcb = function() {};\n\t\t}\n\n\t\tif (!queue || !queue.length) {\n\t\t\tcb();\n\t\t}\n\n\t\tfunction callNext(i) {\n\t\t\tif (typeOf(queue[i]) === 'function') {\n\t\t\t\tqueue[i](function(error) {\n\t\t\t\t\t/*jshint expr:true */\n\t\t\t\t\t++i < length && !error ? callNext(i) : cb(error);\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t\tcallNext(i);\n\t};\n\n\n\t/**\n\tRecieve an array of functions (usually async) to call in parallel, each  function\n\treceives a callback as first argument that it should call, when it completes. After \n\teverything is complete, main callback is called. Passing truthy value to the\n\tcallback as a first argument will interrupt the process and invoke main callback\n\timmediately.\n\n\t@method inParallel\n\t@static\n\t@param {Array} queue Array of functions to call in sequence\n\t@param {Function} cb Main callback that is called in the end, or in case of erro\n\t*/\n\tvar inParallel = function(queue, cb) {\n\t\tvar count = 0, num = queue.length, cbArgs = new Array(num);\n\n\t\teach(queue, function(fn, i) {\n\t\t\tfn(function(error) {\n\t\t\t\tif (error) {\n\t\t\t\t\treturn cb(error);\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tvar args = [].slice.call(arguments);\n\t\t\t\targs.shift(); // strip error - undefined or not\n\n\t\t\t\tcbArgs[i] = args;\n\t\t\t\tcount++;\n\n\t\t\t\tif (count === num) {\n\t\t\t\t\tcbArgs.unshift(null);\n\t\t\t\t\tcb.apply(this, cbArgs);\n\t\t\t\t} \n\t\t\t});\n\t\t});\n\t};\n\t\n\t\n\t/**\n\tFind an element in array and return it's index if present, otherwise return -1.\n\t\n\t@method inArray\n\t@static\n\t@param {Mixed} needle Element to find\n\t@param {Array} array\n\t@return {Int} Index of the element, or -1 if not found\n\t*/\n\tvar inArray = function(needle, array) {\n\t\tif (array) {\n\t\t\tif (Array.prototype.indexOf) {\n\t\t\t\treturn Array.prototype.indexOf.call(array, needle);\n\t\t\t}\n\t\t\n\t\t\tfor (var i = 0, length = array.length; i < length; i++) {\n\t\t\t\tif (array[i] === needle) {\n\t\t\t\t\treturn i;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn -1;\n\t};\n\n\n\t/**\n\tReturns elements of first array if they are not present in second. And false - otherwise.\n\n\t@private\n\t@method arrayDiff\n\t@param {Array} needles\n\t@param {Array} array\n\t@return {Array|Boolean}\n\t*/\n\tvar arrayDiff = function(needles, array) {\n\t\tvar diff = [];\n\n\t\tif (typeOf(needles) !== 'array') {\n\t\t\tneedles = [needles];\n\t\t}\n\n\t\tif (typeOf(array) !== 'array') {\n\t\t\tarray = [array];\n\t\t}\n\n\t\tfor (var i in needles) {\n\t\t\tif (inArray(needles[i], array) === -1) {\n\t\t\t\tdiff.push(needles[i]);\n\t\t\t}\t\n\t\t}\n\t\treturn diff.length ? diff : false;\n\t};\n\n\n\t/**\n\tFind intersection of two arrays.\n\n\t@private\n\t@method arrayIntersect\n\t@param {Array} array1\n\t@param {Array} array2\n\t@return {Array} Intersection of two arrays or null if there is none\n\t*/\n\tvar arrayIntersect = function(array1, array2) {\n\t\tvar result = [];\n\t\teach(array1, function(item) {\n\t\t\tif (inArray(item, array2) !== -1) {\n\t\t\t\tresult.push(item);\n\t\t\t}\n\t\t});\n\t\treturn result.length ? result : null;\n\t};\n\t\n\t\n\t/**\n\tForces anything into an array.\n\t\n\t@method toArray\n\t@static\n\t@param {Object} obj Object with length field.\n\t@return {Array} Array object containing all items.\n\t*/\n\tvar toArray = function(obj) {\n\t\tvar i, arr = [];\n\n\t\tfor (i = 0; i < obj.length; i++) {\n\t\t\tarr[i] = obj[i];\n\t\t}\n\n\t\treturn arr;\n\t};\n\t\n\t\t\t\n\t/**\n\tGenerates an unique ID. The only way a user would be able to get the same ID is if the two persons\n\tat the same exact millisecond manage to get the same 5 random numbers between 0-65535; it also uses \n\ta counter so each ID is guaranteed to be unique for the given page. It is more probable for the earth \n\tto be hit with an asteroid.\n\t\n\t@method guid\n\t@static\n\t@param {String} prefix to prepend (by default 'o' will be prepended).\n\t@method guid\n\t@return {String} Virtually unique id.\n\t*/\n\tvar guid = (function() {\n\t\tvar counter = 0;\n\t\t\n\t\treturn function(prefix) {\n\t\t\tvar guid = new Date().getTime().toString(32), i;\n\n\t\t\tfor (i = 0; i < 5; i++) {\n\t\t\t\tguid += Math.floor(Math.random() * 65535).toString(32);\n\t\t\t}\n\t\t\t\n\t\t\treturn (prefix || 'o_') + guid + (counter++).toString(32);\n\t\t};\n\t}());\n\t\n\n\t/**\n\tTrims white spaces around the string\n\t\n\t@method trim\n\t@static\n\t@param {String} str\n\t@return {String}\n\t*/\n\tvar trim = function(str) {\n\t\tif (!str) {\n\t\t\treturn str;\n\t\t}\n\t\treturn String.prototype.trim ? String.prototype.trim.call(str) : str.toString().replace(/^\\s*/, '').replace(/\\s*$/, '');\n\t};\n\n\n\t/**\n\tParses the specified size string into a byte value. For example 10kb becomes 10240.\n\t\n\t@method parseSizeStr\n\t@static\n\t@param {String/Number} size String to parse or number to just pass through.\n\t@return {Number} Size in bytes.\n\t*/\n\tvar parseSizeStr = function(size) {\n\t\tif (typeof(size) !== 'string') {\n\t\t\treturn size;\n\t\t}\n\t\t\n\t\tvar muls = {\n\t\t\t\tt: 1099511627776,\n\t\t\t\tg: 1073741824,\n\t\t\t\tm: 1048576,\n\t\t\t\tk: 1024\n\t\t\t},\n\t\t\tmul;\n\n\t\tsize = /^([0-9]+)([mgk]?)$/.exec(size.toLowerCase().replace(/[^0-9mkg]/g, ''));\n\t\tmul = size[2];\n\t\tsize = +size[1];\n\t\t\n\t\tif (muls.hasOwnProperty(mul)) {\n\t\t\tsize *= muls[mul];\n\t\t}\n\t\treturn size;\n\t};\n\n\n\t/**\n\t * Pseudo sprintf implementation - simple way to replace tokens with specified values.\n\t *\n\t * @param {String} str String with tokens\n\t * @return {String} String with replaced tokens\n\t */\n\tvar sprintf = function(str) {\n\t\tvar args = [].slice.call(arguments, 1);\n\n\t\treturn str.replace(/%[a-z]/g, function() {\n\t\t\tvar value = args.shift();\n\t\t\treturn typeOf(value) !== 'undefined' ? value : '';\n\t\t});\n\t};\n\t\n\n\treturn {\n\t\tguid: guid,\n\t\ttypeOf: typeOf,\n\t\textend: extend,\n\t\teach: each,\n\t\tisEmptyObj: isEmptyObj,\n\t\tinSeries: inSeries,\n\t\tinParallel: inParallel,\n\t\tinArray: inArray,\n\t\tarrayDiff: arrayDiff,\n\t\tarrayIntersect: arrayIntersect,\n\t\ttoArray: toArray,\n\t\ttrim: trim,\n\t\tsprintf: sprintf,\n\t\tparseSizeStr: parseSizeStr\n\t};\n});\n");
__$coverInitRange("src/javascript/core/utils/Basic.js", "196:8736");
__$coverInitRange("src/javascript/core/utils/Basic.js", "498:863");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1109:1505");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1780:2282");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2409:2579");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3116:3514");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4044:4486");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4728:5018");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5224:5558");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5756:5970");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6145:6273");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6775:7073");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7190:7375");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7617:8008");
__$coverInitRange("src/javascript/core/utils/Basic.js", "8207:8416");
__$coverInitRange("src/javascript/core/utils/Basic.js", "8422:8732");
__$coverInitRange("src/javascript/core/utils/Basic.js", "527:536");
__$coverInitRange("src/javascript/core/utils/Basic.js", "541:675");
__$coverInitRange("src/javascript/core/utils/Basic.js", "790:859");
__$coverInitRange("src/javascript/core/utils/Basic.js", "563:581");
__$coverInitRange("src/javascript/core/utils/Basic.js", "613:626");
__$coverInitRange("src/javascript/core/utils/Basic.js", "658:671");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1143:1152");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1157:1484");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1488:1501");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1195:1478");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1212:1473");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1250:1465");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1279:1458");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1381:1407");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1431:1450");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1819:1844");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1849:2278");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1863:1934");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1940:2274");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1873:1892");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1915:1929");
__$coverInitRange("src/javascript/core/utils/Basic.js", "1993:2129");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2017:2123");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2054:2116");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2102:2108");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2171:2269");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2207:2263");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2250:2256");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2444:2452");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2457:2515");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2520:2559");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2564:2575");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2500:2511");
__$coverInitRange("src/javascript/core/utils/Basic.js", "2543:2555");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3155:3187");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3192:3250");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3255:3297");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3302:3495");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3499:3510");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3228:3246");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3289:3293");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3328:3491");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3371:3486");
__$coverInitRange("src/javascript/core/utils/Basic.js", "3430:3478");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4085:4143");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4148:4482");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4181:4476");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4206:4246");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4257:4292");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4298:4310");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4351:4367");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4373:4380");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4387:4468");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4224:4240");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4413:4433");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4440:4462");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4770:5001");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5005:5014");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4786:4876");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4884:4997");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4821:4871");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4946:4992");
__$coverInitRange("src/javascript/core/utils/Basic.js", "4978:4986");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5269:5282");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5287:5348");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5353:5408");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5413:5517");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5521:5554");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5325:5344");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5389:5404");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5441:5512");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5486:5507");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5806:5821");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5825:5926");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5930:5966");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5858:5920");
__$coverInitRange("src/javascript/core/utils/Basic.js", "5898:5915");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6177:6192");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6197:6254");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6259:6269");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6235:6250");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6802:6817");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6824:7066");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6853:6900");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6906:6995");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7004:7061");
__$coverInitRange("src/javascript/core/utils/Basic.js", "6936:6990");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7219:7248");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7252:7371");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7234:7244");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7655:7706");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7713:7807");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7812:7890");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7894:7907");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7911:7926");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7933:7989");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7993:8004");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7691:7702");
__$coverInitRange("src/javascript/core/utils/Basic.js", "7968:7985");
__$coverInitRange("src/javascript/core/utils/Basic.js", "8239:8277");
__$coverInitRange("src/javascript/core/utils/Basic.js", "8282:8412");
__$coverInitRange("src/javascript/core/utils/Basic.js", "8328:8352");
__$coverInitRange("src/javascript/core/utils/Basic.js", "8357:8406");
__$coverCall('src/javascript/core/utils/Basic.js', '196:8736');
define('moxie/core/utils/Basic', [], function () {
    __$coverCall('src/javascript/core/utils/Basic.js', '498:863');
    var typeOf = function (o) {
        __$coverCall('src/javascript/core/utils/Basic.js', '527:536');
        var undef;
        __$coverCall('src/javascript/core/utils/Basic.js', '541:675');
        if (o === undef) {
            __$coverCall('src/javascript/core/utils/Basic.js', '563:581');
            return 'undefined';
        } else if (o === null) {
            __$coverCall('src/javascript/core/utils/Basic.js', '613:626');
            return 'null';
        } else if (o.nodeType) {
            __$coverCall('src/javascript/core/utils/Basic.js', '658:671');
            return 'node';
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '790:859');
        return {}.toString.call(o).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '1109:1505');
    var extend = function (target) {
        __$coverCall('src/javascript/core/utils/Basic.js', '1143:1152');
        var undef;
        __$coverCall('src/javascript/core/utils/Basic.js', '1157:1484');
        each(arguments, function (arg, i) {
            __$coverCall('src/javascript/core/utils/Basic.js', '1195:1478');
            if (i > 0) {
                __$coverCall('src/javascript/core/utils/Basic.js', '1212:1473');
                each(arg, function (value, key) {
                    __$coverCall('src/javascript/core/utils/Basic.js', '1250:1465');
                    if (value !== undef) {
                        __$coverCall('src/javascript/core/utils/Basic.js', '1279:1458');
                        if (typeOf(target[key]) === typeOf(value) && !!~inArray(typeOf(value), [
                                'array',
                                'object'
                            ])) {
                            __$coverCall('src/javascript/core/utils/Basic.js', '1381:1407');
                            extend(target[key], value);
                        } else {
                            __$coverCall('src/javascript/core/utils/Basic.js', '1431:1450');
                            target[key] = value;
                        }
                    }
                });
            }
        });
        __$coverCall('src/javascript/core/utils/Basic.js', '1488:1501');
        return target;
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '1780:2282');
    var each = function (obj, callback) {
        __$coverCall('src/javascript/core/utils/Basic.js', '1819:1844');
        var length, key, i, undef;
        __$coverCall('src/javascript/core/utils/Basic.js', '1849:2278');
        if (obj) {
            __$coverCall('src/javascript/core/utils/Basic.js', '1863:1934');
            try {
                __$coverCall('src/javascript/core/utils/Basic.js', '1873:1892');
                length = obj.length;
            } catch (ex) {
                __$coverCall('src/javascript/core/utils/Basic.js', '1915:1929');
                length = undef;
            }
            __$coverCall('src/javascript/core/utils/Basic.js', '1940:2274');
            if (length === undef) {
                __$coverCall('src/javascript/core/utils/Basic.js', '1993:2129');
                for (key in obj) {
                    __$coverCall('src/javascript/core/utils/Basic.js', '2017:2123');
                    if (obj.hasOwnProperty(key)) {
                        __$coverCall('src/javascript/core/utils/Basic.js', '2054:2116');
                        if (callback(obj[key], key) === false) {
                            __$coverCall('src/javascript/core/utils/Basic.js', '2102:2108');
                            return;
                        }
                    }
                }
            } else {
                __$coverCall('src/javascript/core/utils/Basic.js', '2171:2269');
                for (i = 0; i < length; i++) {
                    __$coverCall('src/javascript/core/utils/Basic.js', '2207:2263');
                    if (callback(obj[i], i) === false) {
                        __$coverCall('src/javascript/core/utils/Basic.js', '2250:2256');
                        return;
                    }
                }
            }
        }
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '2409:2579');
    var isEmptyObj = function (obj) {
        __$coverCall('src/javascript/core/utils/Basic.js', '2444:2452');
        var prop;
        __$coverCall('src/javascript/core/utils/Basic.js', '2457:2515');
        if (!obj || typeOf(obj) !== 'object') {
            __$coverCall('src/javascript/core/utils/Basic.js', '2500:2511');
            return true;
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '2520:2559');
        for (prop in obj) {
            __$coverCall('src/javascript/core/utils/Basic.js', '2543:2555');
            return false;
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '2564:2575');
        return true;
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '3116:3514');
    var inSeries = function (queue, cb) {
        __$coverCall('src/javascript/core/utils/Basic.js', '3155:3187');
        var i = 0, length = queue.length;
        __$coverCall('src/javascript/core/utils/Basic.js', '3192:3250');
        if (typeOf(cb) !== 'function') {
            __$coverCall('src/javascript/core/utils/Basic.js', '3228:3246');
            cb = function () {
            };
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '3255:3297');
        if (!queue || !queue.length) {
            __$coverCall('src/javascript/core/utils/Basic.js', '3289:3293');
            cb();
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '3302:3495');
        function callNext(i) {
            __$coverCall('src/javascript/core/utils/Basic.js', '3328:3491');
            if (typeOf(queue[i]) === 'function') {
                __$coverCall('src/javascript/core/utils/Basic.js', '3371:3486');
                queue[i](function (error) {
                    __$coverCall('src/javascript/core/utils/Basic.js', '3430:3478');
                    ++i < length && !error ? callNext(i) : cb(error);
                });
            }
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '3499:3510');
        callNext(i);
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '4044:4486');
    var inParallel = function (queue, cb) {
        __$coverCall('src/javascript/core/utils/Basic.js', '4085:4143');
        var count = 0, num = queue.length, cbArgs = new Array(num);
        __$coverCall('src/javascript/core/utils/Basic.js', '4148:4482');
        each(queue, function (fn, i) {
            __$coverCall('src/javascript/core/utils/Basic.js', '4181:4476');
            fn(function (error) {
                __$coverCall('src/javascript/core/utils/Basic.js', '4206:4246');
                if (error) {
                    __$coverCall('src/javascript/core/utils/Basic.js', '4224:4240');
                    return cb(error);
                }
                __$coverCall('src/javascript/core/utils/Basic.js', '4257:4292');
                var args = [].slice.call(arguments);
                __$coverCall('src/javascript/core/utils/Basic.js', '4298:4310');
                args.shift();
                __$coverCall('src/javascript/core/utils/Basic.js', '4351:4367');
                cbArgs[i] = args;
                __$coverCall('src/javascript/core/utils/Basic.js', '4373:4380');
                count++;
                __$coverCall('src/javascript/core/utils/Basic.js', '4387:4468');
                if (count === num) {
                    __$coverCall('src/javascript/core/utils/Basic.js', '4413:4433');
                    cbArgs.unshift(null);
                    __$coverCall('src/javascript/core/utils/Basic.js', '4440:4462');
                    cb.apply(this, cbArgs);
                }
            });
        });
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '4728:5018');
    var inArray = function (needle, array) {
        __$coverCall('src/javascript/core/utils/Basic.js', '4770:5001');
        if (array) {
            __$coverCall('src/javascript/core/utils/Basic.js', '4786:4876');
            if (Array.prototype.indexOf) {
                __$coverCall('src/javascript/core/utils/Basic.js', '4821:4871');
                return Array.prototype.indexOf.call(array, needle);
            }
            __$coverCall('src/javascript/core/utils/Basic.js', '4884:4997');
            for (var i = 0, length = array.length; i < length; i++) {
                __$coverCall('src/javascript/core/utils/Basic.js', '4946:4992');
                if (array[i] === needle) {
                    __$coverCall('src/javascript/core/utils/Basic.js', '4978:4986');
                    return i;
                }
            }
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '5005:5014');
        return -1;
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '5224:5558');
    var arrayDiff = function (needles, array) {
        __$coverCall('src/javascript/core/utils/Basic.js', '5269:5282');
        var diff = [];
        __$coverCall('src/javascript/core/utils/Basic.js', '5287:5348');
        if (typeOf(needles) !== 'array') {
            __$coverCall('src/javascript/core/utils/Basic.js', '5325:5344');
            needles = [needles];
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '5353:5408');
        if (typeOf(array) !== 'array') {
            __$coverCall('src/javascript/core/utils/Basic.js', '5389:5404');
            array = [array];
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '5413:5517');
        for (var i in needles) {
            __$coverCall('src/javascript/core/utils/Basic.js', '5441:5512');
            if (inArray(needles[i], array) === -1) {
                __$coverCall('src/javascript/core/utils/Basic.js', '5486:5507');
                diff.push(needles[i]);
            }
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '5521:5554');
        return diff.length ? diff : false;
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '5756:5970');
    var arrayIntersect = function (array1, array2) {
        __$coverCall('src/javascript/core/utils/Basic.js', '5806:5821');
        var result = [];
        __$coverCall('src/javascript/core/utils/Basic.js', '5825:5926');
        each(array1, function (item) {
            __$coverCall('src/javascript/core/utils/Basic.js', '5858:5920');
            if (inArray(item, array2) !== -1) {
                __$coverCall('src/javascript/core/utils/Basic.js', '5898:5915');
                result.push(item);
            }
        });
        __$coverCall('src/javascript/core/utils/Basic.js', '5930:5966');
        return result.length ? result : null;
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '6145:6273');
    var toArray = function (obj) {
        __$coverCall('src/javascript/core/utils/Basic.js', '6177:6192');
        var i, arr = [];
        __$coverCall('src/javascript/core/utils/Basic.js', '6197:6254');
        for (i = 0; i < obj.length; i++) {
            __$coverCall('src/javascript/core/utils/Basic.js', '6235:6250');
            arr[i] = obj[i];
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '6259:6269');
        return arr;
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '6775:7073');
    var guid = function () {
            __$coverCall('src/javascript/core/utils/Basic.js', '6802:6817');
            var counter = 0;
            __$coverCall('src/javascript/core/utils/Basic.js', '6824:7066');
            return function (prefix) {
                __$coverCall('src/javascript/core/utils/Basic.js', '6853:6900');
                var guid = new Date().getTime().toString(32), i;
                __$coverCall('src/javascript/core/utils/Basic.js', '6906:6995');
                for (i = 0; i < 5; i++) {
                    __$coverCall('src/javascript/core/utils/Basic.js', '6936:6990');
                    guid += Math.floor(Math.random() * 65535).toString(32);
                }
                __$coverCall('src/javascript/core/utils/Basic.js', '7004:7061');
                return (prefix || 'o_') + guid + (counter++).toString(32);
            };
        }();
    __$coverCall('src/javascript/core/utils/Basic.js', '7190:7375');
    var trim = function (str) {
        __$coverCall('src/javascript/core/utils/Basic.js', '7219:7248');
        if (!str) {
            __$coverCall('src/javascript/core/utils/Basic.js', '7234:7244');
            return str;
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '7252:7371');
        return String.prototype.trim ? String.prototype.trim.call(str) : str.toString().replace(/^\s*/, '').replace(/\s*$/, '');
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '7617:8008');
    var parseSizeStr = function (size) {
        __$coverCall('src/javascript/core/utils/Basic.js', '7655:7706');
        if (typeof size !== 'string') {
            __$coverCall('src/javascript/core/utils/Basic.js', '7691:7702');
            return size;
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '7713:7807');
        var muls = {
                t: 1099511627776,
                g: 1073741824,
                m: 1048576,
                k: 1024
            }, mul;
        __$coverCall('src/javascript/core/utils/Basic.js', '7812:7890');
        size = /^([0-9]+)([mgk]?)$/.exec(size.toLowerCase().replace(/[^0-9mkg]/g, ''));
        __$coverCall('src/javascript/core/utils/Basic.js', '7894:7907');
        mul = size[2];
        __$coverCall('src/javascript/core/utils/Basic.js', '7911:7926');
        size = +size[1];
        __$coverCall('src/javascript/core/utils/Basic.js', '7933:7989');
        if (muls.hasOwnProperty(mul)) {
            __$coverCall('src/javascript/core/utils/Basic.js', '7968:7985');
            size *= muls[mul];
        }
        __$coverCall('src/javascript/core/utils/Basic.js', '7993:8004');
        return size;
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '8207:8416');
    var sprintf = function (str) {
        __$coverCall('src/javascript/core/utils/Basic.js', '8239:8277');
        var args = [].slice.call(arguments, 1);
        __$coverCall('src/javascript/core/utils/Basic.js', '8282:8412');
        return str.replace(/%[a-z]/g, function () {
            __$coverCall('src/javascript/core/utils/Basic.js', '8328:8352');
            var value = args.shift();
            __$coverCall('src/javascript/core/utils/Basic.js', '8357:8406');
            return typeOf(value) !== 'undefined' ? value : '';
        });
    };
    __$coverCall('src/javascript/core/utils/Basic.js', '8422:8732');
    return {
        guid: guid,
        typeOf: typeOf,
        extend: extend,
        each: each,
        isEmptyObj: isEmptyObj,
        inSeries: inSeries,
        inParallel: inParallel,
        inArray: inArray,
        arrayDiff: arrayDiff,
        arrayIntersect: arrayIntersect,
        toArray: toArray,
        trim: trim,
        sprintf: sprintf,
        parseSizeStr: parseSizeStr
    };
});

// Included from: src/javascript/core/utils/Env.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/core/utils/Env.js", "/**\n * Env.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine(\"moxie/core/utils/Env\", [\n\t\"moxie/core/utils/Basic\"\n], function(Basic) {\n\t\n\t// UAParser.js v0.6.2\n\t// Lightweight JavaScript-based User-Agent string parser\n\t// https://github.com/faisalman/ua-parser-js\n\t//\n\t// Copyright © 2012-2013 Faisalman <fyzlman@gmail.com>\n\t// Dual licensed under GPLv2 & MIT\n\n\tvar UAParser = (function (undefined) {\n\n\t    //////////////\n\t    // Constants\n\t    /////////////\n\n\n\t    var EMPTY       = '',\n\t        UNKNOWN     = '?',\n\t        FUNC_TYPE   = 'function',\n\t        UNDEF_TYPE  = 'undefined',\n\t        OBJ_TYPE    = 'object',\n\t        MAJOR       = 'major',\n\t        MODEL       = 'model',\n\t        NAME        = 'name',\n\t        TYPE        = 'type',\n\t        VENDOR      = 'vendor',\n\t        VERSION     = 'version',\n\t        ARCHITECTURE= 'architecture',\n\t        CONSOLE     = 'console',\n\t        MOBILE      = 'mobile',\n\t        TABLET      = 'tablet';\n\n\n\t    ///////////\n\t    // Helper\n\t    //////////\n\n\n\t    var util = {\n\t        has : function (str1, str2) {\n\t            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;\n\t        },\n\t        lowerize : function (str) {\n\t            return str.toLowerCase();\n\t        }\n\t    };\n\n\n\t    ///////////////\n\t    // Map helper\n\t    //////////////\n\n\n\t    var mapper = {\n\n\t        rgx : function () {\n\n\t            // loop through all regexes maps\n\t            for (var result, i = 0, j, k, p, q, matches, match, args = arguments; i < args.length; i += 2) {\n\n\t                var regex = args[i],       // even sequence (0,2,4,..)\n\t                    props = args[i + 1];   // odd sequence (1,3,5,..)\n\n\t                // construct object barebones\n\t                if (typeof(result) === UNDEF_TYPE) {\n\t                    result = {};\n\t                    for (p in props) {\n\t                        q = props[p];\n\t                        if (typeof(q) === OBJ_TYPE) {\n\t                            result[q[0]] = undefined;\n\t                        } else {\n\t                            result[q] = undefined;\n\t                        }\n\t                    }\n\t                }\n\n\t                // try matching uastring with regexes\n\t                for (j = k = 0; j < regex.length; j++) {\n\t                    matches = regex[j].exec(this.getUA());\n\t                    if (!!matches) {\n\t                        for (p = 0; p < props.length; p++) {\n\t                            match = matches[++k];\n\t                            q = props[p];\n\t                            // check if given property is actually array\n\t                            if (typeof(q) === OBJ_TYPE && q.length > 0) {\n\t                                if (q.length == 2) {\n\t                                    if (typeof(q[1]) == FUNC_TYPE) {\n\t                                        // assign modified match\n\t                                        result[q[0]] = q[1].call(this, match);\n\t                                    } else {\n\t                                        // assign given value, ignore regex match\n\t                                        result[q[0]] = q[1];\n\t                                    }\n\t                                } else if (q.length == 3) {\n\t                                    // check whether function or regex\n\t                                    if (typeof(q[1]) === FUNC_TYPE && !(q[1].exec && q[1].test)) {\n\t                                        // call function (usually string mapper)\n\t                                        result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;\n\t                                    } else {\n\t                                        // sanitize match using given regex\n\t                                        result[q[0]] = match ? match.replace(q[1], q[2]) : undefined;\n\t                                    }\n\t                                } else if (q.length == 4) {\n\t                                        result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;\n\t                                }\n\t                            } else {\n\t                                result[q] = match ? match : undefined;\n\t                            }\n\t                        }\n\t                        break;\n\t                    }\n\t                }\n\n\t                if(!!matches) break; // break the loop immediately if match found\n\t            }\n\t            return result;\n\t        },\n\n\t        str : function (str, map) {\n\n\t            for (var i in map) {\n\t                // check if array\n\t                if (typeof(map[i]) === OBJ_TYPE && map[i].length > 0) {\n\t                    for (var j = 0; j < map[i].length; j++) {\n\t                        if (util.has(map[i][j], str)) {\n\t                            return (i === UNKNOWN) ? undefined : i;\n\t                        }\n\t                    }\n\t                } else if (util.has(map[i], str)) {\n\t                    return (i === UNKNOWN) ? undefined : i;\n\t                }\n\t            }\n\t            return str;\n\t        }\n\t    };\n\n\n\t    ///////////////\n\t    // String map\n\t    //////////////\n\n\n\t    var maps = {\n\n\t        browser : {\n\t            oldsafari : {\n\t                major : {\n\t                    '1' : ['/8', '/1', '/3'],\n\t                    '2' : '/4',\n\t                    '?' : '/'\n\t                },\n\t                version : {\n\t                    '1.0'   : '/8',\n\t                    '1.2'   : '/1',\n\t                    '1.3'   : '/3',\n\t                    '2.0'   : '/412',\n\t                    '2.0.2' : '/416',\n\t                    '2.0.3' : '/417',\n\t                    '2.0.4' : '/419',\n\t                    '?'     : '/'\n\t                }\n\t            }\n\t        },\n\n\t        device : {\n\t            sprint : {\n\t                model : {\n\t                    'Evo Shift 4G' : '7373KT'\n\t                },\n\t                vendor : {\n\t                    'HTC'       : 'APA',\n\t                    'Sprint'    : 'Sprint'\n\t                }\n\t            }\n\t        },\n\n\t        os : {\n\t            windows : {\n\t                version : {\n\t                    'ME'        : '4.90',\n\t                    'NT 3.11'   : 'NT3.51',\n\t                    'NT 4.0'    : 'NT4.0',\n\t                    '2000'      : 'NT 5.0',\n\t                    'XP'        : ['NT 5.1', 'NT 5.2'],\n\t                    'Vista'     : 'NT 6.0',\n\t                    '7'         : 'NT 6.1',\n\t                    '8'         : 'NT 6.2',\n\t                    '8.1'       : 'NT 6.3',\n\t                    'RT'        : 'ARM'\n\t                }\n\t            }\n\t        }\n\t    };\n\n\n\t    //////////////\n\t    // Regex map\n\t    /////////////\n\n\n\t    var regexes = {\n\n\t        browser : [[\n\n\t            // Presto based\n\t            /(opera\\smini)\\/((\\d+)?[\\w\\.-]+)/i,                                 // Opera Mini\n\t            /(opera\\s[mobiletab]+).+version\\/((\\d+)?[\\w\\.-]+)/i,                // Opera Mobi/Tablet\n\t            /(opera).+version\\/((\\d+)?[\\w\\.]+)/i,                               // Opera > 9.80\n\t            /(opera)[\\/\\s]+((\\d+)?[\\w\\.]+)/i                                    // Opera < 9.80\n\t            \n\t            ], [NAME, VERSION, MAJOR], [\n\n\t            /\\s(opr)\\/((\\d+)?[\\w\\.]+)/i                                         // Opera Webkit\n\t            ], [[NAME, 'Opera'], VERSION, MAJOR], [\n\n\t            // Mixed\n\t            /(kindle)\\/((\\d+)?[\\w\\.]+)/i,                                       // Kindle\n\t            /(lunascape|maxthon|netfront|jasmine|blazer)[\\/\\s]?((\\d+)?[\\w\\.]+)*/i,\n\t                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer\n\n\t            // Trident based\n\t            /(avant\\s|iemobile|slim|baidu)(?:browser)?[\\/\\s]?((\\d+)?[\\w\\.]*)/i,\n\t                                                                                // Avant/IEMobile/SlimBrowser/Baidu\n\t            /(?:ms|\\()(ie)\\s((\\d+)?[\\w\\.]+)/i,                                  // Internet Explorer\n\n\t            // Webkit/KHTML based\n\t            /(rekonq)((?:\\/)[\\w\\.]+)*/i,                                        // Rekonq\n\t            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\\/((\\d+)?[\\w\\.-]+)/i\n\t                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron\n\t            ], [NAME, VERSION, MAJOR], [\n\n\t            /(trident).+rv[:\\s]((\\d+)?[\\w\\.]+).+like\\sgecko/i                   // IE11\n\t            ], [[NAME, 'IE'], VERSION, MAJOR], [\n\n\t            /(yabrowser)\\/((\\d+)?[\\w\\.]+)/i                                     // Yandex\n\t            ], [[NAME, 'Yandex'], VERSION, MAJOR], [\n\n\t            /(comodo_dragon)\\/((\\d+)?[\\w\\.]+)/i                                 // Comodo Dragon\n\t            ], [[NAME, /_/g, ' '], VERSION, MAJOR], [\n\n\t            /(chrome|omniweb|arora|[tizenoka]{5}\\s?browser)\\/v?((\\d+)?[\\w\\.]+)/i\n\t                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia\n\t            ], [NAME, VERSION, MAJOR], [\n\n\t            /(dolfin)\\/((\\d+)?[\\w\\.]+)/i                                        // Dolphin\n\t            ], [[NAME, 'Dolphin'], VERSION, MAJOR], [\n\n\t            /((?:android.+)crmo|crios)\\/((\\d+)?[\\w\\.]+)/i                       // Chrome for Android/iOS\n\t            ], [[NAME, 'Chrome'], VERSION, MAJOR], [\n\n\t            /((?:android.+))version\\/((\\d+)?[\\w\\.]+)\\smobile\\ssafari/i          // Android Browser\n\t            ], [[NAME, 'Android Browser'], VERSION, MAJOR], [\n\n\t            /version\\/((\\d+)?[\\w\\.]+).+?mobile\\/\\w+\\s(safari)/i                 // Mobile Safari\n\t            ], [VERSION, MAJOR, [NAME, 'Mobile Safari']], [\n\n\t            /version\\/((\\d+)?[\\w\\.]+).+?(mobile\\s?safari|safari)/i              // Safari & Safari Mobile\n\t            ], [VERSION, MAJOR, NAME], [\n\n\t            /webkit.+?(mobile\\s?safari|safari)((\\/[\\w\\.]+))/i                   // Safari < 3.0\n\t            ], [NAME, [MAJOR, mapper.str, maps.browser.oldsafari.major], [VERSION, mapper.str, maps.browser.oldsafari.version]], [\n\n\t            /(konqueror)\\/((\\d+)?[\\w\\.]+)/i,                                    // Konqueror\n\t            /(webkit|khtml)\\/((\\d+)?[\\w\\.]+)/i\n\t            ], [NAME, VERSION, MAJOR], [\n\n\t            // Gecko based\n\t            /(navigator|netscape)\\/((\\d+)?[\\w\\.-]+)/i                           // Netscape\n\t            ], [[NAME, 'Netscape'], VERSION, MAJOR], [\n\t            /(swiftfox)/i,                                                      // Swiftfox\n\t            /(icedragon|iceweasel|camino|chimera|fennec|maemo\\sbrowser|minimo|conkeror)[\\/\\s]?((\\d+)?[\\w\\.\\+]+)/i,\n\t                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror\n\t            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\\/((\\d+)?[\\w\\.-]+)/i,\n\t                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix\n\t            /(mozilla)\\/((\\d+)?[\\w\\.]+).+rv\\:.+gecko\\/\\d+/i,                    // Mozilla\n\n\t            // Other\n\t            /(uc\\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\\/\\s]?((\\d+)?[\\w\\.]+)/i,\n\t                                                                                // UCBrowser/Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/QQBrowser\n\t            /(links)\\s\\(((\\d+)?[\\w\\.]+)/i,                                      // Links\n\t            /(gobrowser)\\/?((\\d+)?[\\w\\.]+)*/i,                                  // GoBrowser\n\t            /(ice\\s?browser)\\/v?((\\d+)?[\\w\\._]+)/i,                             // ICE Browser\n\t            /(mosaic)[\\/\\s]((\\d+)?[\\w\\.]+)/i                                    // Mosaic\n\t            ], [NAME, VERSION, MAJOR]\n\t        ],\n\n\t        engine : [[\n\n\t            /(presto)\\/([\\w\\.]+)/i,                                             // Presto\n\t            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\\/([\\w\\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m\n\t            /(khtml|tasman|links)[\\/\\s]\\(?([\\w\\.]+)/i,                          // KHTML/Tasman/Links\n\t            /(icab)[\\/\\s]([23]\\.[\\d\\.]+)/i                                      // iCab\n\t            ], [NAME, VERSION], [\n\n\t            /rv\\:([\\w\\.]+).*(gecko)/i                                           // Gecko\n\t            ], [VERSION, NAME]\n\t        ],\n\n\t        os : [[\n\n\t            // Windows based\n\t            /(windows)\\snt\\s6\\.2;\\s(arm)/i,                                     // Windows RT\n\t            /(windows\\sphone(?:\\sos)*|windows\\smobile|windows)[\\s\\/]?([ntce\\d\\.\\s]+\\w)/i\n\t            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [\n\t            /(win(?=3|9|n)|win\\s9x\\s)([nt\\d\\.]+)/i\n\t            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [\n\n\t            // Mobile/Embedded OS\n\t            /\\((bb)(10);/i                                                      // BlackBerry 10\n\t            ], [[NAME, 'BlackBerry'], VERSION], [\n\t            /(blackberry)\\w*\\/?([\\w\\.]+)*/i,                                    // Blackberry\n\t            /(tizen)\\/([\\w\\.]+)/i,                                              // Tizen\n\t            /(android|webos|palm\\os|qnx|bada|rim\\stablet\\sos|meego)[\\/\\s-]?([\\w\\.]+)*/i\n\t                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo\n\t            ], [NAME, VERSION], [\n\t            /(symbian\\s?os|symbos|s60(?=;))[\\/\\s-]?([\\w\\.]+)*/i                 // Symbian\n\t            ], [[NAME, 'Symbian'], VERSION],[\n\t            /mozilla.+\\(mobile;.+gecko.+firefox/i                               // Firefox OS\n\t            ], [[NAME, 'Firefox OS'], VERSION], [\n\n\t            // Console\n\t            /(nintendo|playstation)\\s([wids3portablevu]+)/i,                    // Nintendo/Playstation\n\n\t            // GNU/Linux based\n\t            /(mint)[\\/\\s\\(]?(\\w+)*/i,                                           // Mint\n\t            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\\/\\s-]?([\\w\\.-]+)*/i,\n\t                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware\n\t                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk\n\t            /(hurd|linux)\\s?([\\w\\.]+)*/i,                                       // Hurd/Linux\n\t            /(gnu)\\s?([\\w\\.]+)*/i                                               // GNU\n\t            ], [NAME, VERSION], [\n\n\t            /(cros)\\s[\\w]+\\s([\\w\\.]+\\w)/i                                       // Chromium OS\n\t            ], [[NAME, 'Chromium OS'], VERSION],[\n\n\t            // Solaris\n\t            /(sunos)\\s?([\\w\\.]+\\d)*/i                                           // Solaris\n\t            ], [[NAME, 'Solaris'], VERSION], [\n\n\t            // BSD based\n\t            /\\s([frentopc-]{0,4}bsd|dragonfly)\\s?([\\w\\.]+)*/i                   // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly\n\t            ], [NAME, VERSION],[\n\n\t            /(ip[honead]+)(?:.*os\\s*([\\w]+)*\\slike\\smac|;\\sopera)/i             // iOS\n\t            ], [[NAME, 'iOS'], [VERSION, /_/g, '.']], [\n\n\t            /(mac\\sos\\sx)\\s?([\\w\\s\\.]+\\w)*/i                                    // Mac OS\n\t            ], [NAME, [VERSION, /_/g, '.']], [\n\n\t            // Other\n\t            /(haiku)\\s(\\w+)/i,                                                  // Haiku\n\t            /(aix)\\s((\\d)(?=\\.|\\)|\\s)[\\w\\.]*)*/i,                               // AIX\n\t            /(macintosh|mac(?=_powerpc)|plan\\s9|minix|beos|os\\/2|amigaos|morphos|risc\\sos)/i,\n\t                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS\n\t            /(unix)\\s?([\\w\\.]+)*/i                                              // UNIX\n\t            ], [NAME, VERSION]\n\t        ]\n\t    };\n\n\n\t    /////////////////\n\t    // Constructor\n\t    ////////////////\n\n\n\t    var UAParser = function (uastring) {\n\n\t        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);\n\n\t        this.getBrowser = function () {\n\t            return mapper.rgx.apply(this, regexes.browser);\n\t        };\n\t        this.getEngine = function () {\n\t            return mapper.rgx.apply(this, regexes.engine);\n\t        };\n\t        this.getOS = function () {\n\t            return mapper.rgx.apply(this, regexes.os);\n\t        };\n\t        this.getResult = function() {\n\t            return {\n\t                ua      : this.getUA(),\n\t                browser : this.getBrowser(),\n\t                engine  : this.getEngine(),\n\t                os      : this.getOS()\n\t            };\n\t        };\n\t        this.getUA = function () {\n\t            return ua;\n\t        };\n\t        this.setUA = function (uastring) {\n\t            ua = uastring;\n\t            return this;\n\t        };\n\t        this.setUA(ua);\n\t    };\n\n\t    return new UAParser().getResult();\n\t})();\n\n\n\tfunction version_compare(v1, v2, operator) {\n\t  // From: http://phpjs.org/functions\n\t  // +      original by: Philippe Jausions (http://pear.php.net/user/jausions)\n\t  // +      original by: Aidan Lister (http://aidanlister.com/)\n\t  // + reimplemented by: Kankrelune (http://www.webfaktory.info/)\n\t  // +      improved by: Brett Zamir (http://brett-zamir.me)\n\t  // +      improved by: Scott Baker\n\t  // +      improved by: Theriault\n\t  // *        example 1: version_compare('8.2.5rc', '8.2.5a');\n\t  // *        returns 1: 1\n\t  // *        example 2: version_compare('8.2.50', '8.2.52', '<');\n\t  // *        returns 2: true\n\t  // *        example 3: version_compare('5.3.0-dev', '5.3.0');\n\t  // *        returns 3: -1\n\t  // *        example 4: version_compare('4.1.0.52','4.01.0.51');\n\t  // *        returns 4: 1\n\n\t  // Important: compare must be initialized at 0.\n\t  var i = 0,\n\t    x = 0,\n\t    compare = 0,\n\t    // vm maps textual PHP versions to negatives so they're less than 0.\n\t    // PHP currently defines these as CASE-SENSITIVE. It is important to\n\t    // leave these as negatives so that they can come before numerical versions\n\t    // and as if no letters were there to begin with.\n\t    // (1alpha is < 1 and < 1.1 but > 1dev1)\n\t    // If a non-numerical value can't be mapped to this table, it receives\n\t    // -7 as its value.\n\t    vm = {\n\t      'dev': -6,\n\t      'alpha': -5,\n\t      'a': -5,\n\t      'beta': -4,\n\t      'b': -4,\n\t      'RC': -3,\n\t      'rc': -3,\n\t      '#': -2,\n\t      'p': 1,\n\t      'pl': 1\n\t    },\n\t    // This function will be called to prepare each version argument.\n\t    // It replaces every _, -, and + with a dot.\n\t    // It surrounds any nonsequence of numbers/dots with dots.\n\t    // It replaces sequences of dots with a single dot.\n\t    //    version_compare('4..0', '4.0') == 0\n\t    // Important: A string of 0 length needs to be converted into a value\n\t    // even less than an unexisting value in vm (-7), hence [-8].\n\t    // It's also important to not strip spaces because of this.\n\t    //   version_compare('', ' ') == 1\n\t    prepVersion = function (v) {\n\t      v = ('' + v).replace(/[_\\-+]/g, '.');\n\t      v = v.replace(/([^.\\d]+)/g, '.$1.').replace(/\\.{2,}/g, '.');\n\t      return (!v.length ? [-8] : v.split('.'));\n\t    },\n\t    // This converts a version component to a number.\n\t    // Empty component becomes 0.\n\t    // Non-numerical component becomes a negative number.\n\t    // Numerical component becomes itself as an integer.\n\t    numVersion = function (v) {\n\t      return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10));\n\t    };\n\n\t  v1 = prepVersion(v1);\n\t  v2 = prepVersion(v2);\n\t  x = Math.max(v1.length, v2.length);\n\t  for (i = 0; i < x; i++) {\n\t    if (v1[i] == v2[i]) {\n\t      continue;\n\t    }\n\t    v1[i] = numVersion(v1[i]);\n\t    v2[i] = numVersion(v2[i]);\n\t    if (v1[i] < v2[i]) {\n\t      compare = -1;\n\t      break;\n\t    } else if (v1[i] > v2[i]) {\n\t      compare = 1;\n\t      break;\n\t    }\n\t  }\n\t  if (!operator) {\n\t    return compare;\n\t  }\n\n\t  // Important: operator is CASE-SENSITIVE.\n\t  // \"No operator\" seems to be treated as \"<.\"\n\t  // Any other values seem to make the function return null.\n\t  switch (operator) {\n\t  case '>':\n\t  case 'gt':\n\t    return (compare > 0);\n\t  case '>=':\n\t  case 'ge':\n\t    return (compare >= 0);\n\t  case '<=':\n\t  case 'le':\n\t    return (compare <= 0);\n\t  case '==':\n\t  case '=':\n\t  case 'eq':\n\t    return (compare === 0);\n\t  case '<>':\n\t  case '!=':\n\t  case 'ne':\n\t    return (compare !== 0);\n\t  case '':\n\t  case '<':\n\t  case 'lt':\n\t    return (compare < 0);\n\t  default:\n\t    return null;\n\t  }\n\t}\n\n\n\tvar can = (function() {\n\t\tvar caps = {\n\t\t\t\tdefine_property: (function() {\n\t\t\t\t\t/* // currently too much extra code required, not exactly worth it\n\t\t\t\t\ttry { // as of IE8, getters/setters are supported only on DOM elements\n\t\t\t\t\t\tvar obj = {};\n\t\t\t\t\t\tif (Object.defineProperty) {\n\t\t\t\t\t\t\tObject.defineProperty(obj, 'prop', {\n\t\t\t\t\t\t\t\tenumerable: true,\n\t\t\t\t\t\t\t\tconfigurable: true\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\t\t\t\t\t} catch(ex) {}\n\n\t\t\t\t\tif (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}*/\n\t\t\t\t\treturn false;\n\t\t\t\t}()),\n\n\t\t\t\tcreate_canvas: (function() {\n\t\t\t\t\t// On the S60 and BB Storm, getContext exists, but always returns undefined\n\t\t\t\t\t// so we actually have to call getContext() to verify\n\t\t\t\t\t// github.com/Modernizr/Modernizr/issues/issue/97/\n\t\t\t\t\tvar el = document.createElement('canvas');\n\t\t\t\t\treturn !!(el.getContext && el.getContext('2d'));\n\t\t\t\t}()),\n\n\t\t\t\treturn_response_type: function(responseType) {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tif (Basic.inArray(responseType, ['', 'text', 'document']) !== -1) {\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t} else if (window.XMLHttpRequest) {\n\t\t\t\t\t\t\tvar xhr = new XMLHttpRequest();\n\t\t\t\t\t\t\txhr.open('get', '/'); // otherwise Gecko throws an exception\n\t\t\t\t\t\t\tif ('responseType' in xhr) {\n\t\t\t\t\t\t\t\txhr.responseType = responseType;\n\t\t\t\t\t\t\t\t// as of 23.0.1271.64, Chrome switched from throwing exception to merely logging it to the console (why? o why?)\n\t\t\t\t\t\t\t\tif (xhr.responseType !== responseType) {\n\t\t\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t} catch (ex) {}\n\t\t\t\t\treturn false;\n\t\t\t\t},\n\n\t\t\t\t// ideas for this heavily come from Modernizr (http://modernizr.com/)\n\t\t\t\tuse_data_uri: (function() {\n\t\t\t\t\tvar du = new Image();\n\n\t\t\t\t\tdu.onload = function() {\n\t\t\t\t\t\tcaps.use_data_uri = (du.width === 1 && du.height === 1);\n\t\t\t\t\t};\n\t\t\t\t\t\n\t\t\t\t\tsetTimeout(function() {\n\t\t\t\t\t\tdu.src = \"data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==\";\n\t\t\t\t\t}, 1);\n\t\t\t\t\treturn false;\n\t\t\t\t}()),\n\n\t\t\t\tuse_data_uri_over32kb: function() { // IE8\n\t\t\t\t\treturn caps.use_data_uri && (Env.browser !== 'IE' || Env.version >= 9);\n\t\t\t\t},\n\n\t\t\t\tuse_data_uri_of: function(bytes) {\n\t\t\t\t\treturn (caps.use_data_uri && bytes < 33000 || caps.use_data_uri_over32kb());\n\t\t\t\t},\n\n\t\t\t\tuse_fileinput: function() {\n\t\t\t\t\tvar el = document.createElement('input');\n\t\t\t\t\tel.setAttribute('type', 'file');\n\t\t\t\t\treturn !el.disabled;\n\t\t\t\t}\n\t\t\t};\n\n\t\treturn function(cap) {\n\t\t\tvar args = [].slice.call(arguments);\n\t\t\targs.shift(); // shift of cap\n\t\t\treturn Basic.typeOf(caps[cap]) === 'function' ? caps[cap].apply(this, args) : !!caps[cap];\n\t\t};\n\t}());\n\n\n\tvar Env = {\n\t\tcan: can,\n\t\t\n\t\tbrowser: UAParser.browser.name,\n\t\tversion: parseFloat(UAParser.browser.major),\n\t\tos: UAParser.os.name, // everybody intuitively types it in a lowercase for some reason\n\t\tosVersion: UAParser.os.version,\n\n\t\tverComp: version_compare,\n\t\t\n\t\tswf_url: \"../flash/Moxie.swf\",\n\t\txap_url: \"../silverlight/Moxie.xap\",\n\t\tglobal_event_dispatcher: \"moxie.core.EventTarget.instance.dispatchEvent\"\n\t};\n\n\t// for backward compatibility\n\t// @deprecated Use `Env.os` instead\n\tEnv.OS = Env.os;\n\n\tif (MXI_DEBUG) {\n\t\tEnv.debug = {\n\t\t\truntime: true,\n\t\t\tevents: false\n\t\t};\n\n\t\tEnv.log = function() {\n\t\t\t\n\t\t\tfunction logObj(data) {\n\t\t\t\t// TODO: this should recursively print out the object in a pretty way\n\t\t\t\tconsole.appendChild(document.createTextNode(data + \"\\n\"));\n\t\t\t}\n\n\t\t\tvar data = arguments[0];\n\n\t\t\tif (Basic.typeOf(data) === 'string') {\n\t\t\t\tdata = Basic.sprintf.apply(this, arguments);\n\t\t\t}\n\n\t\t\tif (window && window.console && window.console.log) {\n\t\t\t\twindow.console.log(data);\n\t\t\t} else if (document) {\n\t\t\t\tvar console = document.getElementById('moxie-console');\n\t\t\t\tif (!console) {\n\t\t\t\t\tconsole = document.createElement('pre');\n\t\t\t\t\tconsole.id = 'moxie-console';\n\t\t\t\t\t//console.style.display = 'none';\n\t\t\t\t\tdocument.body.appendChild(console);\n\t\t\t\t}\n\n\t\t\t\tif (Basic.inArray(Basic.typeOf(data), ['object', 'array']) !== -1) {\n\t\t\t\t\tlogObj(data);\n\t\t\t\t} else {\n\t\t\t\t\tconsole.appendChild(document.createTextNode(data + \"\\n\"));\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t}\n\n\treturn Env;\n});\n");
__$coverInitRange("src/javascript/core/utils/Env.js", "194:24969");
__$coverInitRange("src/javascript/core/utils/Env.js", "501:17276");
__$coverInitRange("src/javascript/core/utils/Env.js", "17281:20872");
__$coverInitRange("src/javascript/core/utils/Env.js", "20877:23497");
__$coverInitRange("src/javascript/core/utils/Env.js", "23502:23914");
__$coverInitRange("src/javascript/core/utils/Env.js", "23986:24001");
__$coverInitRange("src/javascript/core/utils/Env.js", "24005:24951");
__$coverInitRange("src/javascript/core/utils/Env.js", "24955:24965");
__$coverInitRange("src/javascript/core/utils/Env.js", "605:1089");
__$coverInitRange("src/javascript/core/utils/Env.js", "1148:1380");
__$coverInitRange("src/javascript/core/utils/Env.js", "1451:5187");
__$coverInitRange("src/javascript/core/utils/Env.js", "5258:6731");
__$coverInitRange("src/javascript/core/utils/Env.js", "6799:16180");
__$coverInitRange("src/javascript/core/utils/Env.js", "16256:17228");
__$coverInitRange("src/javascript/core/utils/Env.js", "17236:17269");
__$coverInitRange("src/javascript/core/utils/Env.js", "1213:1273");
__$coverInitRange("src/javascript/core/utils/Env.js", "1337:1361");
__$coverInitRange("src/javascript/core/utils/Env.js", "1556:4535");
__$coverInitRange("src/javascript/core/utils/Env.js", "4550:4563");
__$coverInitRange("src/javascript/core/utils/Env.js", "1671:1766");
__$coverInitRange("src/javascript/core/utils/Env.js", "1862:2275");
__$coverInitRange("src/javascript/core/utils/Env.js", "2350:4436");
__$coverInitRange("src/javascript/core/utils/Env.js", "4456:4475");
__$coverInitRange("src/javascript/core/utils/Env.js", "1920:1931");
__$coverInitRange("src/javascript/core/utils/Env.js", "1954:2256");
__$coverInitRange("src/javascript/core/utils/Env.js", "1998:2010");
__$coverInitRange("src/javascript/core/utils/Env.js", "2037:2233");
__$coverInitRange("src/javascript/core/utils/Env.js", "2096:2120");
__$coverInitRange("src/javascript/core/utils/Env.js", "2185:2206");
__$coverInitRange("src/javascript/core/utils/Env.js", "2412:2449");
__$coverInitRange("src/javascript/core/utils/Env.js", "2472:4417");
__$coverInitRange("src/javascript/core/utils/Env.js", "2514:4362");
__$coverInitRange("src/javascript/core/utils/Env.js", "4389:4394");
__$coverInitRange("src/javascript/core/utils/Env.js", "2580:2600");
__$coverInitRange("src/javascript/core/utils/Env.js", "2631:2643");
__$coverInitRange("src/javascript/core/utils/Env.js", "2748:4335");
__$coverInitRange("src/javascript/core/utils/Env.js", "2827:4194");
__$coverInitRange("src/javascript/core/utils/Env.js", "2885:3292");
__$coverInitRange("src/javascript/core/utils/Env.js", "3025:3062");
__$coverInitRange("src/javascript/core/utils/Env.js", "3234:3253");
__$coverInitRange("src/javascript/core/utils/Env.js", "3464:3978");
__$coverInitRange("src/javascript/core/utils/Env.js", "3650:3713");
__$coverInitRange("src/javascript/core/utils/Env.js", "3879:3939");
__$coverInitRange("src/javascript/core/utils/Env.js", "4082:4159");
__$coverInitRange("src/javascript/core/utils/Env.js", "4267:4304");
__$coverInitRange("src/javascript/core/utils/Env.js", "4629:5143");
__$coverInitRange("src/javascript/core/utils/Env.js", "5158:5168");
__$coverInitRange("src/javascript/core/utils/Env.js", "4702:5128");
__$coverInitRange("src/javascript/core/utils/Env.js", "4779:4995");
__$coverInitRange("src/javascript/core/utils/Env.js", "4846:4972");
__$coverInitRange("src/javascript/core/utils/Env.js", "4907:4945");
__$coverInitRange("src/javascript/core/utils/Env.js", "5071:5109");
__$coverInitRange("src/javascript/core/utils/Env.js", "16303:16421");
__$coverInitRange("src/javascript/core/utils/Env.js", "16433:16536");
__$coverInitRange("src/javascript/core/utils/Env.js", "16547:16648");
__$coverInitRange("src/javascript/core/utils/Env.js", "16659:16752");
__$coverInitRange("src/javascript/core/utils/Env.js", "16763:17013");
__$coverInitRange("src/javascript/core/utils/Env.js", "17024:17085");
__$coverInitRange("src/javascript/core/utils/Env.js", "17096:17195");
__$coverInitRange("src/javascript/core/utils/Env.js", "17206:17220");
__$coverInitRange("src/javascript/core/utils/Env.js", "16478:16524");
__$coverInitRange("src/javascript/core/utils/Env.js", "16591:16636");
__$coverInitRange("src/javascript/core/utils/Env.js", "16699:16740");
__$coverInitRange("src/javascript/core/utils/Env.js", "16806:17001");
__$coverInitRange("src/javascript/core/utils/Env.js", "17064:17073");
__$coverInitRange("src/javascript/core/utils/Env.js", "17144:17157");
__$coverInitRange("src/javascript/core/utils/Env.js", "17172:17183");
__$coverInitRange("src/javascript/core/utils/Env.js", "18148:19862");
__$coverInitRange("src/javascript/core/utils/Env.js", "19868:19888");
__$coverInitRange("src/javascript/core/utils/Env.js", "19893:19913");
__$coverInitRange("src/javascript/core/utils/Env.js", "19918:19952");
__$coverInitRange("src/javascript/core/utils/Env.js", "19957:20236");
__$coverInitRange("src/javascript/core/utils/Env.js", "20241:20282");
__$coverInitRange("src/javascript/core/utils/Env.js", "20443:20869");
__$coverInitRange("src/javascript/core/utils/Env.js", "19386:19422");
__$coverInitRange("src/javascript/core/utils/Env.js", "19431:19490");
__$coverInitRange("src/javascript/core/utils/Env.js", "19499:19539");
__$coverInitRange("src/javascript/core/utils/Env.js", "19796:19854");
__$coverInitRange("src/javascript/core/utils/Env.js", "19988:20032");
__$coverInitRange("src/javascript/core/utils/Env.js", "20039:20064");
__$coverInitRange("src/javascript/core/utils/Env.js", "20071:20096");
__$coverInitRange("src/javascript/core/utils/Env.js", "20103:20231");
__$coverInitRange("src/javascript/core/utils/Env.js", "20017:20025");
__$coverInitRange("src/javascript/core/utils/Env.js", "20131:20143");
__$coverInitRange("src/javascript/core/utils/Env.js", "20152:20157");
__$coverInitRange("src/javascript/core/utils/Env.js", "20199:20210");
__$coverInitRange("src/javascript/core/utils/Env.js", "20219:20224");
__$coverInitRange("src/javascript/core/utils/Env.js", "20263:20277");
__$coverInitRange("src/javascript/core/utils/Env.js", "20495:20515");
__$coverInitRange("src/javascript/core/utils/Env.js", "20550:20571");
__$coverInitRange("src/javascript/core/utils/Env.js", "20606:20627");
__$coverInitRange("src/javascript/core/utils/Env.js", "20675:20697");
__$coverInitRange("src/javascript/core/utils/Env.js", "20746:20768");
__$coverInitRange("src/javascript/core/utils/Env.js", "20814:20834");
__$coverInitRange("src/javascript/core/utils/Env.js", "20853:20864");
__$coverInitRange("src/javascript/core/utils/Env.js", "20903:23292");
__$coverInitRange("src/javascript/core/utils/Env.js", "23297:23490");
__$coverInitRange("src/javascript/core/utils/Env.js", "21427:21439");
__$coverInitRange("src/javascript/core/utils/Env.js", "21686:21727");
__$coverInitRange("src/javascript/core/utils/Env.js", "21734:21781");
__$coverInitRange("src/javascript/core/utils/Env.js", "21850:22436");
__$coverInitRange("src/javascript/core/utils/Env.js", "22443:22455");
__$coverInitRange("src/javascript/core/utils/Env.js", "21862:22415");
__$coverInitRange("src/javascript/core/utils/Env.js", "21937:21948");
__$coverInitRange("src/javascript/core/utils/Env.js", "21999:22029");
__$coverInitRange("src/javascript/core/utils/Env.js", "22038:22058");
__$coverInitRange("src/javascript/core/utils/Env.js", "22106:22407");
__$coverInitRange("src/javascript/core/utils/Env.js", "22143:22174");
__$coverInitRange("src/javascript/core/utils/Env.js", "22305:22377");
__$coverInitRange("src/javascript/core/utils/Env.js", "22387:22398");
__$coverInitRange("src/javascript/core/utils/Env.js", "22355:22367");
__$coverInitRange("src/javascript/core/utils/Env.js", "22576:22596");
__$coverInitRange("src/javascript/core/utils/Env.js", "22604:22698");
__$coverInitRange("src/javascript/core/utils/Env.js", "22711:22846");
__$coverInitRange("src/javascript/core/utils/Env.js", "22853:22865");
__$coverInitRange("src/javascript/core/utils/Env.js", "22635:22690");
__$coverInitRange("src/javascript/core/utils/Env.js", "22741:22834");
__$coverInitRange("src/javascript/core/utils/Env.js", "22930:23000");
__$coverInitRange("src/javascript/core/utils/Env.js", "23054:23129");
__$coverInitRange("src/javascript/core/utils/Env.js", "23176:23216");
__$coverInitRange("src/javascript/core/utils/Env.js", "23223:23254");
__$coverInitRange("src/javascript/core/utils/Env.js", "23261:23280");
__$coverInitRange("src/javascript/core/utils/Env.js", "23323:23358");
__$coverInitRange("src/javascript/core/utils/Env.js", "23363:23375");
__$coverInitRange("src/javascript/core/utils/Env.js", "23396:23485");
__$coverInitRange("src/javascript/core/utils/Env.js", "24024:24076");
__$coverInitRange("src/javascript/core/utils/Env.js", "24081:24948");
__$coverInitRange("src/javascript/core/utils/Env.js", "24111:24275");
__$coverInitRange("src/javascript/core/utils/Env.js", "24281:24304");
__$coverInitRange("src/javascript/core/utils/Env.js", "24310:24401");
__$coverInitRange("src/javascript/core/utils/Env.js", "24407:24943");
__$coverInitRange("src/javascript/core/utils/Env.js", "24213:24270");
__$coverInitRange("src/javascript/core/utils/Env.js", "24353:24396");
__$coverInitRange("src/javascript/core/utils/Env.js", "24465:24489");
__$coverInitRange("src/javascript/core/utils/Env.js", "24521:24575");
__$coverInitRange("src/javascript/core/utils/Env.js", "24581:24762");
__$coverInitRange("src/javascript/core/utils/Env.js", "24769:24938");
__$coverInitRange("src/javascript/core/utils/Env.js", "24602:24641");
__$coverInitRange("src/javascript/core/utils/Env.js", "24648:24676");
__$coverInitRange("src/javascript/core/utils/Env.js", "24722:24756");
__$coverInitRange("src/javascript/core/utils/Env.js", "24843:24855");
__$coverInitRange("src/javascript/core/utils/Env.js", "24875:24932");
__$coverCall('src/javascript/core/utils/Env.js', '194:24969');
define('moxie/core/utils/Env', ['moxie/core/utils/Basic'], function (Basic) {
    __$coverCall('src/javascript/core/utils/Env.js', '501:17276');
    var UAParser = function (undefined) {
            __$coverCall('src/javascript/core/utils/Env.js', '605:1089');
            var EMPTY = '', UNKNOWN = '?', FUNC_TYPE = 'function', UNDEF_TYPE = 'undefined', OBJ_TYPE = 'object', MAJOR = 'major', MODEL = 'model', NAME = 'name', TYPE = 'type', VENDOR = 'vendor', VERSION = 'version', ARCHITECTURE = 'architecture', CONSOLE = 'console', MOBILE = 'mobile', TABLET = 'tablet';
            __$coverCall('src/javascript/core/utils/Env.js', '1148:1380');
            var util = {
                    has: function (str1, str2) {
                        __$coverCall('src/javascript/core/utils/Env.js', '1213:1273');
                        return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
                    },
                    lowerize: function (str) {
                        __$coverCall('src/javascript/core/utils/Env.js', '1337:1361');
                        return str.toLowerCase();
                    }
                };
            __$coverCall('src/javascript/core/utils/Env.js', '1451:5187');
            var mapper = {
                    rgx: function () {
                        __$coverCall('src/javascript/core/utils/Env.js', '1556:4535');
                        for (var result, i = 0, j, k, p, q, matches, match, args = arguments; i < args.length; i += 2) {
                            __$coverCall('src/javascript/core/utils/Env.js', '1671:1766');
                            var regex = args[i], props = args[i + 1];
                            __$coverCall('src/javascript/core/utils/Env.js', '1862:2275');
                            if (typeof result === UNDEF_TYPE) {
                                __$coverCall('src/javascript/core/utils/Env.js', '1920:1931');
                                result = {};
                                __$coverCall('src/javascript/core/utils/Env.js', '1954:2256');
                                for (p in props) {
                                    __$coverCall('src/javascript/core/utils/Env.js', '1998:2010');
                                    q = props[p];
                                    __$coverCall('src/javascript/core/utils/Env.js', '2037:2233');
                                    if (typeof q === OBJ_TYPE) {
                                        __$coverCall('src/javascript/core/utils/Env.js', '2096:2120');
                                        result[q[0]] = undefined;
                                    } else {
                                        __$coverCall('src/javascript/core/utils/Env.js', '2185:2206');
                                        result[q] = undefined;
                                    }
                                }
                            }
                            __$coverCall('src/javascript/core/utils/Env.js', '2350:4436');
                            for (j = k = 0; j < regex.length; j++) {
                                __$coverCall('src/javascript/core/utils/Env.js', '2412:2449');
                                matches = regex[j].exec(this.getUA());
                                __$coverCall('src/javascript/core/utils/Env.js', '2472:4417');
                                if (!!matches) {
                                    __$coverCall('src/javascript/core/utils/Env.js', '2514:4362');
                                    for (p = 0; p < props.length; p++) {
                                        __$coverCall('src/javascript/core/utils/Env.js', '2580:2600');
                                        match = matches[++k];
                                        __$coverCall('src/javascript/core/utils/Env.js', '2631:2643');
                                        q = props[p];
                                        __$coverCall('src/javascript/core/utils/Env.js', '2748:4335');
                                        if (typeof q === OBJ_TYPE && q.length > 0) {
                                            __$coverCall('src/javascript/core/utils/Env.js', '2827:4194');
                                            if (q.length == 2) {
                                                __$coverCall('src/javascript/core/utils/Env.js', '2885:3292');
                                                if (typeof q[1] == FUNC_TYPE) {
                                                    __$coverCall('src/javascript/core/utils/Env.js', '3025:3062');
                                                    result[q[0]] = q[1].call(this, match);
                                                } else {
                                                    __$coverCall('src/javascript/core/utils/Env.js', '3234:3253');
                                                    result[q[0]] = q[1];
                                                }
                                            } else if (q.length == 3) {
                                                __$coverCall('src/javascript/core/utils/Env.js', '3464:3978');
                                                if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                                    __$coverCall('src/javascript/core/utils/Env.js', '3650:3713');
                                                    result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                                } else {
                                                    __$coverCall('src/javascript/core/utils/Env.js', '3879:3939');
                                                    result[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                                }
                                            } else if (q.length == 4) {
                                                __$coverCall('src/javascript/core/utils/Env.js', '4082:4159');
                                                result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                            }
                                        } else {
                                            __$coverCall('src/javascript/core/utils/Env.js', '4267:4304');
                                            result[q] = match ? match : undefined;
                                        }
                                    }
                                    __$coverCall('src/javascript/core/utils/Env.js', '4389:4394');
                                    break;
                                }
                            }
                            __$coverCall('src/javascript/core/utils/Env.js', '4456:4475');
                            if (!!matches)
                                break;
                        }
                        __$coverCall('src/javascript/core/utils/Env.js', '4550:4563');
                        return result;
                    },
                    str: function (str, map) {
                        __$coverCall('src/javascript/core/utils/Env.js', '4629:5143');
                        for (var i in map) {
                            __$coverCall('src/javascript/core/utils/Env.js', '4702:5128');
                            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                                __$coverCall('src/javascript/core/utils/Env.js', '4779:4995');
                                for (var j = 0; j < map[i].length; j++) {
                                    __$coverCall('src/javascript/core/utils/Env.js', '4846:4972');
                                    if (util.has(map[i][j], str)) {
                                        __$coverCall('src/javascript/core/utils/Env.js', '4907:4945');
                                        return i === UNKNOWN ? undefined : i;
                                    }
                                }
                            } else if (util.has(map[i], str)) {
                                __$coverCall('src/javascript/core/utils/Env.js', '5071:5109');
                                return i === UNKNOWN ? undefined : i;
                            }
                        }
                        __$coverCall('src/javascript/core/utils/Env.js', '5158:5168');
                        return str;
                    }
                };
            __$coverCall('src/javascript/core/utils/Env.js', '5258:6731');
            var maps = {
                    browser: {
                        oldsafari: {
                            major: {
                                '1': [
                                    '/8',
                                    '/1',
                                    '/3'
                                ],
                                '2': '/4',
                                '?': '/'
                            },
                            version: {
                                '1.0': '/8',
                                '1.2': '/1',
                                '1.3': '/3',
                                '2.0': '/412',
                                '2.0.2': '/416',
                                '2.0.3': '/417',
                                '2.0.4': '/419',
                                '?': '/'
                            }
                        }
                    },
                    device: {
                        sprint: {
                            model: { 'Evo Shift 4G': '7373KT' },
                            vendor: {
                                'HTC': 'APA',
                                'Sprint': 'Sprint'
                            }
                        }
                    },
                    os: {
                        windows: {
                            version: {
                                'ME': '4.90',
                                'NT 3.11': 'NT3.51',
                                'NT 4.0': 'NT4.0',
                                '2000': 'NT 5.0',
                                'XP': [
                                    'NT 5.1',
                                    'NT 5.2'
                                ],
                                'Vista': 'NT 6.0',
                                '7': 'NT 6.1',
                                '8': 'NT 6.2',
                                '8.1': 'NT 6.3',
                                'RT': 'ARM'
                            }
                        }
                    }
                };
            __$coverCall('src/javascript/core/utils/Env.js', '6799:16180');
            var regexes = {
                    browser: [
                        [
                            /(opera\smini)\/((\d+)?[\w\.-]+)/i,
                            /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i,
                            /(opera).+version\/((\d+)?[\w\.]+)/i,
                            /(opera)[\/\s]+((\d+)?[\w\.]+)/i
                        ],
                        [
                            NAME,
                            VERSION,
                            MAJOR
                        ],
                        [/\s(opr)\/((\d+)?[\w\.]+)/i],
                        [
                            [
                                NAME,
                                'Opera'
                            ],
                            VERSION,
                            MAJOR
                        ],
                        [
                            /(kindle)\/((\d+)?[\w\.]+)/i,
                            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i,
                            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i,
                            /(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i,
                            /(rekonq)((?:\/)[\w\.]+)*/i,
                            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i
                        ],
                        [
                            NAME,
                            VERSION,
                            MAJOR
                        ],
                        [/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i],
                        [
                            [
                                NAME,
                                'IE'
                            ],
                            VERSION,
                            MAJOR
                        ],
                        [/(yabrowser)\/((\d+)?[\w\.]+)/i],
                        [
                            [
                                NAME,
                                'Yandex'
                            ],
                            VERSION,
                            MAJOR
                        ],
                        [/(comodo_dragon)\/((\d+)?[\w\.]+)/i],
                        [
                            [
                                NAME,
                                /_/g,
                                ' '
                            ],
                            VERSION,
                            MAJOR
                        ],
                        [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i],
                        [
                            NAME,
                            VERSION,
                            MAJOR
                        ],
                        [/(dolfin)\/((\d+)?[\w\.]+)/i],
                        [
                            [
                                NAME,
                                'Dolphin'
                            ],
                            VERSION,
                            MAJOR
                        ],
                        [/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i],
                        [
                            [
                                NAME,
                                'Chrome'
                            ],
                            VERSION,
                            MAJOR
                        ],
                        [/((?:android.+))version\/((\d+)?[\w\.]+)\smobile\ssafari/i],
                        [
                            [
                                NAME,
                                'Android Browser'
                            ],
                            VERSION,
                            MAJOR
                        ],
                        [/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i],
                        [
                            VERSION,
                            MAJOR,
                            [
                                NAME,
                                'Mobile Safari'
                            ]
                        ],
                        [/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i],
                        [
                            VERSION,
                            MAJOR,
                            NAME
                        ],
                        [/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i],
                        [
                            NAME,
                            [
                                MAJOR,
                                mapper.str,
                                maps.browser.oldsafari.major
                            ],
                            [
                                VERSION,
                                mapper.str,
                                maps.browser.oldsafari.version
                            ]
                        ],
                        [
                            /(konqueror)\/((\d+)?[\w\.]+)/i,
                            /(webkit|khtml)\/((\d+)?[\w\.]+)/i
                        ],
                        [
                            NAME,
                            VERSION,
                            MAJOR
                        ],
                        [/(navigator|netscape)\/((\d+)?[\w\.-]+)/i],
                        [
                            [
                                NAME,
                                'Netscape'
                            ],
                            VERSION,
                            MAJOR
                        ],
                        [
                            /(swiftfox)/i,
                            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i,
                            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,
                            /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i,
                            /(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i,
                            /(links)\s\(((\d+)?[\w\.]+)/i,
                            /(gobrowser)\/?((\d+)?[\w\.]+)*/i,
                            /(ice\s?browser)\/v?((\d+)?[\w\._]+)/i,
                            /(mosaic)[\/\s]((\d+)?[\w\.]+)/i
                        ],
                        [
                            NAME,
                            VERSION,
                            MAJOR
                        ]
                    ],
                    engine: [
                        [
                            /(presto)\/([\w\.]+)/i,
                            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,
                            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
                            /(icab)[\/\s]([23]\.[\d\.]+)/i
                        ],
                        [
                            NAME,
                            VERSION
                        ],
                        [/rv\:([\w\.]+).*(gecko)/i],
                        [
                            VERSION,
                            NAME
                        ]
                    ],
                    os: [
                        [
                            /(windows)\snt\s6\.2;\s(arm)/i,
                            /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
                        ],
                        [
                            NAME,
                            [
                                VERSION,
                                mapper.str,
                                maps.os.windows.version
                            ]
                        ],
                        [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                        [
                            [
                                NAME,
                                'Windows'
                            ],
                            [
                                VERSION,
                                mapper.str,
                                maps.os.windows.version
                            ]
                        ],
                        [/\((bb)(10);/i],
                        [
                            [
                                NAME,
                                'BlackBerry'
                            ],
                            VERSION
                        ],
                        [
                            /(blackberry)\w*\/?([\w\.]+)*/i,
                            /(tizen)\/([\w\.]+)/i,
                            /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i
                        ],
                        [
                            NAME,
                            VERSION
                        ],
                        [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
                        [
                            [
                                NAME,
                                'Symbian'
                            ],
                            VERSION
                        ],
                        [/mozilla.+\(mobile;.+gecko.+firefox/i],
                        [
                            [
                                NAME,
                                'Firefox OS'
                            ],
                            VERSION
                        ],
                        [
                            /(nintendo|playstation)\s([wids3portablevu]+)/i,
                            /(mint)[\/\s\(]?(\w+)*/i,
                            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,
                            /(hurd|linux)\s?([\w\.]+)*/i,
                            /(gnu)\s?([\w\.]+)*/i
                        ],
                        [
                            NAME,
                            VERSION
                        ],
                        [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                        [
                            [
                                NAME,
                                'Chromium OS'
                            ],
                            VERSION
                        ],
                        [/(sunos)\s?([\w\.]+\d)*/i],
                        [
                            [
                                NAME,
                                'Solaris'
                            ],
                            VERSION
                        ],
                        [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
                        [
                            NAME,
                            VERSION
                        ],
                        [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],
                        [
                            [
                                NAME,
                                'iOS'
                            ],
                            [
                                VERSION,
                                /_/g,
                                '.'
                            ]
                        ],
                        [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i],
                        [
                            NAME,
                            [
                                VERSION,
                                /_/g,
                                '.'
                            ]
                        ],
                        [
                            /(haiku)\s(\w+)/i,
                            /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,
                            /(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i,
                            /(unix)\s?([\w\.]+)*/i
                        ],
                        [
                            NAME,
                            VERSION
                        ]
                    ]
                };
            __$coverCall('src/javascript/core/utils/Env.js', '16256:17228');
            var UAParser = function (uastring) {
                __$coverCall('src/javascript/core/utils/Env.js', '16303:16421');
                var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
                __$coverCall('src/javascript/core/utils/Env.js', '16433:16536');
                this.getBrowser = function () {
                    __$coverCall('src/javascript/core/utils/Env.js', '16478:16524');
                    return mapper.rgx.apply(this, regexes.browser);
                };
                __$coverCall('src/javascript/core/utils/Env.js', '16547:16648');
                this.getEngine = function () {
                    __$coverCall('src/javascript/core/utils/Env.js', '16591:16636');
                    return mapper.rgx.apply(this, regexes.engine);
                };
                __$coverCall('src/javascript/core/utils/Env.js', '16659:16752');
                this.getOS = function () {
                    __$coverCall('src/javascript/core/utils/Env.js', '16699:16740');
                    return mapper.rgx.apply(this, regexes.os);
                };
                __$coverCall('src/javascript/core/utils/Env.js', '16763:17013');
                this.getResult = function () {
                    __$coverCall('src/javascript/core/utils/Env.js', '16806:17001');
                    return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS()
                    };
                };
                __$coverCall('src/javascript/core/utils/Env.js', '17024:17085');
                this.getUA = function () {
                    __$coverCall('src/javascript/core/utils/Env.js', '17064:17073');
                    return ua;
                };
                __$coverCall('src/javascript/core/utils/Env.js', '17096:17195');
                this.setUA = function (uastring) {
                    __$coverCall('src/javascript/core/utils/Env.js', '17144:17157');
                    ua = uastring;
                    __$coverCall('src/javascript/core/utils/Env.js', '17172:17183');
                    return this;
                };
                __$coverCall('src/javascript/core/utils/Env.js', '17206:17220');
                this.setUA(ua);
            };
            __$coverCall('src/javascript/core/utils/Env.js', '17236:17269');
            return new UAParser().getResult();
        }();
    __$coverCall('src/javascript/core/utils/Env.js', '17281:20872');
    function version_compare(v1, v2, operator) {
        __$coverCall('src/javascript/core/utils/Env.js', '18148:19862');
        var i = 0, x = 0, compare = 0, vm = {
                'dev': -6,
                'alpha': -5,
                'a': -5,
                'beta': -4,
                'b': -4,
                'RC': -3,
                'rc': -3,
                '#': -2,
                'p': 1,
                'pl': 1
            }, prepVersion = function (v) {
                __$coverCall('src/javascript/core/utils/Env.js', '19386:19422');
                v = ('' + v).replace(/[_\-+]/g, '.');
                __$coverCall('src/javascript/core/utils/Env.js', '19431:19490');
                v = v.replace(/([^.\d]+)/g, '.$1.').replace(/\.{2,}/g, '.');
                __$coverCall('src/javascript/core/utils/Env.js', '19499:19539');
                return !v.length ? [-8] : v.split('.');
            }, numVersion = function (v) {
                __$coverCall('src/javascript/core/utils/Env.js', '19796:19854');
                return !v ? 0 : isNaN(v) ? vm[v] || -7 : parseInt(v, 10);
            };
        __$coverCall('src/javascript/core/utils/Env.js', '19868:19888');
        v1 = prepVersion(v1);
        __$coverCall('src/javascript/core/utils/Env.js', '19893:19913');
        v2 = prepVersion(v2);
        __$coverCall('src/javascript/core/utils/Env.js', '19918:19952');
        x = Math.max(v1.length, v2.length);
        __$coverCall('src/javascript/core/utils/Env.js', '19957:20236');
        for (i = 0; i < x; i++) {
            __$coverCall('src/javascript/core/utils/Env.js', '19988:20032');
            if (v1[i] == v2[i]) {
                __$coverCall('src/javascript/core/utils/Env.js', '20017:20025');
                continue;
            }
            __$coverCall('src/javascript/core/utils/Env.js', '20039:20064');
            v1[i] = numVersion(v1[i]);
            __$coverCall('src/javascript/core/utils/Env.js', '20071:20096');
            v2[i] = numVersion(v2[i]);
            __$coverCall('src/javascript/core/utils/Env.js', '20103:20231');
            if (v1[i] < v2[i]) {
                __$coverCall('src/javascript/core/utils/Env.js', '20131:20143');
                compare = -1;
                __$coverCall('src/javascript/core/utils/Env.js', '20152:20157');
                break;
            } else if (v1[i] > v2[i]) {
                __$coverCall('src/javascript/core/utils/Env.js', '20199:20210');
                compare = 1;
                __$coverCall('src/javascript/core/utils/Env.js', '20219:20224');
                break;
            }
        }
        __$coverCall('src/javascript/core/utils/Env.js', '20241:20282');
        if (!operator) {
            __$coverCall('src/javascript/core/utils/Env.js', '20263:20277');
            return compare;
        }
        __$coverCall('src/javascript/core/utils/Env.js', '20443:20869');
        switch (operator) {
        case '>':
        case 'gt':
            __$coverCall('src/javascript/core/utils/Env.js', '20495:20515');
            return compare > 0;
        case '>=':
        case 'ge':
            __$coverCall('src/javascript/core/utils/Env.js', '20550:20571');
            return compare >= 0;
        case '<=':
        case 'le':
            __$coverCall('src/javascript/core/utils/Env.js', '20606:20627');
            return compare <= 0;
        case '==':
        case '=':
        case 'eq':
            __$coverCall('src/javascript/core/utils/Env.js', '20675:20697');
            return compare === 0;
        case '<>':
        case '!=':
        case 'ne':
            __$coverCall('src/javascript/core/utils/Env.js', '20746:20768');
            return compare !== 0;
        case '':
        case '<':
        case 'lt':
            __$coverCall('src/javascript/core/utils/Env.js', '20814:20834');
            return compare < 0;
        default:
            __$coverCall('src/javascript/core/utils/Env.js', '20853:20864');
            return null;
        }
    }
    __$coverCall('src/javascript/core/utils/Env.js', '20877:23497');
    var can = function () {
            __$coverCall('src/javascript/core/utils/Env.js', '20903:23292');
            var caps = {
                    define_property: function () {
                        __$coverCall('src/javascript/core/utils/Env.js', '21427:21439');
                        return false;
                    }(),
                    create_canvas: function () {
                        __$coverCall('src/javascript/core/utils/Env.js', '21686:21727');
                        var el = document.createElement('canvas');
                        __$coverCall('src/javascript/core/utils/Env.js', '21734:21781');
                        return !!(el.getContext && el.getContext('2d'));
                    }(),
                    return_response_type: function (responseType) {
                        __$coverCall('src/javascript/core/utils/Env.js', '21850:22436');
                        try {
                            __$coverCall('src/javascript/core/utils/Env.js', '21862:22415');
                            if (Basic.inArray(responseType, [
                                    '',
                                    'text',
                                    'document'
                                ]) !== -1) {
                                __$coverCall('src/javascript/core/utils/Env.js', '21937:21948');
                                return true;
                            } else if (window.XMLHttpRequest) {
                                __$coverCall('src/javascript/core/utils/Env.js', '21999:22029');
                                var xhr = new XMLHttpRequest();
                                __$coverCall('src/javascript/core/utils/Env.js', '22038:22058');
                                xhr.open('get', '/');
                                __$coverCall('src/javascript/core/utils/Env.js', '22106:22407');
                                if ('responseType' in xhr) {
                                    __$coverCall('src/javascript/core/utils/Env.js', '22143:22174');
                                    xhr.responseType = responseType;
                                    __$coverCall('src/javascript/core/utils/Env.js', '22305:22377');
                                    if (xhr.responseType !== responseType) {
                                        __$coverCall('src/javascript/core/utils/Env.js', '22355:22367');
                                        return false;
                                    }
                                    __$coverCall('src/javascript/core/utils/Env.js', '22387:22398');
                                    return true;
                                }
                            }
                        } catch (ex) {
                        }
                        __$coverCall('src/javascript/core/utils/Env.js', '22443:22455');
                        return false;
                    },
                    use_data_uri: function () {
                        __$coverCall('src/javascript/core/utils/Env.js', '22576:22596');
                        var du = new Image();
                        __$coverCall('src/javascript/core/utils/Env.js', '22604:22698');
                        du.onload = function () {
                            __$coverCall('src/javascript/core/utils/Env.js', '22635:22690');
                            caps.use_data_uri = du.width === 1 && du.height === 1;
                        };
                        __$coverCall('src/javascript/core/utils/Env.js', '22711:22846');
                        setTimeout(function () {
                            __$coverCall('src/javascript/core/utils/Env.js', '22741:22834');
                            du.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
                        }, 1);
                        __$coverCall('src/javascript/core/utils/Env.js', '22853:22865');
                        return false;
                    }(),
                    use_data_uri_over32kb: function () {
                        __$coverCall('src/javascript/core/utils/Env.js', '22930:23000');
                        return caps.use_data_uri && (Env.browser !== 'IE' || Env.version >= 9);
                    },
                    use_data_uri_of: function (bytes) {
                        __$coverCall('src/javascript/core/utils/Env.js', '23054:23129');
                        return caps.use_data_uri && bytes < 33000 || caps.use_data_uri_over32kb();
                    },
                    use_fileinput: function () {
                        __$coverCall('src/javascript/core/utils/Env.js', '23176:23216');
                        var el = document.createElement('input');
                        __$coverCall('src/javascript/core/utils/Env.js', '23223:23254');
                        el.setAttribute('type', 'file');
                        __$coverCall('src/javascript/core/utils/Env.js', '23261:23280');
                        return !el.disabled;
                    }
                };
            __$coverCall('src/javascript/core/utils/Env.js', '23297:23490');
            return function (cap) {
                __$coverCall('src/javascript/core/utils/Env.js', '23323:23358');
                var args = [].slice.call(arguments);
                __$coverCall('src/javascript/core/utils/Env.js', '23363:23375');
                args.shift();
                __$coverCall('src/javascript/core/utils/Env.js', '23396:23485');
                return Basic.typeOf(caps[cap]) === 'function' ? caps[cap].apply(this, args) : !!caps[cap];
            };
        }();
    __$coverCall('src/javascript/core/utils/Env.js', '23502:23914');
    var Env = {
            can: can,
            browser: UAParser.browser.name,
            version: parseFloat(UAParser.browser.major),
            os: UAParser.os.name,
            osVersion: UAParser.os.version,
            verComp: version_compare,
            swf_url: '../flash/Moxie.swf',
            xap_url: '../silverlight/Moxie.xap',
            global_event_dispatcher: 'moxie.core.EventTarget.instance.dispatchEvent'
        };
    __$coverCall('src/javascript/core/utils/Env.js', '23986:24001');
    Env.OS = Env.os;
    __$coverCall('src/javascript/core/utils/Env.js', '24005:24951');
    if (MXI_DEBUG) {
        __$coverCall('src/javascript/core/utils/Env.js', '24024:24076');
        Env.debug = {
            runtime: true,
            events: false
        };
        __$coverCall('src/javascript/core/utils/Env.js', '24081:24948');
        Env.log = function () {
            __$coverCall('src/javascript/core/utils/Env.js', '24111:24275');
            function logObj(data) {
                __$coverCall('src/javascript/core/utils/Env.js', '24213:24270');
                console.appendChild(document.createTextNode(data + '\n'));
            }
            __$coverCall('src/javascript/core/utils/Env.js', '24281:24304');
            var data = arguments[0];
            __$coverCall('src/javascript/core/utils/Env.js', '24310:24401');
            if (Basic.typeOf(data) === 'string') {
                __$coverCall('src/javascript/core/utils/Env.js', '24353:24396');
                data = Basic.sprintf.apply(this, arguments);
            }
            __$coverCall('src/javascript/core/utils/Env.js', '24407:24943');
            if (window && window.console && window.console.log) {
                __$coverCall('src/javascript/core/utils/Env.js', '24465:24489');
                window.console.log(data);
            } else if (document) {
                __$coverCall('src/javascript/core/utils/Env.js', '24521:24575');
                var console = document.getElementById('moxie-console');
                __$coverCall('src/javascript/core/utils/Env.js', '24581:24762');
                if (!console) {
                    __$coverCall('src/javascript/core/utils/Env.js', '24602:24641');
                    console = document.createElement('pre');
                    __$coverCall('src/javascript/core/utils/Env.js', '24648:24676');
                    console.id = 'moxie-console';
                    __$coverCall('src/javascript/core/utils/Env.js', '24722:24756');
                    document.body.appendChild(console);
                }
                __$coverCall('src/javascript/core/utils/Env.js', '24769:24938');
                if (Basic.inArray(Basic.typeOf(data), [
                        'object',
                        'array'
                    ]) !== -1) {
                    __$coverCall('src/javascript/core/utils/Env.js', '24843:24855');
                    logObj(data);
                } else {
                    __$coverCall('src/javascript/core/utils/Env.js', '24875:24932');
                    console.appendChild(document.createTextNode(data + '\n'));
                }
            }
        };
    }
    __$coverCall('src/javascript/core/utils/Env.js', '24955:24965');
    return Env;
});

// Included from: src/javascript/core/I18n.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/core/I18n.js", "/**\n * I18n.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine(\"moxie/core/I18n\", [\n\t\"moxie/core/utils/Basic\"\n], function(Basic) {\n\tvar i18n = {};\n\n\treturn {\n\t\t/**\n\t\t * Extends the language pack object with new items.\n\t\t *\n\t\t * @param {Object} pack Language pack items to add.\n\t\t * @return {Object} Extended language pack object.\n\t\t */\n\t\taddI18n: function(pack) {\n\t\t\treturn Basic.extend(i18n, pack);\n\t\t},\n\n\t\t/**\n\t\t * Translates the specified string by checking for the english string in the language pack lookup.\n\t\t *\n\t\t * @param {String} str String to look for.\n\t\t * @return {String} Translated string or the input string if it wasn't found.\n\t\t */\n\t\ttranslate: function(str) {\n\t\t\treturn i18n[str] || str;\n\t\t},\n\n\t\t/**\n\t\t * Shortcut for translate function\n\t\t *\n\t\t * @param {String} str String to look for.\n\t\t * @return {String} Translated string or the input string if it wasn't found.\n\t\t */\n\t\t_: function(str) {\n\t\t\treturn this.translate(str);\n\t\t},\n\n\t\t/**\n\t\t * Pseudo sprintf implementation - simple way to replace tokens with specified values.\n\t\t *\n\t\t * @param {String} str String with tokens\n\t\t * @return {String} String with replaced tokens\n\t\t */\n\t\tsprintf: function(str) {\n\t\t\tvar args = [].slice.call(arguments, 1);\n\n\t\t\treturn str.replace(/%[a-z]/g, function() {\n\t\t\t\tvar value = args.shift();\n\t\t\t\treturn Basic.typeOf(value) !== 'undefined' ? value : '';\n\t\t\t});\n\t\t}\n\t};\n});");
__$coverInitRange("src/javascript/core/I18n.js", "195:1513");
__$coverInitRange("src/javascript/core/I18n.js", "271:284");
__$coverInitRange("src/javascript/core/I18n.js", "288:1509");
__$coverInitRange("src/javascript/core/I18n.js", "506:537");
__$coverInitRange("src/javascript/core/I18n.js", "820:843");
__$coverInitRange("src/javascript/core/I18n.js", "1054:1080");
__$coverInitRange("src/javascript/core/I18n.js", "1318:1356");
__$coverInitRange("src/javascript/core/I18n.js", "1362:1501");
__$coverInitRange("src/javascript/core/I18n.js", "1409:1433");
__$coverInitRange("src/javascript/core/I18n.js", "1439:1494");
__$coverCall('src/javascript/core/I18n.js', '195:1513');
define('moxie/core/I18n', ['moxie/core/utils/Basic'], function (Basic) {
    __$coverCall('src/javascript/core/I18n.js', '271:284');
    var i18n = {};
    __$coverCall('src/javascript/core/I18n.js', '288:1509');
    return {
        addI18n: function (pack) {
            __$coverCall('src/javascript/core/I18n.js', '506:537');
            return Basic.extend(i18n, pack);
        },
        translate: function (str) {
            __$coverCall('src/javascript/core/I18n.js', '820:843');
            return i18n[str] || str;
        },
        _: function (str) {
            __$coverCall('src/javascript/core/I18n.js', '1054:1080');
            return this.translate(str);
        },
        sprintf: function (str) {
            __$coverCall('src/javascript/core/I18n.js', '1318:1356');
            var args = [].slice.call(arguments, 1);
            __$coverCall('src/javascript/core/I18n.js', '1362:1501');
            return str.replace(/%[a-z]/g, function () {
                __$coverCall('src/javascript/core/I18n.js', '1409:1433');
                var value = args.shift();
                __$coverCall('src/javascript/core/I18n.js', '1439:1494');
                return Basic.typeOf(value) !== 'undefined' ? value : '';
            });
        }
    };
});

// Included from: src/javascript/core/utils/Mime.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/core/utils/Mime.js", "/**\n * Mime.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine(\"moxie/core/utils/Mime\", [\n\t\"moxie/core/utils/Basic\",\n\t\"moxie/core/I18n\"\n], function(Basic, I18n) {\n\t\n\tvar mimeData = \"\" +\n\t\t\"application/msword,doc dot,\" +\n\t\t\"application/pdf,pdf,\" +\n\t\t\"application/pgp-signature,pgp,\" +\n\t\t\"application/postscript,ps ai eps,\" +\n\t\t\"application/rtf,rtf,\" +\n\t\t\"application/vnd.ms-excel,xls xlb,\" +\n\t\t\"application/vnd.ms-powerpoint,ppt pps pot,\" +\n\t\t\"application/zip,zip,\" +\n\t\t\"application/x-shockwave-flash,swf swfl,\" +\n\t\t\"application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,\" +\n\t\t\"application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,\" +\n\t\t\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,\" +\n\t\t\"application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,\" +\n\t\t\"application/vnd.openxmlformats-officedocument.presentationml.template,potx,\" +\n\t\t\"application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,\" +\n\t\t\"application/x-javascript,js,\" +\n\t\t\"application/json,json,\" +\n\t\t\"audio/mpeg,mp3 mpga mpega mp2,\" +\n\t\t\"audio/x-wav,wav,\" +\n\t\t\"audio/x-m4a,m4a,\" +\n\t\t\"audio/ogg,oga ogg,\" +\n\t\t\"audio/aiff,aiff aif,\" +\n\t\t\"audio/flac,flac,\" +\n\t\t\"audio/aac,aac,\" +\n\t\t\"audio/ac3,ac3,\" +\n\t\t\"audio/x-ms-wma,wma,\" +\n\t\t\"image/bmp,bmp,\" +\n\t\t\"image/gif,gif,\" +\n\t\t\"image/jpeg,jpg jpeg jpe,\" +\n\t\t\"image/photoshop,psd,\" +\n\t\t\"image/png,png,\" +\n\t\t\"image/svg+xml,svg svgz,\" +\n\t\t\"image/tiff,tiff tif,\" +\n\t\t\"text/plain,asc txt text diff log,\" +\n\t\t\"text/html,htm html xhtml,\" +\n\t\t\"text/css,css,\" +\n\t\t\"text/csv,csv,\" +\n\t\t\"text/rtf,rtf,\" +\n\t\t\"video/mpeg,mpeg mpg mpe m2v,\" +\n\t\t\"video/quicktime,qt mov,\" +\n\t\t\"video/mp4,mp4,\" +\n\t\t\"video/x-m4v,m4v,\" +\n\t\t\"video/x-flv,flv,\" +\n\t\t\"video/x-ms-wmv,wmv,\" +\n\t\t\"video/avi,avi,\" +\n\t\t\"video/webm,webm,\" +\n\t\t\"video/3gpp,3gpp 3gp,\" +\n\t\t\"video/3gpp2,3g2,\" +\n\t\t\"video/vnd.rn-realvideo,rv,\" +\n\t\t\"video/ogg,ogv,\" + \n\t\t\"video/x-matroska,mkv,\" +\n\t\t\"application/vnd.oasis.opendocument.formula-template,otf,\" +\n\t\t\"application/octet-stream,exe\";\n\t\n\t\n\tvar Mime = {\n\n\t\tmimes: {},\n\n\t\textensions: {},\n\n\t\t// Parses the default mime types string into a mimes and extensions lookup maps\n\t\taddMimeType: function (mimeData) {\n\t\t\tvar items = mimeData.split(/,/), i, ii, ext;\n\t\t\t\n\t\t\tfor (i = 0; i < items.length; i += 2) {\n\t\t\t\text = items[i + 1].split(/ /);\n\n\t\t\t\t// extension to mime lookup\n\t\t\t\tfor (ii = 0; ii < ext.length; ii++) {\n\t\t\t\t\tthis.mimes[ext[ii]] = items[i];\n\t\t\t\t}\n\t\t\t\t// mime to extension lookup\n\t\t\t\tthis.extensions[items[i]] = ext;\n\t\t\t}\n\t\t},\n\n\n\t\textList2mimes: function (filters, addMissingExtensions) {\n\t\t\tvar self = this, ext, i, ii, type, mimes = [];\n\t\t\t\n\t\t\t// convert extensions to mime types list\n\t\t\tfor (i = 0; i < filters.length; i++) {\n\t\t\t\text = filters[i].extensions.split(/\\s*,\\s*/);\n\n\t\t\t\tfor (ii = 0; ii < ext.length; ii++) {\n\t\t\t\t\t\n\t\t\t\t\t// if there's an asterisk in the list, then accept attribute is not required\n\t\t\t\t\tif (ext[ii] === '*') {\n\t\t\t\t\t\treturn [];\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\ttype = self.mimes[ext[ii]];\n\t\t\t\t\tif (!type) {\n\t\t\t\t\t\tif (addMissingExtensions && /^\\w+$/.test(ext[ii])) {\n\t\t\t\t\t\t\tmimes.push('.' + ext[ii]);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\treturn []; // accept all\n\t\t\t\t\t\t}\n\t\t\t\t\t} else if (Basic.inArray(type, mimes) === -1) {\n\t\t\t\t\t\tmimes.push(type);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn mimes;\n\t\t},\n\n\n\t\tmimes2exts: function(mimes) {\n\t\t\tvar self = this, exts = [];\n\t\t\t\n\t\t\tBasic.each(mimes, function(mime) {\n\t\t\t\tif (mime === '*') {\n\t\t\t\t\texts = [];\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\n\t\t\t\t// check if this thing looks like mime type\n\t\t\t\tvar m = mime.match(/^(\\w+)\\/(\\*|\\w+)$/);\n\t\t\t\tif (m) {\n\t\t\t\t\tif (m[2] === '*') { \n\t\t\t\t\t\t// wildcard mime type detected\n\t\t\t\t\t\tBasic.each(self.extensions, function(arr, mime) {\n\t\t\t\t\t\t\tif ((new RegExp('^' + m[1] + '/')).test(mime)) {\n\t\t\t\t\t\t\t\t[].push.apply(exts, self.extensions[mime]);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t});\n\t\t\t\t\t} else if (self.extensions[mime]) {\n\t\t\t\t\t\t[].push.apply(exts, self.extensions[mime]);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t\treturn exts;\n\t\t},\n\n\n\t\tmimes2extList: function(mimes) {\n\t\t\tvar accept = [], exts = [];\n\n\t\t\tif (Basic.typeOf(mimes) === 'string') {\n\t\t\t\tmimes = Basic.trim(mimes).split(/\\s*,\\s*/);\n\t\t\t}\n\n\t\t\texts = this.mimes2exts(mimes);\n\t\t\t\n\t\t\taccept.push({\n\t\t\t\ttitle: I18n.translate('Files'),\n\t\t\t\textensions: exts.length ? exts.join(',') : '*'\n\t\t\t});\n\t\t\t\n\t\t\t// save original mimes string\n\t\t\taccept.mimes = mimes;\n\n\t\t\treturn accept;\n\t\t},\n\n\n\t\tgetFileExtension: function(fileName) {\n\t\t\tvar matches = fileName && fileName.match(/\\.([^.]+)$/);\n\t\t\tif (matches) {\n\t\t\t\treturn matches[1].toLowerCase();\n\t\t\t}\n\t\t\treturn '';\n\t\t},\n\n\t\tgetFileMime: function(fileName) {\n\t\t\treturn this.mimes[this.getFileExtension(fileName)] || '';\n\t\t}\n\t};\n\n\tMime.addMimeType(mimeData);\n\n\treturn Mime;\n});\n");
__$coverInitRange("src/javascript/core/utils/Mime.js", "195:4828");
__$coverInitRange("src/javascript/core/utils/Mime.js", "305:2179");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2186:4779");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4783:4809");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4813:4824");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2355:2398");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2407:2672");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2451:2480");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2519:2598");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2636:2667");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2562:2592");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2744:2789");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2842:3412");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3417:3429");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2885:2929");
__$coverInitRange("src/javascript/core/utils/Mime.js", "2936:3407");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3067:3112");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3125:3151");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3158:3401");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3096:3105");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3177:3317");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3237:3262");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3286:3295");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3378:3394");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3473:3499");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3508:4070");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4075:4086");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3547:3606");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3661:3700");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3706:4063");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3572:3581");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3588:3600");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3720:4057");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3784:3959");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3841:3949");
__$coverInitRange("src/javascript/core/utils/Mime.js", "3898:3940");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4008:4050");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4133:4159");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4165:4256");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4262:4291");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4300:4406");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4448:4468");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4474:4487");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4209:4251");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4540:4594");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4599:4654");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4659:4668");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4618:4649");
__$coverInitRange("src/javascript/core/utils/Mime.js", "4715:4771");
__$coverCall('src/javascript/core/utils/Mime.js', '195:4828');
define('moxie/core/utils/Mime', [
    'moxie/core/utils/Basic',
    'moxie/core/I18n'
], function (Basic, I18n) {
    __$coverCall('src/javascript/core/utils/Mime.js', '305:2179');
    var mimeData = '' + 'application/msword,doc dot,' + 'application/pdf,pdf,' + 'application/pgp-signature,pgp,' + 'application/postscript,ps ai eps,' + 'application/rtf,rtf,' + 'application/vnd.ms-excel,xls xlb,' + 'application/vnd.ms-powerpoint,ppt pps pot,' + 'application/zip,zip,' + 'application/x-shockwave-flash,swf swfl,' + 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,' + 'application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,' + 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,' + 'application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,' + 'application/vnd.openxmlformats-officedocument.presentationml.template,potx,' + 'application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,' + 'application/x-javascript,js,' + 'application/json,json,' + 'audio/mpeg,mp3 mpga mpega mp2,' + 'audio/x-wav,wav,' + 'audio/x-m4a,m4a,' + 'audio/ogg,oga ogg,' + 'audio/aiff,aiff aif,' + 'audio/flac,flac,' + 'audio/aac,aac,' + 'audio/ac3,ac3,' + 'audio/x-ms-wma,wma,' + 'image/bmp,bmp,' + 'image/gif,gif,' + 'image/jpeg,jpg jpeg jpe,' + 'image/photoshop,psd,' + 'image/png,png,' + 'image/svg+xml,svg svgz,' + 'image/tiff,tiff tif,' + 'text/plain,asc txt text diff log,' + 'text/html,htm html xhtml,' + 'text/css,css,' + 'text/csv,csv,' + 'text/rtf,rtf,' + 'video/mpeg,mpeg mpg mpe m2v,' + 'video/quicktime,qt mov,' + 'video/mp4,mp4,' + 'video/x-m4v,m4v,' + 'video/x-flv,flv,' + 'video/x-ms-wmv,wmv,' + 'video/avi,avi,' + 'video/webm,webm,' + 'video/3gpp,3gpp 3gp,' + 'video/3gpp2,3g2,' + 'video/vnd.rn-realvideo,rv,' + 'video/ogg,ogv,' + 'video/x-matroska,mkv,' + 'application/vnd.oasis.opendocument.formula-template,otf,' + 'application/octet-stream,exe';
    __$coverCall('src/javascript/core/utils/Mime.js', '2186:4779');
    var Mime = {
            mimes: {},
            extensions: {},
            addMimeType: function (mimeData) {
                __$coverCall('src/javascript/core/utils/Mime.js', '2355:2398');
                var items = mimeData.split(/,/), i, ii, ext;
                __$coverCall('src/javascript/core/utils/Mime.js', '2407:2672');
                for (i = 0; i < items.length; i += 2) {
                    __$coverCall('src/javascript/core/utils/Mime.js', '2451:2480');
                    ext = items[i + 1].split(/ /);
                    __$coverCall('src/javascript/core/utils/Mime.js', '2519:2598');
                    for (ii = 0; ii < ext.length; ii++) {
                        __$coverCall('src/javascript/core/utils/Mime.js', '2562:2592');
                        this.mimes[ext[ii]] = items[i];
                    }
                    __$coverCall('src/javascript/core/utils/Mime.js', '2636:2667');
                    this.extensions[items[i]] = ext;
                }
            },
            extList2mimes: function (filters, addMissingExtensions) {
                __$coverCall('src/javascript/core/utils/Mime.js', '2744:2789');
                var self = this, ext, i, ii, type, mimes = [];
                __$coverCall('src/javascript/core/utils/Mime.js', '2842:3412');
                for (i = 0; i < filters.length; i++) {
                    __$coverCall('src/javascript/core/utils/Mime.js', '2885:2929');
                    ext = filters[i].extensions.split(/\s*,\s*/);
                    __$coverCall('src/javascript/core/utils/Mime.js', '2936:3407');
                    for (ii = 0; ii < ext.length; ii++) {
                        __$coverCall('src/javascript/core/utils/Mime.js', '3067:3112');
                        if (ext[ii] === '*') {
                            __$coverCall('src/javascript/core/utils/Mime.js', '3096:3105');
                            return [];
                        }
                        __$coverCall('src/javascript/core/utils/Mime.js', '3125:3151');
                        type = self.mimes[ext[ii]];
                        __$coverCall('src/javascript/core/utils/Mime.js', '3158:3401');
                        if (!type) {
                            __$coverCall('src/javascript/core/utils/Mime.js', '3177:3317');
                            if (addMissingExtensions && /^\w+$/.test(ext[ii])) {
                                __$coverCall('src/javascript/core/utils/Mime.js', '3237:3262');
                                mimes.push('.' + ext[ii]);
                            } else {
                                __$coverCall('src/javascript/core/utils/Mime.js', '3286:3295');
                                return [];
                            }
                        } else if (Basic.inArray(type, mimes) === -1) {
                            __$coverCall('src/javascript/core/utils/Mime.js', '3378:3394');
                            mimes.push(type);
                        }
                    }
                }
                __$coverCall('src/javascript/core/utils/Mime.js', '3417:3429');
                return mimes;
            },
            mimes2exts: function (mimes) {
                __$coverCall('src/javascript/core/utils/Mime.js', '3473:3499');
                var self = this, exts = [];
                __$coverCall('src/javascript/core/utils/Mime.js', '3508:4070');
                Basic.each(mimes, function (mime) {
                    __$coverCall('src/javascript/core/utils/Mime.js', '3547:3606');
                    if (mime === '*') {
                        __$coverCall('src/javascript/core/utils/Mime.js', '3572:3581');
                        exts = [];
                        __$coverCall('src/javascript/core/utils/Mime.js', '3588:3600');
                        return false;
                    }
                    __$coverCall('src/javascript/core/utils/Mime.js', '3661:3700');
                    var m = mime.match(/^(\w+)\/(\*|\w+)$/);
                    __$coverCall('src/javascript/core/utils/Mime.js', '3706:4063');
                    if (m) {
                        __$coverCall('src/javascript/core/utils/Mime.js', '3720:4057');
                        if (m[2] === '*') {
                            __$coverCall('src/javascript/core/utils/Mime.js', '3784:3959');
                            Basic.each(self.extensions, function (arr, mime) {
                                __$coverCall('src/javascript/core/utils/Mime.js', '3841:3949');
                                if (new RegExp('^' + m[1] + '/').test(mime)) {
                                    __$coverCall('src/javascript/core/utils/Mime.js', '3898:3940');
                                    [].push.apply(exts, self.extensions[mime]);
                                }
                            });
                        } else if (self.extensions[mime]) {
                            __$coverCall('src/javascript/core/utils/Mime.js', '4008:4050');
                            [].push.apply(exts, self.extensions[mime]);
                        }
                    }
                });
                __$coverCall('src/javascript/core/utils/Mime.js', '4075:4086');
                return exts;
            },
            mimes2extList: function (mimes) {
                __$coverCall('src/javascript/core/utils/Mime.js', '4133:4159');
                var accept = [], exts = [];
                __$coverCall('src/javascript/core/utils/Mime.js', '4165:4256');
                if (Basic.typeOf(mimes) === 'string') {
                    __$coverCall('src/javascript/core/utils/Mime.js', '4209:4251');
                    mimes = Basic.trim(mimes).split(/\s*,\s*/);
                }
                __$coverCall('src/javascript/core/utils/Mime.js', '4262:4291');
                exts = this.mimes2exts(mimes);
                __$coverCall('src/javascript/core/utils/Mime.js', '4300:4406');
                accept.push({
                    title: I18n.translate('Files'),
                    extensions: exts.length ? exts.join(',') : '*'
                });
                __$coverCall('src/javascript/core/utils/Mime.js', '4448:4468');
                accept.mimes = mimes;
                __$coverCall('src/javascript/core/utils/Mime.js', '4474:4487');
                return accept;
            },
            getFileExtension: function (fileName) {
                __$coverCall('src/javascript/core/utils/Mime.js', '4540:4594');
                var matches = fileName && fileName.match(/\.([^.]+)$/);
                __$coverCall('src/javascript/core/utils/Mime.js', '4599:4654');
                if (matches) {
                    __$coverCall('src/javascript/core/utils/Mime.js', '4618:4649');
                    return matches[1].toLowerCase();
                }
                __$coverCall('src/javascript/core/utils/Mime.js', '4659:4668');
                return '';
            },
            getFileMime: function (fileName) {
                __$coverCall('src/javascript/core/utils/Mime.js', '4715:4771');
                return this.mimes[this.getFileExtension(fileName)] || '';
            }
        };
    __$coverCall('src/javascript/core/utils/Mime.js', '4783:4809');
    Mime.addMimeType(mimeData);
    __$coverCall('src/javascript/core/utils/Mime.js', '4813:4824');
    return Mime;
});

// Included from: src/javascript/core/utils/Dom.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/core/utils/Dom.js", "/**\n * Dom.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/core/utils/Dom', ['moxie/core/utils/Env'], function(Env) {\n\n\t/**\n\tGet DOM Element by it's id.\n\n\t@method get\n\t@for Utils\n\t@param {String} id Identifier of the DOM Element\n\t@return {DOMElement}\n\t*/\n\tvar get = function(id) {\n\t\tif (typeof id !== 'string') {\n\t\t\treturn id;\n\t\t}\n\t\treturn document.getElementById(id);\n\t};\n\n\t/**\n\tChecks if specified DOM element has specified class.\n\n\t@method hasClass\n\t@static\n\t@param {Object} obj DOM element like object to add handler to.\n\t@param {String} name Class name\n\t*/\n\tvar hasClass = function(obj, name) {\n\t\tif (!obj.className) {\n\t\t\treturn false;\n\t\t}\n\n\t\tvar regExp = new RegExp(\"(^|\\\\s+)\"+name+\"(\\\\s+|$)\");\n\t\treturn regExp.test(obj.className);\n\t};\n\n\t/**\n\tAdds specified className to specified DOM element.\n\n\t@method addClass\n\t@static\n\t@param {Object} obj DOM element like object to add handler to.\n\t@param {String} name Class name\n\t*/\n\tvar addClass = function(obj, name) {\n\t\tif (!hasClass(obj, name)) {\n\t\t\tobj.className = !obj.className ? name : obj.className.replace(/\\s+$/, '') + ' ' + name;\n\t\t}\n\t};\n\n\t/**\n\tRemoves specified className from specified DOM element.\n\n\t@method removeClass\n\t@static\n\t@param {Object} obj DOM element like object to add handler to.\n\t@param {String} name Class name\n\t*/\n\tvar removeClass = function(obj, name) {\n\t\tif (obj.className) {\n\t\t\tvar regExp = new RegExp(\"(^|\\\\s+)\"+name+\"(\\\\s+|$)\");\n\t\t\tobj.className = obj.className.replace(regExp, function($0, $1, $2) {\n\t\t\t\treturn $1 === ' ' && $2 === ' ' ? ' ' : '';\n\t\t\t});\n\t\t}\n\t};\n\n\t/**\n\tReturns a given computed style of a DOM element.\n\n\t@method getStyle\n\t@static\n\t@param {Object} obj DOM element like object.\n\t@param {String} name Style you want to get from the DOM element\n\t*/\n\tvar getStyle = function(obj, name) {\n\t\tif (obj.currentStyle) {\n\t\t\treturn obj.currentStyle[name];\n\t\t} else if (window.getComputedStyle) {\n\t\t\treturn window.getComputedStyle(obj, null)[name];\n\t\t}\n\t};\n\n\n\t/**\n\tReturns the absolute x, y position of an Element. The position will be returned in a object with x, y fields.\n\n\t@method getPos\n\t@static\n\t@param {Element} node HTML element or element id to get x, y position from.\n\t@param {Element} root Optional root element to stop calculations at.\n\t@return {object} Absolute position of the specified element object with x, y fields.\n\t*/\n\tvar getPos = function(node, root) {\n\t\tvar x = 0, y = 0, parent, doc = document, nodeRect, rootRect;\n\n\t\tnode = node;\n\t\troot = root || doc.body;\n\n\t\t// Returns the x, y cordinate for an element on IE 6 and IE 7\n\t\tfunction getIEPos(node) {\n\t\t\tvar bodyElm, rect, x = 0, y = 0;\n\n\t\t\tif (node) {\n\t\t\t\trect = node.getBoundingClientRect();\n\t\t\t\tbodyElm = doc.compatMode === \"CSS1Compat\" ? doc.documentElement : doc.body;\n\t\t\t\tx = rect.left + bodyElm.scrollLeft;\n\t\t\t\ty = rect.top + bodyElm.scrollTop;\n\t\t\t}\n\n\t\t\treturn {\n\t\t\t\tx : x,\n\t\t\t\ty : y\n\t\t\t};\n\t\t}\n\n\t\t// Use getBoundingClientRect on IE 6 and IE 7 but not on IE 8 in standards mode\n\t\tif (node && node.getBoundingClientRect && Env.browser === 'IE' && (!doc.documentMode || doc.documentMode < 8)) {\n\t\t\tnodeRect = getIEPos(node);\n\t\t\trootRect = getIEPos(root);\n\n\t\t\treturn {\n\t\t\t\tx : nodeRect.x - rootRect.x,\n\t\t\t\ty : nodeRect.y - rootRect.y\n\t\t\t};\n\t\t}\n\n\t\tparent = node;\n\t\twhile (parent && parent != root && parent.nodeType) {\n\t\t\tx += parent.offsetLeft || 0;\n\t\t\ty += parent.offsetTop || 0;\n\t\t\tparent = parent.offsetParent;\n\t\t}\n\n\t\tparent = node.parentNode;\n\t\twhile (parent && parent != root && parent.nodeType) {\n\t\t\tx -= parent.scrollLeft || 0;\n\t\t\ty -= parent.scrollTop || 0;\n\t\t\tparent = parent.parentNode;\n\t\t}\n\n\t\treturn {\n\t\t\tx : x,\n\t\t\ty : y\n\t\t};\n\t};\n\n\t/**\n\tReturns the size of the specified node in pixels.\n\n\t@method getSize\n\t@static\n\t@param {Node} node Node to get the size of.\n\t@return {Object} Object with a w and h property.\n\t*/\n\tvar getSize = function(node) {\n\t\treturn {\n\t\t\tw : node.offsetWidth || node.clientWidth,\n\t\t\th : node.offsetHeight || node.clientHeight\n\t\t};\n\t};\n\n\treturn {\n\t\tget: get,\n\t\thasClass: hasClass,\n\t\taddClass: addClass,\n\t\tremoveClass: removeClass,\n\t\tgetStyle: getStyle,\n\t\tgetPos: getPos,\n\t\tgetSize: getSize\n\t};\n});\n");
__$coverInitRange("src/javascript/core/utils/Dom.js", "194:4239");
__$coverInitRange("src/javascript/core/utils/Dom.js", "405:520");
__$coverInitRange("src/javascript/core/utils/Dom.js", "712:889");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1079:1243");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1441:1693");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1895:2090");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2474:3751");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3937:4077");
__$coverInitRange("src/javascript/core/utils/Dom.js", "4081:4235");
__$coverInitRange("src/javascript/core/utils/Dom.js", "432:478");
__$coverInitRange("src/javascript/core/utils/Dom.js", "482:516");
__$coverInitRange("src/javascript/core/utils/Dom.js", "465:474");
__$coverInitRange("src/javascript/core/utils/Dom.js", "751:792");
__$coverInitRange("src/javascript/core/utils/Dom.js", "797:848");
__$coverInitRange("src/javascript/core/utils/Dom.js", "852:885");
__$coverInitRange("src/javascript/core/utils/Dom.js", "776:788");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1118:1239");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1149:1235");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1483:1689");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1507:1558");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1563:1685");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1636:1678");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1934:2086");
__$coverInitRange("src/javascript/core/utils/Dom.js", "1961:1990");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2035:2082");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2512:2572");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2577:2588");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2592:2615");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2684:3008");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3095:3354");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3359:3372");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3376:3528");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3533:3557");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3561:3711");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3716:3747");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2713:2744");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2750:2964");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2970:3004");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2766:2801");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2807:2881");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2887:2921");
__$coverInitRange("src/javascript/core/utils/Dom.js", "2927:2959");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3211:3236");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3241:3266");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3272:3350");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3433:3460");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3465:3491");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3496:3524");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3618:3645");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3650:3676");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3681:3707");
__$coverInitRange("src/javascript/core/utils/Dom.js", "3970:4073");
__$coverCall('src/javascript/core/utils/Dom.js', '194:4239');
define('moxie/core/utils/Dom', ['moxie/core/utils/Env'], function (Env) {
    __$coverCall('src/javascript/core/utils/Dom.js', '405:520');
    var get = function (id) {
        __$coverCall('src/javascript/core/utils/Dom.js', '432:478');
        if (typeof id !== 'string') {
            __$coverCall('src/javascript/core/utils/Dom.js', '465:474');
            return id;
        }
        __$coverCall('src/javascript/core/utils/Dom.js', '482:516');
        return document.getElementById(id);
    };
    __$coverCall('src/javascript/core/utils/Dom.js', '712:889');
    var hasClass = function (obj, name) {
        __$coverCall('src/javascript/core/utils/Dom.js', '751:792');
        if (!obj.className) {
            __$coverCall('src/javascript/core/utils/Dom.js', '776:788');
            return false;
        }
        __$coverCall('src/javascript/core/utils/Dom.js', '797:848');
        var regExp = new RegExp('(^|\\s+)' + name + '(\\s+|$)');
        __$coverCall('src/javascript/core/utils/Dom.js', '852:885');
        return regExp.test(obj.className);
    };
    __$coverCall('src/javascript/core/utils/Dom.js', '1079:1243');
    var addClass = function (obj, name) {
        __$coverCall('src/javascript/core/utils/Dom.js', '1118:1239');
        if (!hasClass(obj, name)) {
            __$coverCall('src/javascript/core/utils/Dom.js', '1149:1235');
            obj.className = !obj.className ? name : obj.className.replace(/\s+$/, '') + ' ' + name;
        }
    };
    __$coverCall('src/javascript/core/utils/Dom.js', '1441:1693');
    var removeClass = function (obj, name) {
        __$coverCall('src/javascript/core/utils/Dom.js', '1483:1689');
        if (obj.className) {
            __$coverCall('src/javascript/core/utils/Dom.js', '1507:1558');
            var regExp = new RegExp('(^|\\s+)' + name + '(\\s+|$)');
            __$coverCall('src/javascript/core/utils/Dom.js', '1563:1685');
            obj.className = obj.className.replace(regExp, function ($0, $1, $2) {
                __$coverCall('src/javascript/core/utils/Dom.js', '1636:1678');
                return $1 === ' ' && $2 === ' ' ? ' ' : '';
            });
        }
    };
    __$coverCall('src/javascript/core/utils/Dom.js', '1895:2090');
    var getStyle = function (obj, name) {
        __$coverCall('src/javascript/core/utils/Dom.js', '1934:2086');
        if (obj.currentStyle) {
            __$coverCall('src/javascript/core/utils/Dom.js', '1961:1990');
            return obj.currentStyle[name];
        } else if (window.getComputedStyle) {
            __$coverCall('src/javascript/core/utils/Dom.js', '2035:2082');
            return window.getComputedStyle(obj, null)[name];
        }
    };
    __$coverCall('src/javascript/core/utils/Dom.js', '2474:3751');
    var getPos = function (node, root) {
        __$coverCall('src/javascript/core/utils/Dom.js', '2512:2572');
        var x = 0, y = 0, parent, doc = document, nodeRect, rootRect;
        __$coverCall('src/javascript/core/utils/Dom.js', '2577:2588');
        node = node;
        __$coverCall('src/javascript/core/utils/Dom.js', '2592:2615');
        root = root || doc.body;
        __$coverCall('src/javascript/core/utils/Dom.js', '2684:3008');
        function getIEPos(node) {
            __$coverCall('src/javascript/core/utils/Dom.js', '2713:2744');
            var bodyElm, rect, x = 0, y = 0;
            __$coverCall('src/javascript/core/utils/Dom.js', '2750:2964');
            if (node) {
                __$coverCall('src/javascript/core/utils/Dom.js', '2766:2801');
                rect = node.getBoundingClientRect();
                __$coverCall('src/javascript/core/utils/Dom.js', '2807:2881');
                bodyElm = doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
                __$coverCall('src/javascript/core/utils/Dom.js', '2887:2921');
                x = rect.left + bodyElm.scrollLeft;
                __$coverCall('src/javascript/core/utils/Dom.js', '2927:2959');
                y = rect.top + bodyElm.scrollTop;
            }
            __$coverCall('src/javascript/core/utils/Dom.js', '2970:3004');
            return {
                x: x,
                y: y
            };
        }
        __$coverCall('src/javascript/core/utils/Dom.js', '3095:3354');
        if (node && node.getBoundingClientRect && Env.browser === 'IE' && (!doc.documentMode || doc.documentMode < 8)) {
            __$coverCall('src/javascript/core/utils/Dom.js', '3211:3236');
            nodeRect = getIEPos(node);
            __$coverCall('src/javascript/core/utils/Dom.js', '3241:3266');
            rootRect = getIEPos(root);
            __$coverCall('src/javascript/core/utils/Dom.js', '3272:3350');
            return {
                x: nodeRect.x - rootRect.x,
                y: nodeRect.y - rootRect.y
            };
        }
        __$coverCall('src/javascript/core/utils/Dom.js', '3359:3372');
        parent = node;
        __$coverCall('src/javascript/core/utils/Dom.js', '3376:3528');
        while (parent && parent != root && parent.nodeType) {
            __$coverCall('src/javascript/core/utils/Dom.js', '3433:3460');
            x += parent.offsetLeft || 0;
            __$coverCall('src/javascript/core/utils/Dom.js', '3465:3491');
            y += parent.offsetTop || 0;
            __$coverCall('src/javascript/core/utils/Dom.js', '3496:3524');
            parent = parent.offsetParent;
        }
        __$coverCall('src/javascript/core/utils/Dom.js', '3533:3557');
        parent = node.parentNode;
        __$coverCall('src/javascript/core/utils/Dom.js', '3561:3711');
        while (parent && parent != root && parent.nodeType) {
            __$coverCall('src/javascript/core/utils/Dom.js', '3618:3645');
            x -= parent.scrollLeft || 0;
            __$coverCall('src/javascript/core/utils/Dom.js', '3650:3676');
            y -= parent.scrollTop || 0;
            __$coverCall('src/javascript/core/utils/Dom.js', '3681:3707');
            parent = parent.parentNode;
        }
        __$coverCall('src/javascript/core/utils/Dom.js', '3716:3747');
        return {
            x: x,
            y: y
        };
    };
    __$coverCall('src/javascript/core/utils/Dom.js', '3937:4077');
    var getSize = function (node) {
        __$coverCall('src/javascript/core/utils/Dom.js', '3970:4073');
        return {
            w: node.offsetWidth || node.clientWidth,
            h: node.offsetHeight || node.clientHeight
        };
    };
    __$coverCall('src/javascript/core/utils/Dom.js', '4081:4235');
    return {
        get: get,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getStyle: getStyle,
        getPos: getPos,
        getSize: getSize
    };
});

// Included from: src/javascript/core/Exceptions.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/core/Exceptions.js", "/**\n * Exceptions.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/core/Exceptions', [\n\t'moxie/core/utils/Basic'\n], function(Basic) {\n\tfunction _findKey(obj, value) {\n\t\tvar key;\n\t\tfor (key in obj) {\n\t\t\tif (obj[key] === value) {\n\t\t\t\treturn key;\n\t\t\t}\n\t\t}\n\t\treturn null;\n\t}\n\n\treturn {\n\t\tRuntimeError: (function() {\n\t\t\tvar namecodes = {\n\t\t\t\tNOT_INIT_ERR: 1,\n\t\t\t\tNOT_SUPPORTED_ERR: 9,\n\t\t\t\tJS_ERR: 4\n\t\t\t};\n\n\t\t\tfunction RuntimeError(code) {\n\t\t\t\tthis.code = code;\n\t\t\t\tthis.name = _findKey(namecodes, code);\n\t\t\t\tthis.message = this.name + \": RuntimeError \" + this.code;\n\t\t\t}\n\t\t\t\n\t\t\tBasic.extend(RuntimeError, namecodes);\n\t\t\tRuntimeError.prototype = Error.prototype;\n\t\t\treturn RuntimeError;\n\t\t}()),\n\t\t\n\t\tOperationNotAllowedException: (function() {\n\t\t\t\n\t\t\tfunction OperationNotAllowedException(code) {\n\t\t\t\tthis.code = code;\n\t\t\t\tthis.name = 'OperationNotAllowedException';\n\t\t\t}\n\t\t\t\n\t\t\tBasic.extend(OperationNotAllowedException, {\n\t\t\t\tNOT_ALLOWED_ERR: 1\n\t\t\t});\n\t\t\t\n\t\t\tOperationNotAllowedException.prototype = Error.prototype;\n\t\t\t\n\t\t\treturn OperationNotAllowedException;\n\t\t}()),\n\n\t\tImageError: (function() {\n\t\t\tvar namecodes = {\n\t\t\t\tWRONG_FORMAT: 1,\n\t\t\t\tMAX_RESOLUTION_ERR: 2\n\t\t\t};\n\n\t\t\tfunction ImageError(code) {\n\t\t\t\tthis.code = code;\n\t\t\t\tthis.name = _findKey(namecodes, code);\n\t\t\t\tthis.message = this.name + \": ImageError \" + this.code;\n\t\t\t}\n\t\t\t\n\t\t\tBasic.extend(ImageError, namecodes);\n\t\t\tImageError.prototype = Error.prototype;\n\n\t\t\treturn ImageError;\n\t\t}()),\n\n\t\tFileException: (function() {\n\t\t\tvar namecodes = {\n\t\t\t\tNOT_FOUND_ERR: 1,\n\t\t\t\tSECURITY_ERR: 2,\n\t\t\t\tABORT_ERR: 3,\n\t\t\t\tNOT_READABLE_ERR: 4,\n\t\t\t\tENCODING_ERR: 5,\n\t\t\t\tNO_MODIFICATION_ALLOWED_ERR: 6,\n\t\t\t\tINVALID_STATE_ERR: 7,\n\t\t\t\tSYNTAX_ERR: 8\n\t\t\t};\n\n\t\t\tfunction FileException(code) {\n\t\t\t\tthis.code = code;\n\t\t\t\tthis.name = _findKey(namecodes, code);\n\t\t\t\tthis.message = this.name + \": FileException \" + this.code;\n\t\t\t}\n\t\t\t\n\t\t\tBasic.extend(FileException, namecodes);\n\t\t\tFileException.prototype = Error.prototype;\n\t\t\treturn FileException;\n\t\t}()),\n\t\t\n\t\tDOMException: (function() {\n\t\t\tvar namecodes = {\n\t\t\t\tINDEX_SIZE_ERR: 1,\n\t\t\t\tDOMSTRING_SIZE_ERR: 2,\n\t\t\t\tHIERARCHY_REQUEST_ERR: 3,\n\t\t\t\tWRONG_DOCUMENT_ERR: 4,\n\t\t\t\tINVALID_CHARACTER_ERR: 5,\n\t\t\t\tNO_DATA_ALLOWED_ERR: 6,\n\t\t\t\tNO_MODIFICATION_ALLOWED_ERR: 7,\n\t\t\t\tNOT_FOUND_ERR: 8,\n\t\t\t\tNOT_SUPPORTED_ERR: 9,\n\t\t\t\tINUSE_ATTRIBUTE_ERR: 10,\n\t\t\t\tINVALID_STATE_ERR: 11,\n\t\t\t\tSYNTAX_ERR: 12,\n\t\t\t\tINVALID_MODIFICATION_ERR: 13,\n\t\t\t\tNAMESPACE_ERR: 14,\n\t\t\t\tINVALID_ACCESS_ERR: 15,\n\t\t\t\tVALIDATION_ERR: 16,\n\t\t\t\tTYPE_MISMATCH_ERR: 17,\n\t\t\t\tSECURITY_ERR: 18,\n\t\t\t\tNETWORK_ERR: 19,\n\t\t\t\tABORT_ERR: 20,\n\t\t\t\tURL_MISMATCH_ERR: 21,\n\t\t\t\tQUOTA_EXCEEDED_ERR: 22,\n\t\t\t\tTIMEOUT_ERR: 23,\n\t\t\t\tINVALID_NODE_TYPE_ERR: 24,\n\t\t\t\tDATA_CLONE_ERR: 25\n\t\t\t};\n\n\t\t\tfunction DOMException(code) {\n\t\t\t\tthis.code = code;\n\t\t\t\tthis.name = _findKey(namecodes, code);\n\t\t\t\tthis.message = this.name + \": DOMException \" + this.code;\n\t\t\t}\n\t\t\t\n\t\t\tBasic.extend(DOMException, namecodes);\n\t\t\tDOMException.prototype = Error.prototype;\n\t\t\treturn DOMException;\n\t\t}()),\n\t\t\n\t\tEventException: (function() {\n\t\t\tfunction EventException(code) {\n\t\t\t\tthis.code = code;\n\t\t\t\tthis.name = 'EventException';\n\t\t\t}\n\t\t\t\n\t\t\tBasic.extend(EventException, {\n\t\t\t\tUNSPECIFIED_EVENT_TYPE_ERR: 0\n\t\t\t});\n\t\t\t\n\t\t\tEventException.prototype = Error.prototype;\n\t\t\t\n\t\t\treturn EventException;\n\t\t}())\n\t};\n});");
__$coverInitRange("src/javascript/core/Exceptions.js", "201:3441");
__$coverInitRange("src/javascript/core/Exceptions.js", "283:417");
__$coverInitRange("src/javascript/core/Exceptions.js", "421:3437");
__$coverInitRange("src/javascript/core/Exceptions.js", "317:324");
__$coverInitRange("src/javascript/core/Exceptions.js", "328:399");
__$coverInitRange("src/javascript/core/Exceptions.js", "403:414");
__$coverInitRange("src/javascript/core/Exceptions.js", "350:395");
__$coverInitRange("src/javascript/core/Exceptions.js", "380:390");
__$coverInitRange("src/javascript/core/Exceptions.js", "463:546");
__$coverInitRange("src/javascript/core/Exceptions.js", "552:712");
__$coverInitRange("src/javascript/core/Exceptions.js", "721:758");
__$coverInitRange("src/javascript/core/Exceptions.js", "763:803");
__$coverInitRange("src/javascript/core/Exceptions.js", "808:827");
__$coverInitRange("src/javascript/core/Exceptions.js", "586:602");
__$coverInitRange("src/javascript/core/Exceptions.js", "608:645");
__$coverInitRange("src/javascript/core/Exceptions.js", "651:707");
__$coverInitRange("src/javascript/core/Exceptions.js", "893:1012");
__$coverInitRange("src/javascript/core/Exceptions.js", "1021:1094");
__$coverInitRange("src/javascript/core/Exceptions.js", "1103:1159");
__$coverInitRange("src/javascript/core/Exceptions.js", "1168:1203");
__$coverInitRange("src/javascript/core/Exceptions.js", "943:959");
__$coverInitRange("src/javascript/core/Exceptions.js", "965:1007");
__$coverInitRange("src/javascript/core/Exceptions.js", "1245:1314");
__$coverInitRange("src/javascript/core/Exceptions.js", "1320:1476");
__$coverInitRange("src/javascript/core/Exceptions.js", "1485:1520");
__$coverInitRange("src/javascript/core/Exceptions.js", "1525:1563");
__$coverInitRange("src/javascript/core/Exceptions.js", "1569:1586");
__$coverInitRange("src/javascript/core/Exceptions.js", "1352:1368");
__$coverInitRange("src/javascript/core/Exceptions.js", "1374:1411");
__$coverInitRange("src/javascript/core/Exceptions.js", "1417:1471");
__$coverInitRange("src/javascript/core/Exceptions.js", "1631:1840");
__$coverInitRange("src/javascript/core/Exceptions.js", "1846:2008");
__$coverInitRange("src/javascript/core/Exceptions.js", "2017:2055");
__$coverInitRange("src/javascript/core/Exceptions.js", "2060:2101");
__$coverInitRange("src/javascript/core/Exceptions.js", "2106:2126");
__$coverInitRange("src/javascript/core/Exceptions.js", "1881:1897");
__$coverInitRange("src/javascript/core/Exceptions.js", "1903:1940");
__$coverInitRange("src/javascript/core/Exceptions.js", "1946:2003");
__$coverInitRange("src/javascript/core/Exceptions.js", "2172:2846");
__$coverInitRange("src/javascript/core/Exceptions.js", "2852:3012");
__$coverInitRange("src/javascript/core/Exceptions.js", "3021:3058");
__$coverInitRange("src/javascript/core/Exceptions.js", "3063:3103");
__$coverInitRange("src/javascript/core/Exceptions.js", "3108:3127");
__$coverInitRange("src/javascript/core/Exceptions.js", "2886:2902");
__$coverInitRange("src/javascript/core/Exceptions.js", "2908:2945");
__$coverInitRange("src/javascript/core/Exceptions.js", "2951:3007");
__$coverInitRange("src/javascript/core/Exceptions.js", "3175:3266");
__$coverInitRange("src/javascript/core/Exceptions.js", "3275:3345");
__$coverInitRange("src/javascript/core/Exceptions.js", "3354:3396");
__$coverInitRange("src/javascript/core/Exceptions.js", "3405:3426");
__$coverInitRange("src/javascript/core/Exceptions.js", "3211:3227");
__$coverInitRange("src/javascript/core/Exceptions.js", "3233:3261");
__$coverCall('src/javascript/core/Exceptions.js', '201:3441');
define('moxie/core/Exceptions', ['moxie/core/utils/Basic'], function (Basic) {
    __$coverCall('src/javascript/core/Exceptions.js', '283:417');
    function _findKey(obj, value) {
        __$coverCall('src/javascript/core/Exceptions.js', '317:324');
        var key;
        __$coverCall('src/javascript/core/Exceptions.js', '328:399');
        for (key in obj) {
            __$coverCall('src/javascript/core/Exceptions.js', '350:395');
            if (obj[key] === value) {
                __$coverCall('src/javascript/core/Exceptions.js', '380:390');
                return key;
            }
        }
        __$coverCall('src/javascript/core/Exceptions.js', '403:414');
        return null;
    }
    __$coverCall('src/javascript/core/Exceptions.js', '421:3437');
    return {
        RuntimeError: function () {
            __$coverCall('src/javascript/core/Exceptions.js', '463:546');
            var namecodes = {
                    NOT_INIT_ERR: 1,
                    NOT_SUPPORTED_ERR: 9,
                    JS_ERR: 4
                };
            __$coverCall('src/javascript/core/Exceptions.js', '552:712');
            function RuntimeError(code) {
                __$coverCall('src/javascript/core/Exceptions.js', '586:602');
                this.code = code;
                __$coverCall('src/javascript/core/Exceptions.js', '608:645');
                this.name = _findKey(namecodes, code);
                __$coverCall('src/javascript/core/Exceptions.js', '651:707');
                this.message = this.name + ': RuntimeError ' + this.code;
            }
            __$coverCall('src/javascript/core/Exceptions.js', '721:758');
            Basic.extend(RuntimeError, namecodes);
            __$coverCall('src/javascript/core/Exceptions.js', '763:803');
            RuntimeError.prototype = Error.prototype;
            __$coverCall('src/javascript/core/Exceptions.js', '808:827');
            return RuntimeError;
        }(),
        OperationNotAllowedException: function () {
            __$coverCall('src/javascript/core/Exceptions.js', '893:1012');
            function OperationNotAllowedException(code) {
                __$coverCall('src/javascript/core/Exceptions.js', '943:959');
                this.code = code;
                __$coverCall('src/javascript/core/Exceptions.js', '965:1007');
                this.name = 'OperationNotAllowedException';
            }
            __$coverCall('src/javascript/core/Exceptions.js', '1021:1094');
            Basic.extend(OperationNotAllowedException, { NOT_ALLOWED_ERR: 1 });
            __$coverCall('src/javascript/core/Exceptions.js', '1103:1159');
            OperationNotAllowedException.prototype = Error.prototype;
            __$coverCall('src/javascript/core/Exceptions.js', '1168:1203');
            return OperationNotAllowedException;
        }(),
        ImageError: function () {
            __$coverCall('src/javascript/core/Exceptions.js', '1245:1314');
            var namecodes = {
                    WRONG_FORMAT: 1,
                    MAX_RESOLUTION_ERR: 2
                };
            __$coverCall('src/javascript/core/Exceptions.js', '1320:1476');
            function ImageError(code) {
                __$coverCall('src/javascript/core/Exceptions.js', '1352:1368');
                this.code = code;
                __$coverCall('src/javascript/core/Exceptions.js', '1374:1411');
                this.name = _findKey(namecodes, code);
                __$coverCall('src/javascript/core/Exceptions.js', '1417:1471');
                this.message = this.name + ': ImageError ' + this.code;
            }
            __$coverCall('src/javascript/core/Exceptions.js', '1485:1520');
            Basic.extend(ImageError, namecodes);
            __$coverCall('src/javascript/core/Exceptions.js', '1525:1563');
            ImageError.prototype = Error.prototype;
            __$coverCall('src/javascript/core/Exceptions.js', '1569:1586');
            return ImageError;
        }(),
        FileException: function () {
            __$coverCall('src/javascript/core/Exceptions.js', '1631:1840');
            var namecodes = {
                    NOT_FOUND_ERR: 1,
                    SECURITY_ERR: 2,
                    ABORT_ERR: 3,
                    NOT_READABLE_ERR: 4,
                    ENCODING_ERR: 5,
                    NO_MODIFICATION_ALLOWED_ERR: 6,
                    INVALID_STATE_ERR: 7,
                    SYNTAX_ERR: 8
                };
            __$coverCall('src/javascript/core/Exceptions.js', '1846:2008');
            function FileException(code) {
                __$coverCall('src/javascript/core/Exceptions.js', '1881:1897');
                this.code = code;
                __$coverCall('src/javascript/core/Exceptions.js', '1903:1940');
                this.name = _findKey(namecodes, code);
                __$coverCall('src/javascript/core/Exceptions.js', '1946:2003');
                this.message = this.name + ': FileException ' + this.code;
            }
            __$coverCall('src/javascript/core/Exceptions.js', '2017:2055');
            Basic.extend(FileException, namecodes);
            __$coverCall('src/javascript/core/Exceptions.js', '2060:2101');
            FileException.prototype = Error.prototype;
            __$coverCall('src/javascript/core/Exceptions.js', '2106:2126');
            return FileException;
        }(),
        DOMException: function () {
            __$coverCall('src/javascript/core/Exceptions.js', '2172:2846');
            var namecodes = {
                    INDEX_SIZE_ERR: 1,
                    DOMSTRING_SIZE_ERR: 2,
                    HIERARCHY_REQUEST_ERR: 3,
                    WRONG_DOCUMENT_ERR: 4,
                    INVALID_CHARACTER_ERR: 5,
                    NO_DATA_ALLOWED_ERR: 6,
                    NO_MODIFICATION_ALLOWED_ERR: 7,
                    NOT_FOUND_ERR: 8,
                    NOT_SUPPORTED_ERR: 9,
                    INUSE_ATTRIBUTE_ERR: 10,
                    INVALID_STATE_ERR: 11,
                    SYNTAX_ERR: 12,
                    INVALID_MODIFICATION_ERR: 13,
                    NAMESPACE_ERR: 14,
                    INVALID_ACCESS_ERR: 15,
                    VALIDATION_ERR: 16,
                    TYPE_MISMATCH_ERR: 17,
                    SECURITY_ERR: 18,
                    NETWORK_ERR: 19,
                    ABORT_ERR: 20,
                    URL_MISMATCH_ERR: 21,
                    QUOTA_EXCEEDED_ERR: 22,
                    TIMEOUT_ERR: 23,
                    INVALID_NODE_TYPE_ERR: 24,
                    DATA_CLONE_ERR: 25
                };
            __$coverCall('src/javascript/core/Exceptions.js', '2852:3012');
            function DOMException(code) {
                __$coverCall('src/javascript/core/Exceptions.js', '2886:2902');
                this.code = code;
                __$coverCall('src/javascript/core/Exceptions.js', '2908:2945');
                this.name = _findKey(namecodes, code);
                __$coverCall('src/javascript/core/Exceptions.js', '2951:3007');
                this.message = this.name + ': DOMException ' + this.code;
            }
            __$coverCall('src/javascript/core/Exceptions.js', '3021:3058');
            Basic.extend(DOMException, namecodes);
            __$coverCall('src/javascript/core/Exceptions.js', '3063:3103');
            DOMException.prototype = Error.prototype;
            __$coverCall('src/javascript/core/Exceptions.js', '3108:3127');
            return DOMException;
        }(),
        EventException: function () {
            __$coverCall('src/javascript/core/Exceptions.js', '3175:3266');
            function EventException(code) {
                __$coverCall('src/javascript/core/Exceptions.js', '3211:3227');
                this.code = code;
                __$coverCall('src/javascript/core/Exceptions.js', '3233:3261');
                this.name = 'EventException';
            }
            __$coverCall('src/javascript/core/Exceptions.js', '3275:3345');
            Basic.extend(EventException, { UNSPECIFIED_EVENT_TYPE_ERR: 0 });
            __$coverCall('src/javascript/core/Exceptions.js', '3354:3396');
            EventException.prototype = Error.prototype;
            __$coverCall('src/javascript/core/Exceptions.js', '3405:3426');
            return EventException;
        }()
    };
});

// Included from: src/javascript/core/EventTarget.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/core/EventTarget.js", "/**\n * EventTarget.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/core/EventTarget', [\n\t'moxie/core/utils/Env',\n\t'moxie/core/Exceptions',\n\t'moxie/core/utils/Basic'\n], function(Env, x, Basic) {\n\t/**\n\tParent object for all event dispatching components and objects\n\n\t@class EventTarget\n\t@constructor EventTarget\n\t*/\n\tfunction EventTarget() {\n\t\t// hash of event listeners by object uid\n\t\tvar eventpool = {};\n\t\t\t\t\n\t\tBasic.extend(this, {\n\t\t\t\n\t\t\t/**\n\t\t\tUnique id of the event dispatcher, usually overriden by children\n\n\t\t\t@property uid\n\t\t\t@type String\n\t\t\t*/\n\t\t\tuid: null,\n\t\t\t\n\t\t\t/**\n\t\t\tCan be called from within a child  in order to acquire uniqie id in automated manner\n\n\t\t\t@method init\n\t\t\t*/\n\t\t\tinit: function() {\n\t\t\t\tif (!this.uid) {\n\t\t\t\t\tthis.uid = Basic.guid('uid_');\n\t\t\t\t}\n\t\t\t},\n\n\t\t\t/**\n\t\t\tRegister a handler to a specific event dispatched by the object\n\n\t\t\t@method addEventListener\n\t\t\t@param {String} type Type or basically a name of the event to subscribe to\n\t\t\t@param {Function} fn Callback function that will be called when event happens\n\t\t\t@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first\n\t\t\t@param {Object} [scope=this] A scope to invoke event handler in\n\t\t\t*/\n\t\t\taddEventListener: function(type, fn, priority, scope) {\n\t\t\t\tvar self = this, list;\n\n\t\t\t\t// without uid no event handlers can be added, so make sure we got one\n\t\t\t\tif (!this.hasOwnProperty('uid')) {\n\t\t\t\t\tthis.uid = Basic.guid('uid_');\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\ttype = Basic.trim(type);\n\t\t\t\t\n\t\t\t\tif (/\\s/.test(type)) {\n\t\t\t\t\t// multiple event types were passed for one handler\n\t\t\t\t\tBasic.each(type.split(/\\s+/), function(type) {\n\t\t\t\t\t\tself.addEventListener(type, fn, priority, scope);\n\t\t\t\t\t});\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\ttype = type.toLowerCase();\n\t\t\t\tpriority = parseInt(priority, 10) || 0;\n\t\t\t\t\n\t\t\t\tlist = eventpool[this.uid] && eventpool[this.uid][type] || [];\n\t\t\t\tlist.push({fn : fn, priority : priority, scope : scope || this});\n\t\t\t\t\n\t\t\t\tif (!eventpool[this.uid]) {\n\t\t\t\t\teventpool[this.uid] = {};\n\t\t\t\t}\n\t\t\t\teventpool[this.uid][type] = list;\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tCheck if any handlers were registered to the specified event\n\n\t\t\t@method hasEventListener\n\t\t\t@param {String} type Type or basically a name of the event to check\n\t\t\t@return {Mixed} Returns a handler if it was found and false, if - not\n\t\t\t*/\n\t\t\thasEventListener: function(type) {\n\t\t\t\treturn type ? !!(eventpool[this.uid] && eventpool[this.uid][type]) : !!eventpool[this.uid];\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tUnregister the handler from the event, or if former was not specified - unregister all handlers\n\n\t\t\t@method removeEventListener\n\t\t\t@param {String} type Type or basically a name of the event\n\t\t\t@param {Function} [fn] Handler to unregister\n\t\t\t*/\n\t\t\tremoveEventListener: function(type, fn) {\n\t\t\t\ttype = type.toLowerCase();\n\t\n\t\t\t\tvar list = eventpool[this.uid] && eventpool[this.uid][type], i;\n\t\n\t\t\t\tif (list) {\n\t\t\t\t\tif (fn) {\n\t\t\t\t\t\tfor (i = list.length - 1; i >= 0; i--) {\n\t\t\t\t\t\t\tif (list[i].fn === fn) {\n\t\t\t\t\t\t\t\tlist.splice(i, 1);\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlist = [];\n\t\t\t\t\t}\n\t\n\t\t\t\t\t// delete event list if it has become empty\n\t\t\t\t\tif (!list.length) {\n\t\t\t\t\t\tdelete eventpool[this.uid][type];\n\t\t\t\t\t\t\n\t\t\t\t\t\t// and object specific entry in a hash if it has no more listeners attached\n\t\t\t\t\t\tif (Basic.isEmptyObj(eventpool[this.uid])) {\n\t\t\t\t\t\t\tdelete eventpool[this.uid];\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tRemove all event handlers from the object\n\n\t\t\t@method removeAllEventListeners\n\t\t\t*/\n\t\t\tremoveAllEventListeners: function() {\n\t\t\t\tif (eventpool[this.uid]) {\n\t\t\t\t\tdelete eventpool[this.uid];\n\t\t\t\t}\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tDispatch the event\n\n\t\t\t@method dispatchEvent\n\t\t\t@param {String/Object} Type of event or event object to dispatch\n\t\t\t@param {Mixed} [...] Variable number of arguments to be passed to a handlers\n\t\t\t@return {Boolean} true by default and false if any handler returned false\n\t\t\t*/\n\t\t\tdispatchEvent: function(type) {\n\t\t\t\tvar uid, list, args, tmpEvt, evt = {}, result = true, undef;\n\t\t\t\t\n\t\t\t\tif (Basic.typeOf(type) !== 'string') {\n\t\t\t\t\t// we can't use original object directly (because of Silverlight)\n\t\t\t\t\ttmpEvt = type;\n\n\t\t\t\t\tif (Basic.typeOf(tmpEvt.type) === 'string') {\n\t\t\t\t\t\ttype = tmpEvt.type;\n\n\t\t\t\t\t\tif (tmpEvt.total !== undef && tmpEvt.loaded !== undef) { // progress event\n\t\t\t\t\t\t\tevt.total = tmpEvt.total;\n\t\t\t\t\t\t\tevt.loaded = tmpEvt.loaded;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tevt.async = tmpEvt.async || false;\n\t\t\t\t\t} else {\n\t\t\t\t\t\tthrow new x.EventException(x.EventException.UNSPECIFIED_EVENT_TYPE_ERR);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// check if event is meant to be dispatched on an object having specific uid\n\t\t\t\tif (type.indexOf('::') !== -1) {\n\t\t\t\t\t(function(arr) {\n\t\t\t\t\t\tuid = arr[0];\n\t\t\t\t\t\ttype = arr[1];\n\t\t\t\t\t}(type.split('::')));\n\t\t\t\t} else {\n\t\t\t\t\tuid = this.uid;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\ttype = type.toLowerCase();\n\t\t\t\t\t\t\t\t\n\t\t\t\tlist = eventpool[uid] && eventpool[uid][type];\n\n\t\t\t\tif (list) {\n\t\t\t\t\t// sort event list by prority\n\t\t\t\t\tlist.sort(function(a, b) { return b.priority - a.priority; });\n\t\t\t\t\t\n\t\t\t\t\targs = [].slice.call(arguments);\n\t\t\t\t\t\n\t\t\t\t\t// first argument will be pseudo-event object\n\t\t\t\t\targs.shift();\n\t\t\t\t\tevt.type = type;\n\t\t\t\t\targs.unshift(evt);\n\n\t\t\t\t\tif (MXI_DEBUG && Env.debug.events) {\n\t\t\t\t\t\tEnv.log(\"Event '%s' fired on %u\", evt.type, uid);\t\n\t\t\t\t\t}\n\n\t\t\t\t\t// Dispatch event to all listeners\n\t\t\t\t\tvar queue = [];\n\t\t\t\t\tBasic.each(list, function(handler) {\n\t\t\t\t\t\t// explicitly set the target, otherwise events fired from shims do not get it\n\t\t\t\t\t\targs[0].target = handler.scope;\n\t\t\t\t\t\t// if event is marked as async, detach the handler\n\t\t\t\t\t\tif (evt.async) {\n\t\t\t\t\t\t\tqueue.push(function(cb) {\n\t\t\t\t\t\t\t\tsetTimeout(function() {\n\t\t\t\t\t\t\t\t\tcb(handler.fn.apply(handler.scope, args) === false);\n\t\t\t\t\t\t\t\t}, 1);\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tqueue.push(function(cb) {\n\t\t\t\t\t\t\t\tcb(handler.fn.apply(handler.scope, args) === false); // if handler returns false stop propagation\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t\tif (queue.length) {\n\t\t\t\t\t\tBasic.inSeries(queue, function(err) {\n\t\t\t\t\t\t\tresult = !err;\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn result;\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tAlias for addEventListener\n\n\t\t\t@method bind\n\t\t\t@protected\n\t\t\t*/\n\t\t\tbind: function() {\n\t\t\t\tthis.addEventListener.apply(this, arguments);\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tAlias for removeEventListener\n\n\t\t\t@method unbind\n\t\t\t@protected\n\t\t\t*/\n\t\t\tunbind: function() {\n\t\t\t\tthis.removeEventListener.apply(this, arguments);\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tAlias for removeAllEventListeners\n\n\t\t\t@method unbindAll\n\t\t\t@protected\n\t\t\t*/\n\t\t\tunbindAll: function() {\n\t\t\t\tthis.removeAllEventListeners.apply(this, arguments);\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tAlias for dispatchEvent\n\n\t\t\t@method trigger\n\t\t\t@protected\n\t\t\t*/\n\t\t\ttrigger: function() {\n\t\t\t\treturn this.dispatchEvent.apply(this, arguments);\n\t\t\t},\n\t\t\t\n\n\t\t\t/**\n\t\t\tHandle properties of on[event] type.\n\n\t\t\t@method handleEventProps\n\t\t\t@private\n\t\t\t*/\n\t\t\thandleEventProps: function(dispatches) {\n\t\t\t\tvar self = this;\n\n\t\t\t\tthis.bind(dispatches.join(' '), function(e) {\n\t\t\t\t\tvar prop = 'on' + e.type.toLowerCase();\n\t\t\t\t\tif (Basic.typeOf(this[prop]) === 'function') {\n\t\t\t\t\t\tthis[prop].apply(this, arguments);\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\t// object must have defined event properties, even if it doesn't make use of them\n\t\t\t\tBasic.each(dispatches, function(prop) {\n\t\t\t\t\tprop = 'on' + prop.toLowerCase(prop);\n\t\t\t\t\tif (Basic.typeOf(self[prop]) === 'undefined') {\n\t\t\t\t\t\tself[prop] = null; \n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t\t\n\t\t});\n\t}\n\n\tEventTarget.instance = new EventTarget(); \n\n\treturn EventTarget;\n});");
__$coverInitRange("src/javascript/core/EventTarget.js", "202:7585");
__$coverInitRange("src/javascript/core/EventTarget.js", "464:7514");
__$coverInitRange("src/javascript/core/EventTarget.js", "7518:7558");
__$coverInitRange("src/javascript/core/EventTarget.js", "7563:7581");
__$coverInitRange("src/javascript/core/EventTarget.js", "534:552");
__$coverInitRange("src/javascript/core/EventTarget.js", "561:7511");
__$coverInitRange("src/javascript/core/EventTarget.js", "863:920");
__$coverInitRange("src/javascript/core/EventTarget.js", "885:914");
__$coverInitRange("src/javascript/core/EventTarget.js", "1444:1465");
__$coverInitRange("src/javascript/core/EventTarget.js", "1547:1622");
__$coverInitRange("src/javascript/core/EventTarget.js", "1633:1656");
__$coverInitRange("src/javascript/core/EventTarget.js", "1667:1881");
__$coverInitRange("src/javascript/core/EventTarget.js", "1892:1917");
__$coverInitRange("src/javascript/core/EventTarget.js", "1923:1961");
__$coverInitRange("src/javascript/core/EventTarget.js", "1972:2033");
__$coverInitRange("src/javascript/core/EventTarget.js", "2039:2103");
__$coverInitRange("src/javascript/core/EventTarget.js", "2114:2177");
__$coverInitRange("src/javascript/core/EventTarget.js", "2183:2215");
__$coverInitRange("src/javascript/core/EventTarget.js", "1587:1616");
__$coverInitRange("src/javascript/core/EventTarget.js", "1752:1862");
__$coverInitRange("src/javascript/core/EventTarget.js", "1869:1875");
__$coverInitRange("src/javascript/core/EventTarget.js", "1805:1853");
__$coverInitRange("src/javascript/core/EventTarget.js", "2147:2171");
__$coverInitRange("src/javascript/core/EventTarget.js", "2519:2609");
__$coverInitRange("src/javascript/core/EventTarget.js", "2924:2949");
__$coverInitRange("src/javascript/core/EventTarget.js", "2957:3019");
__$coverInitRange("src/javascript/core/EventTarget.js", "3027:3540");
__$coverInitRange("src/javascript/core/EventTarget.js", "3044:3228");
__$coverInitRange("src/javascript/core/EventTarget.js", "3286:3534");
__$coverInitRange("src/javascript/core/EventTarget.js", "3060:3190");
__$coverInitRange("src/javascript/core/EventTarget.js", "3108:3182");
__$coverInitRange("src/javascript/core/EventTarget.js", "3141:3158");
__$coverInitRange("src/javascript/core/EventTarget.js", "3168:3173");
__$coverInitRange("src/javascript/core/EventTarget.js", "3212:3221");
__$coverInitRange("src/javascript/core/EventTarget.js", "3312:3344");
__$coverInitRange("src/javascript/core/EventTarget.js", "3441:3527");
__$coverInitRange("src/javascript/core/EventTarget.js", "3493:3519");
__$coverInitRange("src/javascript/core/EventTarget.js", "3691:3755");
__$coverInitRange("src/javascript/core/EventTarget.js", "3723:3749");
__$coverInitRange("src/javascript/core/EventTarget.js", "4092:4151");
__$coverInitRange("src/javascript/core/EventTarget.js", "4162:4673");
__$coverInitRange("src/javascript/core/EventTarget.js", "4765:4926");
__$coverInitRange("src/javascript/core/EventTarget.js", "4937:4962");
__$coverInitRange("src/javascript/core/EventTarget.js", "4977:5022");
__$coverInitRange("src/javascript/core/EventTarget.js", "5029:6170");
__$coverInitRange("src/javascript/core/EventTarget.js", "6176:6189");
__$coverInitRange("src/javascript/core/EventTarget.js", "4277:4290");
__$coverInitRange("src/javascript/core/EventTarget.js", "4298:4667");
__$coverInitRange("src/javascript/core/EventTarget.js", "4350:4368");
__$coverInitRange("src/javascript/core/EventTarget.js", "4377:4526");
__$coverInitRange("src/javascript/core/EventTarget.js", "4534:4567");
__$coverInitRange("src/javascript/core/EventTarget.js", "4459:4483");
__$coverInitRange("src/javascript/core/EventTarget.js", "4492:4518");
__$coverInitRange("src/javascript/core/EventTarget.js", "4589:4660");
__$coverInitRange("src/javascript/core/EventTarget.js", "4803:4886");
__$coverInitRange("src/javascript/core/EventTarget.js", "4826:4838");
__$coverInitRange("src/javascript/core/EventTarget.js", "4846:4859");
__$coverInitRange("src/javascript/core/EventTarget.js", "4906:4920");
__$coverInitRange("src/javascript/core/EventTarget.js", "5081:5142");
__$coverInitRange("src/javascript/core/EventTarget.js", "5155:5186");
__$coverInitRange("src/javascript/core/EventTarget.js", "5250:5262");
__$coverInitRange("src/javascript/core/EventTarget.js", "5269:5284");
__$coverInitRange("src/javascript/core/EventTarget.js", "5291:5308");
__$coverInitRange("src/javascript/core/EventTarget.js", "5316:5415");
__$coverInitRange("src/javascript/core/EventTarget.js", "5463:5477");
__$coverInitRange("src/javascript/core/EventTarget.js", "5484:6056");
__$coverInitRange("src/javascript/core/EventTarget.js", "6063:6164");
__$coverInitRange("src/javascript/core/EventTarget.js", "5108:5138");
__$coverInitRange("src/javascript/core/EventTarget.js", "5359:5407");
__$coverInitRange("src/javascript/core/EventTarget.js", "5611:5641");
__$coverInitRange("src/javascript/core/EventTarget.js", "5706:6047");
__$coverInitRange("src/javascript/core/EventTarget.js", "5730:5874");
__$coverInitRange("src/javascript/core/EventTarget.js", "5764:5863");
__$coverInitRange("src/javascript/core/EventTarget.js", "5797:5848");
__$coverInitRange("src/javascript/core/EventTarget.js", "5898:6039");
__$coverInitRange("src/javascript/core/EventTarget.js", "5932:5983");
__$coverInitRange("src/javascript/core/EventTarget.js", "6089:6157");
__$coverInitRange("src/javascript/core/EventTarget.js", "6134:6147");
__$coverInitRange("src/javascript/core/EventTarget.js", "6301:6345");
__$coverInitRange("src/javascript/core/EventTarget.js", "6464:6511");
__$coverInitRange("src/javascript/core/EventTarget.js", "6640:6691");
__$coverInitRange("src/javascript/core/EventTarget.js", "6806:6854");
__$coverInitRange("src/javascript/core/EventTarget.js", "7009:7024");
__$coverInitRange("src/javascript/core/EventTarget.js", "7031:7228");
__$coverInitRange("src/javascript/core/EventTarget.js", "7321:7496");
__$coverInitRange("src/javascript/core/EventTarget.js", "7082:7120");
__$coverInitRange("src/javascript/core/EventTarget.js", "7127:7220");
__$coverInitRange("src/javascript/core/EventTarget.js", "7180:7213");
__$coverInitRange("src/javascript/core/EventTarget.js", "7366:7402");
__$coverInitRange("src/javascript/core/EventTarget.js", "7409:7488");
__$coverInitRange("src/javascript/core/EventTarget.js", "7463:7480");
__$coverCall('src/javascript/core/EventTarget.js', '202:7585');
define('moxie/core/EventTarget', [
    'moxie/core/utils/Env',
    'moxie/core/Exceptions',
    'moxie/core/utils/Basic'
], function (Env, x, Basic) {
    __$coverCall('src/javascript/core/EventTarget.js', '464:7514');
    function EventTarget() {
        __$coverCall('src/javascript/core/EventTarget.js', '534:552');
        var eventpool = {};
        __$coverCall('src/javascript/core/EventTarget.js', '561:7511');
        Basic.extend(this, {
            uid: null,
            init: function () {
                __$coverCall('src/javascript/core/EventTarget.js', '863:920');
                if (!this.uid) {
                    __$coverCall('src/javascript/core/EventTarget.js', '885:914');
                    this.uid = Basic.guid('uid_');
                }
            },
            addEventListener: function (type, fn, priority, scope) {
                __$coverCall('src/javascript/core/EventTarget.js', '1444:1465');
                var self = this, list;
                __$coverCall('src/javascript/core/EventTarget.js', '1547:1622');
                if (!this.hasOwnProperty('uid')) {
                    __$coverCall('src/javascript/core/EventTarget.js', '1587:1616');
                    this.uid = Basic.guid('uid_');
                }
                __$coverCall('src/javascript/core/EventTarget.js', '1633:1656');
                type = Basic.trim(type);
                __$coverCall('src/javascript/core/EventTarget.js', '1667:1881');
                if (/\s/.test(type)) {
                    __$coverCall('src/javascript/core/EventTarget.js', '1752:1862');
                    Basic.each(type.split(/\s+/), function (type) {
                        __$coverCall('src/javascript/core/EventTarget.js', '1805:1853');
                        self.addEventListener(type, fn, priority, scope);
                    });
                    __$coverCall('src/javascript/core/EventTarget.js', '1869:1875');
                    return;
                }
                __$coverCall('src/javascript/core/EventTarget.js', '1892:1917');
                type = type.toLowerCase();
                __$coverCall('src/javascript/core/EventTarget.js', '1923:1961');
                priority = parseInt(priority, 10) || 0;
                __$coverCall('src/javascript/core/EventTarget.js', '1972:2033');
                list = eventpool[this.uid] && eventpool[this.uid][type] || [];
                __$coverCall('src/javascript/core/EventTarget.js', '2039:2103');
                list.push({
                    fn: fn,
                    priority: priority,
                    scope: scope || this
                });
                __$coverCall('src/javascript/core/EventTarget.js', '2114:2177');
                if (!eventpool[this.uid]) {
                    __$coverCall('src/javascript/core/EventTarget.js', '2147:2171');
                    eventpool[this.uid] = {};
                }
                __$coverCall('src/javascript/core/EventTarget.js', '2183:2215');
                eventpool[this.uid][type] = list;
            },
            hasEventListener: function (type) {
                __$coverCall('src/javascript/core/EventTarget.js', '2519:2609');
                return type ? !!(eventpool[this.uid] && eventpool[this.uid][type]) : !!eventpool[this.uid];
            },
            removeEventListener: function (type, fn) {
                __$coverCall('src/javascript/core/EventTarget.js', '2924:2949');
                type = type.toLowerCase();
                __$coverCall('src/javascript/core/EventTarget.js', '2957:3019');
                var list = eventpool[this.uid] && eventpool[this.uid][type], i;
                __$coverCall('src/javascript/core/EventTarget.js', '3027:3540');
                if (list) {
                    __$coverCall('src/javascript/core/EventTarget.js', '3044:3228');
                    if (fn) {
                        __$coverCall('src/javascript/core/EventTarget.js', '3060:3190');
                        for (i = list.length - 1; i >= 0; i--) {
                            __$coverCall('src/javascript/core/EventTarget.js', '3108:3182');
                            if (list[i].fn === fn) {
                                __$coverCall('src/javascript/core/EventTarget.js', '3141:3158');
                                list.splice(i, 1);
                                __$coverCall('src/javascript/core/EventTarget.js', '3168:3173');
                                break;
                            }
                        }
                    } else {
                        __$coverCall('src/javascript/core/EventTarget.js', '3212:3221');
                        list = [];
                    }
                    __$coverCall('src/javascript/core/EventTarget.js', '3286:3534');
                    if (!list.length) {
                        __$coverCall('src/javascript/core/EventTarget.js', '3312:3344');
                        delete eventpool[this.uid][type];
                        __$coverCall('src/javascript/core/EventTarget.js', '3441:3527');
                        if (Basic.isEmptyObj(eventpool[this.uid])) {
                            __$coverCall('src/javascript/core/EventTarget.js', '3493:3519');
                            delete eventpool[this.uid];
                        }
                    }
                }
            },
            removeAllEventListeners: function () {
                __$coverCall('src/javascript/core/EventTarget.js', '3691:3755');
                if (eventpool[this.uid]) {
                    __$coverCall('src/javascript/core/EventTarget.js', '3723:3749');
                    delete eventpool[this.uid];
                }
            },
            dispatchEvent: function (type) {
                __$coverCall('src/javascript/core/EventTarget.js', '4092:4151');
                var uid, list, args, tmpEvt, evt = {}, result = true, undef;
                __$coverCall('src/javascript/core/EventTarget.js', '4162:4673');
                if (Basic.typeOf(type) !== 'string') {
                    __$coverCall('src/javascript/core/EventTarget.js', '4277:4290');
                    tmpEvt = type;
                    __$coverCall('src/javascript/core/EventTarget.js', '4298:4667');
                    if (Basic.typeOf(tmpEvt.type) === 'string') {
                        __$coverCall('src/javascript/core/EventTarget.js', '4350:4368');
                        type = tmpEvt.type;
                        __$coverCall('src/javascript/core/EventTarget.js', '4377:4526');
                        if (tmpEvt.total !== undef && tmpEvt.loaded !== undef) {
                            __$coverCall('src/javascript/core/EventTarget.js', '4459:4483');
                            evt.total = tmpEvt.total;
                            __$coverCall('src/javascript/core/EventTarget.js', '4492:4518');
                            evt.loaded = tmpEvt.loaded;
                        }
                        __$coverCall('src/javascript/core/EventTarget.js', '4534:4567');
                        evt.async = tmpEvt.async || false;
                    } else {
                        __$coverCall('src/javascript/core/EventTarget.js', '4589:4660');
                        throw new x.EventException(x.EventException.UNSPECIFIED_EVENT_TYPE_ERR);
                    }
                }
                __$coverCall('src/javascript/core/EventTarget.js', '4765:4926');
                if (type.indexOf('::') !== -1) {
                    __$coverCall('src/javascript/core/EventTarget.js', '4803:4886');
                    (function (arr) {
                        __$coverCall('src/javascript/core/EventTarget.js', '4826:4838');
                        uid = arr[0];
                        __$coverCall('src/javascript/core/EventTarget.js', '4846:4859');
                        type = arr[1];
                    }(type.split('::')));
                } else {
                    __$coverCall('src/javascript/core/EventTarget.js', '4906:4920');
                    uid = this.uid;
                }
                __$coverCall('src/javascript/core/EventTarget.js', '4937:4962');
                type = type.toLowerCase();
                __$coverCall('src/javascript/core/EventTarget.js', '4977:5022');
                list = eventpool[uid] && eventpool[uid][type];
                __$coverCall('src/javascript/core/EventTarget.js', '5029:6170');
                if (list) {
                    __$coverCall('src/javascript/core/EventTarget.js', '5081:5142');
                    list.sort(function (a, b) {
                        __$coverCall('src/javascript/core/EventTarget.js', '5108:5138');
                        return b.priority - a.priority;
                    });
                    __$coverCall('src/javascript/core/EventTarget.js', '5155:5186');
                    args = [].slice.call(arguments);
                    __$coverCall('src/javascript/core/EventTarget.js', '5250:5262');
                    args.shift();
                    __$coverCall('src/javascript/core/EventTarget.js', '5269:5284');
                    evt.type = type;
                    __$coverCall('src/javascript/core/EventTarget.js', '5291:5308');
                    args.unshift(evt);
                    __$coverCall('src/javascript/core/EventTarget.js', '5316:5415');
                    if (MXI_DEBUG && Env.debug.events) {
                        __$coverCall('src/javascript/core/EventTarget.js', '5359:5407');
                        Env.log('Event \'%s\' fired on %u', evt.type, uid);
                    }
                    __$coverCall('src/javascript/core/EventTarget.js', '5463:5477');
                    var queue = [];
                    __$coverCall('src/javascript/core/EventTarget.js', '5484:6056');
                    Basic.each(list, function (handler) {
                        __$coverCall('src/javascript/core/EventTarget.js', '5611:5641');
                        args[0].target = handler.scope;
                        __$coverCall('src/javascript/core/EventTarget.js', '5706:6047');
                        if (evt.async) {
                            __$coverCall('src/javascript/core/EventTarget.js', '5730:5874');
                            queue.push(function (cb) {
                                __$coverCall('src/javascript/core/EventTarget.js', '5764:5863');
                                setTimeout(function () {
                                    __$coverCall('src/javascript/core/EventTarget.js', '5797:5848');
                                    cb(handler.fn.apply(handler.scope, args) === false);
                                }, 1);
                            });
                        } else {
                            __$coverCall('src/javascript/core/EventTarget.js', '5898:6039');
                            queue.push(function (cb) {
                                __$coverCall('src/javascript/core/EventTarget.js', '5932:5983');
                                cb(handler.fn.apply(handler.scope, args) === false);
                            });
                        }
                    });
                    __$coverCall('src/javascript/core/EventTarget.js', '6063:6164');
                    if (queue.length) {
                        __$coverCall('src/javascript/core/EventTarget.js', '6089:6157');
                        Basic.inSeries(queue, function (err) {
                            __$coverCall('src/javascript/core/EventTarget.js', '6134:6147');
                            result = !err;
                        });
                    }
                }
                __$coverCall('src/javascript/core/EventTarget.js', '6176:6189');
                return result;
            },
            bind: function () {
                __$coverCall('src/javascript/core/EventTarget.js', '6301:6345');
                this.addEventListener.apply(this, arguments);
            },
            unbind: function () {
                __$coverCall('src/javascript/core/EventTarget.js', '6464:6511');
                this.removeEventListener.apply(this, arguments);
            },
            unbindAll: function () {
                __$coverCall('src/javascript/core/EventTarget.js', '6640:6691');
                this.removeAllEventListeners.apply(this, arguments);
            },
            trigger: function () {
                __$coverCall('src/javascript/core/EventTarget.js', '6806:6854');
                return this.dispatchEvent.apply(this, arguments);
            },
            handleEventProps: function (dispatches) {
                __$coverCall('src/javascript/core/EventTarget.js', '7009:7024');
                var self = this;
                __$coverCall('src/javascript/core/EventTarget.js', '7031:7228');
                this.bind(dispatches.join(' '), function (e) {
                    __$coverCall('src/javascript/core/EventTarget.js', '7082:7120');
                    var prop = 'on' + e.type.toLowerCase();
                    __$coverCall('src/javascript/core/EventTarget.js', '7127:7220');
                    if (Basic.typeOf(this[prop]) === 'function') {
                        __$coverCall('src/javascript/core/EventTarget.js', '7180:7213');
                        this[prop].apply(this, arguments);
                    }
                });
                __$coverCall('src/javascript/core/EventTarget.js', '7321:7496');
                Basic.each(dispatches, function (prop) {
                    __$coverCall('src/javascript/core/EventTarget.js', '7366:7402');
                    prop = 'on' + prop.toLowerCase(prop);
                    __$coverCall('src/javascript/core/EventTarget.js', '7409:7488');
                    if (Basic.typeOf(self[prop]) === 'undefined') {
                        __$coverCall('src/javascript/core/EventTarget.js', '7463:7480');
                        self[prop] = null;
                    }
                });
            }
        });
    }
    __$coverCall('src/javascript/core/EventTarget.js', '7518:7558');
    EventTarget.instance = new EventTarget();
    __$coverCall('src/javascript/core/EventTarget.js', '7563:7581');
    return EventTarget;
});

// Included from: src/javascript/runtime/Runtime.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/Runtime.js", "/**\n * Runtime.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/runtime/Runtime', [\n\t\"moxie/core/utils/Env\",\n\t\"moxie/core/utils/Basic\",\n\t\"moxie/core/utils/Dom\",\n\t\"moxie/core/EventTarget\"\n], function(Env, Basic, Dom, EventTarget) {\n\tvar runtimeConstructors = {}, runtimes = {};\n\n\t/**\n\tCommon set of methods and properties for every runtime instance\n\n\t@class Runtime\n\n\t@param {Object} options\n\t@param {String} type Sanitized name of the runtime\n\t@param {Object} [caps] Set of capabilities that differentiate specified runtime\n\t@param {Object} [modeCaps] Set of capabilities that do require specific operational mode\n\t@param {String} [preferredMode='browser'] Preferred operational mode to choose if no required capabilities were requested\n\t*/\n\tfunction Runtime(options, type, caps, modeCaps, preferredMode) {\n\t\t/**\n\t\tDispatched when runtime is initialized and ready.\n\t\tResults in RuntimeInit on a connected component.\n\n\t\t@event Init\n\t\t*/\n\n\t\t/**\n\t\tDispatched when runtime fails to initialize.\n\t\tResults in RuntimeError on a connected component.\n\n\t\t@event Error\n\t\t*/\n\n\t\tvar self = this\n\t\t, _shim\n\t\t, _uid = Basic.guid(type + '_')\n\t\t, defaultMode = preferredMode || 'browser'\n\t\t;\n\n\t\toptions = options || {};\n\n\t\t// register runtime in private hash\n\t\truntimes[_uid] = this;\n\n\t\t/**\n\t\tDefault set of capabilities, which can be redifined later by specific runtime\n\n\t\t@private\n\t\t@property caps\n\t\t@type Object\n\t\t*/\n\t\tcaps = Basic.extend({\n\t\t\t// Runtime can: \n\t\t\t// provide access to raw binary data of the file\n\t\t\taccess_binary: false,\n\t\t\t// provide access to raw binary data of the image (image extension is optional) \n\t\t\taccess_image_binary: false,\n\t\t\t// display binary data as thumbs for example\n\t\t\tdisplay_media: false,\n\t\t\t// make cross-domain requests\n\t\t\tdo_cors: false,\n\t\t\t// accept files dragged and dropped from the desktop\n\t\t\tdrag_and_drop: false,\n\t\t\t// filter files in selection dialog by their extensions\n\t\t\tfilter_by_extension: true,\n\t\t\t// resize image (and manipulate it raw data of any file in general)\n\t\t\tresize_image: false,\n\t\t\t// periodically report how many bytes of total in the file were uploaded (loaded)\n\t\t\treport_upload_progress: false,\n\t\t\t// provide access to the headers of http response \n\t\t\treturn_response_headers: false,\n\t\t\t// support response of specific type, which should be passed as an argument\n\t\t\t// e.g. runtime.can('return_response_type', 'blob')\n\t\t\treturn_response_type: false,\n\t\t\t// return http status code of the response\n\t\t\treturn_status_code: true,\n\t\t\t// send custom http header with the request\n\t\t\tsend_custom_headers: false,\n\t\t\t// pick up the files from a dialog\n\t\t\tselect_file: false,\n\t\t\t// select whole folder in file browse dialog\n\t\t\tselect_folder: false,\n\t\t\t// select multiple files at once in file browse dialog\n\t\t\tselect_multiple: true,\n\t\t\t// send raw binary data, that is generated after image resizing or manipulation of other kind\n\t\t\tsend_binary_string: false,\n\t\t\t// send cookies with http request and therefore retain session\n\t\t\tsend_browser_cookies: true,\n\t\t\t// send data formatted as multipart/form-data\n\t\t\tsend_multipart: true,\n\t\t\t// slice the file or blob to smaller parts\n\t\t\tslice_blob: false,\n\t\t\t// upload file without preloading it to memory, stream it out directly from disk\n\t\t\tstream_upload: false,\n\t\t\t// programmatically trigger file browse dialog\n\t\t\tsummon_file_dialog: false,\n\t\t\t// upload file of specific size, size should be passed as argument\n\t\t\t// e.g. runtime.can('upload_filesize', '500mb')\n\t\t\tupload_filesize: true,\n\t\t\t// initiate http request with specific http method, method should be passed as argument\n\t\t\t// e.g. runtime.can('use_http_method', 'put')\n\t\t\tuse_http_method: true\n\t\t}, caps);\n\t\t\t\n\t\n\t\t// default to the mode that is compatible with preferred caps\n\t\tif (options.preferred_caps) {\n\t\t\tdefaultMode = Runtime.getMode(modeCaps, options.preferred_caps, defaultMode);\n\t\t}\n\n\t\tif (MXI_DEBUG && Env.debug.runtime) {\n\t\t\tEnv.log(\"\\tdefault mode: %s\", defaultMode);\t\n\t\t}\n\t\t\n\t\t// small extension factory here (is meant to be extended with actual extensions constructors)\n\t\t_shim = (function() {\n\t\t\tvar objpool = {};\n\t\t\treturn {\n\t\t\t\texec: function(uid, comp, fn, args) {\n\t\t\t\t\tif (_shim[comp]) {\n\t\t\t\t\t\tif (!objpool[uid]) {\n\t\t\t\t\t\t\tobjpool[uid] = {\n\t\t\t\t\t\t\t\tcontext: this,\n\t\t\t\t\t\t\t\tinstance: new _shim[comp]()\n\t\t\t\t\t\t\t};\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (objpool[uid].instance[fn]) {\n\t\t\t\t\t\t\treturn objpool[uid].instance[fn].apply(this, args);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t},\n\n\t\t\t\tremoveInstance: function(uid) {\n\t\t\t\t\tdelete objpool[uid];\n\t\t\t\t},\n\n\t\t\t\tremoveAllInstances: function() {\n\t\t\t\t\tvar self = this;\n\t\t\t\t\tBasic.each(objpool, function(obj, uid) {\n\t\t\t\t\t\tif (Basic.typeOf(obj.instance.destroy) === 'function') {\n\t\t\t\t\t\t\tobj.instance.destroy.call(obj.context);\n\t\t\t\t\t\t}\n\t\t\t\t\t\tself.removeInstance(uid);\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t};\n\t\t}());\n\n\n\t\t// public methods\n\t\tBasic.extend(this, {\n\t\t\t/**\n\t\t\tSpecifies whether runtime instance was initialized or not\n\n\t\t\t@property initialized\n\t\t\t@type {Boolean}\n\t\t\t@default false\n\t\t\t*/\n\t\t\tinitialized: false, // shims require this flag to stop initialization retries\n\n\t\t\t/**\n\t\t\tUnique ID of the runtime\n\n\t\t\t@property uid\n\t\t\t@type {String}\n\t\t\t*/\n\t\t\tuid: _uid,\n\n\t\t\t/**\n\t\t\tRuntime type (e.g. flash, html5, etc)\n\n\t\t\t@property type\n\t\t\t@type {String}\n\t\t\t*/\n\t\t\ttype: type,\n\n\t\t\t/**\n\t\t\tRuntime (not native one) may operate in browser or client mode.\n\n\t\t\t@property mode\n\t\t\t@private\n\t\t\t@type {String|Boolean} current mode or false, if none possible\n\t\t\t*/\n\t\t\tmode: Runtime.getMode(modeCaps, (options.required_caps), defaultMode),\n\n\t\t\t/**\n\t\t\tid of the DOM container for the runtime (if available)\n\n\t\t\t@property shimid\n\t\t\t@type {String}\n\t\t\t*/\n\t\t\tshimid: _uid + '_container',\n\n\t\t\t/**\n\t\t\tNumber of connected clients. If equal to zero, runtime can be destroyed\n\n\t\t\t@property clients\n\t\t\t@type {Number}\n\t\t\t*/\n\t\t\tclients: 0,\n\n\t\t\t/**\n\t\t\tRuntime initialization options\n\n\t\t\t@property options\n\t\t\t@type {Object}\n\t\t\t*/\n\t\t\toptions: options,\n\n\t\t\t/**\n\t\t\tChecks if the runtime has specific capability\n\n\t\t\t@method can\n\t\t\t@param {String} cap Name of capability to check\n\t\t\t@param {Mixed} [value] If passed, capability should somehow correlate to the value\n\t\t\t@param {Object} [refCaps] Set of capabilities to check the specified cap against (defaults to internal set)\n\t\t\t@return {Boolean} true if runtime has such capability and false, if - not\n\t\t\t*/\n\t\t\tcan: function(cap, value) {\n\t\t\t\tvar refCaps = arguments[2] || caps;\n\n\t\t\t\t// if cap var is a comma-separated list of caps, convert it to object (key/value)\n\t\t\t\tif (Basic.typeOf(cap) === 'string' && Basic.typeOf(value) === 'undefined') {\n\t\t\t\t\tcap = Runtime.parseCaps(cap);\n\t\t\t\t}\n\n\t\t\t\tif (Basic.typeOf(cap) === 'object') {\n\t\t\t\t\tfor (var key in cap) {\n\t\t\t\t\t\tif (!this.can(key, cap[key], refCaps)) {\n\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\n\t\t\t\t// check the individual cap\n\t\t\t\tif (Basic.typeOf(refCaps[cap]) === 'function') {\n\t\t\t\t\treturn refCaps[cap].call(this, value);\n\t\t\t\t} else {\n\t\t\t\t\treturn (value === refCaps[cap]);\n\t\t\t\t}\n\t\t\t},\n\n\t\t\t/**\n\t\t\tReturns container for the runtime as DOM element\n\n\t\t\t@method getShimContainer\n\t\t\t@return {DOMElement}\n\t\t\t*/\n\t\t\tgetShimContainer: function() {\n\t\t\t\tvar container, shimContainer = Dom.get(this.shimid);\n\n\t\t\t\t// if no container for shim, create one\n\t\t\t\tif (!shimContainer) {\n\t\t\t\t\tcontainer = this.options.container ? Dom.get(this.options.container) : document.body;\n\n\t\t\t\t\t// create shim container and insert it at an absolute position into the outer container\n\t\t\t\t\tshimContainer = document.createElement('div');\n\t\t\t\t\tshimContainer.id = this.shimid;\n\t\t\t\t\tshimContainer.className = 'moxie-shim moxie-shim-' + this.type;\n\n\t\t\t\t\tBasic.extend(shimContainer.style, {\n\t\t\t\t\t\tposition: 'absolute',\n\t\t\t\t\t\ttop: '0px',\n\t\t\t\t\t\tleft: '0px',\n\t\t\t\t\t\twidth: '1px',\n\t\t\t\t\t\theight: '1px',\n\t\t\t\t\t\toverflow: 'hidden'\n\t\t\t\t\t});\n\n\t\t\t\t\tcontainer.appendChild(shimContainer);\n\t\t\t\t\tcontainer = null;\n\t\t\t\t}\n\n\t\t\t\treturn shimContainer;\n\t\t\t},\n\n\t\t\t/**\n\t\t\tReturns runtime as DOM element (if appropriate)\n\n\t\t\t@method getShim\n\t\t\t@return {DOMElement}\n\t\t\t*/\n\t\t\tgetShim: function() {\n\t\t\t\treturn _shim;\n\t\t\t},\n\n\t\t\t/**\n\t\t\tInvokes a method within the runtime itself (might differ across the runtimes)\n\n\t\t\t@method shimExec\n\t\t\t@param {Mixed} []\n\t\t\t@protected\n\t\t\t@return {Mixed} Depends on the action and component\n\t\t\t*/\n\t\t\tshimExec: function(component, action) {\n\t\t\t\tvar args = [].slice.call(arguments, 2);\n\t\t\t\treturn self.getShim().exec.call(this, this.uid, component, action, args);\n\t\t\t},\n\n\t\t\t/**\n\t\t\tOperaional interface that is used by components to invoke specific actions on the runtime\n\t\t\t(is invoked in the scope of component)\n\n\t\t\t@method exec\n\t\t\t@param {Mixed} []*\n\t\t\t@protected\n\t\t\t@return {Mixed} Depends on the action and component\n\t\t\t*/\n\t\t\texec: function(component, action) { // this is called in the context of component, not runtime\n\t\t\t\tvar args = [].slice.call(arguments, 2);\n\n\t\t\t\tif (self[component] && self[component][action]) {\n\t\t\t\t\treturn self[component][action].apply(this, args);\n\t\t\t\t}\n\t\t\t\treturn self.shimExec.apply(this, arguments);\n\t\t\t},\n\n\t\t\t/**\n\t\t\tDestroys the runtime (removes all events and deletes DOM structures)\n\n\t\t\t@method destroy\n\t\t\t*/\n\t\t\tdestroy: function() {\n\t\t\t\tif (!self) {\n\t\t\t\t\treturn; // obviously already destroyed\n\t\t\t\t}\n\n\t\t\t\tvar shimContainer = Dom.get(this.shimid);\n\t\t\t\tif (shimContainer) {\n\t\t\t\t\tshimContainer.parentNode.removeChild(shimContainer);\n\t\t\t\t}\n\n\t\t\t\tif (_shim) {\n\t\t\t\t\t_shim.removeAllInstances();\n\t\t\t\t}\n\n\t\t\t\tthis.unbindAll();\n\t\t\t\tdelete runtimes[this.uid];\n\t\t\t\tthis.uid = null; // mark this runtime as destroyed\n\t\t\t\t_uid = self = _shim = shimContainer = null;\n\t\t\t}\n\t\t});\n\n\t\t// once we got the mode, test against all caps\n\t\tif (this.mode && options.required_caps && !this.can(options.required_caps)) {\n\t\t\tthis.mode = false;\n\t\t}\t\n\t}\n\n\n\t/**\n\tDefault order to try different runtime types\n\n\t@property order\n\t@type String\n\t@static\n\t*/\n\tRuntime.order = 'html5,flash,silverlight,html4';\n\n\n\t/**\n\tRetrieves runtime from private hash by it's uid\n\n\t@method getRuntime\n\t@private\n\t@static\n\t@param {String} uid Unique identifier of the runtime\n\t@return {Runtime|Boolean} Returns runtime, if it exists and false, if - not\n\t*/\n\tRuntime.getRuntime = function(uid) {\n\t\treturn runtimes[uid] ? runtimes[uid] : false;\n\t};\n\n\n\t/**\n\tRegister constructor for the Runtime of new (or perhaps modified) type\n\n\t@method addConstructor\n\t@static\n\t@param {String} type Runtime type (e.g. flash, html5, etc)\n\t@param {Function} construct Constructor for the Runtime type\n\t*/\n\tRuntime.addConstructor = function(type, constructor) {\n\t\tconstructor.prototype = EventTarget.instance;\n\t\truntimeConstructors[type] = constructor;\n\t};\n\n\n\t/**\n\tGet the constructor for the specified type.\n\n\tmethod getConstructor\n\t@static\n\t@param {String} type Runtime type (e.g. flash, html5, etc)\n\t@return {Function} Constructor for the Runtime type\n\t*/\n\tRuntime.getConstructor = function(type) {\n\t\treturn runtimeConstructors[type] || null;\n\t};\n\n\n\t/**\n\tGet info about the runtime (uid, type, capabilities)\n\n\t@method getInfo\n\t@static\n\t@param {String} uid Unique identifier of the runtime\n\t@return {Mixed} Info object or null if runtime doesn't exist\n\t*/\n\tRuntime.getInfo = function(uid) {\n\t\tvar runtime = Runtime.getRuntime(uid);\n\n\t\tif (runtime) {\n\t\t\treturn {\n\t\t\t\tuid: runtime.uid,\n\t\t\t\ttype: runtime.type,\n\t\t\t\tmode: runtime.mode,\n\t\t\t\tcan: function() {\n\t\t\t\t\treturn runtime.can.apply(runtime, arguments);\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t\treturn null;\n\t};\n\n\n\t/**\n\tConvert caps represented by a comma-separated string to the object representation.\n\n\t@method parseCaps\n\t@static\n\t@param {String} capStr Comma-separated list of capabilities\n\t@return {Object}\n\t*/\n\tRuntime.parseCaps = function(capStr) {\n\t\tvar capObj = {};\n\n\t\tif (Basic.typeOf(capStr) !== 'string') {\n\t\t\treturn capStr || {};\n\t\t}\n\n\t\tBasic.each(capStr.split(','), function(key) {\n\t\t\tcapObj[key] = true; // we assume it to be - true\n\t\t});\n\n\t\treturn capObj;\n\t};\n\n\t/**\n\tTest the specified runtime for specific capabilities.\n\n\t@method can\n\t@static\n\t@param {String} type Runtime type (e.g. flash, html5, etc)\n\t@param {String|Object} caps Set of capabilities to check\n\t@return {Boolean} Result of the test\n\t*/\n\tRuntime.can = function(type, caps) {\n\t\tvar runtime\n\t\t, constructor = Runtime.getConstructor(type)\n\t\t, mode\n\t\t;\n\t\tif (constructor) {\n\t\t\truntime = new constructor({\n\t\t\t\trequired_caps: caps\n\t\t\t});\n\t\t\tmode = runtime.mode;\n\t\t\truntime.destroy();\n\t\t\treturn !!mode;\n\t\t}\n\t\treturn false;\n\t};\n\n\n\t/**\n\tFigure out a runtime that supports specified capabilities.\n\n\t@method thatCan\n\t@static\n\t@param {String|Object} caps Set of capabilities to check\n\t@param {String} [runtimeOrder] Comma-separated list of runtimes to check against\n\t@return {String} Usable runtime identifier or null\n\t*/\n\tRuntime.thatCan = function(caps, runtimeOrder) {\n\t\tvar types = (runtimeOrder || Runtime.order).split(/\\s*,\\s*/);\n\t\tfor (var i in types) {\n\t\t\tif (Runtime.can(types[i], caps)) {\n\t\t\t\treturn types[i];\n\t\t\t}\n\t\t}\n\t\treturn null;\n\t};\n\n\n\t/**\n\tFigure out an operational mode for the specified set of capabilities.\n\n\t@method getMode\n\t@static\n\t@param {Object} modeCaps Set of capabilities that depend on particular runtime mode\n\t@param {Object} [requiredCaps] Supplied set of capabilities to find operational mode for\n\t@param {String|Boolean} [defaultMode='browser'] Default mode to use \n\t@return {String|Boolean} Compatible operational mode\n\t*/\n\tRuntime.getMode = function(modeCaps, requiredCaps, defaultMode) {\n\t\tvar mode = null;\n\n\t\tif (Basic.typeOf(defaultMode) === 'undefined') { // only if not specified\n\t\t\tdefaultMode = 'browser';\n\t\t}\n\n\t\tif (requiredCaps && !Basic.isEmptyObj(modeCaps)) {\n\t\t\t// loop over required caps and check if they do require the same mode\n\t\t\tBasic.each(requiredCaps, function(value, cap) {\n\t\t\t\tif (modeCaps.hasOwnProperty(cap)) {\n\t\t\t\t\tvar capMode = modeCaps[cap](value);\n\n\t\t\t\t\t// make sure we always have an array\n\t\t\t\t\tif (typeof(capMode) === 'string') {\n\t\t\t\t\t\tcapMode = [capMode];\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\tif (!mode) {\n\t\t\t\t\t\tmode = capMode;\t\t\t\t\t\t\n\t\t\t\t\t} else if (!(mode = Basic.arrayIntersect(mode, capMode))) {\n\t\t\t\t\t\t// if cap requires conflicting mode - runtime cannot fulfill required caps\n\n\t\t\t\t\t\tif (MXI_DEBUG && Env.debug.runtime) {\n\t\t\t\t\t\t\tEnv.log(\"\\t\\t%c: %v (conflicting mode requested: %s)\", cap, value, capMode);\t\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn (mode = false);\n\t\t\t\t\t}\t\t\t\t\t\n\t\t\t\t}\n\n\t\t\t\tif (MXI_DEBUG && Env.debug.runtime) {\n\t\t\t\t\tEnv.log(\"\\t\\t%c: %v (compatible modes: %s)\", cap, value, mode);\t\n\t\t\t\t}\n\t\t\t});\n\n\t\t\tif (mode) {\n\t\t\t\treturn Basic.inArray(defaultMode, mode) !== -1 ? defaultMode : mode[0];\n\t\t\t} else if (mode === false) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\t\treturn defaultMode; \n\t};\n\n\n\t/**\n\tCapability check that always returns true\n\n\t@private\n\t@static\n\t@return {True}\n\t*/\n\tRuntime.capTrue = function() {\n\t\treturn true;\n\t};\n\n\t/**\n\tCapability check that always returns false\n\n\t@private\n\t@static\n\t@return {False}\n\t*/\n\tRuntime.capFalse = function() {\n\t\treturn false;\n\t};\n\n\t/**\n\tEvaluate the expression to boolean value and create a function that always returns it.\n\n\t@private\n\t@static\n\t@param {Mixed} expr Expression to evaluate\n\t@return {Function} Function returning the result of evaluation\n\t*/\n\tRuntime.capTest = function(expr) {\n\t\treturn function() {\n\t\t\treturn !!expr;\n\t\t};\n\t};\n\n\treturn Runtime;\n});\n");
__$coverInitRange("src/javascript/runtime/Runtime.js", "198:15241");
__$coverInitRange("src/javascript/runtime/Runtime.js", "380:423");
__$coverInitRange("src/javascript/runtime/Runtime.js", "890:9805");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9906:9953");
__$coverInitRange("src/javascript/runtime/Runtime.js", "10187:10274");
__$coverInitRange("src/javascript/runtime/Runtime.js", "10516:10664");
__$coverInitRange("src/javascript/runtime/Runtime.js", "10869:10957");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11168:11449");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11655:11912");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12159:12439");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12732:12955");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13366:14623");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14716:14764");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14858:14908");
__$coverInitRange("src/javascript/runtime/Runtime.js", "15137:15219");
__$coverInitRange("src/javascript/runtime/Runtime.js", "15223:15237");
__$coverInitRange("src/javascript/runtime/Runtime.js", "1214:1320");
__$coverInitRange("src/javascript/runtime/Runtime.js", "1321:1321");
__$coverInitRange("src/javascript/runtime/Runtime.js", "1326:1349");
__$coverInitRange("src/javascript/runtime/Runtime.js", "1392:1413");
__$coverInitRange("src/javascript/runtime/Runtime.js", "1553:3799");
__$coverInitRange("src/javascript/runtime/Runtime.js", "3873:3986");
__$coverInitRange("src/javascript/runtime/Runtime.js", "3991:4079");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4182:4904");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4930:9645");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9699:9801");
__$coverInitRange("src/javascript/runtime/Runtime.js", "3906:3982");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4032:4074");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4207:4223");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4228:4896");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4284:4542");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4309:4429");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4437:4535");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4337:4421");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4477:4527");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4593:4612");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4664:4679");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4686:4884");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4733:4843");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4851:4875");
__$coverInitRange("src/javascript/runtime/Runtime.js", "4797:4835");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6455:6489");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6582:6698");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6705:6876");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6915:7063");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6664:6692");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6748:6852");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6859:6870");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6777:6845");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6825:6837");
__$coverInitRange("src/javascript/runtime/Runtime.js", "6969:7006");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7026:7057");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7228:7279");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7330:7948");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7955:7975");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7357:7441");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7542:7587");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7594:7624");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7631:7693");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7701:7875");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7883:7919");
__$coverInitRange("src/javascript/runtime/Runtime.js", "7926:7942");
__$coverInitRange("src/javascript/runtime/Runtime.js", "8121:8133");
__$coverInitRange("src/javascript/runtime/Runtime.js", "8394:8432");
__$coverInitRange("src/javascript/runtime/Runtime.js", "8438:8510");
__$coverInitRange("src/javascript/runtime/Runtime.js", "8877:8915");
__$coverInitRange("src/javascript/runtime/Runtime.js", "8922:9031");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9037:9080");
__$coverInitRange("src/javascript/runtime/Runtime.js", "8977:9025");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9223:9284");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9291:9331");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9337:9420");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9427:9477");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9484:9500");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9506:9531");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9537:9552");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9592:9634");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9241:9247");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9363:9414");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9445:9471");
__$coverInitRange("src/javascript/runtime/Runtime.js", "9780:9797");
__$coverInitRange("src/javascript/runtime/Runtime.js", "10226:10270");
__$coverInitRange("src/javascript/runtime/Runtime.js", "10573:10617");
__$coverInitRange("src/javascript/runtime/Runtime.js", "10621:10660");
__$coverInitRange("src/javascript/runtime/Runtime.js", "10913:10953");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11204:11241");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11246:11430");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11434:11445");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11264:11426");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11370:11414");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11696:11711");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11716:11783");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11788:11890");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11895:11908");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11760:11779");
__$coverInitRange("src/javascript/runtime/Runtime.js", "11837:11855");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12198:12267");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12268:12268");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12272:12419");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12423:12435");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12294:12351");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12356:12375");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12380:12397");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12402:12415");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12783:12843");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12847:12936");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12940:12951");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12873:12932");
__$coverInitRange("src/javascript/runtime/Runtime.js", "12912:12927");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13434:13449");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13454:13558");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13563:14596");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14600:14618");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13531:13554");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13690:14445");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14451:14592");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13742:14319");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14326:14438");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13783:13817");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13867:13935");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13948:14308");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13909:13928");
__$coverInitRange("src/javascript/runtime/Runtime.js", "13967:13981");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14142:14271");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14280:14301");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14187:14262");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14369:14431");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14467:14537");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14575:14587");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14749:14760");
__$coverInitRange("src/javascript/runtime/Runtime.js", "14892:14904");
__$coverInitRange("src/javascript/runtime/Runtime.js", "15174:15215");
__$coverInitRange("src/javascript/runtime/Runtime.js", "15197:15210");
__$coverCall('src/javascript/runtime/Runtime.js', '198:15241');
define('moxie/runtime/Runtime', [
    'moxie/core/utils/Env',
    'moxie/core/utils/Basic',
    'moxie/core/utils/Dom',
    'moxie/core/EventTarget'
], function (Env, Basic, Dom, EventTarget) {
    __$coverCall('src/javascript/runtime/Runtime.js', '380:423');
    var runtimeConstructors = {}, runtimes = {};
    __$coverCall('src/javascript/runtime/Runtime.js', '890:9805');
    function Runtime(options, type, caps, modeCaps, preferredMode) {
        __$coverCall('src/javascript/runtime/Runtime.js', '1214:1320');
        var self = this, _shim, _uid = Basic.guid(type + '_'), defaultMode = preferredMode || 'browser';
        __$coverCall('src/javascript/runtime/Runtime.js', '1321:1321');
        ;
        __$coverCall('src/javascript/runtime/Runtime.js', '1326:1349');
        options = options || {};
        __$coverCall('src/javascript/runtime/Runtime.js', '1392:1413');
        runtimes[_uid] = this;
        __$coverCall('src/javascript/runtime/Runtime.js', '1553:3799');
        caps = Basic.extend({
            access_binary: false,
            access_image_binary: false,
            display_media: false,
            do_cors: false,
            drag_and_drop: false,
            filter_by_extension: true,
            resize_image: false,
            report_upload_progress: false,
            return_response_headers: false,
            return_response_type: false,
            return_status_code: true,
            send_custom_headers: false,
            select_file: false,
            select_folder: false,
            select_multiple: true,
            send_binary_string: false,
            send_browser_cookies: true,
            send_multipart: true,
            slice_blob: false,
            stream_upload: false,
            summon_file_dialog: false,
            upload_filesize: true,
            use_http_method: true
        }, caps);
        __$coverCall('src/javascript/runtime/Runtime.js', '3873:3986');
        if (options.preferred_caps) {
            __$coverCall('src/javascript/runtime/Runtime.js', '3906:3982');
            defaultMode = Runtime.getMode(modeCaps, options.preferred_caps, defaultMode);
        }
        __$coverCall('src/javascript/runtime/Runtime.js', '3991:4079');
        if (MXI_DEBUG && Env.debug.runtime) {
            __$coverCall('src/javascript/runtime/Runtime.js', '4032:4074');
            Env.log('\tdefault mode: %s', defaultMode);
        }
        __$coverCall('src/javascript/runtime/Runtime.js', '4182:4904');
        _shim = function () {
            __$coverCall('src/javascript/runtime/Runtime.js', '4207:4223');
            var objpool = {};
            __$coverCall('src/javascript/runtime/Runtime.js', '4228:4896');
            return {
                exec: function (uid, comp, fn, args) {
                    __$coverCall('src/javascript/runtime/Runtime.js', '4284:4542');
                    if (_shim[comp]) {
                        __$coverCall('src/javascript/runtime/Runtime.js', '4309:4429');
                        if (!objpool[uid]) {
                            __$coverCall('src/javascript/runtime/Runtime.js', '4337:4421');
                            objpool[uid] = {
                                context: this,
                                instance: new _shim[comp]()
                            };
                        }
                        __$coverCall('src/javascript/runtime/Runtime.js', '4437:4535');
                        if (objpool[uid].instance[fn]) {
                            __$coverCall('src/javascript/runtime/Runtime.js', '4477:4527');
                            return objpool[uid].instance[fn].apply(this, args);
                        }
                    }
                },
                removeInstance: function (uid) {
                    __$coverCall('src/javascript/runtime/Runtime.js', '4593:4612');
                    delete objpool[uid];
                },
                removeAllInstances: function () {
                    __$coverCall('src/javascript/runtime/Runtime.js', '4664:4679');
                    var self = this;
                    __$coverCall('src/javascript/runtime/Runtime.js', '4686:4884');
                    Basic.each(objpool, function (obj, uid) {
                        __$coverCall('src/javascript/runtime/Runtime.js', '4733:4843');
                        if (Basic.typeOf(obj.instance.destroy) === 'function') {
                            __$coverCall('src/javascript/runtime/Runtime.js', '4797:4835');
                            obj.instance.destroy.call(obj.context);
                        }
                        __$coverCall('src/javascript/runtime/Runtime.js', '4851:4875');
                        self.removeInstance(uid);
                    });
                }
            };
        }();
        __$coverCall('src/javascript/runtime/Runtime.js', '4930:9645');
        Basic.extend(this, {
            initialized: false,
            uid: _uid,
            type: type,
            mode: Runtime.getMode(modeCaps, options.required_caps, defaultMode),
            shimid: _uid + '_container',
            clients: 0,
            options: options,
            can: function (cap, value) {
                __$coverCall('src/javascript/runtime/Runtime.js', '6455:6489');
                var refCaps = arguments[2] || caps;
                __$coverCall('src/javascript/runtime/Runtime.js', '6582:6698');
                if (Basic.typeOf(cap) === 'string' && Basic.typeOf(value) === 'undefined') {
                    __$coverCall('src/javascript/runtime/Runtime.js', '6664:6692');
                    cap = Runtime.parseCaps(cap);
                }
                __$coverCall('src/javascript/runtime/Runtime.js', '6705:6876');
                if (Basic.typeOf(cap) === 'object') {
                    __$coverCall('src/javascript/runtime/Runtime.js', '6748:6852');
                    for (var key in cap) {
                        __$coverCall('src/javascript/runtime/Runtime.js', '6777:6845');
                        if (!this.can(key, cap[key], refCaps)) {
                            __$coverCall('src/javascript/runtime/Runtime.js', '6825:6837');
                            return false;
                        }
                    }
                    __$coverCall('src/javascript/runtime/Runtime.js', '6859:6870');
                    return true;
                }
                __$coverCall('src/javascript/runtime/Runtime.js', '6915:7063');
                if (Basic.typeOf(refCaps[cap]) === 'function') {
                    __$coverCall('src/javascript/runtime/Runtime.js', '6969:7006');
                    return refCaps[cap].call(this, value);
                } else {
                    __$coverCall('src/javascript/runtime/Runtime.js', '7026:7057');
                    return value === refCaps[cap];
                }
            },
            getShimContainer: function () {
                __$coverCall('src/javascript/runtime/Runtime.js', '7228:7279');
                var container, shimContainer = Dom.get(this.shimid);
                __$coverCall('src/javascript/runtime/Runtime.js', '7330:7948');
                if (!shimContainer) {
                    __$coverCall('src/javascript/runtime/Runtime.js', '7357:7441');
                    container = this.options.container ? Dom.get(this.options.container) : document.body;
                    __$coverCall('src/javascript/runtime/Runtime.js', '7542:7587');
                    shimContainer = document.createElement('div');
                    __$coverCall('src/javascript/runtime/Runtime.js', '7594:7624');
                    shimContainer.id = this.shimid;
                    __$coverCall('src/javascript/runtime/Runtime.js', '7631:7693');
                    shimContainer.className = 'moxie-shim moxie-shim-' + this.type;
                    __$coverCall('src/javascript/runtime/Runtime.js', '7701:7875');
                    Basic.extend(shimContainer.style, {
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        width: '1px',
                        height: '1px',
                        overflow: 'hidden'
                    });
                    __$coverCall('src/javascript/runtime/Runtime.js', '7883:7919');
                    container.appendChild(shimContainer);
                    __$coverCall('src/javascript/runtime/Runtime.js', '7926:7942');
                    container = null;
                }
                __$coverCall('src/javascript/runtime/Runtime.js', '7955:7975');
                return shimContainer;
            },
            getShim: function () {
                __$coverCall('src/javascript/runtime/Runtime.js', '8121:8133');
                return _shim;
            },
            shimExec: function (component, action) {
                __$coverCall('src/javascript/runtime/Runtime.js', '8394:8432');
                var args = [].slice.call(arguments, 2);
                __$coverCall('src/javascript/runtime/Runtime.js', '8438:8510');
                return self.getShim().exec.call(this, this.uid, component, action, args);
            },
            exec: function (component, action) {
                __$coverCall('src/javascript/runtime/Runtime.js', '8877:8915');
                var args = [].slice.call(arguments, 2);
                __$coverCall('src/javascript/runtime/Runtime.js', '8922:9031');
                if (self[component] && self[component][action]) {
                    __$coverCall('src/javascript/runtime/Runtime.js', '8977:9025');
                    return self[component][action].apply(this, args);
                }
                __$coverCall('src/javascript/runtime/Runtime.js', '9037:9080');
                return self.shimExec.apply(this, arguments);
            },
            destroy: function () {
                __$coverCall('src/javascript/runtime/Runtime.js', '9223:9284');
                if (!self) {
                    __$coverCall('src/javascript/runtime/Runtime.js', '9241:9247');
                    return;
                }
                __$coverCall('src/javascript/runtime/Runtime.js', '9291:9331');
                var shimContainer = Dom.get(this.shimid);
                __$coverCall('src/javascript/runtime/Runtime.js', '9337:9420');
                if (shimContainer) {
                    __$coverCall('src/javascript/runtime/Runtime.js', '9363:9414');
                    shimContainer.parentNode.removeChild(shimContainer);
                }
                __$coverCall('src/javascript/runtime/Runtime.js', '9427:9477');
                if (_shim) {
                    __$coverCall('src/javascript/runtime/Runtime.js', '9445:9471');
                    _shim.removeAllInstances();
                }
                __$coverCall('src/javascript/runtime/Runtime.js', '9484:9500');
                this.unbindAll();
                __$coverCall('src/javascript/runtime/Runtime.js', '9506:9531');
                delete runtimes[this.uid];
                __$coverCall('src/javascript/runtime/Runtime.js', '9537:9552');
                this.uid = null;
                __$coverCall('src/javascript/runtime/Runtime.js', '9592:9634');
                _uid = self = _shim = shimContainer = null;
            }
        });
        __$coverCall('src/javascript/runtime/Runtime.js', '9699:9801');
        if (this.mode && options.required_caps && !this.can(options.required_caps)) {
            __$coverCall('src/javascript/runtime/Runtime.js', '9780:9797');
            this.mode = false;
        }
    }
    __$coverCall('src/javascript/runtime/Runtime.js', '9906:9953');
    Runtime.order = 'html5,flash,silverlight,html4';
    __$coverCall('src/javascript/runtime/Runtime.js', '10187:10274');
    Runtime.getRuntime = function (uid) {
        __$coverCall('src/javascript/runtime/Runtime.js', '10226:10270');
        return runtimes[uid] ? runtimes[uid] : false;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '10516:10664');
    Runtime.addConstructor = function (type, constructor) {
        __$coverCall('src/javascript/runtime/Runtime.js', '10573:10617');
        constructor.prototype = EventTarget.instance;
        __$coverCall('src/javascript/runtime/Runtime.js', '10621:10660');
        runtimeConstructors[type] = constructor;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '10869:10957');
    Runtime.getConstructor = function (type) {
        __$coverCall('src/javascript/runtime/Runtime.js', '10913:10953');
        return runtimeConstructors[type] || null;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '11168:11449');
    Runtime.getInfo = function (uid) {
        __$coverCall('src/javascript/runtime/Runtime.js', '11204:11241');
        var runtime = Runtime.getRuntime(uid);
        __$coverCall('src/javascript/runtime/Runtime.js', '11246:11430');
        if (runtime) {
            __$coverCall('src/javascript/runtime/Runtime.js', '11264:11426');
            return {
                uid: runtime.uid,
                type: runtime.type,
                mode: runtime.mode,
                can: function () {
                    __$coverCall('src/javascript/runtime/Runtime.js', '11370:11414');
                    return runtime.can.apply(runtime, arguments);
                }
            };
        }
        __$coverCall('src/javascript/runtime/Runtime.js', '11434:11445');
        return null;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '11655:11912');
    Runtime.parseCaps = function (capStr) {
        __$coverCall('src/javascript/runtime/Runtime.js', '11696:11711');
        var capObj = {};
        __$coverCall('src/javascript/runtime/Runtime.js', '11716:11783');
        if (Basic.typeOf(capStr) !== 'string') {
            __$coverCall('src/javascript/runtime/Runtime.js', '11760:11779');
            return capStr || {};
        }
        __$coverCall('src/javascript/runtime/Runtime.js', '11788:11890');
        Basic.each(capStr.split(','), function (key) {
            __$coverCall('src/javascript/runtime/Runtime.js', '11837:11855');
            capObj[key] = true;
        });
        __$coverCall('src/javascript/runtime/Runtime.js', '11895:11908');
        return capObj;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '12159:12439');
    Runtime.can = function (type, caps) {
        __$coverCall('src/javascript/runtime/Runtime.js', '12198:12267');
        var runtime, constructor = Runtime.getConstructor(type), mode;
        __$coverCall('src/javascript/runtime/Runtime.js', '12268:12268');
        ;
        __$coverCall('src/javascript/runtime/Runtime.js', '12272:12419');
        if (constructor) {
            __$coverCall('src/javascript/runtime/Runtime.js', '12294:12351');
            runtime = new constructor({ required_caps: caps });
            __$coverCall('src/javascript/runtime/Runtime.js', '12356:12375');
            mode = runtime.mode;
            __$coverCall('src/javascript/runtime/Runtime.js', '12380:12397');
            runtime.destroy();
            __$coverCall('src/javascript/runtime/Runtime.js', '12402:12415');
            return !!mode;
        }
        __$coverCall('src/javascript/runtime/Runtime.js', '12423:12435');
        return false;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '12732:12955');
    Runtime.thatCan = function (caps, runtimeOrder) {
        __$coverCall('src/javascript/runtime/Runtime.js', '12783:12843');
        var types = (runtimeOrder || Runtime.order).split(/\s*,\s*/);
        __$coverCall('src/javascript/runtime/Runtime.js', '12847:12936');
        for (var i in types) {
            __$coverCall('src/javascript/runtime/Runtime.js', '12873:12932');
            if (Runtime.can(types[i], caps)) {
                __$coverCall('src/javascript/runtime/Runtime.js', '12912:12927');
                return types[i];
            }
        }
        __$coverCall('src/javascript/runtime/Runtime.js', '12940:12951');
        return null;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '13366:14623');
    Runtime.getMode = function (modeCaps, requiredCaps, defaultMode) {
        __$coverCall('src/javascript/runtime/Runtime.js', '13434:13449');
        var mode = null;
        __$coverCall('src/javascript/runtime/Runtime.js', '13454:13558');
        if (Basic.typeOf(defaultMode) === 'undefined') {
            __$coverCall('src/javascript/runtime/Runtime.js', '13531:13554');
            defaultMode = 'browser';
        }
        __$coverCall('src/javascript/runtime/Runtime.js', '13563:14596');
        if (requiredCaps && !Basic.isEmptyObj(modeCaps)) {
            __$coverCall('src/javascript/runtime/Runtime.js', '13690:14445');
            Basic.each(requiredCaps, function (value, cap) {
                __$coverCall('src/javascript/runtime/Runtime.js', '13742:14319');
                if (modeCaps.hasOwnProperty(cap)) {
                    __$coverCall('src/javascript/runtime/Runtime.js', '13783:13817');
                    var capMode = modeCaps[cap](value);
                    __$coverCall('src/javascript/runtime/Runtime.js', '13867:13935');
                    if (typeof capMode === 'string') {
                        __$coverCall('src/javascript/runtime/Runtime.js', '13909:13928');
                        capMode = [capMode];
                    }
                    __$coverCall('src/javascript/runtime/Runtime.js', '13948:14308');
                    if (!mode) {
                        __$coverCall('src/javascript/runtime/Runtime.js', '13967:13981');
                        mode = capMode;
                    } else if (!(mode = Basic.arrayIntersect(mode, capMode))) {
                        __$coverCall('src/javascript/runtime/Runtime.js', '14142:14271');
                        if (MXI_DEBUG && Env.debug.runtime) {
                            __$coverCall('src/javascript/runtime/Runtime.js', '14187:14262');
                            Env.log('\t\t%c: %v (conflicting mode requested: %s)', cap, value, capMode);
                        }
                        __$coverCall('src/javascript/runtime/Runtime.js', '14280:14301');
                        return mode = false;
                    }
                }
                __$coverCall('src/javascript/runtime/Runtime.js', '14326:14438');
                if (MXI_DEBUG && Env.debug.runtime) {
                    __$coverCall('src/javascript/runtime/Runtime.js', '14369:14431');
                    Env.log('\t\t%c: %v (compatible modes: %s)', cap, value, mode);
                }
            });
            __$coverCall('src/javascript/runtime/Runtime.js', '14451:14592');
            if (mode) {
                __$coverCall('src/javascript/runtime/Runtime.js', '14467:14537');
                return Basic.inArray(defaultMode, mode) !== -1 ? defaultMode : mode[0];
            } else if (mode === false) {
                __$coverCall('src/javascript/runtime/Runtime.js', '14575:14587');
                return false;
            }
        }
        __$coverCall('src/javascript/runtime/Runtime.js', '14600:14618');
        return defaultMode;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '14716:14764');
    Runtime.capTrue = function () {
        __$coverCall('src/javascript/runtime/Runtime.js', '14749:14760');
        return true;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '14858:14908');
    Runtime.capFalse = function () {
        __$coverCall('src/javascript/runtime/Runtime.js', '14892:14904');
        return false;
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '15137:15219');
    Runtime.capTest = function (expr) {
        __$coverCall('src/javascript/runtime/Runtime.js', '15174:15215');
        return function () {
            __$coverCall('src/javascript/runtime/Runtime.js', '15197:15210');
            return !!expr;
        };
    };
    __$coverCall('src/javascript/runtime/Runtime.js', '15223:15237');
    return Runtime;
});

// Included from: src/javascript/runtime/RuntimeClient.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/RuntimeClient.js", "/**\n * RuntimeClient.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/runtime/RuntimeClient', [\n\t'moxie/core/utils/Env',\n\t'moxie/core/Exceptions',\n\t'moxie/core/utils/Basic',\n\t'moxie/runtime/Runtime'\n], function(Env, x, Basic, Runtime) {\n\t/**\n\tSet of methods and properties, required by a component to acquire ability to connect to a runtime\n\n\t@class RuntimeClient\n\t*/\n\treturn function RuntimeClient() {\n\t\tvar runtime;\n\n\t\tBasic.extend(this, {\n\t\t\t/**\n\t\t\tConnects to the runtime specified by the options. Will either connect to existing runtime or create a new one.\n\t\t\tIncrements number of clients connected to the specified runtime.\n\n\t\t\t@private\n\t\t\t@method connectRuntime\n\t\t\t@param {Mixed} options Can be a runtme uid or a set of key-value pairs defining requirements and pre-requisites\n\t\t\t*/\n\t\t\tconnectRuntime: function(options) {\n\t\t\t\tvar comp = this, ruid;\n\n\t\t\t\tfunction initialize(items) {\n\t\t\t\t\tvar type, constructor;\n\n\t\t\t\t\t// if we ran out of runtimes\n\t\t\t\t\tif (!items.length) {\n\t\t\t\t\t\tcomp.trigger('RuntimeError', new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR));\n\t\t\t\t\t\truntime = null;\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\n\t\t\t\t\ttype = items.shift().toLowerCase();\n\t\t\t\t\tconstructor = Runtime.getConstructor(type);\n\t\t\t\t\tif (!constructor) {\n\t\t\t\t\t\tinitialize(items);\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (MXI_DEBUG && Env.debug.runtime) {\n\t\t\t\t\t\tEnv.log(\"Trying runtime: %s\", type);\n\t\t\t\t\t\tEnv.log(options);\n\t\t\t\t\t}\n\n\t\t\t\t\t// try initializing the runtime\n\t\t\t\t\truntime = new constructor(options);\n\n\t\t\t\t\truntime.bind('Init', function() {\n\t\t\t\t\t\t// mark runtime as initialized\n\t\t\t\t\t\truntime.initialized = true;\n\n\t\t\t\t\t\tif (MXI_DEBUG && Env.debug.runtime) {\n\t\t\t\t\t\t\tEnv.log(\"Runtime '%s' initialized\", runtime.type);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// jailbreak ...\n\t\t\t\t\t\tsetTimeout(function() {\n\t\t\t\t\t\t\truntime.clients++;\n\t\t\t\t\t\t\t// this will be triggered on component\n\t\t\t\t\t\t\tcomp.trigger('RuntimeInit', runtime);\n\t\t\t\t\t\t}, 1);\n\t\t\t\t\t});\n\n\t\t\t\t\truntime.bind('Error', function() {\n\t\t\t\t\t\tif (MXI_DEBUG && Env.debug.runtime) {\n\t\t\t\t\t\t\tEnv.log(\"Runtime '%s' failed to initialize\", runtime.type);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\truntime.destroy(); // runtime cannot destroy itself from inside at a right moment, thus we do it here\n\t\t\t\t\t\tinitialize(items);\n\t\t\t\t\t});\n\n\t\t\t\t\t/*runtime.bind('Exception', function() { });*/\n\n\t\t\t\t\tif (MXI_DEBUG && Env.debug.runtime) {\n\t\t\t\t\t\tEnv.log(\"\\tselected mode: %s\", runtime.mode);\t\n\t\t\t\t\t}\n\n\t\t\t\t\t// check if runtime managed to pick-up operational mode\n\t\t\t\t\tif (!runtime.mode) {\n\t\t\t\t\t\truntime.trigger('Error');\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\n\t\t\t\t\truntime.init();\n\t\t\t\t}\n\n\t\t\t\t// check if a particular runtime was requested\n\t\t\t\tif (Basic.typeOf(options) === 'string') {\n\t\t\t\t\truid = options;\n\t\t\t\t} else if (Basic.typeOf(options.ruid) === 'string') {\n\t\t\t\t\truid = options.ruid;\n\t\t\t\t}\n\n\t\t\t\tif (ruid) {\n\t\t\t\t\truntime = Runtime.getRuntime(ruid);\n\t\t\t\t\tif (runtime) {\n\t\t\t\t\t\truntime.clients++;\n\t\t\t\t\t\treturn runtime;\n\t\t\t\t\t} else {\n\t\t\t\t\t\t// there should be a runtime and there's none - weird case\n\t\t\t\t\t\tthrow new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// initialize a fresh one, that fits runtime list and required features best\n\t\t\t\tinitialize((options.runtime_order || Runtime.order).split(/\\s*,\\s*/));\n\t\t\t},\n\n\n\t\t\t/**\n\t\t\tDisconnects from the runtime. Decrements number of clients connected to the specified runtime.\n\n\t\t\t@private\n\t\t\t@method disconnectRuntime\n\t\t\t*/\n\t\t\tdisconnectRuntime: function() {\n\t\t\t\tif (runtime && --runtime.clients <= 0) {\n\t\t\t\t\truntime.destroy();\n\t\t\t\t}\n\n\t\t\t\t// once the component is disconnected, it shouldn't have access to the runtime\n\t\t\t\truntime = null;\n\t\t\t},\n\n\n\t\t\t/**\n\t\t\tReturns the runtime to which the client is currently connected.\n\n\t\t\t@method getRuntime\n\t\t\t@return {Runtime} Runtime or null if client is not connected\n\t\t\t*/\n\t\t\tgetRuntime: function() {\n\t\t\t\tif (runtime && runtime.uid) {\n\t\t\t\t\treturn runtime;\n\t\t\t\t}\n\t\t\t\treturn runtime = null; // make sure we do not leave zombies rambling around\n\t\t\t},\n\n\n\t\t\t/**\n\t\t\tHandy shortcut to safely invoke runtime extension methods.\n\t\t\t\n\t\t\t@private\n\t\t\t@method exec\n\t\t\t@return {Mixed} Whatever runtime extension method returns\n\t\t\t*/\n\t\t\texec: function() {\n\t\t\t\tif (runtime) {\n\t\t\t\t\treturn runtime.exec.apply(this, arguments);\n\t\t\t\t}\n\t\t\t\treturn null;\n\t\t\t}\n\n\t\t});\n\t};\n\n\n});");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "204:4331");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "517:4325");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "553:564");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "569:4321");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "982:1003");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1010:2657");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2715:2866");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2873:3144");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "3232:3301");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1044:1065");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1107:1254");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1262:1296");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1303:1345");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1352:1416");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1424:1534");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1579:1613");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1621:2028");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2036:2331");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2392:2488");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2557:2629");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2637:2651");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1134:1211");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1219:1233");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1241:1247");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1378:1395");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1403:1409");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1468:1503");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1511:1527");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1698:1724");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1733:1835");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1867:2019");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1778:1827");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1898:1915");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "1970:2006");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2077:2188");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2197:2214");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2305:2322");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2122:2180");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2436:2480");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2584:2608");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2616:2622");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2762:2776");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2841:2860");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2890:2924");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2931:3138");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2952:2969");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "2977:2991");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "3078:3131");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "3503:3572");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "3662:3676");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "3549:3566");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "3885:3940");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "3946:3967");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "3920:3934");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "4224:4292");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "4298:4309");
__$coverInitRange("src/javascript/runtime/RuntimeClient.js", "4244:4286");
__$coverCall('src/javascript/runtime/RuntimeClient.js', '204:4331');
define('moxie/runtime/RuntimeClient', [
    'moxie/core/utils/Env',
    'moxie/core/Exceptions',
    'moxie/core/utils/Basic',
    'moxie/runtime/Runtime'
], function (Env, x, Basic, Runtime) {
    __$coverCall('src/javascript/runtime/RuntimeClient.js', '517:4325');
    return function RuntimeClient() {
        __$coverCall('src/javascript/runtime/RuntimeClient.js', '553:564');
        var runtime;
        __$coverCall('src/javascript/runtime/RuntimeClient.js', '569:4321');
        Basic.extend(this, {
            connectRuntime: function (options) {
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '982:1003');
                var comp = this, ruid;
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '1010:2657');
                function initialize(items) {
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '1044:1065');
                    var type, constructor;
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '1107:1254');
                    if (!items.length) {
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1134:1211');
                        comp.trigger('RuntimeError', new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR));
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1219:1233');
                        runtime = null;
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1241:1247');
                        return;
                    }
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '1262:1296');
                    type = items.shift().toLowerCase();
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '1303:1345');
                    constructor = Runtime.getConstructor(type);
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '1352:1416');
                    if (!constructor) {
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1378:1395');
                        initialize(items);
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1403:1409');
                        return;
                    }
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '1424:1534');
                    if (MXI_DEBUG && Env.debug.runtime) {
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1468:1503');
                        Env.log('Trying runtime: %s', type);
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1511:1527');
                        Env.log(options);
                    }
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '1579:1613');
                    runtime = new constructor(options);
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '1621:2028');
                    runtime.bind('Init', function () {
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1698:1724');
                        runtime.initialized = true;
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1733:1835');
                        if (MXI_DEBUG && Env.debug.runtime) {
                            __$coverCall('src/javascript/runtime/RuntimeClient.js', '1778:1827');
                            Env.log('Runtime \'%s\' initialized', runtime.type);
                        }
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '1867:2019');
                        setTimeout(function () {
                            __$coverCall('src/javascript/runtime/RuntimeClient.js', '1898:1915');
                            runtime.clients++;
                            __$coverCall('src/javascript/runtime/RuntimeClient.js', '1970:2006');
                            comp.trigger('RuntimeInit', runtime);
                        }, 1);
                    });
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '2036:2331');
                    runtime.bind('Error', function () {
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '2077:2188');
                        if (MXI_DEBUG && Env.debug.runtime) {
                            __$coverCall('src/javascript/runtime/RuntimeClient.js', '2122:2180');
                            Env.log('Runtime \'%s\' failed to initialize', runtime.type);
                        }
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '2197:2214');
                        runtime.destroy();
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '2305:2322');
                        initialize(items);
                    });
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '2392:2488');
                    if (MXI_DEBUG && Env.debug.runtime) {
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '2436:2480');
                        Env.log('\tselected mode: %s', runtime.mode);
                    }
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '2557:2629');
                    if (!runtime.mode) {
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '2584:2608');
                        runtime.trigger('Error');
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '2616:2622');
                        return;
                    }
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '2637:2651');
                    runtime.init();
                }
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '2715:2866');
                if (Basic.typeOf(options) === 'string') {
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '2762:2776');
                    ruid = options;
                } else if (Basic.typeOf(options.ruid) === 'string') {
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '2841:2860');
                    ruid = options.ruid;
                }
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '2873:3144');
                if (ruid) {
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '2890:2924');
                    runtime = Runtime.getRuntime(ruid);
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '2931:3138');
                    if (runtime) {
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '2952:2969');
                        runtime.clients++;
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '2977:2991');
                        return runtime;
                    } else {
                        __$coverCall('src/javascript/runtime/RuntimeClient.js', '3078:3131');
                        throw new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR);
                    }
                }
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '3232:3301');
                initialize((options.runtime_order || Runtime.order).split(/\s*,\s*/));
            },
            disconnectRuntime: function () {
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '3503:3572');
                if (runtime && --runtime.clients <= 0) {
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '3549:3566');
                    runtime.destroy();
                }
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '3662:3676');
                runtime = null;
            },
            getRuntime: function () {
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '3885:3940');
                if (runtime && runtime.uid) {
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '3920:3934');
                    return runtime;
                }
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '3946:3967');
                return runtime = null;
            },
            exec: function () {
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '4224:4292');
                if (runtime) {
                    __$coverCall('src/javascript/runtime/RuntimeClient.js', '4244:4286');
                    return runtime.exec.apply(this, arguments);
                }
                __$coverCall('src/javascript/runtime/RuntimeClient.js', '4298:4309');
                return null;
            }
        });
    };
});

// Included from: src/javascript/file/FileInput.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/file/FileInput.js", "/**\n * FileInput.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/file/FileInput', [\n\t'moxie/core/utils/Basic',\n\t'moxie/core/utils/Env',\n\t'moxie/core/utils/Mime',\n\t'moxie/core/utils/Dom',\n\t'moxie/core/Exceptions',\n\t'moxie/core/EventTarget',\n\t'moxie/core/I18n',\n\t'moxie/runtime/Runtime',\n\t'moxie/runtime/RuntimeClient'\n], function(Basic, Env, Mime, Dom, x, EventTarget, I18n, Runtime, RuntimeClient) {\n\t/**\n\tProvides a convenient way to create cross-browser file-picker. Generates file selection dialog on click,\n\tconverts selected files to _File_ objects, to be used in conjunction with _Image_, preloaded in memory\n\twith _FileReader_ or uploaded to a server through _XMLHttpRequest_.\n\n\t@class FileInput\n\t@constructor\n\t@extends EventTarget\n\t@uses RuntimeClient\n\t@param {Object|String|DOMElement} options If options is string or node, argument is considered as _browse\\_button_.\n\t\t@param {String|DOMElement} options.browse_button DOM Element to turn into file picker.\n\t\t@param {Array} [options.accept] Array of mime types to accept. By default accepts all.\n\t\t@param {String} [options.file='file'] Name of the file field (not the filename).\n\t\t@param {Boolean} [options.multiple=false] Enable selection of multiple files.\n\t\t@param {Boolean} [options.directory=false] Turn file input into the folder input (cannot be both at the same time).\n\t\t@param {String|DOMElement} [options.container] DOM Element to use as a container for file-picker. Defaults to parentNode \n\t\tfor _browse\\_button_.\n\t\t@param {Object|String} [options.required_caps] Set of required capabilities, that chosen runtime must support.\n\n\t@example\n\t\t<div id=\"container\">\n\t\t\t<a id=\"file-picker\" href=\"javascript:;\">Browse...</a>\n\t\t</div>\n\n\t\t<script>\n\t\t\tvar fileInput = new mOxie.FileInput({\n\t\t\t\tbrowse_button: 'file-picker', // or document.getElementById('file-picker')\n\t\t\t\tcontainer: 'container',\n\t\t\t\taccept: [\n\t\t\t\t\t{title: \"Image files\", extensions: \"jpg,gif,png\"} // accept only images\n\t\t\t\t],\n\t\t\t\tmultiple: true // allow multiple file selection\n\t\t\t});\n\n\t\t\tfileInput.onchange = function(e) {\n\t\t\t\t// do something to files array\n\t\t\t\tconsole.info(e.target.files); // or this.files or fileInput.files\n\t\t\t};\n\n\t\t\tfileInput.init(); // initialize\n\t\t</script>\n\t*/\n\tvar dispatches = [\n\t\t/**\n\t\tDispatched when runtime is connected and file-picker is ready to be used.\n\n\t\t@event ready\n\t\t@param {Object} event\n\t\t*/\n\t\t'ready',\n\n\t\t/**\n\t\tDispatched right after [ready](#event_ready) event, and whenever [refresh()](#method_refresh) is invoked. \n\t\tCheck [corresponding documentation entry](#method_refresh) for more info.\n\n\t\t@event refresh\n\t\t@param {Object} event\n\t\t*/\n\n\t\t/**\n\t\tDispatched when selection of files in the dialog is complete.\n\n\t\t@event change\n\t\t@param {Object} event\n\t\t*/\n\t\t'change',\n\n\t\t'cancel', // TODO: might be useful\n\n\t\t/**\n\t\tDispatched when mouse cursor enters file-picker area. Can be used to style element\n\t\taccordingly.\n\n\t\t@event mouseenter\n\t\t@param {Object} event\n\t\t*/\n\t\t'mouseenter',\n\n\t\t/**\n\t\tDispatched when mouse cursor leaves file-picker area. Can be used to style element\n\t\taccordingly.\n\n\t\t@event mouseleave\n\t\t@param {Object} event\n\t\t*/\n\t\t'mouseleave',\n\n\t\t/**\n\t\tDispatched when functional mouse button is pressed on top of file-picker area.\n\n\t\t@event mousedown\n\t\t@param {Object} event\n\t\t*/\n\t\t'mousedown',\n\n\t\t/**\n\t\tDispatched when functional mouse button is released on top of file-picker area.\n\n\t\t@event mouseup\n\t\t@param {Object} event\n\t\t*/\n\t\t'mouseup'\n\t];\n\n\tfunction FileInput(options) {\n\t\tif (MXI_DEBUG) {\n\t\t\tEnv.log(\"Instantiating FileInput...\");\t\n\t\t}\n\n\t\tvar self = this,\n\t\t\tcontainer, browseButton, defaults;\n\n\t\t// if flat argument passed it should be browse_button id\n\t\tif (Basic.inArray(Basic.typeOf(options), ['string', 'node']) !== -1) {\n\t\t\toptions = { browse_button : options };\n\t\t}\n\n\t\t// this will help us to find proper default container\n\t\tbrowseButton = Dom.get(options.browse_button);\n\t\tif (!browseButton) {\n\t\t\t// browse button is required\n\t\t\tthrow new x.DOMException(x.DOMException.NOT_FOUND_ERR);\n\t\t}\n\n\t\t// figure out the options\n\t\tdefaults = {\n\t\t\taccept: [{\n\t\t\t\ttitle: I18n.translate('All Files'),\n\t\t\t\textensions: '*'\n\t\t\t}],\n\t\t\tname: 'file',\n\t\t\tmultiple: false,\n\t\t\trequired_caps: false,\n\t\t\tcontainer: browseButton.parentNode || document.body\n\t\t};\n\t\t\n\t\toptions = Basic.extend({}, defaults, options);\n\n\t\t// convert to object representation\n\t\tif (typeof(options.required_caps) === 'string') {\n\t\t\toptions.required_caps = Runtime.parseCaps(options.required_caps);\n\t\t}\n\t\t\t\t\t\n\t\t// normalize accept option (could be list of mime types or array of title/extensions pairs)\n\t\tif (typeof(options.accept) === 'string') {\n\t\t\toptions.accept = Mime.mimes2extList(options.accept);\n\t\t}\n\n\t\tcontainer = Dom.get(options.container);\n\t\t// make sure we have container\n\t\tif (!container) {\n\t\t\tcontainer = document.body;\n\t\t}\n\n\t\t// make container relative, if it's not\n\t\tif (Dom.getStyle(container, 'position') === 'static') {\n\t\t\tcontainer.style.position = 'relative';\n\t\t}\n\n\t\tcontainer = browseButton = null; // IE\n\t\t\t\t\t\t\n\t\tRuntimeClient.call(self);\n\t\t\n\t\tBasic.extend(self, {\n\t\t\t/**\n\t\t\tUnique id of the component\n\n\t\t\t@property uid\n\t\t\t@protected\n\t\t\t@readOnly\n\t\t\t@type {String}\n\t\t\t@default UID\n\t\t\t*/\n\t\t\tuid: Basic.guid('uid_'),\n\t\t\t\n\t\t\t/**\n\t\t\tUnique id of the connected runtime, if any.\n\n\t\t\t@property ruid\n\t\t\t@protected\n\t\t\t@type {String}\n\t\t\t*/\n\t\t\truid: null,\n\n\t\t\t/**\n\t\t\tUnique id of the runtime container. Useful to get hold of it for various manipulations.\n\n\t\t\t@property shimid\n\t\t\t@protected\n\t\t\t@type {String}\n\t\t\t*/\n\t\t\tshimid: null,\n\t\t\t\n\t\t\t/**\n\t\t\tArray of selected mOxie.File objects\n\n\t\t\t@property files\n\t\t\t@type {Array}\n\t\t\t@default null\n\t\t\t*/\n\t\t\tfiles: null,\n\n\t\t\t/**\n\t\t\tInitializes the file-picker, connects it to runtime and dispatches event ready when done.\n\n\t\t\t@method init\n\t\t\t*/\n\t\t\tinit: function() {\n\t\t\t\tself.bind('RuntimeInit', function(e, runtime) {\n\t\t\t\t\tself.ruid = runtime.uid;\n\t\t\t\t\tself.shimid = runtime.shimid;\n\n\t\t\t\t\tself.bind(\"Ready\", function() {\n\t\t\t\t\t\tself.trigger(\"Refresh\");\n\t\t\t\t\t}, 999);\n\n\t\t\t\t\t// re-position and resize shim container\n\t\t\t\t\tself.bind('Refresh', function() {\n\t\t\t\t\t\tvar pos, size, browseButton, shimContainer;\n\t\t\t\t\t\t\n\t\t\t\t\t\tbrowseButton = Dom.get(options.browse_button);\n\t\t\t\t\t\tshimContainer = Dom.get(runtime.shimid); // do not use runtime.getShimContainer(), since it will create container if it doesn't exist\n\n\t\t\t\t\t\tif (browseButton) {\n\t\t\t\t\t\t\tpos = Dom.getPos(browseButton, Dom.get(options.container));\n\t\t\t\t\t\t\tsize = Dom.getSize(browseButton);\n\n\t\t\t\t\t\t\tif (shimContainer) {\n\t\t\t\t\t\t\t\tBasic.extend(shimContainer.style, {\n\t\t\t\t\t\t\t\t\ttop     : pos.y + 'px',\n\t\t\t\t\t\t\t\t\tleft    : pos.x + 'px',\n\t\t\t\t\t\t\t\t\twidth   : size.w + 'px',\n\t\t\t\t\t\t\t\t\theight  : size.h + 'px'\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tshimContainer = browseButton = null;\n\t\t\t\t\t});\n\t\t\t\t\t\n\t\t\t\t\truntime.exec.call(self, 'FileInput', 'init', options);\n\t\t\t\t});\n\n\t\t\t\t// runtime needs: options.required_features, options.runtime_order and options.container\n\t\t\t\tself.connectRuntime(Basic.extend({}, options, {\n\t\t\t\t\trequired_caps: {\n\t\t\t\t\t\tselect_file: true\n\t\t\t\t\t}\n\t\t\t\t}));\n\t\t\t},\n\n\t\t\t/**\n\t\t\tDisables file-picker element, so that it doesn't react to mouse clicks.\n\n\t\t\t@method disable\n\t\t\t@param {Boolean} [state=true] Disable component if - true, enable if - false\n\t\t\t*/\n\t\t\tdisable: function(state) {\n\t\t\t\tvar runtime = this.getRuntime();\n\t\t\t\tif (runtime) {\n\t\t\t\t\truntime.exec.call(this, 'FileInput', 'disable', Basic.typeOf(state) === 'undefined' ? true : state);\n\t\t\t\t}\n\t\t\t},\n\n\n\t\t\t/**\n\t\t\tReposition and resize dialog trigger to match the position and size of browse_button element.\n\n\t\t\t@method refresh\n\t\t\t*/\n\t\t\trefresh: function() {\n\t\t\t\tself.trigger(\"Refresh\");\n\t\t\t},\n\n\n\t\t\t/**\n\t\t\tDestroy component.\n\n\t\t\t@method destroy\n\t\t\t*/\n\t\t\tdestroy: function() {\n\t\t\t\tvar runtime = this.getRuntime();\n\t\t\t\tif (runtime) {\n\t\t\t\t\truntime.exec.call(this, 'FileInput', 'destroy');\n\t\t\t\t\tthis.disconnectRuntime();\n\t\t\t\t}\n\n\t\t\t\tif (Basic.typeOf(this.files) === 'array') {\n\t\t\t\t\t// no sense in leaving associated files behind\n\t\t\t\t\tBasic.each(this.files, function(file) {\n\t\t\t\t\t\tfile.destroy();\n\t\t\t\t\t});\n\t\t\t\t} \n\t\t\t\tthis.files = null;\n\n\t\t\t\tthis.unbindAll();\n\t\t\t}\n\t\t});\n\n\t\tthis.handleEventProps(dispatches);\n\t}\n\n\tFileInput.prototype = EventTarget.instance;\n\n\treturn FileInput;\n});\n");
__$coverInitRange("src/javascript/file/FileInput.js", "200:8324");
__$coverInitRange("src/javascript/file/FileInput.js", "2366:3577");
__$coverInitRange("src/javascript/file/FileInput.js", "3581:8254");
__$coverInitRange("src/javascript/file/FileInput.js", "8258:8300");
__$coverInitRange("src/javascript/file/FileInput.js", "8304:8320");
__$coverInitRange("src/javascript/file/FileInput.js", "3613:3675");
__$coverInitRange("src/javascript/file/FileInput.js", "3680:3733");
__$coverInitRange("src/javascript/file/FileInput.js", "3797:3912");
__$coverInitRange("src/javascript/file/FileInput.js", "3973:4018");
__$coverInitRange("src/javascript/file/FileInput.js", "4022:4136");
__$coverInitRange("src/javascript/file/FileInput.js", "4169:4383");
__$coverInitRange("src/javascript/file/FileInput.js", "4390:4435");
__$coverInitRange("src/javascript/file/FileInput.js", "4478:4599");
__$coverInitRange("src/javascript/file/FileInput.js", "4703:4804");
__$coverInitRange("src/javascript/file/FileInput.js", "4809:4847");
__$coverInitRange("src/javascript/file/FileInput.js", "4884:4934");
__$coverInitRange("src/javascript/file/FileInput.js", "4981:5081");
__$coverInitRange("src/javascript/file/FileInput.js", "5086:5117");
__$coverInitRange("src/javascript/file/FileInput.js", "5134:5158");
__$coverInitRange("src/javascript/file/FileInput.js", "5165:8213");
__$coverInitRange("src/javascript/file/FileInput.js", "8218:8251");
__$coverInitRange("src/javascript/file/FileInput.js", "3633:3670");
__$coverInitRange("src/javascript/file/FileInput.js", "3871:3908");
__$coverInitRange("src/javascript/file/FileInput.js", "4078:4132");
__$coverInitRange("src/javascript/file/FileInput.js", "4531:4595");
__$coverInitRange("src/javascript/file/FileInput.js", "4749:4800");
__$coverInitRange("src/javascript/file/FileInput.js", "4905:4930");
__$coverInitRange("src/javascript/file/FileInput.js", "5040:5077");
__$coverInitRange("src/javascript/file/FileInput.js", "5918:6944");
__$coverInitRange("src/javascript/file/FileInput.js", "7044:7152");
__$coverInitRange("src/javascript/file/FileInput.js", "5971:5994");
__$coverInitRange("src/javascript/file/FileInput.js", "6001:6029");
__$coverInitRange("src/javascript/file/FileInput.js", "6037:6112");
__$coverInitRange("src/javascript/file/FileInput.js", "6166:6870");
__$coverInitRange("src/javascript/file/FileInput.js", "6883:6936");
__$coverInitRange("src/javascript/file/FileInput.js", "6075:6098");
__$coverInitRange("src/javascript/file/FileInput.js", "6206:6248");
__$coverInitRange("src/javascript/file/FileInput.js", "6263:6308");
__$coverInitRange("src/javascript/file/FileInput.js", "6316:6355");
__$coverInitRange("src/javascript/file/FileInput.js", "6457:6818");
__$coverInitRange("src/javascript/file/FileInput.js", "6826:6861");
__$coverInitRange("src/javascript/file/FileInput.js", "6484:6542");
__$coverInitRange("src/javascript/file/FileInput.js", "6551:6583");
__$coverInitRange("src/javascript/file/FileInput.js", "6593:6810");
__$coverInitRange("src/javascript/file/FileInput.js", "6622:6801");
__$coverInitRange("src/javascript/file/FileInput.js", "7383:7414");
__$coverInitRange("src/javascript/file/FileInput.js", "7420:7545");
__$coverInitRange("src/javascript/file/FileInput.js", "7440:7539");
__$coverInitRange("src/javascript/file/FileInput.js", "7714:7737");
__$coverInitRange("src/javascript/file/FileInput.js", "7831:7862");
__$coverInitRange("src/javascript/file/FileInput.js", "7868:7972");
__$coverInitRange("src/javascript/file/FileInput.js", "7979:8155");
__$coverInitRange("src/javascript/file/FileInput.js", "8162:8179");
__$coverInitRange("src/javascript/file/FileInput.js", "8186:8202");
__$coverInitRange("src/javascript/file/FileInput.js", "7888:7935");
__$coverInitRange("src/javascript/file/FileInput.js", "7942:7966");
__$coverInitRange("src/javascript/file/FileInput.js", "8080:8149");
__$coverInitRange("src/javascript/file/FileInput.js", "8126:8140");
__$coverCall('src/javascript/file/FileInput.js', '200:8324');
define('moxie/file/FileInput', [
    'moxie/core/utils/Basic',
    'moxie/core/utils/Env',
    'moxie/core/utils/Mime',
    'moxie/core/utils/Dom',
    'moxie/core/Exceptions',
    'moxie/core/EventTarget',
    'moxie/core/I18n',
    'moxie/runtime/Runtime',
    'moxie/runtime/RuntimeClient'
], function (Basic, Env, Mime, Dom, x, EventTarget, I18n, Runtime, RuntimeClient) {
    __$coverCall('src/javascript/file/FileInput.js', '2366:3577');
    var dispatches = [
            'ready',
            'change',
            'cancel',
            'mouseenter',
            'mouseleave',
            'mousedown',
            'mouseup'
        ];
    __$coverCall('src/javascript/file/FileInput.js', '3581:8254');
    function FileInput(options) {
        __$coverCall('src/javascript/file/FileInput.js', '3613:3675');
        if (MXI_DEBUG) {
            __$coverCall('src/javascript/file/FileInput.js', '3633:3670');
            Env.log('Instantiating FileInput...');
        }
        __$coverCall('src/javascript/file/FileInput.js', '3680:3733');
        var self = this, container, browseButton, defaults;
        __$coverCall('src/javascript/file/FileInput.js', '3797:3912');
        if (Basic.inArray(Basic.typeOf(options), [
                'string',
                'node'
            ]) !== -1) {
            __$coverCall('src/javascript/file/FileInput.js', '3871:3908');
            options = { browse_button: options };
        }
        __$coverCall('src/javascript/file/FileInput.js', '3973:4018');
        browseButton = Dom.get(options.browse_button);
        __$coverCall('src/javascript/file/FileInput.js', '4022:4136');
        if (!browseButton) {
            __$coverCall('src/javascript/file/FileInput.js', '4078:4132');
            throw new x.DOMException(x.DOMException.NOT_FOUND_ERR);
        }
        __$coverCall('src/javascript/file/FileInput.js', '4169:4383');
        defaults = {
            accept: [{
                    title: I18n.translate('All Files'),
                    extensions: '*'
                }],
            name: 'file',
            multiple: false,
            required_caps: false,
            container: browseButton.parentNode || document.body
        };
        __$coverCall('src/javascript/file/FileInput.js', '4390:4435');
        options = Basic.extend({}, defaults, options);
        __$coverCall('src/javascript/file/FileInput.js', '4478:4599');
        if (typeof options.required_caps === 'string') {
            __$coverCall('src/javascript/file/FileInput.js', '4531:4595');
            options.required_caps = Runtime.parseCaps(options.required_caps);
        }
        __$coverCall('src/javascript/file/FileInput.js', '4703:4804');
        if (typeof options.accept === 'string') {
            __$coverCall('src/javascript/file/FileInput.js', '4749:4800');
            options.accept = Mime.mimes2extList(options.accept);
        }
        __$coverCall('src/javascript/file/FileInput.js', '4809:4847');
        container = Dom.get(options.container);
        __$coverCall('src/javascript/file/FileInput.js', '4884:4934');
        if (!container) {
            __$coverCall('src/javascript/file/FileInput.js', '4905:4930');
            container = document.body;
        }
        __$coverCall('src/javascript/file/FileInput.js', '4981:5081');
        if (Dom.getStyle(container, 'position') === 'static') {
            __$coverCall('src/javascript/file/FileInput.js', '5040:5077');
            container.style.position = 'relative';
        }
        __$coverCall('src/javascript/file/FileInput.js', '5086:5117');
        container = browseButton = null;
        __$coverCall('src/javascript/file/FileInput.js', '5134:5158');
        RuntimeClient.call(self);
        __$coverCall('src/javascript/file/FileInput.js', '5165:8213');
        Basic.extend(self, {
            uid: Basic.guid('uid_'),
            ruid: null,
            shimid: null,
            files: null,
            init: function () {
                __$coverCall('src/javascript/file/FileInput.js', '5918:6944');
                self.bind('RuntimeInit', function (e, runtime) {
                    __$coverCall('src/javascript/file/FileInput.js', '5971:5994');
                    self.ruid = runtime.uid;
                    __$coverCall('src/javascript/file/FileInput.js', '6001:6029');
                    self.shimid = runtime.shimid;
                    __$coverCall('src/javascript/file/FileInput.js', '6037:6112');
                    self.bind('Ready', function () {
                        __$coverCall('src/javascript/file/FileInput.js', '6075:6098');
                        self.trigger('Refresh');
                    }, 999);
                    __$coverCall('src/javascript/file/FileInput.js', '6166:6870');
                    self.bind('Refresh', function () {
                        __$coverCall('src/javascript/file/FileInput.js', '6206:6248');
                        var pos, size, browseButton, shimContainer;
                        __$coverCall('src/javascript/file/FileInput.js', '6263:6308');
                        browseButton = Dom.get(options.browse_button);
                        __$coverCall('src/javascript/file/FileInput.js', '6316:6355');
                        shimContainer = Dom.get(runtime.shimid);
                        __$coverCall('src/javascript/file/FileInput.js', '6457:6818');
                        if (browseButton) {
                            __$coverCall('src/javascript/file/FileInput.js', '6484:6542');
                            pos = Dom.getPos(browseButton, Dom.get(options.container));
                            __$coverCall('src/javascript/file/FileInput.js', '6551:6583');
                            size = Dom.getSize(browseButton);
                            __$coverCall('src/javascript/file/FileInput.js', '6593:6810');
                            if (shimContainer) {
                                __$coverCall('src/javascript/file/FileInput.js', '6622:6801');
                                Basic.extend(shimContainer.style, {
                                    top: pos.y + 'px',
                                    left: pos.x + 'px',
                                    width: size.w + 'px',
                                    height: size.h + 'px'
                                });
                            }
                        }
                        __$coverCall('src/javascript/file/FileInput.js', '6826:6861');
                        shimContainer = browseButton = null;
                    });
                    __$coverCall('src/javascript/file/FileInput.js', '6883:6936');
                    runtime.exec.call(self, 'FileInput', 'init', options);
                });
                __$coverCall('src/javascript/file/FileInput.js', '7044:7152');
                self.connectRuntime(Basic.extend({}, options, { required_caps: { select_file: true } }));
            },
            disable: function (state) {
                __$coverCall('src/javascript/file/FileInput.js', '7383:7414');
                var runtime = this.getRuntime();
                __$coverCall('src/javascript/file/FileInput.js', '7420:7545');
                if (runtime) {
                    __$coverCall('src/javascript/file/FileInput.js', '7440:7539');
                    runtime.exec.call(this, 'FileInput', 'disable', Basic.typeOf(state) === 'undefined' ? true : state);
                }
            },
            refresh: function () {
                __$coverCall('src/javascript/file/FileInput.js', '7714:7737');
                self.trigger('Refresh');
            },
            destroy: function () {
                __$coverCall('src/javascript/file/FileInput.js', '7831:7862');
                var runtime = this.getRuntime();
                __$coverCall('src/javascript/file/FileInput.js', '7868:7972');
                if (runtime) {
                    __$coverCall('src/javascript/file/FileInput.js', '7888:7935');
                    runtime.exec.call(this, 'FileInput', 'destroy');
                    __$coverCall('src/javascript/file/FileInput.js', '7942:7966');
                    this.disconnectRuntime();
                }
                __$coverCall('src/javascript/file/FileInput.js', '7979:8155');
                if (Basic.typeOf(this.files) === 'array') {
                    __$coverCall('src/javascript/file/FileInput.js', '8080:8149');
                    Basic.each(this.files, function (file) {
                        __$coverCall('src/javascript/file/FileInput.js', '8126:8140');
                        file.destroy();
                    });
                }
                __$coverCall('src/javascript/file/FileInput.js', '8162:8179');
                this.files = null;
                __$coverCall('src/javascript/file/FileInput.js', '8186:8202');
                this.unbindAll();
            }
        });
        __$coverCall('src/javascript/file/FileInput.js', '8218:8251');
        this.handleEventProps(dispatches);
    }
    __$coverCall('src/javascript/file/FileInput.js', '8258:8300');
    FileInput.prototype = EventTarget.instance;
    __$coverCall('src/javascript/file/FileInput.js', '8304:8320');
    return FileInput;
});

// Included from: src/javascript/core/utils/Encode.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/core/utils/Encode.js", "/**\n * Encode.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/core/utils/Encode', [], function() {\n\n\t/**\n\tEncode string with UTF-8\n\n\t@method utf8_encode\n\t@for Utils\n\t@static\n\t@param {String} str String to encode\n\t@return {String} UTF-8 encoded string\n\t*/\n\tvar utf8_encode = function(str) {\n\t\treturn unescape(encodeURIComponent(str));\n\t};\n\t\n\t/**\n\tDecode UTF-8 encoded string\n\n\t@method utf8_decode\n\t@static\n\t@param {String} str String to decode\n\t@return {String} Decoded string\n\t*/\n\tvar utf8_decode = function(str_data) {\n\t\treturn decodeURIComponent(escape(str_data));\n\t};\n\t\n\t/**\n\tDecode Base64 encoded string (uses browser's default method if available),\n\tfrom: https://raw.github.com/kvz/phpjs/master/functions/url/base64_decode.js\n\n\t@method atob\n\t@static\n\t@param {String} data String to decode\n\t@return {String} Decoded string\n\t*/\n\tvar atob = function(data, utf8) {\n\t\tif (typeof(window.atob) === 'function') {\n\t\t\treturn utf8 ? utf8_decode(window.atob(data)) : window.atob(data);\n\t\t}\n\n\t\t// http://kevin.vanzonneveld.net\n\t\t// +   original by: Tyler Akins (http://rumkin.com)\n\t\t// +   improved by: Thunder.m\n\t\t// +      input by: Aman Gupta\n\t\t// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n\t\t// +   bugfixed by: Onno Marsman\n\t\t// +   bugfixed by: Pellentesque Malesuada\n\t\t// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n\t\t// +      input by: Brett Zamir (http://brett-zamir.me)\n\t\t// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n\t\t// *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');\n\t\t// *     returns 1: 'Kevin van Zonneveld'\n\t\t// mozilla has this native\n\t\t// - but breaks in 2.0.0.12!\n\t\t//if (typeof this.window.atob == 'function') {\n\t\t//    return atob(data);\n\t\t//}\n\t\tvar b64 = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\";\n\t\tvar o1, o2, o3, h1, h2, h3, h4, bits, i = 0,\n\t\t\tac = 0,\n\t\t\tdec = \"\",\n\t\t\ttmp_arr = [];\n\n\t\tif (!data) {\n\t\t\treturn data;\n\t\t}\n\n\t\tdata += '';\n\n\t\tdo { // unpack four hexets into three octets using index points in b64\n\t\t\th1 = b64.indexOf(data.charAt(i++));\n\t\t\th2 = b64.indexOf(data.charAt(i++));\n\t\t\th3 = b64.indexOf(data.charAt(i++));\n\t\t\th4 = b64.indexOf(data.charAt(i++));\n\n\t\t\tbits = h1 << 18 | h2 << 12 | h3 << 6 | h4;\n\n\t\t\to1 = bits >> 16 & 0xff;\n\t\t\to2 = bits >> 8 & 0xff;\n\t\t\to3 = bits & 0xff;\n\n\t\t\tif (h3 == 64) {\n\t\t\t\ttmp_arr[ac++] = String.fromCharCode(o1);\n\t\t\t} else if (h4 == 64) {\n\t\t\t\ttmp_arr[ac++] = String.fromCharCode(o1, o2);\n\t\t\t} else {\n\t\t\t\ttmp_arr[ac++] = String.fromCharCode(o1, o2, o3);\n\t\t\t}\n\t\t} while (i < data.length);\n\n\t\tdec = tmp_arr.join('');\n\n\t\treturn utf8 ? utf8_decode(dec) : dec;\n\t};\n\t\n\t/**\n\tBase64 encode string (uses browser's default method if available),\n\tfrom: https://raw.github.com/kvz/phpjs/master/functions/url/base64_encode.js\n\n\t@method btoa\n\t@static\n\t@param {String} data String to encode\n\t@return {String} Base64 encoded string\n\t*/\n\tvar btoa = function(data, utf8) {\n\t\tif (utf8) {\n\t\t\tdata = utf8_encode(data);\n\t\t}\n\n\t\tif (typeof(window.btoa) === 'function') {\n\t\t\treturn window.btoa(data);\n\t\t}\n\n\t\t// http://kevin.vanzonneveld.net\n\t\t// +   original by: Tyler Akins (http://rumkin.com)\n\t\t// +   improved by: Bayron Guevara\n\t\t// +   improved by: Thunder.m\n\t\t// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n\t\t// +   bugfixed by: Pellentesque Malesuada\n\t\t// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n\t\t// +   improved by: Rafał Kukawski (http://kukawski.pl)\n\t\t// *     example 1: base64_encode('Kevin van Zonneveld');\n\t\t// *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='\n\t\t// mozilla has this native\n\t\t// - but breaks in 2.0.0.12!\n\t\tvar b64 = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\";\n\t\tvar o1, o2, o3, h1, h2, h3, h4, bits, i = 0,\n\t\t\tac = 0,\n\t\t\tenc = \"\",\n\t\t\ttmp_arr = [];\n\n\t\tif (!data) {\n\t\t\treturn data;\n\t\t}\n\n\t\tdo { // pack three octets into four hexets\n\t\t\to1 = data.charCodeAt(i++);\n\t\t\to2 = data.charCodeAt(i++);\n\t\t\to3 = data.charCodeAt(i++);\n\n\t\t\tbits = o1 << 16 | o2 << 8 | o3;\n\n\t\t\th1 = bits >> 18 & 0x3f;\n\t\t\th2 = bits >> 12 & 0x3f;\n\t\t\th3 = bits >> 6 & 0x3f;\n\t\t\th4 = bits & 0x3f;\n\n\t\t\t// use hexets to index into b64, and append result to encoded string\n\t\t\ttmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);\n\t\t} while (i < data.length);\n\n\t\tenc = tmp_arr.join('');\n\n\t\tvar r = data.length % 3;\n\n\t\treturn (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);\n\t};\n\n\n\treturn {\n\t\tutf8_encode: utf8_encode,\n\t\tutf8_decode: utf8_decode,\n\t\tatob: atob,\n\t\tbtoa: btoa\n\t};\n});\n");
__$coverInitRange("src/javascript/core/utils/Encode.js", "197:4681");
__$coverInitRange("src/javascript/core/utils/Encode.js", "405:485");
__$coverInitRange("src/javascript/core/utils/Encode.js", "630:718");
__$coverInitRange("src/javascript/core/utils/Encode.js", "982:2784");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3047:4578");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4583:4677");
__$coverInitRange("src/javascript/core/utils/Encode.js", "441:481");
__$coverInitRange("src/javascript/core/utils/Encode.js", "671:714");
__$coverInitRange("src/javascript/core/utils/Encode.js", "1018:1131");
__$coverInitRange("src/javascript/core/utils/Encode.js", "1905:1982");
__$coverInitRange("src/javascript/core/utils/Encode.js", "1986:2070");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2075:2106");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2111:2121");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2126:2712");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2717:2739");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2744:2780");
__$coverInitRange("src/javascript/core/utils/Encode.js", "1063:1127");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2091:2102");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2200:2234");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2239:2273");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2278:2312");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2317:2351");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2357:2398");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2404:2426");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2431:2452");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2457:2473");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2479:2683");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2499:2538");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2570:2613");
__$coverInitRange("src/javascript/core/utils/Encode.js", "2631:2678");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3083:3126");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3131:3204");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3791:3868");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3872:3956");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3961:3992");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3997:4454");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4459:4481");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4486:4509");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4514:4574");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3098:3122");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3176:3200");
__$coverInitRange("src/javascript/core/utils/Encode.js", "3977:3988");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4043:4068");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4073:4098");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4103:4128");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4134:4164");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4170:4192");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4197:4219");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4224:4245");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4250:4266");
__$coverInitRange("src/javascript/core/utils/Encode.js", "4344:4425");
__$coverCall('src/javascript/core/utils/Encode.js', '197:4681');
define('moxie/core/utils/Encode', [], function () {
    __$coverCall('src/javascript/core/utils/Encode.js', '405:485');
    var utf8_encode = function (str) {
        __$coverCall('src/javascript/core/utils/Encode.js', '441:481');
        return unescape(encodeURIComponent(str));
    };
    __$coverCall('src/javascript/core/utils/Encode.js', '630:718');
    var utf8_decode = function (str_data) {
        __$coverCall('src/javascript/core/utils/Encode.js', '671:714');
        return decodeURIComponent(escape(str_data));
    };
    __$coverCall('src/javascript/core/utils/Encode.js', '982:2784');
    var atob = function (data, utf8) {
        __$coverCall('src/javascript/core/utils/Encode.js', '1018:1131');
        if (typeof window.atob === 'function') {
            __$coverCall('src/javascript/core/utils/Encode.js', '1063:1127');
            return utf8 ? utf8_decode(window.atob(data)) : window.atob(data);
        }
        __$coverCall('src/javascript/core/utils/Encode.js', '1905:1982');
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        __$coverCall('src/javascript/core/utils/Encode.js', '1986:2070');
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = '', tmp_arr = [];
        __$coverCall('src/javascript/core/utils/Encode.js', '2075:2106');
        if (!data) {
            __$coverCall('src/javascript/core/utils/Encode.js', '2091:2102');
            return data;
        }
        __$coverCall('src/javascript/core/utils/Encode.js', '2111:2121');
        data += '';
        __$coverCall('src/javascript/core/utils/Encode.js', '2126:2712');
        do {
            __$coverCall('src/javascript/core/utils/Encode.js', '2200:2234');
            h1 = b64.indexOf(data.charAt(i++));
            __$coverCall('src/javascript/core/utils/Encode.js', '2239:2273');
            h2 = b64.indexOf(data.charAt(i++));
            __$coverCall('src/javascript/core/utils/Encode.js', '2278:2312');
            h3 = b64.indexOf(data.charAt(i++));
            __$coverCall('src/javascript/core/utils/Encode.js', '2317:2351');
            h4 = b64.indexOf(data.charAt(i++));
            __$coverCall('src/javascript/core/utils/Encode.js', '2357:2398');
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            __$coverCall('src/javascript/core/utils/Encode.js', '2404:2426');
            o1 = bits >> 16 & 255;
            __$coverCall('src/javascript/core/utils/Encode.js', '2431:2452');
            o2 = bits >> 8 & 255;
            __$coverCall('src/javascript/core/utils/Encode.js', '2457:2473');
            o3 = bits & 255;
            __$coverCall('src/javascript/core/utils/Encode.js', '2479:2683');
            if (h3 == 64) {
                __$coverCall('src/javascript/core/utils/Encode.js', '2499:2538');
                tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
                __$coverCall('src/javascript/core/utils/Encode.js', '2570:2613');
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
                __$coverCall('src/javascript/core/utils/Encode.js', '2631:2678');
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);
        __$coverCall('src/javascript/core/utils/Encode.js', '2717:2739');
        dec = tmp_arr.join('');
        __$coverCall('src/javascript/core/utils/Encode.js', '2744:2780');
        return utf8 ? utf8_decode(dec) : dec;
    };
    __$coverCall('src/javascript/core/utils/Encode.js', '3047:4578');
    var btoa = function (data, utf8) {
        __$coverCall('src/javascript/core/utils/Encode.js', '3083:3126');
        if (utf8) {
            __$coverCall('src/javascript/core/utils/Encode.js', '3098:3122');
            data = utf8_encode(data);
        }
        __$coverCall('src/javascript/core/utils/Encode.js', '3131:3204');
        if (typeof window.btoa === 'function') {
            __$coverCall('src/javascript/core/utils/Encode.js', '3176:3200');
            return window.btoa(data);
        }
        __$coverCall('src/javascript/core/utils/Encode.js', '3791:3868');
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        __$coverCall('src/javascript/core/utils/Encode.js', '3872:3956');
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = '', tmp_arr = [];
        __$coverCall('src/javascript/core/utils/Encode.js', '3961:3992');
        if (!data) {
            __$coverCall('src/javascript/core/utils/Encode.js', '3977:3988');
            return data;
        }
        __$coverCall('src/javascript/core/utils/Encode.js', '3997:4454');
        do {
            __$coverCall('src/javascript/core/utils/Encode.js', '4043:4068');
            o1 = data.charCodeAt(i++);
            __$coverCall('src/javascript/core/utils/Encode.js', '4073:4098');
            o2 = data.charCodeAt(i++);
            __$coverCall('src/javascript/core/utils/Encode.js', '4103:4128');
            o3 = data.charCodeAt(i++);
            __$coverCall('src/javascript/core/utils/Encode.js', '4134:4164');
            bits = o1 << 16 | o2 << 8 | o3;
            __$coverCall('src/javascript/core/utils/Encode.js', '4170:4192');
            h1 = bits >> 18 & 63;
            __$coverCall('src/javascript/core/utils/Encode.js', '4197:4219');
            h2 = bits >> 12 & 63;
            __$coverCall('src/javascript/core/utils/Encode.js', '4224:4245');
            h3 = bits >> 6 & 63;
            __$coverCall('src/javascript/core/utils/Encode.js', '4250:4266');
            h4 = bits & 63;
            __$coverCall('src/javascript/core/utils/Encode.js', '4344:4425');
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);
        __$coverCall('src/javascript/core/utils/Encode.js', '4459:4481');
        enc = tmp_arr.join('');
        __$coverCall('src/javascript/core/utils/Encode.js', '4486:4509');
        var r = data.length % 3;
        __$coverCall('src/javascript/core/utils/Encode.js', '4514:4574');
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    };
    __$coverCall('src/javascript/core/utils/Encode.js', '4583:4677');
    return {
        utf8_encode: utf8_encode,
        utf8_decode: utf8_decode,
        atob: atob,
        btoa: btoa
    };
});

// Included from: src/javascript/file/Blob.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/file/Blob.js", "/**\n * Blob.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/file/Blob', [\n\t'moxie/core/utils/Basic',\n\t'moxie/core/utils/Encode',\n\t'moxie/runtime/RuntimeClient'\n], function(Basic, Encode, RuntimeClient) {\n\t\n\tvar blobpool = {};\n\n\t/**\n\t@class Blob\n\t@constructor\n\t@param {String} ruid Unique id of the runtime, to which this blob belongs to\n\t@param {Object} blob Object \"Native\" blob object, as it is represented in the runtime\n\t*/\n\tfunction Blob(ruid, blob) {\n\n\t\tfunction _sliceDetached(start, end, type) {\n\t\t\tvar blob, data = blobpool[this.uid];\n\n\t\t\tif (Basic.typeOf(data) !== 'string' || !data.length) {\n\t\t\t\treturn null; // or throw exception\n\t\t\t}\n\n\t\t\tblob = new Blob(null, {\n\t\t\t\ttype: type,\n\t\t\t\tsize: end - start\n\t\t\t});\n\t\t\tblob.detach(data.substr(start, blob.size));\n\n\t\t\treturn blob;\n\t\t}\n\n\t\tRuntimeClient.call(this);\n\n\t\tif (ruid) {\t\n\t\t\tthis.connectRuntime(ruid);\n\t\t}\n\n\t\tif (!blob) {\n\t\t\tblob = {};\n\t\t} else if (Basic.typeOf(blob) === 'string') { // dataUrl or binary string\n\t\t\tblob = { data: blob };\n\t\t}\n\n\t\tBasic.extend(this, {\n\t\t\t\n\t\t\t/**\n\t\t\tUnique id of the component\n\n\t\t\t@property uid\n\t\t\t@type {String}\n\t\t\t*/\n\t\t\tuid: blob.uid || Basic.guid('uid_'),\n\t\t\t\n\t\t\t/**\n\t\t\tUnique id of the connected runtime, if falsy, then runtime will have to be initialized \n\t\t\tbefore this Blob can be used, modified or sent\n\n\t\t\t@property ruid\n\t\t\t@type {String}\n\t\t\t*/\n\t\t\truid: ruid,\n\t\n\t\t\t/**\n\t\t\tSize of blob\n\n\t\t\t@property size\n\t\t\t@type {Number}\n\t\t\t@default 0\n\t\t\t*/\n\t\t\tsize: blob.size || 0,\n\t\t\t\n\t\t\t/**\n\t\t\tMime type of blob\n\n\t\t\t@property type\n\t\t\t@type {String}\n\t\t\t@default ''\n\t\t\t*/\n\t\t\ttype: blob.type || '',\n\t\t\t\n\t\t\t/**\n\t\t\t@method slice\n\t\t\t@param {Number} [start=0]\n\t\t\t*/\n\t\t\tslice: function(start, end, type) {\t\t\n\t\t\t\tif (this.isDetached()) {\n\t\t\t\t\treturn _sliceDetached.apply(this, arguments);\n\t\t\t\t}\n\t\t\t\treturn this.getRuntime().exec.call(this, 'Blob', 'slice', this.getSource(), start, end, type);\n\t\t\t},\n\n\t\t\t/**\n\t\t\tReturns \"native\" blob object (as it is represented in connected runtime) or null if not found\n\n\t\t\t@method getSource\n\t\t\t@return {Blob} Returns \"native\" blob object or null if not found\n\t\t\t*/\n\t\t\tgetSource: function() {\n\t\t\t\tif (!blobpool[this.uid]) {\n\t\t\t\t\treturn null;\t\n\t\t\t\t}\n\t\t\t\treturn blobpool[this.uid];\n\t\t\t},\n\n\t\t\t/** \n\t\t\tDetaches blob from any runtime that it depends on and initialize with standalone value\n\n\t\t\t@method detach\n\t\t\t@protected\n\t\t\t@param {DOMString} [data=''] Standalone value\n\t\t\t*/\n\t\t\tdetach: function(data) {\n\t\t\t\tif (this.ruid) {\n\t\t\t\t\tthis.getRuntime().exec.call(this, 'Blob', 'destroy');\n\t\t\t\t\tthis.disconnectRuntime();\n\t\t\t\t\tthis.ruid = null;\n\t\t\t\t}\n\n\t\t\t\tdata = data || '';\n\n\t\t\t\t// if dataUrl, convert to binary string\n\t\t\t\tif (data.substr(0, 5) == 'data:') {\n\t\t\t\t\tvar base64Offset = data.indexOf(';base64,');\n\t\t\t\t\tthis.type = data.substring(5, base64Offset);\n\t\t\t\t\tdata = Encode.atob(data.substring(base64Offset + 8));\n\t\t\t\t}\n\n\t\t\t\tthis.size = data.length;\n\n\t\t\t\tblobpool[this.uid] = data;\n\t\t\t},\n\n\t\t\t/**\n\t\t\tChecks if blob is standalone (detached of any runtime)\n\t\t\t\n\t\t\t@method isDetached\n\t\t\t@protected\n\t\t\t@return {Boolean}\n\t\t\t*/\n\t\t\tisDetached: function() {\n\t\t\t\treturn !this.ruid && Basic.typeOf(blobpool[this.uid]) === 'string';\n\t\t\t},\n\t\t\t\n\t\t\t/** \n\t\t\tDestroy Blob and free any resources it was using\n\n\t\t\t@method destroy\n\t\t\t*/\n\t\t\tdestroy: function() {\n\t\t\t\tthis.detach();\n\t\t\t\tdelete blobpool[this.uid];\n\t\t\t}\n\t\t});\n\n\t\t\n\t\tif (blob.data) {\n\t\t\tthis.detach(blob.data); // auto-detach if payload has been passed\n\t\t} else {\n\t\t\tblobpool[this.uid] = blob;\t\n\t\t}\n\t}\n\t\n\treturn Blob;\n});");
__$coverInitRange("src/javascript/file/Blob.js", "195:3619");
__$coverInitRange("src/javascript/file/Blob.js", "356:373");
__$coverInitRange("src/javascript/file/Blob.js", "578:3599");
__$coverInitRange("src/javascript/file/Blob.js", "3604:3615");
__$coverInitRange("src/javascript/file/Blob.js", "609:935");
__$coverInitRange("src/javascript/file/Blob.js", "940:964");
__$coverInitRange("src/javascript/file/Blob.js", "969:1014");
__$coverInitRange("src/javascript/file/Blob.js", "1019:1150");
__$coverInitRange("src/javascript/file/Blob.js", "1155:3458");
__$coverInitRange("src/javascript/file/Blob.js", "3466:3596");
__$coverInitRange("src/javascript/file/Blob.js", "656:691");
__$coverInitRange("src/javascript/file/Blob.js", "697:794");
__$coverInitRange("src/javascript/file/Blob.js", "800:867");
__$coverInitRange("src/javascript/file/Blob.js", "872:914");
__$coverInitRange("src/javascript/file/Blob.js", "920:931");
__$coverInitRange("src/javascript/file/Blob.js", "756:767");
__$coverInitRange("src/javascript/file/Blob.js", "985:1010");
__$coverInitRange("src/javascript/file/Blob.js", "1035:1044");
__$coverInitRange("src/javascript/file/Blob.js", "1125:1146");
__$coverInitRange("src/javascript/file/Blob.js", "1840:1920");
__$coverInitRange("src/javascript/file/Blob.js", "1926:2019");
__$coverInitRange("src/javascript/file/Blob.js", "1870:1914");
__$coverInitRange("src/javascript/file/Blob.js", "2259:2309");
__$coverInitRange("src/javascript/file/Blob.js", "2315:2340");
__$coverInitRange("src/javascript/file/Blob.js", "2291:2302");
__$coverInitRange("src/javascript/file/Blob.js", "2567:2701");
__$coverInitRange("src/javascript/file/Blob.js", "2708:2725");
__$coverInitRange("src/javascript/file/Blob.js", "2776:2975");
__$coverInitRange("src/javascript/file/Blob.js", "2982:3005");
__$coverInitRange("src/javascript/file/Blob.js", "3012:3037");
__$coverInitRange("src/javascript/file/Blob.js", "2589:2641");
__$coverInitRange("src/javascript/file/Blob.js", "2648:2672");
__$coverInitRange("src/javascript/file/Blob.js", "2679:2695");
__$coverInitRange("src/javascript/file/Blob.js", "2817:2860");
__$coverInitRange("src/javascript/file/Blob.js", "2867:2910");
__$coverInitRange("src/javascript/file/Blob.js", "2917:2969");
__$coverInitRange("src/javascript/file/Blob.js", "3210:3276");
__$coverInitRange("src/javascript/file/Blob.js", "3403:3416");
__$coverInitRange("src/javascript/file/Blob.js", "3422:3447");
__$coverInitRange("src/javascript/file/Blob.js", "3486:3508");
__$coverInitRange("src/javascript/file/Blob.js", "3566:3591");
__$coverCall('src/javascript/file/Blob.js', '195:3619');
define('moxie/file/Blob', [
    'moxie/core/utils/Basic',
    'moxie/core/utils/Encode',
    'moxie/runtime/RuntimeClient'
], function (Basic, Encode, RuntimeClient) {
    __$coverCall('src/javascript/file/Blob.js', '356:373');
    var blobpool = {};
    __$coverCall('src/javascript/file/Blob.js', '578:3599');
    function Blob(ruid, blob) {
        __$coverCall('src/javascript/file/Blob.js', '609:935');
        function _sliceDetached(start, end, type) {
            __$coverCall('src/javascript/file/Blob.js', '656:691');
            var blob, data = blobpool[this.uid];
            __$coverCall('src/javascript/file/Blob.js', '697:794');
            if (Basic.typeOf(data) !== 'string' || !data.length) {
                __$coverCall('src/javascript/file/Blob.js', '756:767');
                return null;
            }
            __$coverCall('src/javascript/file/Blob.js', '800:867');
            blob = new Blob(null, {
                type: type,
                size: end - start
            });
            __$coverCall('src/javascript/file/Blob.js', '872:914');
            blob.detach(data.substr(start, blob.size));
            __$coverCall('src/javascript/file/Blob.js', '920:931');
            return blob;
        }
        __$coverCall('src/javascript/file/Blob.js', '940:964');
        RuntimeClient.call(this);
        __$coverCall('src/javascript/file/Blob.js', '969:1014');
        if (ruid) {
            __$coverCall('src/javascript/file/Blob.js', '985:1010');
            this.connectRuntime(ruid);
        }
        __$coverCall('src/javascript/file/Blob.js', '1019:1150');
        if (!blob) {
            __$coverCall('src/javascript/file/Blob.js', '1035:1044');
            blob = {};
        } else if (Basic.typeOf(blob) === 'string') {
            __$coverCall('src/javascript/file/Blob.js', '1125:1146');
            blob = { data: blob };
        }
        __$coverCall('src/javascript/file/Blob.js', '1155:3458');
        Basic.extend(this, {
            uid: blob.uid || Basic.guid('uid_'),
            ruid: ruid,
            size: blob.size || 0,
            type: blob.type || '',
            slice: function (start, end, type) {
                __$coverCall('src/javascript/file/Blob.js', '1840:1920');
                if (this.isDetached()) {
                    __$coverCall('src/javascript/file/Blob.js', '1870:1914');
                    return _sliceDetached.apply(this, arguments);
                }
                __$coverCall('src/javascript/file/Blob.js', '1926:2019');
                return this.getRuntime().exec.call(this, 'Blob', 'slice', this.getSource(), start, end, type);
            },
            getSource: function () {
                __$coverCall('src/javascript/file/Blob.js', '2259:2309');
                if (!blobpool[this.uid]) {
                    __$coverCall('src/javascript/file/Blob.js', '2291:2302');
                    return null;
                }
                __$coverCall('src/javascript/file/Blob.js', '2315:2340');
                return blobpool[this.uid];
            },
            detach: function (data) {
                __$coverCall('src/javascript/file/Blob.js', '2567:2701');
                if (this.ruid) {
                    __$coverCall('src/javascript/file/Blob.js', '2589:2641');
                    this.getRuntime().exec.call(this, 'Blob', 'destroy');
                    __$coverCall('src/javascript/file/Blob.js', '2648:2672');
                    this.disconnectRuntime();
                    __$coverCall('src/javascript/file/Blob.js', '2679:2695');
                    this.ruid = null;
                }
                __$coverCall('src/javascript/file/Blob.js', '2708:2725');
                data = data || '';
                __$coverCall('src/javascript/file/Blob.js', '2776:2975');
                if (data.substr(0, 5) == 'data:') {
                    __$coverCall('src/javascript/file/Blob.js', '2817:2860');
                    var base64Offset = data.indexOf(';base64,');
                    __$coverCall('src/javascript/file/Blob.js', '2867:2910');
                    this.type = data.substring(5, base64Offset);
                    __$coverCall('src/javascript/file/Blob.js', '2917:2969');
                    data = Encode.atob(data.substring(base64Offset + 8));
                }
                __$coverCall('src/javascript/file/Blob.js', '2982:3005');
                this.size = data.length;
                __$coverCall('src/javascript/file/Blob.js', '3012:3037');
                blobpool[this.uid] = data;
            },
            isDetached: function () {
                __$coverCall('src/javascript/file/Blob.js', '3210:3276');
                return !this.ruid && Basic.typeOf(blobpool[this.uid]) === 'string';
            },
            destroy: function () {
                __$coverCall('src/javascript/file/Blob.js', '3403:3416');
                this.detach();
                __$coverCall('src/javascript/file/Blob.js', '3422:3447');
                delete blobpool[this.uid];
            }
        });
        __$coverCall('src/javascript/file/Blob.js', '3466:3596');
        if (blob.data) {
            __$coverCall('src/javascript/file/Blob.js', '3486:3508');
            this.detach(blob.data);
        } else {
            __$coverCall('src/javascript/file/Blob.js', '3566:3591');
            blobpool[this.uid] = blob;
        }
    }
    __$coverCall('src/javascript/file/Blob.js', '3604:3615');
    return Blob;
});

// Included from: src/javascript/file/FileReader.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/file/FileReader.js", "/**\n * FileReader.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/file/FileReader', [\n\t'moxie/core/utils/Basic',\n\t'moxie/core/utils/Encode',\n\t'moxie/core/Exceptions',\n\t'moxie/core/EventTarget',\n\t'moxie/file/Blob',\n\t'moxie/runtime/RuntimeClient'\n], function(Basic, Encode, x, EventTarget, Blob, RuntimeClient) {\n\t/**\n\tUtility for preloading o.Blob/o.File objects in memory. By design closely follows [W3C FileReader](http://www.w3.org/TR/FileAPI/#dfn-filereader)\n\tinterface. Where possible uses native FileReader, where - not falls back to shims.\n\n\t@class FileReader\n\t@constructor FileReader\n\t@extends EventTarget\n\t@uses RuntimeClient\n\t*/\n\tvar dispatches = [\n\n\t\t/** \n\t\tDispatched when the read starts.\n\n\t\t@event loadstart\n\t\t@param {Object} event\n\t\t*/\n\t\t'loadstart', \n\n\t\t/** \n\t\tDispatched while reading (and decoding) blob, and reporting partial Blob data (progess.loaded/progress.total).\n\n\t\t@event progress\n\t\t@param {Object} event\n\t\t*/\n\t\t'progress', \n\n\t\t/** \n\t\tDispatched when the read has successfully completed.\n\n\t\t@event load\n\t\t@param {Object} event\n\t\t*/\n\t\t'load', \n\n\t\t/** \n\t\tDispatched when the read has been aborted. For instance, by invoking the abort() method.\n\n\t\t@event abort\n\t\t@param {Object} event\n\t\t*/\n\t\t'abort', \n\n\t\t/** \n\t\tDispatched when the read has failed.\n\n\t\t@event error\n\t\t@param {Object} event\n\t\t*/\n\t\t'error', \n\n\t\t/** \n\t\tDispatched when the request has completed (either in success or failure).\n\n\t\t@event loadend\n\t\t@param {Object} event\n\t\t*/\n\t\t'loadend'\n\t];\n\t\n\tfunction FileReader() {\n\n\t\tRuntimeClient.call(this);\n\n\t\tBasic.extend(this, {\n\t\t\t/**\n\t\t\tUID of the component instance.\n\n\t\t\t@property uid\n\t\t\t@type {String}\n\t\t\t*/\n\t\t\tuid: Basic.guid('uid_'),\n\n\t\t\t/**\n\t\t\tContains current state of FileReader object. Can take values of FileReader.EMPTY, FileReader.LOADING\n\t\t\tand FileReader.DONE.\n\n\t\t\t@property readyState\n\t\t\t@type {Number}\n\t\t\t@default FileReader.EMPTY\n\t\t\t*/\n\t\t\treadyState: FileReader.EMPTY,\n\t\t\t\n\t\t\t/**\n\t\t\tResult of the successful read operation.\n\n\t\t\t@property result\n\t\t\t@type {String}\n\t\t\t*/\n\t\t\tresult: null,\n\t\t\t\n\t\t\t/**\n\t\t\tStores the error of failed asynchronous read operation.\n\n\t\t\t@property error\n\t\t\t@type {DOMError}\n\t\t\t*/\n\t\t\terror: null,\n\t\t\t\n\t\t\t/**\n\t\t\tInitiates reading of File/Blob object contents to binary string.\n\n\t\t\t@method readAsBinaryString\n\t\t\t@param {Blob|File} blob Object to preload\n\t\t\t*/\n\t\t\treadAsBinaryString: function(blob) {\n\t\t\t\t_read.call(this, 'readAsBinaryString', blob);\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tInitiates reading of File/Blob object contents to dataURL string.\n\n\t\t\t@method readAsDataURL\n\t\t\t@param {Blob|File} blob Object to preload\n\t\t\t*/\n\t\t\treadAsDataURL: function(blob) {\n\t\t\t\t_read.call(this, 'readAsDataURL', blob);\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tInitiates reading of File/Blob object contents to string.\n\n\t\t\t@method readAsText\n\t\t\t@param {Blob|File} blob Object to preload\n\t\t\t*/\n\t\t\treadAsText: function(blob) {\n\t\t\t\t_read.call(this, 'readAsText', blob);\n\t\t\t},\n\t\t\t\n\t\t\t/**\n\t\t\tAborts preloading process.\n\n\t\t\t@method abort\n\t\t\t*/\n\t\t\tabort: function() {\n\t\t\t\tthis.result = null;\n\t\t\t\t\n\t\t\t\tif (Basic.inArray(this.readyState, [FileReader.EMPTY, FileReader.DONE]) !== -1) {\n\t\t\t\t\treturn;\n\t\t\t\t} else if (this.readyState === FileReader.LOADING) {\n\t\t\t\t\tthis.readyState = FileReader.DONE;\n\t\t\t\t}\n\n\t\t\t\tthis.exec('FileReader', 'abort');\n\t\t\t\t\n\t\t\t\tthis.trigger('abort');\n\t\t\t\tthis.trigger('loadend');\n\t\t\t},\n\n\t\t\t/**\n\t\t\tDestroy component and release resources.\n\n\t\t\t@method destroy\n\t\t\t*/\n\t\t\tdestroy: function() {\n\t\t\t\tthis.abort();\n\t\t\t\tthis.exec('FileReader', 'destroy');\n\t\t\t\tthis.disconnectRuntime();\n\t\t\t\tthis.unbindAll();\n\t\t\t}\n\t\t});\n\n\t\t// uid must already be assigned\n\t\tthis.handleEventProps(dispatches);\n\n\t\tthis.bind('Error', function(e, err) {\n\t\t\tthis.readyState = FileReader.DONE;\n\t\t\tthis.error = err;\n\t\t}, 999);\n\t\t\n\t\tthis.bind('Load', function(e) {\n\t\t\tthis.readyState = FileReader.DONE;\n\t\t}, 999);\n\n\t\t\n\t\tfunction _read(op, blob) {\n\t\t\tvar self = this;\t\t\t\n\n\t\t\tthis.trigger('loadstart');\n\n\t\t\tif (this.readyState === FileReader.LOADING) {\n\t\t\t\tthis.trigger('error', new x.DOMException(x.DOMException.INVALID_STATE_ERR));\n\t\t\t\tthis.trigger('loadend');\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// if source is not o.Blob/o.File\n\t\t\tif (!(blob instanceof Blob)) {\n\t\t\t\tthis.trigger('error', new x.DOMException(x.DOMException.NOT_FOUND_ERR));\n\t\t\t\tthis.trigger('loadend');\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.result = null;\n\t\t\tthis.readyState = FileReader.LOADING;\n\t\t\t\n\t\t\tif (blob.isDetached()) {\n\t\t\t\tvar src = blob.getSource();\n\t\t\t\tswitch (op) {\n\t\t\t\t\tcase 'readAsText':\n\t\t\t\t\tcase 'readAsBinaryString':\n\t\t\t\t\t\tthis.result = src;\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tcase 'readAsDataURL':\n\t\t\t\t\t\tthis.result = 'data:' + blob.type + ';base64,' + Encode.btoa(src);\n\t\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\tthis.readyState = FileReader.DONE;\n\t\t\t\tthis.trigger('load');\n\t\t\t\tthis.trigger('loadend');\n\t\t\t} else {\n\t\t\t\tthis.connectRuntime(blob.ruid);\n\t\t\t\tthis.exec('FileReader', 'read', op, blob);\n\t\t\t}\n\t\t}\n\t}\n\t\n\t/**\n\tInitial FileReader state\n\n\t@property EMPTY\n\t@type {Number}\n\t@final\n\t@static\n\t@default 0\n\t*/\n\tFileReader.EMPTY = 0;\n\n\t/**\n\tFileReader switches to this state when it is preloading the source\n\n\t@property LOADING\n\t@type {Number}\n\t@final\n\t@static\n\t@default 1\n\t*/\n\tFileReader.LOADING = 1;\n\n\t/**\n\tPreloading is complete, this is a final state\n\n\t@property DONE\n\t@type {Number}\n\t@final\n\t@static\n\t@default 2\n\t*/\n\tFileReader.DONE = 2;\n\n\tFileReader.prototype = EventTarget.instance;\n\n\treturn FileReader;\n});");
__$coverInitRange("src/javascript/file/FileReader.js", "201:5477");
__$coverInitRange("src/javascript/file/FileReader.js", "788:1622");
__$coverInitRange("src/javascript/file/FileReader.js", "1627:4973");
__$coverInitRange("src/javascript/file/FileReader.js", "5076:5096");
__$coverInitRange("src/javascript/file/FileReader.js", "5242:5264");
__$coverInitRange("src/javascript/file/FileReader.js", "5386:5405");
__$coverInitRange("src/javascript/file/FileReader.js", "5409:5452");
__$coverInitRange("src/javascript/file/FileReader.js", "5456:5473");
__$coverInitRange("src/javascript/file/FileReader.js", "1654:1678");
__$coverInitRange("src/javascript/file/FileReader.js", "1683:3684");
__$coverInitRange("src/javascript/file/FileReader.js", "3723:3756");
__$coverInitRange("src/javascript/file/FileReader.js", "3761:3867");
__$coverInitRange("src/javascript/file/FileReader.js", "3874:3953");
__$coverInitRange("src/javascript/file/FileReader.js", "3961:4970");
__$coverInitRange("src/javascript/file/FileReader.js", "2516:2560");
__$coverInitRange("src/javascript/file/FileReader.js", "2764:2803");
__$coverInitRange("src/javascript/file/FileReader.js", "2993:3029");
__$coverInitRange("src/javascript/file/FileReader.js", "3129:3147");
__$coverInitRange("src/javascript/file/FileReader.js", "3158:3354");
__$coverInitRange("src/javascript/file/FileReader.js", "3361:3393");
__$coverInitRange("src/javascript/file/FileReader.js", "3404:3425");
__$coverInitRange("src/javascript/file/FileReader.js", "3431:3454");
__$coverInitRange("src/javascript/file/FileReader.js", "3245:3251");
__$coverInitRange("src/javascript/file/FileReader.js", "3315:3348");
__$coverInitRange("src/javascript/file/FileReader.js", "3569:3581");
__$coverInitRange("src/javascript/file/FileReader.js", "3587:3621");
__$coverInitRange("src/javascript/file/FileReader.js", "3627:3651");
__$coverInitRange("src/javascript/file/FileReader.js", "3657:3673");
__$coverInitRange("src/javascript/file/FileReader.js", "3802:3835");
__$coverInitRange("src/javascript/file/FileReader.js", "3840:3856");
__$coverInitRange("src/javascript/file/FileReader.js", "3909:3942");
__$coverInitRange("src/javascript/file/FileReader.js", "3991:4006");
__$coverInitRange("src/javascript/file/FileReader.js", "4015:4040");
__$coverInitRange("src/javascript/file/FileReader.js", "4046:4217");
__$coverInitRange("src/javascript/file/FileReader.js", "4260:4412");
__$coverInitRange("src/javascript/file/FileReader.js", "4418:4436");
__$coverInitRange("src/javascript/file/FileReader.js", "4441:4477");
__$coverInitRange("src/javascript/file/FileReader.js", "4486:4966");
__$coverInitRange("src/javascript/file/FileReader.js", "4096:4171");
__$coverInitRange("src/javascript/file/FileReader.js", "4177:4200");
__$coverInitRange("src/javascript/file/FileReader.js", "4206:4212");
__$coverInitRange("src/javascript/file/FileReader.js", "4295:4366");
__$coverInitRange("src/javascript/file/FileReader.js", "4372:4395");
__$coverInitRange("src/javascript/file/FileReader.js", "4401:4407");
__$coverInitRange("src/javascript/file/FileReader.js", "4515:4541");
__$coverInitRange("src/javascript/file/FileReader.js", "4547:4772");
__$coverInitRange("src/javascript/file/FileReader.js", "4778:4811");
__$coverInitRange("src/javascript/file/FileReader.js", "4817:4837");
__$coverInitRange("src/javascript/file/FileReader.js", "4843:4866");
__$coverInitRange("src/javascript/file/FileReader.js", "4623:4640");
__$coverInitRange("src/javascript/file/FileReader.js", "4648:4653");
__$coverInitRange("src/javascript/file/FileReader.js", "4688:4753");
__$coverInitRange("src/javascript/file/FileReader.js", "4761:4766");
__$coverInitRange("src/javascript/file/FileReader.js", "4884:4914");
__$coverInitRange("src/javascript/file/FileReader.js", "4920:4961");
__$coverCall('src/javascript/file/FileReader.js', '201:5477');
define('moxie/file/FileReader', [
    'moxie/core/utils/Basic',
    'moxie/core/utils/Encode',
    'moxie/core/Exceptions',
    'moxie/core/EventTarget',
    'moxie/file/Blob',
    'moxie/runtime/RuntimeClient'
], function (Basic, Encode, x, EventTarget, Blob, RuntimeClient) {
    __$coverCall('src/javascript/file/FileReader.js', '788:1622');
    var dispatches = [
            'loadstart',
            'progress',
            'load',
            'abort',
            'error',
            'loadend'
        ];
    __$coverCall('src/javascript/file/FileReader.js', '1627:4973');
    function FileReader() {
        __$coverCall('src/javascript/file/FileReader.js', '1654:1678');
        RuntimeClient.call(this);
        __$coverCall('src/javascript/file/FileReader.js', '1683:3684');
        Basic.extend(this, {
            uid: Basic.guid('uid_'),
            readyState: FileReader.EMPTY,
            result: null,
            error: null,
            readAsBinaryString: function (blob) {
                __$coverCall('src/javascript/file/FileReader.js', '2516:2560');
                _read.call(this, 'readAsBinaryString', blob);
            },
            readAsDataURL: function (blob) {
                __$coverCall('src/javascript/file/FileReader.js', '2764:2803');
                _read.call(this, 'readAsDataURL', blob);
            },
            readAsText: function (blob) {
                __$coverCall('src/javascript/file/FileReader.js', '2993:3029');
                _read.call(this, 'readAsText', blob);
            },
            abort: function () {
                __$coverCall('src/javascript/file/FileReader.js', '3129:3147');
                this.result = null;
                __$coverCall('src/javascript/file/FileReader.js', '3158:3354');
                if (Basic.inArray(this.readyState, [
                        FileReader.EMPTY,
                        FileReader.DONE
                    ]) !== -1) {
                    __$coverCall('src/javascript/file/FileReader.js', '3245:3251');
                    return;
                } else if (this.readyState === FileReader.LOADING) {
                    __$coverCall('src/javascript/file/FileReader.js', '3315:3348');
                    this.readyState = FileReader.DONE;
                }
                __$coverCall('src/javascript/file/FileReader.js', '3361:3393');
                this.exec('FileReader', 'abort');
                __$coverCall('src/javascript/file/FileReader.js', '3404:3425');
                this.trigger('abort');
                __$coverCall('src/javascript/file/FileReader.js', '3431:3454');
                this.trigger('loadend');
            },
            destroy: function () {
                __$coverCall('src/javascript/file/FileReader.js', '3569:3581');
                this.abort();
                __$coverCall('src/javascript/file/FileReader.js', '3587:3621');
                this.exec('FileReader', 'destroy');
                __$coverCall('src/javascript/file/FileReader.js', '3627:3651');
                this.disconnectRuntime();
                __$coverCall('src/javascript/file/FileReader.js', '3657:3673');
                this.unbindAll();
            }
        });
        __$coverCall('src/javascript/file/FileReader.js', '3723:3756');
        this.handleEventProps(dispatches);
        __$coverCall('src/javascript/file/FileReader.js', '3761:3867');
        this.bind('Error', function (e, err) {
            __$coverCall('src/javascript/file/FileReader.js', '3802:3835');
            this.readyState = FileReader.DONE;
            __$coverCall('src/javascript/file/FileReader.js', '3840:3856');
            this.error = err;
        }, 999);
        __$coverCall('src/javascript/file/FileReader.js', '3874:3953');
        this.bind('Load', function (e) {
            __$coverCall('src/javascript/file/FileReader.js', '3909:3942');
            this.readyState = FileReader.DONE;
        }, 999);
        __$coverCall('src/javascript/file/FileReader.js', '3961:4970');
        function _read(op, blob) {
            __$coverCall('src/javascript/file/FileReader.js', '3991:4006');
            var self = this;
            __$coverCall('src/javascript/file/FileReader.js', '4015:4040');
            this.trigger('loadstart');
            __$coverCall('src/javascript/file/FileReader.js', '4046:4217');
            if (this.readyState === FileReader.LOADING) {
                __$coverCall('src/javascript/file/FileReader.js', '4096:4171');
                this.trigger('error', new x.DOMException(x.DOMException.INVALID_STATE_ERR));
                __$coverCall('src/javascript/file/FileReader.js', '4177:4200');
                this.trigger('loadend');
                __$coverCall('src/javascript/file/FileReader.js', '4206:4212');
                return;
            }
            __$coverCall('src/javascript/file/FileReader.js', '4260:4412');
            if (!(blob instanceof Blob)) {
                __$coverCall('src/javascript/file/FileReader.js', '4295:4366');
                this.trigger('error', new x.DOMException(x.DOMException.NOT_FOUND_ERR));
                __$coverCall('src/javascript/file/FileReader.js', '4372:4395');
                this.trigger('loadend');
                __$coverCall('src/javascript/file/FileReader.js', '4401:4407');
                return;
            }
            __$coverCall('src/javascript/file/FileReader.js', '4418:4436');
            this.result = null;
            __$coverCall('src/javascript/file/FileReader.js', '4441:4477');
            this.readyState = FileReader.LOADING;
            __$coverCall('src/javascript/file/FileReader.js', '4486:4966');
            if (blob.isDetached()) {
                __$coverCall('src/javascript/file/FileReader.js', '4515:4541');
                var src = blob.getSource();
                __$coverCall('src/javascript/file/FileReader.js', '4547:4772');
                switch (op) {
                case 'readAsText':
                case 'readAsBinaryString':
                    __$coverCall('src/javascript/file/FileReader.js', '4623:4640');
                    this.result = src;
                    __$coverCall('src/javascript/file/FileReader.js', '4648:4653');
                    break;
                case 'readAsDataURL':
                    __$coverCall('src/javascript/file/FileReader.js', '4688:4753');
                    this.result = 'data:' + blob.type + ';base64,' + Encode.btoa(src);
                    __$coverCall('src/javascript/file/FileReader.js', '4761:4766');
                    break;
                }
                __$coverCall('src/javascript/file/FileReader.js', '4778:4811');
                this.readyState = FileReader.DONE;
                __$coverCall('src/javascript/file/FileReader.js', '4817:4837');
                this.trigger('load');
                __$coverCall('src/javascript/file/FileReader.js', '4843:4866');
                this.trigger('loadend');
            } else {
                __$coverCall('src/javascript/file/FileReader.js', '4884:4914');
                this.connectRuntime(blob.ruid);
                __$coverCall('src/javascript/file/FileReader.js', '4920:4961');
                this.exec('FileReader', 'read', op, blob);
            }
        }
    }
    __$coverCall('src/javascript/file/FileReader.js', '5076:5096');
    FileReader.EMPTY = 0;
    __$coverCall('src/javascript/file/FileReader.js', '5242:5264');
    FileReader.LOADING = 1;
    __$coverCall('src/javascript/file/FileReader.js', '5386:5405');
    FileReader.DONE = 2;
    __$coverCall('src/javascript/file/FileReader.js', '5409:5452');
    FileReader.prototype = EventTarget.instance;
    __$coverCall('src/javascript/file/FileReader.js', '5456:5473');
    return FileReader;
});

// Included from: src/javascript/runtime/html5/Runtime.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/html5/Runtime.js", "/**\n * Runtime.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\n/*global File:true */\n\n/**\nDefines constructor for HTML5 runtime.\n\n@class moxie/runtime/html5/Runtime\n@private\n*/\ndefine(\"moxie/runtime/html5/Runtime\", [\n\t\"moxie/core/utils/Basic\",\n\t\"moxie/core/Exceptions\",\n\t\"moxie/runtime/Runtime\",\n\t\"moxie/core/utils/Env\"\n], function(Basic, x, Runtime, Env) {\n\t\n\tvar type = \"html5\", extensions = {};\n\t\n\tfunction Html5Runtime(options) {\n\t\tvar I = this\n\t\t, Test = Runtime.capTest\n\t\t, True = Runtime.capTrue\n\t\t;\n\n\t\tvar caps = Basic.extend({\n\t\t\t\taccess_binary: Test(window.FileReader || window.File && window.File.getAsDataURL),\n\t\t\t\taccess_image_binary: function() {\n\t\t\t\t\treturn I.can('access_binary') && !!extensions.Image;\n\t\t\t\t},\n\t\t\t\tdisplay_media: Test(Env.can('create_canvas') || Env.can('use_data_uri_over32kb')),\n\t\t\t\tdo_cors: Test(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()),\n\t\t\t\tdrag_and_drop: Test(function() {\n\t\t\t\t\t// this comes directly from Modernizr: http://www.modernizr.com/\n\t\t\t\t\tvar div = document.createElement('div');\n\t\t\t\t\t// IE has support for drag and drop since version 5, but doesn't support dropping files from desktop\n\t\t\t\t\treturn (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && (Env.browser !== 'IE' || Env.version > 9);\n\t\t\t\t}()),\n\t\t\t\tfilter_by_extension: Test(function() { // if you know how to feature-detect this, please suggest\n\t\t\t\t\treturn (Env.browser === 'Chrome' && Env.version >= 28) || (Env.browser === 'IE' && Env.version >= 10);\n\t\t\t\t}()),\n\t\t\t\treturn_response_headers: True,\n\t\t\t\treturn_response_type: function(responseType) {\n\t\t\t\t\tif (responseType === 'json' && !!window.JSON) { // we can fake this one even if it's not supported\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t} \n\t\t\t\t\treturn Env.can('return_response_type', responseType);\n\t\t\t\t},\n\t\t\t\treturn_status_code: True,\n\t\t\t\treport_upload_progress: Test(window.XMLHttpRequest && new XMLHttpRequest().upload),\n\t\t\t\tresize_image: function() {\n\t\t\t\t\treturn I.can('access_binary') && Env.can('create_canvas');\n\t\t\t\t},\n\t\t\t\tselect_file: function() {\n\t\t\t\t\treturn Env.can('use_fileinput') && window.File;\n\t\t\t\t},\n\t\t\t\tselect_folder: function() {\n\t\t\t\t\treturn I.can('select_file') && Env.browser === 'Chrome' && Env.version >= 21;\n\t\t\t\t},\n\t\t\t\tselect_multiple: function() {\n\t\t\t\t\t// it is buggy on Safari Windows and iOS\n\t\t\t\t\treturn I.can('select_file') && \n\t\t\t\t\t\t!(Env.browser === 'Safari' && Env.os === 'Windows') && \n\t\t\t\t\t\t!(Env.os === 'iOS' && Env.verComp(Env.osVersion, \"7.0.4\", '<'));\n\t\t\t\t},\n\t\t\t\tsend_binary_string: Test(window.XMLHttpRequest && (new XMLHttpRequest().sendAsBinary || (window.Uint8Array && window.ArrayBuffer))),\n\t\t\t\tsend_custom_headers: Test(window.XMLHttpRequest),\n\t\t\t\tsend_multipart: function() {\n\t\t\t\t\treturn !!(window.XMLHttpRequest && new XMLHttpRequest().upload && window.FormData) || I.can('send_binary_string');\n\t\t\t\t},\n\t\t\t\tslice_blob: Test(window.File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)),\n\t\t\t\tstream_upload: function(){\n\t\t\t\t\treturn I.can('slice_blob') && I.can('send_multipart');\n\t\t\t\t},\n\t\t\t\tsummon_file_dialog: Test(function() { // yeah... some dirty sniffing here...\n\t\t\t\t\treturn (Env.browser === 'Firefox' && Env.version >= 4) ||\n\t\t\t\t\t\t(Env.browser === 'Opera' && Env.version >= 12) ||\n\t\t\t\t\t\t(Env.browser === 'IE' && Env.version >= 10) ||\n\t\t\t\t\t\t!!~Basic.inArray(Env.browser, ['Chrome', 'Chromium', 'Safari']);\n\t\t\t\t}()),\n\t\t\t\tupload_filesize: True\n\t\t\t}, \n\t\t\targuments[2]\n\t\t);\n\n\t\tRuntime.call(this, options, (arguments[1] || type), caps);\n\n\n\t\tBasic.extend(this, {\n\n\t\t\tinit : function() {\n\t\t\t\tthis.trigger(\"Init\");\n\t\t\t},\n\n\t\t\tdestroy: (function(destroy) { // extend default destroy method\n\t\t\t\treturn function() {\n\t\t\t\t\tdestroy.call(I);\n\t\t\t\t\tdestroy = I = null;\n\t\t\t\t};\n\t\t\t}(this.destroy))\n\t\t});\n\n\t\tBasic.extend(this.getShim(), extensions);\n\t}\n\n\tRuntime.addConstructor(type, Html5Runtime);\n\n\treturn extensions;\n});\n");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "312:4007");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "496:531");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "536:3936");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3940:3982");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3986:4003");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "571:639");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "640:640");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "645:3574");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3579:3636");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3642:3888");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3893:3933");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "801:852");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "1147:1186");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "1299:1418");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "1536:1637");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "1740:1863");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "1871:1923");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "1845:1856");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "2086:2143");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "2187:2233");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "2279:2355");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "2449:2612");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "2850:2963");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3126:3179");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3274:3510");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3691:3711");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3790:3862");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3815:3830");
__$coverInitRange("src/javascript/runtime/html5/Runtime.js", "3837:3855");
__$coverCall('src/javascript/runtime/html5/Runtime.js', '312:4007');
define('moxie/runtime/html5/Runtime', [
    'moxie/core/utils/Basic',
    'moxie/core/Exceptions',
    'moxie/runtime/Runtime',
    'moxie/core/utils/Env'
], function (Basic, x, Runtime, Env) {
    __$coverCall('src/javascript/runtime/html5/Runtime.js', '496:531');
    var type = 'html5', extensions = {};
    __$coverCall('src/javascript/runtime/html5/Runtime.js', '536:3936');
    function Html5Runtime(options) {
        __$coverCall('src/javascript/runtime/html5/Runtime.js', '571:639');
        var I = this, Test = Runtime.capTest, True = Runtime.capTrue;
        __$coverCall('src/javascript/runtime/html5/Runtime.js', '640:640');
        ;
        __$coverCall('src/javascript/runtime/html5/Runtime.js', '645:3574');
        var caps = Basic.extend({
                access_binary: Test(window.FileReader || window.File && window.File.getAsDataURL),
                access_image_binary: function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '801:852');
                    return I.can('access_binary') && !!extensions.Image;
                },
                display_media: Test(Env.can('create_canvas') || Env.can('use_data_uri_over32kb')),
                do_cors: Test(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()),
                drag_and_drop: Test(function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '1147:1186');
                    var div = document.createElement('div');
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '1299:1418');
                    return ('draggable' in div || 'ondragstart' in div && 'ondrop' in div) && (Env.browser !== 'IE' || Env.version > 9);
                }()),
                filter_by_extension: Test(function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '1536:1637');
                    return Env.browser === 'Chrome' && Env.version >= 28 || Env.browser === 'IE' && Env.version >= 10;
                }()),
                return_response_headers: True,
                return_response_type: function (responseType) {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '1740:1863');
                    if (responseType === 'json' && !!window.JSON) {
                        __$coverCall('src/javascript/runtime/html5/Runtime.js', '1845:1856');
                        return true;
                    }
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '1871:1923');
                    return Env.can('return_response_type', responseType);
                },
                return_status_code: True,
                report_upload_progress: Test(window.XMLHttpRequest && new XMLHttpRequest().upload),
                resize_image: function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '2086:2143');
                    return I.can('access_binary') && Env.can('create_canvas');
                },
                select_file: function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '2187:2233');
                    return Env.can('use_fileinput') && window.File;
                },
                select_folder: function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '2279:2355');
                    return I.can('select_file') && Env.browser === 'Chrome' && Env.version >= 21;
                },
                select_multiple: function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '2449:2612');
                    return I.can('select_file') && !(Env.browser === 'Safari' && Env.os === 'Windows') && !(Env.os === 'iOS' && Env.verComp(Env.osVersion, '7.0.4', '<'));
                },
                send_binary_string: Test(window.XMLHttpRequest && (new XMLHttpRequest().sendAsBinary || window.Uint8Array && window.ArrayBuffer)),
                send_custom_headers: Test(window.XMLHttpRequest),
                send_multipart: function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '2850:2963');
                    return !!(window.XMLHttpRequest && new XMLHttpRequest().upload && window.FormData) || I.can('send_binary_string');
                },
                slice_blob: Test(window.File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)),
                stream_upload: function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '3126:3179');
                    return I.can('slice_blob') && I.can('send_multipart');
                },
                summon_file_dialog: Test(function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '3274:3510');
                    return Env.browser === 'Firefox' && Env.version >= 4 || Env.browser === 'Opera' && Env.version >= 12 || Env.browser === 'IE' && Env.version >= 10 || !!~Basic.inArray(Env.browser, [
                        'Chrome',
                        'Chromium',
                        'Safari'
                    ]);
                }()),
                upload_filesize: True
            }, arguments[2]);
        __$coverCall('src/javascript/runtime/html5/Runtime.js', '3579:3636');
        Runtime.call(this, options, arguments[1] || type, caps);
        __$coverCall('src/javascript/runtime/html5/Runtime.js', '3642:3888');
        Basic.extend(this, {
            init: function () {
                __$coverCall('src/javascript/runtime/html5/Runtime.js', '3691:3711');
                this.trigger('Init');
            },
            destroy: function (destroy) {
                __$coverCall('src/javascript/runtime/html5/Runtime.js', '3790:3862');
                return function () {
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '3815:3830');
                    destroy.call(I);
                    __$coverCall('src/javascript/runtime/html5/Runtime.js', '3837:3855');
                    destroy = I = null;
                };
            }(this.destroy)
        });
        __$coverCall('src/javascript/runtime/html5/Runtime.js', '3893:3933');
        Basic.extend(this.getShim(), extensions);
    }
    __$coverCall('src/javascript/runtime/html5/Runtime.js', '3940:3982');
    Runtime.addConstructor(type, Html5Runtime);
    __$coverCall('src/javascript/runtime/html5/Runtime.js', '3986:4003');
    return extensions;
});

// Included from: src/javascript/file/File.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/file/File.js", "/**\n * File.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/file/File', [\n\t'moxie/core/utils/Basic',\n\t'moxie/core/utils/Mime',\n\t'moxie/file/Blob'\n], function(Basic, Mime, Blob) {\n\t/**\n\t@class File\n\t@extends Blob\n\t@constructor\n\t@param {String} ruid Unique id of the runtime, to which this blob belongs to\n\t@param {Object} file Object \"Native\" file object, as it is represented in the runtime\n\t*/\n\tfunction File(ruid, file) {\n\t\tif (!file) { // avoid extra errors in case we overlooked something\n\t\t\tfile = {};\n\t\t}\n\n\t\tBlob.apply(this, arguments);\n\n\t\tif (!this.type) {\n\t\t\tthis.type = Mime.getFileMime(file.name);\n\t\t}\n\n\t\t// sanitize file name or generate new one\n\t\tvar name;\n\t\tif (file.name) {\n\t\t\tname = file.name.replace(/\\\\/g, '/');\n\t\t\tname = name.substr(name.lastIndexOf('/') + 1);\n\t\t} else if (this.type) {\n\t\t\tvar prefix = this.type.split('/')[0];\n\t\t\tname = Basic.guid((prefix !== '' ? prefix : 'file') + '_');\n\t\t\t\n\t\t\tif (Mime.extensions[this.type]) {\n\t\t\t\tname += '.' + Mime.extensions[this.type][0]; // append proper extension if possible\n\t\t\t}\n\t\t}\n\t\t\n\t\t\n\t\tBasic.extend(this, {\n\t\t\t/**\n\t\t\tFile name\n\n\t\t\t@property name\n\t\t\t@type {String}\n\t\t\t@default UID\n\t\t\t*/\n\t\t\tname: name || Basic.guid('file_'),\n\n\t\t\t/**\n\t\t\tRelative path to the file inside a directory\n\n\t\t\t@property relativePath\n\t\t\t@type {String}\n\t\t\t@default ''\n\t\t\t*/\n\t\t\trelativePath: '',\n\t\t\t\n\t\t\t/**\n\t\t\tDate of last modification\n\n\t\t\t@property lastModifiedDate\n\t\t\t@type {String}\n\t\t\t@default now\n\t\t\t*/\n\t\t\tlastModifiedDate: file.lastModifiedDate || (new Date()).toLocaleString() // Thu Aug 23 2012 19:40:00 GMT+0400 (GET)\n\t\t});\n\t}\n\n\tFile.prototype = Blob.prototype;\n\n\treturn File;\n});");
__$coverInitRange("src/javascript/file/File.js", "195:1776");
__$coverInitRange("src/javascript/file/File.js", "545:1722");
__$coverInitRange("src/javascript/file/File.js", "1726:1757");
__$coverInitRange("src/javascript/file/File.js", "1761:1772");
__$coverInitRange("src/javascript/file/File.js", "575:658");
__$coverInitRange("src/javascript/file/File.js", "663:690");
__$coverInitRange("src/javascript/file/File.js", "695:759");
__$coverInitRange("src/javascript/file/File.js", "808:816");
__$coverInitRange("src/javascript/file/File.js", "820:1194");
__$coverInitRange("src/javascript/file/File.js", "1204:1719");
__$coverInitRange("src/javascript/file/File.js", "645:654");
__$coverInitRange("src/javascript/file/File.js", "716:755");
__$coverInitRange("src/javascript/file/File.js", "840:876");
__$coverInitRange("src/javascript/file/File.js", "881:926");
__$coverInitRange("src/javascript/file/File.js", "957:993");
__$coverInitRange("src/javascript/file/File.js", "998:1056");
__$coverInitRange("src/javascript/file/File.js", "1065:1190");
__$coverInitRange("src/javascript/file/File.js", "1103:1146");
__$coverCall('src/javascript/file/File.js', '195:1776');
define('moxie/file/File', [
    'moxie/core/utils/Basic',
    'moxie/core/utils/Mime',
    'moxie/file/Blob'
], function (Basic, Mime, Blob) {
    __$coverCall('src/javascript/file/File.js', '545:1722');
    function File(ruid, file) {
        __$coverCall('src/javascript/file/File.js', '575:658');
        if (!file) {
            __$coverCall('src/javascript/file/File.js', '645:654');
            file = {};
        }
        __$coverCall('src/javascript/file/File.js', '663:690');
        Blob.apply(this, arguments);
        __$coverCall('src/javascript/file/File.js', '695:759');
        if (!this.type) {
            __$coverCall('src/javascript/file/File.js', '716:755');
            this.type = Mime.getFileMime(file.name);
        }
        __$coverCall('src/javascript/file/File.js', '808:816');
        var name;
        __$coverCall('src/javascript/file/File.js', '820:1194');
        if (file.name) {
            __$coverCall('src/javascript/file/File.js', '840:876');
            name = file.name.replace(/\\/g, '/');
            __$coverCall('src/javascript/file/File.js', '881:926');
            name = name.substr(name.lastIndexOf('/') + 1);
        } else if (this.type) {
            __$coverCall('src/javascript/file/File.js', '957:993');
            var prefix = this.type.split('/')[0];
            __$coverCall('src/javascript/file/File.js', '998:1056');
            name = Basic.guid((prefix !== '' ? prefix : 'file') + '_');
            __$coverCall('src/javascript/file/File.js', '1065:1190');
            if (Mime.extensions[this.type]) {
                __$coverCall('src/javascript/file/File.js', '1103:1146');
                name += '.' + Mime.extensions[this.type][0];
            }
        }
        __$coverCall('src/javascript/file/File.js', '1204:1719');
        Basic.extend(this, {
            name: name || Basic.guid('file_'),
            relativePath: '',
            lastModifiedDate: file.lastModifiedDate || new Date().toLocaleString()
        });
    }
    __$coverCall('src/javascript/file/File.js', '1726:1757');
    File.prototype = Blob.prototype;
    __$coverCall('src/javascript/file/File.js', '1761:1772');
    return File;
});

// Included from: src/javascript/core/utils/Events.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/core/utils/Events.js", "/**\n * Events.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\ndefine('moxie/core/utils/Events', [\n\t'moxie/core/utils/Basic'\n], function(Basic) {\n\tvar eventhash = {}, uid = 'moxie_' + Basic.guid();\n\t\n\t// IE W3C like event funcs\n\tfunction preventDefault() {\n\t\tthis.returnValue = false;\n\t}\n\n\tfunction stopPropagation() {\n\t\tthis.cancelBubble = true;\n\t}\n\n\t/**\n\tAdds an event handler to the specified object and store reference to the handler\n\tin objects internal Plupload registry (@see removeEvent).\n\t\n\t@method addEvent\n\t@for Utils\n\t@static\n\t@param {Object} obj DOM element like object to add handler to.\n\t@param {String} name Name to add event listener to.\n\t@param {Function} callback Function to call when event occurs.\n\t@param {String} [key] that might be used to add specifity to the event record.\n\t*/\n\tvar addEvent = function(obj, name, callback, key) {\n\t\tvar func, events;\n\t\t\t\t\t\n\t\tname = name.toLowerCase();\n\n\t\t// Add event listener\n\t\tif (obj.addEventListener) {\n\t\t\tfunc = callback;\n\t\t\t\n\t\t\tobj.addEventListener(name, func, false);\n\t\t} else if (obj.attachEvent) {\n\t\t\tfunc = function() {\n\t\t\t\tvar evt = window.event;\n\n\t\t\t\tif (!evt.target) {\n\t\t\t\t\tevt.target = evt.srcElement;\n\t\t\t\t}\n\n\t\t\t\tevt.preventDefault = preventDefault;\n\t\t\t\tevt.stopPropagation = stopPropagation;\n\n\t\t\t\tcallback(evt);\n\t\t\t};\n\n\t\t\tobj.attachEvent('on' + name, func);\n\t\t}\n\t\t\n\t\t// Log event handler to objects internal mOxie registry\n\t\tif (!obj[uid]) {\n\t\t\tobj[uid] = Basic.guid();\n\t\t}\n\t\t\n\t\tif (!eventhash.hasOwnProperty(obj[uid])) {\n\t\t\teventhash[obj[uid]] = {};\n\t\t}\n\t\t\n\t\tevents = eventhash[obj[uid]];\n\t\t\n\t\tif (!events.hasOwnProperty(name)) {\n\t\t\tevents[name] = [];\n\t\t}\n\t\t\t\t\n\t\tevents[name].push({\n\t\t\tfunc: func,\n\t\t\torig: callback, // store original callback for IE\n\t\t\tkey: key\n\t\t});\n\t};\n\t\n\t\n\t/**\n\tRemove event handler from the specified object. If third argument (callback)\n\tis not specified remove all events with the specified name.\n\t\n\t@method removeEvent\n\t@static\n\t@param {Object} obj DOM element to remove event listener(s) from.\n\t@param {String} name Name of event listener to remove.\n\t@param {Function|String} [callback] might be a callback or unique key to match.\n\t*/\n\tvar removeEvent = function(obj, name, callback) {\n\t\tvar type, undef;\n\t\t\n\t\tname = name.toLowerCase();\n\t\t\n\t\tif (obj[uid] && eventhash[obj[uid]] && eventhash[obj[uid]][name]) {\n\t\t\ttype = eventhash[obj[uid]][name];\n\t\t} else {\n\t\t\treturn;\n\t\t}\n\t\t\t\n\t\tfor (var i = type.length - 1; i >= 0; i--) {\n\t\t\t// undefined or not, key should match\n\t\t\tif (type[i].orig === callback || type[i].key === callback) {\n\t\t\t\tif (obj.removeEventListener) {\n\t\t\t\t\tobj.removeEventListener(name, type[i].func, false);\n\t\t\t\t} else if (obj.detachEvent) {\n\t\t\t\t\tobj.detachEvent('on'+name, type[i].func);\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\ttype[i].orig = null;\n\t\t\t\ttype[i].func = null;\n\t\t\t\ttype.splice(i, 1);\n\t\t\t\t\n\t\t\t\t// If callback was passed we are done here, otherwise proceed\n\t\t\t\tif (callback !== undef) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t\n\t\t// If event array got empty, remove it\n\t\tif (!type.length) {\n\t\t\tdelete eventhash[obj[uid]][name];\n\t\t}\n\t\t\n\t\t// If mOxie registry has become empty, remove it\n\t\tif (Basic.isEmptyObj(eventhash[obj[uid]])) {\n\t\t\tdelete eventhash[obj[uid]];\n\t\t\t\n\t\t\t// IE doesn't let you remove DOM object property with - delete\n\t\t\ttry {\n\t\t\t\tdelete obj[uid];\n\t\t\t} catch(e) {\n\t\t\t\tobj[uid] = undef;\n\t\t\t}\n\t\t}\n\t};\n\t\n\t\n\t/**\n\tRemove all kind of events from the specified object\n\t\n\t@method removeAllEvents\n\t@static\n\t@param {Object} obj DOM element to remove event listeners from.\n\t@param {String} [key] unique key to match, when removing events.\n\t*/\n\tvar removeAllEvents = function(obj, key) {\t\t\n\t\tif (!obj || !obj[uid]) {\n\t\t\treturn;\n\t\t}\n\t\t\n\t\tBasic.each(eventhash[obj[uid]], function(events, name) {\n\t\t\tremoveEvent(obj, name, key);\n\t\t});\n\t};\n\n\treturn {\n\t\taddEvent: addEvent,\n\t\tremoveEvent: removeEvent,\n\t\tremoveAllEvents: removeAllEvents\n\t};\n});\n");
__$coverInitRange("src/javascript/core/utils/Events.js", "197:3966");
__$coverInitRange("src/javascript/core/utils/Events.js", "281:330");
__$coverInitRange("src/javascript/core/utils/Events.js", "363:420");
__$coverInitRange("src/javascript/core/utils/Events.js", "424:482");
__$coverInitRange("src/javascript/core/utils/Events.js", "938:1880");
__$coverInitRange("src/javascript/core/utils/Events.js", "2271:3437");
__$coverInitRange("src/javascript/core/utils/Events.js", "3673:3862");
__$coverInitRange("src/javascript/core/utils/Events.js", "3866:3962");
__$coverInitRange("src/javascript/core/utils/Events.js", "393:417");
__$coverInitRange("src/javascript/core/utils/Events.js", "455:479");
__$coverInitRange("src/javascript/core/utils/Events.js", "992:1008");
__$coverInitRange("src/javascript/core/utils/Events.js", "1018:1043");
__$coverInitRange("src/javascript/core/utils/Events.js", "1072:1468");
__$coverInitRange("src/javascript/core/utils/Events.js", "1533:1580");
__$coverInitRange("src/javascript/core/utils/Events.js", "1587:1661");
__$coverInitRange("src/javascript/core/utils/Events.js", "1668:1696");
__$coverInitRange("src/javascript/core/utils/Events.js", "1703:1763");
__$coverInitRange("src/javascript/core/utils/Events.js", "1772:1876");
__$coverInitRange("src/javascript/core/utils/Events.js", "1103:1118");
__$coverInitRange("src/javascript/core/utils/Events.js", "1127:1166");
__$coverInitRange("src/javascript/core/utils/Events.js", "1203:1424");
__$coverInitRange("src/javascript/core/utils/Events.js", "1430:1464");
__$coverInitRange("src/javascript/core/utils/Events.js", "1227:1249");
__$coverInitRange("src/javascript/core/utils/Events.js", "1256:1313");
__$coverInitRange("src/javascript/core/utils/Events.js", "1320:1355");
__$coverInitRange("src/javascript/core/utils/Events.js", "1361:1398");
__$coverInitRange("src/javascript/core/utils/Events.js", "1405:1418");
__$coverInitRange("src/javascript/core/utils/Events.js", "1280:1307");
__$coverInitRange("src/javascript/core/utils/Events.js", "1553:1576");
__$coverInitRange("src/javascript/core/utils/Events.js", "1633:1657");
__$coverInitRange("src/javascript/core/utils/Events.js", "1742:1759");
__$coverInitRange("src/javascript/core/utils/Events.js", "2323:2338");
__$coverInitRange("src/javascript/core/utils/Events.js", "2345:2370");
__$coverInitRange("src/javascript/core/utils/Events.js", "2377:2506");
__$coverInitRange("src/javascript/core/utils/Events.js", "2514:3047");
__$coverInitRange("src/javascript/core/utils/Events.js", "3095:3154");
__$coverInitRange("src/javascript/core/utils/Events.js", "3212:3433");
__$coverInitRange("src/javascript/core/utils/Events.js", "2448:2480");
__$coverInitRange("src/javascript/core/utils/Events.js", "2496:2502");
__$coverInitRange("src/javascript/core/utils/Events.js", "2603:3043");
__$coverInitRange("src/javascript/core/utils/Events.js", "2668:2841");
__$coverInitRange("src/javascript/core/utils/Events.js", "2852:2871");
__$coverInitRange("src/javascript/core/utils/Events.js", "2877:2896");
__$coverInitRange("src/javascript/core/utils/Events.js", "2902:2919");
__$coverInitRange("src/javascript/core/utils/Events.js", "2996:3038");
__$coverInitRange("src/javascript/core/utils/Events.js", "2704:2754");
__$coverInitRange("src/javascript/core/utils/Events.js", "2795:2835");
__$coverInitRange("src/javascript/core/utils/Events.js", "3027:3032");
__$coverInitRange("src/javascript/core/utils/Events.js", "3118:3150");
__$coverInitRange("src/javascript/core/utils/Events.js", "3260:3286");
__$coverInitRange("src/javascript/core/utils/Events.js", "3361:3429");
__$coverInitRange("src/javascript/core/utils/Events.js", "3371:3386");
__$coverInitRange("src/javascript/core/utils/Events.js", "3408:3424");
__$coverInitRange("src/javascript/core/utils/Events.js", "3720:3758");
__$coverInitRange("src/javascript/core/utils/Events.js", "3765:3858");
__$coverInitRange("src/javascript/core/utils/Events.js", "3748:3754");
__$coverInitRange("src/javascript/core/utils/Events.js", "3825:3852");
__$coverCall('src/javascript/core/utils/Events.js', '197:3966');
define('moxie/core/utils/Events', ['moxie/core/utils/Basic'], function (Basic) {
    __$coverCall('src/javascript/core/utils/Events.js', '281:330');
    var eventhash = {}, uid = 'moxie_' + Basic.guid();
    __$coverCall('src/javascript/core/utils/Events.js', '363:420');
    function preventDefault() {
        __$coverCall('src/javascript/core/utils/Events.js', '393:417');
        this.returnValue = false;
    }
    __$coverCall('src/javascript/core/utils/Events.js', '424:482');
    function stopPropagation() {
        __$coverCall('src/javascript/core/utils/Events.js', '455:479');
        this.cancelBubble = true;
    }
    __$coverCall('src/javascript/core/utils/Events.js', '938:1880');
    var addEvent = function (obj, name, callback, key) {
        __$coverCall('src/javascript/core/utils/Events.js', '992:1008');
        var func, events;
        __$coverCall('src/javascript/core/utils/Events.js', '1018:1043');
        name = name.toLowerCase();
        __$coverCall('src/javascript/core/utils/Events.js', '1072:1468');
        if (obj.addEventListener) {
            __$coverCall('src/javascript/core/utils/Events.js', '1103:1118');
            func = callback;
            __$coverCall('src/javascript/core/utils/Events.js', '1127:1166');
            obj.addEventListener(name, func, false);
        } else if (obj.attachEvent) {
            __$coverCall('src/javascript/core/utils/Events.js', '1203:1424');
            func = function () {
                __$coverCall('src/javascript/core/utils/Events.js', '1227:1249');
                var evt = window.event;
                __$coverCall('src/javascript/core/utils/Events.js', '1256:1313');
                if (!evt.target) {
                    __$coverCall('src/javascript/core/utils/Events.js', '1280:1307');
                    evt.target = evt.srcElement;
                }
                __$coverCall('src/javascript/core/utils/Events.js', '1320:1355');
                evt.preventDefault = preventDefault;
                __$coverCall('src/javascript/core/utils/Events.js', '1361:1398');
                evt.stopPropagation = stopPropagation;
                __$coverCall('src/javascript/core/utils/Events.js', '1405:1418');
                callback(evt);
            };
            __$coverCall('src/javascript/core/utils/Events.js', '1430:1464');
            obj.attachEvent('on' + name, func);
        }
        __$coverCall('src/javascript/core/utils/Events.js', '1533:1580');
        if (!obj[uid]) {
            __$coverCall('src/javascript/core/utils/Events.js', '1553:1576');
            obj[uid] = Basic.guid();
        }
        __$coverCall('src/javascript/core/utils/Events.js', '1587:1661');
        if (!eventhash.hasOwnProperty(obj[uid])) {
            __$coverCall('src/javascript/core/utils/Events.js', '1633:1657');
            eventhash[obj[uid]] = {};
        }
        __$coverCall('src/javascript/core/utils/Events.js', '1668:1696');
        events = eventhash[obj[uid]];
        __$coverCall('src/javascript/core/utils/Events.js', '1703:1763');
        if (!events.hasOwnProperty(name)) {
            __$coverCall('src/javascript/core/utils/Events.js', '1742:1759');
            events[name] = [];
        }
        __$coverCall('src/javascript/core/utils/Events.js', '1772:1876');
        events[name].push({
            func: func,
            orig: callback,
            key: key
        });
    };
    __$coverCall('src/javascript/core/utils/Events.js', '2271:3437');
    var removeEvent = function (obj, name, callback) {
        __$coverCall('src/javascript/core/utils/Events.js', '2323:2338');
        var type, undef;
        __$coverCall('src/javascript/core/utils/Events.js', '2345:2370');
        name = name.toLowerCase();
        __$coverCall('src/javascript/core/utils/Events.js', '2377:2506');
        if (obj[uid] && eventhash[obj[uid]] && eventhash[obj[uid]][name]) {
            __$coverCall('src/javascript/core/utils/Events.js', '2448:2480');
            type = eventhash[obj[uid]][name];
        } else {
            __$coverCall('src/javascript/core/utils/Events.js', '2496:2502');
            return;
        }
        __$coverCall('src/javascript/core/utils/Events.js', '2514:3047');
        for (var i = type.length - 1; i >= 0; i--) {
            __$coverCall('src/javascript/core/utils/Events.js', '2603:3043');
            if (type[i].orig === callback || type[i].key === callback) {
                __$coverCall('src/javascript/core/utils/Events.js', '2668:2841');
                if (obj.removeEventListener) {
                    __$coverCall('src/javascript/core/utils/Events.js', '2704:2754');
                    obj.removeEventListener(name, type[i].func, false);
                } else if (obj.detachEvent) {
                    __$coverCall('src/javascript/core/utils/Events.js', '2795:2835');
                    obj.detachEvent('on' + name, type[i].func);
                }
                __$coverCall('src/javascript/core/utils/Events.js', '2852:2871');
                type[i].orig = null;
                __$coverCall('src/javascript/core/utils/Events.js', '2877:2896');
                type[i].func = null;
                __$coverCall('src/javascript/core/utils/Events.js', '2902:2919');
                type.splice(i, 1);
                __$coverCall('src/javascript/core/utils/Events.js', '2996:3038');
                if (callback !== undef) {
                    __$coverCall('src/javascript/core/utils/Events.js', '3027:3032');
                    break;
                }
            }
        }
        __$coverCall('src/javascript/core/utils/Events.js', '3095:3154');
        if (!type.length) {
            __$coverCall('src/javascript/core/utils/Events.js', '3118:3150');
            delete eventhash[obj[uid]][name];
        }
        __$coverCall('src/javascript/core/utils/Events.js', '3212:3433');
        if (Basic.isEmptyObj(eventhash[obj[uid]])) {
            __$coverCall('src/javascript/core/utils/Events.js', '3260:3286');
            delete eventhash[obj[uid]];
            __$coverCall('src/javascript/core/utils/Events.js', '3361:3429');
            try {
                __$coverCall('src/javascript/core/utils/Events.js', '3371:3386');
                delete obj[uid];
            } catch (e) {
                __$coverCall('src/javascript/core/utils/Events.js', '3408:3424');
                obj[uid] = undef;
            }
        }
    };
    __$coverCall('src/javascript/core/utils/Events.js', '3673:3862');
    var removeAllEvents = function (obj, key) {
        __$coverCall('src/javascript/core/utils/Events.js', '3720:3758');
        if (!obj || !obj[uid]) {
            __$coverCall('src/javascript/core/utils/Events.js', '3748:3754');
            return;
        }
        __$coverCall('src/javascript/core/utils/Events.js', '3765:3858');
        Basic.each(eventhash[obj[uid]], function (events, name) {
            __$coverCall('src/javascript/core/utils/Events.js', '3825:3852');
            removeEvent(obj, name, key);
        });
    };
    __$coverCall('src/javascript/core/utils/Events.js', '3866:3962');
    return {
        addEvent: addEvent,
        removeEvent: removeEvent,
        removeAllEvents: removeAllEvents
    };
});

// Included from: src/javascript/runtime/html5/file/FileInput.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/html5/file/FileInput.js", "/**\n * FileInput.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\n/**\n@class moxie/runtime/html5/file/FileInput\n@private\n*/\ndefine(\"moxie/runtime/html5/file/FileInput\", [\n\t\"moxie/runtime/html5/Runtime\",\n\t\"moxie/file/File\",\n\t\"moxie/core/utils/Basic\",\n\t\"moxie/core/utils/Dom\",\n\t\"moxie/core/utils/Events\",\n\t\"moxie/core/utils/Mime\",\n\t\"moxie/core/utils/Env\"\n], function(extensions, File, Basic, Dom, Events, Mime, Env) {\n\t\n\tfunction FileInput() {\n\t\tvar _options;\n\n\t\tBasic.extend(this, {\n\t\t\tinit: function(options) {\n\t\t\t\tvar comp = this, I = comp.getRuntime(), input, shimContainer, mimes, browseButton, zIndex, top;\n\n\t\t\t\t_options = options;\n\n\t\t\t\t// figure out accept string\n\t\t\t\tmimes = _options.accept.mimes || Mime.extList2mimes(_options.accept, I.can('filter_by_extension'));\n\n\t\t\t\tshimContainer = I.getShimContainer();\n\n\t\t\t\tshimContainer.innerHTML = '<input id=\"' + I.uid +'\" type=\"file\" style=\"font-size:999px;opacity:0;\"' +\n\t\t\t\t\t(_options.multiple && I.can('select_multiple') ? 'multiple' : '') + \n\t\t\t\t\t(_options.directory && I.can('select_folder') ? 'webkitdirectory directory' : '') + // Chrome 11+\n\t\t\t\t\t(mimes ? ' accept=\"' + mimes.join(',') + '\"' : '') + ' />';\n\n\t\t\t\tinput = Dom.get(I.uid);\n\n\t\t\t\t// prepare file input to be placed underneath the browse_button element\n\t\t\t\tBasic.extend(input.style, {\n\t\t\t\t\tposition: 'absolute',\n\t\t\t\t\ttop: 0,\n\t\t\t\t\tleft: 0,\n\t\t\t\t\twidth: '100%',\n\t\t\t\t\theight: '100%'\n\t\t\t\t});\n\n\n\t\t\t\tbrowseButton = Dom.get(_options.browse_button);\n\n\t\t\t\t// Route click event to the input[type=file] element for browsers that support such behavior\n\t\t\t\tif (I.can('summon_file_dialog')) {\n\t\t\t\t\tif (Dom.getStyle(browseButton, 'position') === 'static') {\n\t\t\t\t\t\tbrowseButton.style.position = 'relative';\n\t\t\t\t\t}\n\n\t\t\t\t\tzIndex = parseInt(Dom.getStyle(browseButton, 'z-index'), 10) || 1;\n\n\t\t\t\t\tbrowseButton.style.zIndex = zIndex;\n\t\t\t\t\tshimContainer.style.zIndex = zIndex - 1;\n\n\t\t\t\t\tEvents.addEvent(browseButton, 'click', function(e) {\n\t\t\t\t\t\tvar input = Dom.get(I.uid);\n\t\t\t\t\t\tif (input && !input.disabled) { // for some reason FF (up to 8.0.1 so far) lets to click disabled input[type=file]\n\t\t\t\t\t\t\tinput.click();\n\t\t\t\t\t\t}\n\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t}, comp.uid);\n\t\t\t\t}\n\n\t\t\t\t/* Since we have to place input[type=file] on top of the browse_button for some browsers,\n\t\t\t\tbrowse_button loses interactivity, so we restore it here */\n\t\t\t\ttop = I.can('summon_file_dialog') ? browseButton : shimContainer;\n\n\t\t\t\tEvents.addEvent(top, 'mouseover', function() {\n\t\t\t\t\tcomp.trigger('mouseenter');\n\t\t\t\t}, comp.uid);\n\n\t\t\t\tEvents.addEvent(top, 'mouseout', function() {\n\t\t\t\t\tcomp.trigger('mouseleave');\n\t\t\t\t}, comp.uid);\n\n\t\t\t\tEvents.addEvent(top, 'mousedown', function() {\n\t\t\t\t\tcomp.trigger('mousedown');\n\t\t\t\t}, comp.uid);\n\n\t\t\t\tEvents.addEvent(Dom.get(_options.container), 'mouseup', function() {\n\t\t\t\t\tcomp.trigger('mouseup');\n\t\t\t\t}, comp.uid);\n\n\n\t\t\t\tinput.onchange = function onChange(e) { // there should be only one handler for this\n\t\t\t\t\tcomp.files = [];\n\n\t\t\t\t\tBasic.each(this.files, function(file) {\n\t\t\t\t\t\tvar relativePath = '';\n\n\t\t\t\t\t\tif (_options.directory) {\n\t\t\t\t\t\t\t// folders are represented by dots, filter them out (Chrome 11+)\n\t\t\t\t\t\t\tif (file.name == \".\") {\n\t\t\t\t\t\t\t\t// if it looks like a folder...\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (file.webkitRelativePath) {\n\t\t\t\t\t\t\trelativePath = '/' + file.webkitRelativePath.replace(/^\\//, '');\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t\tfile = new File(I.uid, file);\n\t\t\t\t\t\tfile.relativePath = relativePath;\n\n\t\t\t\t\t\tcomp.files.push(file);\n\t\t\t\t\t});\n\n\t\t\t\t\t// clearing the value enables the user to select the same file again if they want to\n\t\t\t\t\tif (Env.browser !== 'IE' && Env.browser !== 'IEMobile') {\n\t\t\t\t\t\tthis.value = '';\n\t\t\t\t\t} else {\n\t\t\t\t\t\t// in IE input[type=\"file\"] is read-only so the only way to reset it is to re-insert it\n\t\t\t\t\t\tvar clone = this.cloneNode(true);\n\t\t\t\t\t\tthis.parentNode.replaceChild(clone, this);\n\t\t\t\t\t\tclone.onchange = onChange;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (comp.files.length) {\n\t\t\t\t\t\tcomp.trigger('change');\n\t\t\t\t\t}\n\t\t\t\t};\n\n\t\t\t\t// ready event is perfectly asynchronous\n\t\t\t\tcomp.trigger({\n\t\t\t\t\ttype: 'ready',\n\t\t\t\t\tasync: true\n\t\t\t\t});\n\n\t\t\t\tshimContainer = null;\n\t\t\t},\n\n\n\t\t\tdisable: function(state) {\n\t\t\t\tvar I = this.getRuntime(), input;\n\n\t\t\t\tif ((input = Dom.get(I.uid))) {\n\t\t\t\t\tinput.disabled = !!state;\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tdestroy: function() {\n\t\t\t\tvar I = this.getRuntime()\n\t\t\t\t, shim = I.getShim()\n\t\t\t\t, shimContainer = I.getShimContainer()\n\t\t\t\t;\n\t\t\t\t\n\t\t\t\tEvents.removeAllEvents(shimContainer, this.uid);\n\t\t\t\tEvents.removeAllEvents(_options && Dom.get(_options.container), this.uid);\n\t\t\t\tEvents.removeAllEvents(_options && Dom.get(_options.browse_button), this.uid);\n\t\t\t\t\n\t\t\t\tif (shimContainer) {\n\t\t\t\t\tshimContainer.innerHTML = '';\n\t\t\t\t}\n\n\t\t\t\tshim.removeInstance(this.uid);\n\n\t\t\t\t_options = shimContainer = shim = null;\n\t\t\t}\n\t\t});\n\t}\n\n\treturn (extensions.FileInput = FileInput);\n});");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "258:4950");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "553:4901");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4905:4946");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "578:590");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "595:4898");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "649:743");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "750:768");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "807:905");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "912:948");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "955:1297");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "1304:1326");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "1409:1537");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "1545:1591");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "1695:2303");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2468:2532");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2539:2635");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2642:2737");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2744:2839");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2846:2961");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2969:4092");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4144:4202");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4209:4229");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "1735:1847");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "1855:1920");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "1928:1962");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "1969:2008");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2016:2297");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "1800:1840");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2075:2101");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2109:2252");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2260:2278");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2231:2244");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2591:2617");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2693:2719");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2796:2821");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "2920:2943");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3059:3074");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3082:3603");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3701:4017");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4025:4085");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3128:3149");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3158:3363");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3372:3481");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3496:3524");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3532:3564");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3573:3594");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3263:3355");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3335:3346");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3410:3473");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3765:3780");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3896:3928");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3936:3977");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "3985:4010");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4056:4078");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4273:4305");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4312:4379");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4349:4373");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4417:4514");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4515:4515");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4526:4573");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4579:4652");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4658:4735");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4746:4806");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4813:4842");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4849:4887");
__$coverInitRange("src/javascript/runtime/html5/file/FileInput.js", "4772:4800");
__$coverCall('src/javascript/runtime/html5/file/FileInput.js', '258:4950');
define('moxie/runtime/html5/file/FileInput', [
    'moxie/runtime/html5/Runtime',
    'moxie/file/File',
    'moxie/core/utils/Basic',
    'moxie/core/utils/Dom',
    'moxie/core/utils/Events',
    'moxie/core/utils/Mime',
    'moxie/core/utils/Env'
], function (extensions, File, Basic, Dom, Events, Mime, Env) {
    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '553:4901');
    function FileInput() {
        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '578:590');
        var _options;
        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '595:4898');
        Basic.extend(this, {
            init: function (options) {
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '649:743');
                var comp = this, I = comp.getRuntime(), input, shimContainer, mimes, browseButton, zIndex, top;
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '750:768');
                _options = options;
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '807:905');
                mimes = _options.accept.mimes || Mime.extList2mimes(_options.accept, I.can('filter_by_extension'));
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '912:948');
                shimContainer = I.getShimContainer();
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '955:1297');
                shimContainer.innerHTML = '<input id="' + I.uid + '" type="file" style="font-size:999px;opacity:0;"' + (_options.multiple && I.can('select_multiple') ? 'multiple' : '') + (_options.directory && I.can('select_folder') ? 'webkitdirectory directory' : '') + (mimes ? ' accept="' + mimes.join(',') + '"' : '') + ' />';
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '1304:1326');
                input = Dom.get(I.uid);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '1409:1537');
                Basic.extend(input.style, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                });
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '1545:1591');
                browseButton = Dom.get(_options.browse_button);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '1695:2303');
                if (I.can('summon_file_dialog')) {
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '1735:1847');
                    if (Dom.getStyle(browseButton, 'position') === 'static') {
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '1800:1840');
                        browseButton.style.position = 'relative';
                    }
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '1855:1920');
                    zIndex = parseInt(Dom.getStyle(browseButton, 'z-index'), 10) || 1;
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '1928:1962');
                    browseButton.style.zIndex = zIndex;
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '1969:2008');
                    shimContainer.style.zIndex = zIndex - 1;
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2016:2297');
                    Events.addEvent(browseButton, 'click', function (e) {
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2075:2101');
                        var input = Dom.get(I.uid);
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2109:2252');
                        if (input && !input.disabled) {
                            __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2231:2244');
                            input.click();
                        }
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2260:2278');
                        e.preventDefault();
                    }, comp.uid);
                }
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2468:2532');
                top = I.can('summon_file_dialog') ? browseButton : shimContainer;
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2539:2635');
                Events.addEvent(top, 'mouseover', function () {
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2591:2617');
                    comp.trigger('mouseenter');
                }, comp.uid);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2642:2737');
                Events.addEvent(top, 'mouseout', function () {
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2693:2719');
                    comp.trigger('mouseleave');
                }, comp.uid);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2744:2839');
                Events.addEvent(top, 'mousedown', function () {
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2796:2821');
                    comp.trigger('mousedown');
                }, comp.uid);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2846:2961');
                Events.addEvent(Dom.get(_options.container), 'mouseup', function () {
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2920:2943');
                    comp.trigger('mouseup');
                }, comp.uid);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '2969:4092');
                input.onchange = function onChange(e) {
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3059:3074');
                    comp.files = [];
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3082:3603');
                    Basic.each(this.files, function (file) {
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3128:3149');
                        var relativePath = '';
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3158:3363');
                        if (_options.directory) {
                            __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3263:3355');
                            if (file.name == '.') {
                                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3335:3346');
                                return true;
                            }
                        }
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3372:3481');
                        if (file.webkitRelativePath) {
                            __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3410:3473');
                            relativePath = '/' + file.webkitRelativePath.replace(/^\//, '');
                        }
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3496:3524');
                        file = new File(I.uid, file);
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3532:3564');
                        file.relativePath = relativePath;
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3573:3594');
                        comp.files.push(file);
                    });
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3701:4017');
                    if (Env.browser !== 'IE' && Env.browser !== 'IEMobile') {
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3765:3780');
                        this.value = '';
                    } else {
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3896:3928');
                        var clone = this.cloneNode(true);
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3936:3977');
                        this.parentNode.replaceChild(clone, this);
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '3985:4010');
                        clone.onchange = onChange;
                    }
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4025:4085');
                    if (comp.files.length) {
                        __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4056:4078');
                        comp.trigger('change');
                    }
                };
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4144:4202');
                comp.trigger({
                    type: 'ready',
                    async: true
                });
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4209:4229');
                shimContainer = null;
            },
            disable: function (state) {
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4273:4305');
                var I = this.getRuntime(), input;
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4312:4379');
                if (input = Dom.get(I.uid)) {
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4349:4373');
                    input.disabled = !!state;
                }
            },
            destroy: function () {
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4417:4514');
                var I = this.getRuntime(), shim = I.getShim(), shimContainer = I.getShimContainer();
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4515:4515');
                ;
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4526:4573');
                Events.removeAllEvents(shimContainer, this.uid);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4579:4652');
                Events.removeAllEvents(_options && Dom.get(_options.container), this.uid);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4658:4735');
                Events.removeAllEvents(_options && Dom.get(_options.browse_button), this.uid);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4746:4806');
                if (shimContainer) {
                    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4772:4800');
                    shimContainer.innerHTML = '';
                }
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4813:4842');
                shim.removeInstance(this.uid);
                __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4849:4887');
                _options = shimContainer = shim = null;
            }
        });
    }
    __$coverCall('src/javascript/runtime/html5/file/FileInput.js', '4905:4946');
    return extensions.FileInput = FileInput;
});

// Included from: src/javascript/runtime/html5/file/Blob.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/html5/file/Blob.js", "/**\n * Blob.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\n/**\n@class moxie/runtime/html5/file/Blob\n@private\n*/\ndefine(\"moxie/runtime/html5/file/Blob\", [\n\t\"moxie/runtime/html5/Runtime\",\n\t\"moxie/file/Blob\"\n], function(extensions, Blob) {\n\n\tfunction HTML5Blob() {\n\t\tfunction w3cBlobSlice(blob, start, end) {\n\t\t\tvar blobSlice;\n\n\t\t\tif (window.File.prototype.slice) {\n\t\t\t\ttry {\n\t\t\t\t\tblob.slice();\t// depricated version will throw WRONG_ARGUMENTS_ERR exception\n\t\t\t\t\treturn blob.slice(start, end);\n\t\t\t\t} catch (e) {\n\t\t\t\t\t// depricated slice method\n\t\t\t\t\treturn blob.slice(start, end - start);\n\t\t\t\t}\n\t\t\t// slice method got prefixed: https://bugzilla.mozilla.org/show_bug.cgi?id=649672\n\t\t\t} else if ((blobSlice = window.File.prototype.webkitSlice || window.File.prototype.mozSlice)) {\n\t\t\t\treturn blobSlice.call(blob, start, end);\n\t\t\t} else {\n\t\t\t\treturn null; // or throw some exception\n\t\t\t}\n\t\t}\n\n\t\tthis.slice = function() {\n\t\t\treturn new Blob(this.getRuntime().uid, w3cBlobSlice.apply(this, arguments));\n\t\t};\n\t}\n\n\treturn (extensions.Blob = HTML5Blob);\n});\n");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "248:1180");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "375:1136");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "1140:1176");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "400:1019");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "1024:1133");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "445:458");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "464:1015");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "503:725");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "514:526");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "596:625");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "682:719");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "915:954");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "972:983");
__$coverInitRange("src/javascript/runtime/html5/file/Blob.js", "1053:1128");
__$coverCall('src/javascript/runtime/html5/file/Blob.js', '248:1180');
define('moxie/runtime/html5/file/Blob', [
    'moxie/runtime/html5/Runtime',
    'moxie/file/Blob'
], function (extensions, Blob) {
    __$coverCall('src/javascript/runtime/html5/file/Blob.js', '375:1136');
    function HTML5Blob() {
        __$coverCall('src/javascript/runtime/html5/file/Blob.js', '400:1019');
        function w3cBlobSlice(blob, start, end) {
            __$coverCall('src/javascript/runtime/html5/file/Blob.js', '445:458');
            var blobSlice;
            __$coverCall('src/javascript/runtime/html5/file/Blob.js', '464:1015');
            if (window.File.prototype.slice) {
                __$coverCall('src/javascript/runtime/html5/file/Blob.js', '503:725');
                try {
                    __$coverCall('src/javascript/runtime/html5/file/Blob.js', '514:526');
                    blob.slice();
                    __$coverCall('src/javascript/runtime/html5/file/Blob.js', '596:625');
                    return blob.slice(start, end);
                } catch (e) {
                    __$coverCall('src/javascript/runtime/html5/file/Blob.js', '682:719');
                    return blob.slice(start, end - start);
                }
            } else if (blobSlice = window.File.prototype.webkitSlice || window.File.prototype.mozSlice) {
                __$coverCall('src/javascript/runtime/html5/file/Blob.js', '915:954');
                return blobSlice.call(blob, start, end);
            } else {
                __$coverCall('src/javascript/runtime/html5/file/Blob.js', '972:983');
                return null;
            }
        }
        __$coverCall('src/javascript/runtime/html5/file/Blob.js', '1024:1133');
        this.slice = function () {
            __$coverCall('src/javascript/runtime/html5/file/Blob.js', '1053:1128');
            return new Blob(this.getRuntime().uid, w3cBlobSlice.apply(this, arguments));
        };
    }
    __$coverCall('src/javascript/runtime/html5/file/Blob.js', '1140:1176');
    return extensions.Blob = HTML5Blob;
});

// Included from: src/javascript/runtime/html5/file/FileReader.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/html5/file/FileReader.js", "/**\n * FileReader.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\n/**\n@class moxie/runtime/html5/file/FileReader\n@private\n*/\ndefine(\"moxie/runtime/html5/file/FileReader\", [\n\t\"moxie/runtime/html5/Runtime\",\n\t\"moxie/core/utils/Encode\",\n\t\"moxie/core/utils/Basic\"\n], function(extensions, Encode, Basic) {\n\t\n\tfunction FileReader() {\n\t\tvar _fr, _convertToBinary = false;\n\n\t\tBasic.extend(this, {\n\n\t\t\tread: function(op, blob) {\n\t\t\t\tvar comp = this;\n\n\t\t\t\tcomp.result = '';\n\n\t\t\t\t_fr = new window.FileReader();\n\n\t\t\t\t_fr.addEventListener('progress', function(e) {\n\t\t\t\t\tcomp.trigger(e);\n\t\t\t\t});\n\n\t\t\t\t_fr.addEventListener('load', function(e) {\n\t\t\t\t\tcomp.result = _convertToBinary ? _toBinary(_fr.result) : _fr.result;\n\t\t\t\t\tcomp.trigger(e);\n\t\t\t\t});\n\n\t\t\t\t_fr.addEventListener('error', function(e) {\n\t\t\t\t\tcomp.trigger(e, _fr.error);\n\t\t\t\t});\n\n\t\t\t\t_fr.addEventListener('loadend', function(e) {\n\t\t\t\t\t_fr = null;\n\t\t\t\t\tcomp.trigger(e);\n\t\t\t\t});\n\n\t\t\t\tif (Basic.typeOf(_fr[op]) === 'function') {\n\t\t\t\t\t_convertToBinary = false;\n\t\t\t\t\t_fr[op](blob.getSource());\n\t\t\t\t} else if (op === 'readAsBinaryString') { // readAsBinaryString is depricated in general and never existed in IE10+\n\t\t\t\t\t_convertToBinary = true;\n\t\t\t\t\t_fr.readAsDataURL(blob.getSource());\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tabort: function() {\n\t\t\t\tif (_fr) {\n\t\t\t\t\t_fr.abort();\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tdestroy: function() {\n\t\t\t\t_fr = null;\n\t\t\t}\n\t\t});\n\n\t\tfunction _toBinary(str) {\n\t\t\treturn Encode.atob(str.substring(str.indexOf('base64,') + 7));\n\t\t}\n\t}\n\n\treturn (extensions.FileReader = FileReader);\n});\n");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "260:1645");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "438:1594");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1598:1641");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "464:497");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "502:1492");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1497:1591");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "558:573");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "580:596");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "603:632");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "639:714");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "721:866");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "873:956");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "963:1054");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1061:1364");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "691:706");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "769:836");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "843:858");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "922:948");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1014:1024");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1031:1046");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1110:1134");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1141:1166");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1293:1316");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1323:1358");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1400:1433");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1416:1427");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1471:1481");
__$coverInitRange("src/javascript/runtime/html5/file/FileReader.js", "1526:1587");
__$coverCall('src/javascript/runtime/html5/file/FileReader.js', '260:1645');
define('moxie/runtime/html5/file/FileReader', [
    'moxie/runtime/html5/Runtime',
    'moxie/core/utils/Encode',
    'moxie/core/utils/Basic'
], function (extensions, Encode, Basic) {
    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '438:1594');
    function FileReader() {
        __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '464:497');
        var _fr, _convertToBinary = false;
        __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '502:1492');
        Basic.extend(this, {
            read: function (op, blob) {
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '558:573');
                var comp = this;
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '580:596');
                comp.result = '';
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '603:632');
                _fr = new window.FileReader();
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '639:714');
                _fr.addEventListener('progress', function (e) {
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '691:706');
                    comp.trigger(e);
                });
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '721:866');
                _fr.addEventListener('load', function (e) {
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '769:836');
                    comp.result = _convertToBinary ? _toBinary(_fr.result) : _fr.result;
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '843:858');
                    comp.trigger(e);
                });
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '873:956');
                _fr.addEventListener('error', function (e) {
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '922:948');
                    comp.trigger(e, _fr.error);
                });
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '963:1054');
                _fr.addEventListener('loadend', function (e) {
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1014:1024');
                    _fr = null;
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1031:1046');
                    comp.trigger(e);
                });
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1061:1364');
                if (Basic.typeOf(_fr[op]) === 'function') {
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1110:1134');
                    _convertToBinary = false;
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1141:1166');
                    _fr[op](blob.getSource());
                } else if (op === 'readAsBinaryString') {
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1293:1316');
                    _convertToBinary = true;
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1323:1358');
                    _fr.readAsDataURL(blob.getSource());
                }
            },
            abort: function () {
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1400:1433');
                if (_fr) {
                    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1416:1427');
                    _fr.abort();
                }
            },
            destroy: function () {
                __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1471:1481');
                _fr = null;
            }
        });
        __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1497:1591');
        function _toBinary(str) {
            __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1526:1587');
            return Encode.atob(str.substring(str.indexOf('base64,') + 7));
        }
    }
    __$coverCall('src/javascript/runtime/html5/file/FileReader.js', '1598:1641');
    return extensions.FileReader = FileReader;
});

// Included from: src/javascript/runtime/flash/Runtime.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/flash/Runtime.js", "/**\n * Runtime.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\n/*global ActiveXObject:true */\n\n/**\nDefines constructor for Flash runtime.\n\n@class moxie/runtime/flash/Runtime\n@private\n*/\ndefine(\"moxie/runtime/flash/Runtime\", [\n\t\"moxie/core/utils/Basic\",\n\t\"moxie/core/utils/Env\",\n\t\"moxie/core/utils/Dom\",\n\t\"moxie/core/Exceptions\",\n\t\"moxie/runtime/Runtime\"\n], function(Basic, Env, Dom, x, Runtime) {\n\t\n\tvar type = 'flash', extensions = {};\n\n\t/**\n\tGet the version of the Flash Player\n\n\t@method getShimVersion\n\t@private\n\t@return {Number} Flash Player version\n\t*/\n\tfunction getShimVersion() {\n\t\tvar version;\n\n\t\ttry {\n\t\t\tversion = navigator.plugins['Shockwave Flash'];\n\t\t\tversion = version.description;\n\t\t} catch (e1) {\n\t\t\ttry {\n\t\t\t\tversion = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');\n\t\t\t} catch (e2) {\n\t\t\t\tversion = '0.0';\n\t\t\t}\n\t\t}\n\t\tversion = version.match(/\\d+/g);\n\t\treturn parseFloat(version[0] + '.' + version[1]);\n\t}\n\n\n\t/**\n\tCross-browser SWF removal\n    \t- Especially needed to safely and completely remove a SWF in Internet Explorer\n\n   \tOriginated from SWFObject v2.2 <http://code.google.com/p/swfobject/> \n\t*/\n\tfunction removeSWF(id) {\n        var obj = Dom.get(id);\n        if (obj && obj.nodeName == \"OBJECT\") {\n            if (Env.browser === 'IE') {\n                obj.style.display = \"none\";\n                (function onInit(){\n                \t// http://msdn.microsoft.com/en-us/library/ie/ms534360(v=vs.85).aspx\n                    if (obj.readyState == 4) {\n                        removeObjectInIE(id);\n                    }\n                    else {\n                        setTimeout(onInit, 10);\n                    }\n                })();\n            }\n            else {\n                obj.parentNode.removeChild(obj);\n            }\n        }\n    }\n\n\n\tfunction removeObjectInIE(id) {\n        var obj = Dom.get(id);\n        if (obj) {\n            for (var i in obj) {\n                if (typeof obj[i] == \"function\") {\n                    obj[i] = null;\n                }\n            }\n            obj.parentNode.removeChild(obj);\n        }\n    }\n\n\t/**\n\tConstructor for the Flash Runtime\n\n\t@class FlashRuntime\n\t@extends Runtime\n\t*/\n\tfunction FlashRuntime(options) {\n\t\tvar I = this, initTimer;\n\n\t\toptions = Basic.extend({ swf_url: Env.swf_url }, options);\n\n\t\tRuntime.call(this, options, type, {\n\t\t\taccess_binary: function(value) {\n\t\t\t\treturn value && I.mode === 'browser';\n\t\t\t},\n\t\t\taccess_image_binary: function(value) {\n\t\t\t\treturn value && I.mode === 'browser';\n\t\t\t},\n\t\t\tdisplay_media: Runtime.capTrue,\n\t\t\tdo_cors: Runtime.capTrue,\n\t\t\tdrag_and_drop: false,\n\t\t\treport_upload_progress: function() {\n\t\t\t\treturn I.mode === 'client';\n\t\t\t},\n\t\t\tresize_image: Runtime.capTrue,\n\t\t\treturn_response_headers: false,\n\t\t\treturn_response_type: function(responseType) {\n\t\t\t\tif (responseType === 'json' && !!window.JSON) {\n\t\t\t\t\treturn true;\n\t\t\t\t} \n\t\t\t\treturn !Basic.arrayDiff(responseType, ['', 'text', 'document']) || I.mode === 'browser';\n\t\t\t},\n\t\t\treturn_status_code: function(code) {\n\t\t\t\treturn I.mode === 'browser' || !Basic.arrayDiff(code, [200, 404]);\n\t\t\t},\n\t\t\tselect_file: Runtime.capTrue,\n\t\t\tselect_multiple: Runtime.capTrue,\n\t\t\tsend_binary_string: function(value) {\n\t\t\t\treturn value && I.mode === 'browser';\n\t\t\t},\n\t\t\tsend_browser_cookies: function(value) {\n\t\t\t\treturn value && I.mode === 'browser';\n\t\t\t},\n\t\t\tsend_custom_headers: function(value) {\n\t\t\t\treturn value && I.mode === 'browser';\n\t\t\t},\n\t\t\tsend_multipart: Runtime.capTrue,\n\t\t\tslice_blob: function(value) {\n\t\t\t\treturn value && I.mode === 'browser';\n\t\t\t},\n\t\t\tstream_upload: function(value) {\n\t\t\t\treturn value && I.mode === 'browser';\n\t\t\t},\n\t\t\tsummon_file_dialog: false,\n\t\t\tupload_filesize: function(size) {\n\t\t\t\treturn Basic.parseSizeStr(size) <= 2097152 || I.mode === 'client';\n\t\t\t},\n\t\t\tuse_http_method: function(methods) {\n\t\t\t\treturn !Basic.arrayDiff(methods, ['GET', 'POST']);\n\t\t\t}\n\t\t}, { \n\t\t\t// capabilities that require specific mode\n\t\t\taccess_binary: function(value) {\n\t\t\t\treturn value ? 'browser' : 'client';\n\t\t\t},\n\t\t\taccess_image_binary: function(value) {\n\t\t\t\treturn value ? 'browser' : 'client';\n\t\t\t},\n\t\t\treport_upload_progress: function(value) {\n\t\t\t\treturn value ? 'browser' : 'client';\n\t\t\t},\n\t\t\treturn_response_type: function(responseType) {\n\t\t\t\treturn Basic.arrayDiff(responseType, ['', 'text', 'json', 'document']) ? 'browser' : ['client', 'browser'];\n\t\t\t},\n\t\t\treturn_status_code: function(code) {\n\t\t\t\treturn Basic.arrayDiff(code, [200, 404]) ? 'browser' : ['client', 'browser'];\n\t\t\t},\n\t\t\tsend_binary_string: function(value) {\n\t\t\t\treturn value ? 'browser' : 'client';\n\t\t\t},\n\t\t\tsend_browser_cookies: function(value) {\n\t\t\t\treturn value ? 'browser' : 'client';\n\t\t\t},\n\t\t\tsend_custom_headers: function(value) {\n\t\t\t\treturn value ? 'browser' : 'client';\n\t\t\t},\n\t\t\tstream_upload: function(value) {\n\t\t\t\treturn value ? 'client' : 'browser';\n\t\t\t},\n\t\t\tupload_filesize: function(size) {\n\t\t\t\treturn Basic.parseSizeStr(size) >= 2097152 ? 'client' : 'browser';\n\t\t\t}\n\t\t}, 'client');\n\n\n\t\t// minimal requirement for Flash Player version\n\t\tif (getShimVersion() < 11.3) {\n\t\t\tif (MXI_DEBUG && Env.debug.runtime) {\n\t\t\t\tEnv.log(\"\\tFlash didn't meet minimal version requirement (11.3).\");\t\n\t\t\t}\n\n\t\t\tthis.mode = false; // with falsy mode, runtime won't operable, no matter what the mode was before\n\t\t}\n\n\n\t\tBasic.extend(this, {\n\n\t\t\tgetShim: function() {\n\t\t\t\treturn Dom.get(this.uid);\n\t\t\t},\n\n\t\t\tshimExec: function(component, action) {\n\t\t\t\tvar args = [].slice.call(arguments, 2);\n\t\t\t\treturn I.getShim().exec(this.uid, component, action, args);\n\t\t\t},\n\n\t\t\tinit: function() {\n\t\t\t\tvar html, el, container;\n\n\t\t\t\tcontainer = this.getShimContainer();\n\n\t\t\t\t// if not the minimal height, shims are not initialized in older browsers (e.g FF3.6, IE6,7,8, Safari 4.0,5.0, etc)\n\t\t\t\tBasic.extend(container.style, {\n\t\t\t\t\tposition: 'absolute',\n\t\t\t\t\ttop: '-8px',\n\t\t\t\t\tleft: '-8px',\n\t\t\t\t\twidth: '9px',\n\t\t\t\t\theight: '9px',\n\t\t\t\t\toverflow: 'hidden'\n\t\t\t\t});\n\n\t\t\t\t// insert flash object\n\t\t\t\thtml = '<object id=\"' + this.uid + '\" type=\"application/x-shockwave-flash\" data=\"' +  options.swf_url + '\" ';\n\n\t\t\t\tif (Env.browser === 'IE') {\n\t\t\t\t\thtml += 'classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" ';\n\t\t\t\t}\n\n\t\t\t\thtml += 'width=\"100%\" height=\"100%\" style=\"outline:0\">'  +\n\t\t\t\t\t'<param name=\"movie\" value=\"' + options.swf_url + '\" />' +\n\t\t\t\t\t'<param name=\"flashvars\" value=\"uid=' + escape(this.uid) + '&target=' + Env.global_event_dispatcher + '\" />' +\n\t\t\t\t\t'<param name=\"wmode\" value=\"transparent\" />' +\n\t\t\t\t\t'<param name=\"allowscriptaccess\" value=\"always\" />' +\n\t\t\t\t'</object>';\n\n\t\t\t\tif (Env.browser === 'IE') {\n\t\t\t\t\tel = document.createElement('div');\n\t\t\t\t\tcontainer.appendChild(el);\n\t\t\t\t\tel.outerHTML = html;\n\t\t\t\t\tel = container = null; // just in case\n\t\t\t\t} else {\n\t\t\t\t\tcontainer.innerHTML = html;\n\t\t\t\t}\n\n\t\t\t\t// Init is dispatched by the shim\n\t\t\t\tinitTimer = setTimeout(function() {\n\t\t\t\t\tif (I && !I.initialized) { // runtime might be already destroyed by this moment\n\t\t\t\t\t\tI.trigger(\"Error\", new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR));\n\n\t\t\t\t\t\tif (MXI_DEBUG && Env.debug.runtime) {\n\t\t\t\t\t\t\tEnv.log(\"\\tFlash failed to initialize within a specified period of time (typically 5s).\");\t\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}, 5000);\n\t\t\t},\n\n\t\t\tdestroy: (function(destroy) { // extend default destroy method\n\t\t\t\treturn function() {\n\t\t\t\t\tremoveSWF(I.uid); // SWF removal requires special care in IE\n\n\t\t\t\t\tdestroy.call(I);\n\t\t\t\t\tclearTimeout(initTimer); // initialization check might be still onwait\n\t\t\t\t\toptions = initTimer = destroy = I = null;\n\t\t\t\t};\n\t\t\t}(this.destroy))\n\n\t\t}, extensions);\n\t}\n\n\tRuntime.addConstructor(type, FlashRuntime);\n\n\treturn extensions;\n});\n");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "321:7744");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "535:570");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "694:1083");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1283:1936");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1941:2233");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2321:7673");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7677:7719");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7723:7740");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "724:735");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "740:993");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "997:1028");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1032:1080");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "749:795");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "800:829");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "851:989");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "861:945");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "969:984");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1316:1337");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1347:1930");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1398:1920");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1442:1468");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1486:1824");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1612:1802");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1663:1683");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1758:1780");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1875:1906");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "1981:2002");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2012:2227");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2035:2172");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2186:2217");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2072:2158");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2127:2140");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2356:2379");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2384:2441");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2446:5111");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5167:5421");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5427:7670");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2522:2558");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2612:2648");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2789:2815");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2946:3016");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "3023:3110");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "2999:3010");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "3162:3227");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "3350:3386");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "3441:3477");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "3531:3567");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "3648:3684");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "3732:3768");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "3847:3912");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "3964:4013");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "4114:4149");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "4203:4238");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "4295:4330");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "4392:4498");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "4550:4626");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "4679:4714");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "4769:4804");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "4858:4893");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "4941:4976");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5025:5090");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5201:5315");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5321:5338");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5243:5309");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5478:5502");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5558:5596");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5602:5660");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5695:5718");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5725:5760");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "5887:6052");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6086:6194");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6201:6303");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6310:6675");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6682:6903");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6948:7315");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6234:6297");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6715:6749");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6756:6781");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6788:6807");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6814:6835");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6871:6897");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "6989:7301");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7075:7142");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7151:7294");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7196:7285");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7394:7631");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7419:7435");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7486:7501");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7508:7531");
__$coverInitRange("src/javascript/runtime/flash/Runtime.js", "7584:7624");
__$coverCall('src/javascript/runtime/flash/Runtime.js', '321:7744');
define('moxie/runtime/flash/Runtime', [
    'moxie/core/utils/Basic',
    'moxie/core/utils/Env',
    'moxie/core/utils/Dom',
    'moxie/core/Exceptions',
    'moxie/runtime/Runtime'
], function (Basic, Env, Dom, x, Runtime) {
    __$coverCall('src/javascript/runtime/flash/Runtime.js', '535:570');
    var type = 'flash', extensions = {};
    __$coverCall('src/javascript/runtime/flash/Runtime.js', '694:1083');
    function getShimVersion() {
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '724:735');
        var version;
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '740:993');
        try {
            __$coverCall('src/javascript/runtime/flash/Runtime.js', '749:795');
            version = navigator.plugins['Shockwave Flash'];
            __$coverCall('src/javascript/runtime/flash/Runtime.js', '800:829');
            version = version.description;
        } catch (e1) {
            __$coverCall('src/javascript/runtime/flash/Runtime.js', '851:989');
            try {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '861:945');
                version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
            } catch (e2) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '969:984');
                version = '0.0';
            }
        }
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '997:1028');
        version = version.match(/\d+/g);
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '1032:1080');
        return parseFloat(version[0] + '.' + version[1]);
    }
    __$coverCall('src/javascript/runtime/flash/Runtime.js', '1283:1936');
    function removeSWF(id) {
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '1316:1337');
        var obj = Dom.get(id);
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '1347:1930');
        if (obj && obj.nodeName == 'OBJECT') {
            __$coverCall('src/javascript/runtime/flash/Runtime.js', '1398:1920');
            if (Env.browser === 'IE') {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '1442:1468');
                obj.style.display = 'none';
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '1486:1824');
                (function onInit() {
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '1612:1802');
                    if (obj.readyState == 4) {
                        __$coverCall('src/javascript/runtime/flash/Runtime.js', '1663:1683');
                        removeObjectInIE(id);
                    } else {
                        __$coverCall('src/javascript/runtime/flash/Runtime.js', '1758:1780');
                        setTimeout(onInit, 10);
                    }
                }());
            } else {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '1875:1906');
                obj.parentNode.removeChild(obj);
            }
        }
    }
    __$coverCall('src/javascript/runtime/flash/Runtime.js', '1941:2233');
    function removeObjectInIE(id) {
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '1981:2002');
        var obj = Dom.get(id);
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '2012:2227');
        if (obj) {
            __$coverCall('src/javascript/runtime/flash/Runtime.js', '2035:2172');
            for (var i in obj) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '2072:2158');
                if (typeof obj[i] == 'function') {
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '2127:2140');
                    obj[i] = null;
                }
            }
            __$coverCall('src/javascript/runtime/flash/Runtime.js', '2186:2217');
            obj.parentNode.removeChild(obj);
        }
    }
    __$coverCall('src/javascript/runtime/flash/Runtime.js', '2321:7673');
    function FlashRuntime(options) {
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '2356:2379');
        var I = this, initTimer;
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '2384:2441');
        options = Basic.extend({ swf_url: Env.swf_url }, options);
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '2446:5111');
        Runtime.call(this, options, type, {
            access_binary: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '2522:2558');
                return value && I.mode === 'browser';
            },
            access_image_binary: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '2612:2648');
                return value && I.mode === 'browser';
            },
            display_media: Runtime.capTrue,
            do_cors: Runtime.capTrue,
            drag_and_drop: false,
            report_upload_progress: function () {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '2789:2815');
                return I.mode === 'client';
            },
            resize_image: Runtime.capTrue,
            return_response_headers: false,
            return_response_type: function (responseType) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '2946:3016');
                if (responseType === 'json' && !!window.JSON) {
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '2999:3010');
                    return true;
                }
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '3023:3110');
                return !Basic.arrayDiff(responseType, [
                    '',
                    'text',
                    'document'
                ]) || I.mode === 'browser';
            },
            return_status_code: function (code) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '3162:3227');
                return I.mode === 'browser' || !Basic.arrayDiff(code, [
                    200,
                    404
                ]);
            },
            select_file: Runtime.capTrue,
            select_multiple: Runtime.capTrue,
            send_binary_string: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '3350:3386');
                return value && I.mode === 'browser';
            },
            send_browser_cookies: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '3441:3477');
                return value && I.mode === 'browser';
            },
            send_custom_headers: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '3531:3567');
                return value && I.mode === 'browser';
            },
            send_multipart: Runtime.capTrue,
            slice_blob: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '3648:3684');
                return value && I.mode === 'browser';
            },
            stream_upload: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '3732:3768');
                return value && I.mode === 'browser';
            },
            summon_file_dialog: false,
            upload_filesize: function (size) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '3847:3912');
                return Basic.parseSizeStr(size) <= 2097152 || I.mode === 'client';
            },
            use_http_method: function (methods) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '3964:4013');
                return !Basic.arrayDiff(methods, [
                    'GET',
                    'POST'
                ]);
            }
        }, {
            access_binary: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '4114:4149');
                return value ? 'browser' : 'client';
            },
            access_image_binary: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '4203:4238');
                return value ? 'browser' : 'client';
            },
            report_upload_progress: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '4295:4330');
                return value ? 'browser' : 'client';
            },
            return_response_type: function (responseType) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '4392:4498');
                return Basic.arrayDiff(responseType, [
                    '',
                    'text',
                    'json',
                    'document'
                ]) ? 'browser' : [
                    'client',
                    'browser'
                ];
            },
            return_status_code: function (code) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '4550:4626');
                return Basic.arrayDiff(code, [
                    200,
                    404
                ]) ? 'browser' : [
                    'client',
                    'browser'
                ];
            },
            send_binary_string: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '4679:4714');
                return value ? 'browser' : 'client';
            },
            send_browser_cookies: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '4769:4804');
                return value ? 'browser' : 'client';
            },
            send_custom_headers: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '4858:4893');
                return value ? 'browser' : 'client';
            },
            stream_upload: function (value) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '4941:4976');
                return value ? 'client' : 'browser';
            },
            upload_filesize: function (size) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '5025:5090');
                return Basic.parseSizeStr(size) >= 2097152 ? 'client' : 'browser';
            }
        }, 'client');
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '5167:5421');
        if (getShimVersion() < 11.3) {
            __$coverCall('src/javascript/runtime/flash/Runtime.js', '5201:5315');
            if (MXI_DEBUG && Env.debug.runtime) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '5243:5309');
                Env.log('\tFlash didn\'t meet minimal version requirement (11.3).');
            }
            __$coverCall('src/javascript/runtime/flash/Runtime.js', '5321:5338');
            this.mode = false;
        }
        __$coverCall('src/javascript/runtime/flash/Runtime.js', '5427:7670');
        Basic.extend(this, {
            getShim: function () {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '5478:5502');
                return Dom.get(this.uid);
            },
            shimExec: function (component, action) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '5558:5596');
                var args = [].slice.call(arguments, 2);
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '5602:5660');
                return I.getShim().exec(this.uid, component, action, args);
            },
            init: function () {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '5695:5718');
                var html, el, container;
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '5725:5760');
                container = this.getShimContainer();
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '5887:6052');
                Basic.extend(container.style, {
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    width: '9px',
                    height: '9px',
                    overflow: 'hidden'
                });
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '6086:6194');
                html = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + options.swf_url + '" ';
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '6201:6303');
                if (Env.browser === 'IE') {
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '6234:6297');
                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                }
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '6310:6675');
                html += 'width="100%" height="100%" style="outline:0">' + '<param name="movie" value="' + options.swf_url + '" />' + '<param name="flashvars" value="uid=' + escape(this.uid) + '&target=' + Env.global_event_dispatcher + '" />' + '<param name="wmode" value="transparent" />' + '<param name="allowscriptaccess" value="always" />' + '</object>';
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '6682:6903');
                if (Env.browser === 'IE') {
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '6715:6749');
                    el = document.createElement('div');
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '6756:6781');
                    container.appendChild(el);
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '6788:6807');
                    el.outerHTML = html;
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '6814:6835');
                    el = container = null;
                } else {
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '6871:6897');
                    container.innerHTML = html;
                }
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '6948:7315');
                initTimer = setTimeout(function () {
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '6989:7301');
                    if (I && !I.initialized) {
                        __$coverCall('src/javascript/runtime/flash/Runtime.js', '7075:7142');
                        I.trigger('Error', new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR));
                        __$coverCall('src/javascript/runtime/flash/Runtime.js', '7151:7294');
                        if (MXI_DEBUG && Env.debug.runtime) {
                            __$coverCall('src/javascript/runtime/flash/Runtime.js', '7196:7285');
                            Env.log('\tFlash failed to initialize within a specified period of time (typically 5s).');
                        }
                    }
                }, 5000);
            },
            destroy: function (destroy) {
                __$coverCall('src/javascript/runtime/flash/Runtime.js', '7394:7631');
                return function () {
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '7419:7435');
                    removeSWF(I.uid);
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '7486:7501');
                    destroy.call(I);
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '7508:7531');
                    clearTimeout(initTimer);
                    __$coverCall('src/javascript/runtime/flash/Runtime.js', '7584:7624');
                    options = initTimer = destroy = I = null;
                };
            }(this.destroy)
        }, extensions);
    }
    __$coverCall('src/javascript/runtime/flash/Runtime.js', '7677:7719');
    Runtime.addConstructor(type, FlashRuntime);
    __$coverCall('src/javascript/runtime/flash/Runtime.js', '7723:7740');
    return extensions;
});

// Included from: src/javascript/runtime/flash/file/FileInput.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/flash/file/FileInput.js", "/**\n * FileInput.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\n/**\n@class moxie/runtime/flash/file/FileInput\n@private\n*/\ndefine(\"moxie/runtime/flash/file/FileInput\", [\n\t\"moxie/runtime/flash/Runtime\",\n\t\"moxie/file/File\",\n\t\"moxie/core/utils/Basic\"\n], function(extensions, File, Basic) {\n\t\n\tvar FileInput = {\t\t\n\t\tinit: function(options) {\n\t\t\tvar comp = this, I = this.getRuntime();\n\n\t\t\tthis.bind(\"Change\", function() {\n\t\t\t\tvar files = I.shimExec.call(comp, 'FileInput', 'getFiles');\n\t\t\t\tcomp.files = [];\n\t\t\t\tBasic.each(files, function(file) {\n\t\t\t\t\tcomp.files.push(new File(I.uid, file));\n\t\t\t\t});\n\t\t\t}, 999);\n\n\t\t\tthis.getRuntime().shimExec.call(this, 'FileInput', 'init', {\n\t\t\t\tname: options.name,\n\t\t\t\taccept: options.accept,\n\t\t\t\tmultiple: options.multiple\n\t\t\t});\n\n\t\t\tthis.trigger('ready');\n\t\t}\n\t};\n\n\treturn (extensions.FileInput = FileInput);\n});\n\n");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "258:979");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "425:930");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "934:975");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "476:514");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "520:740");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "746:895");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "901:922");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "557:615");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "621:636");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "642:728");
__$coverInitRange("src/javascript/runtime/flash/file/FileInput.js", "682:720");
__$coverCall('src/javascript/runtime/flash/file/FileInput.js', '258:979');
define('moxie/runtime/flash/file/FileInput', [
    'moxie/runtime/flash/Runtime',
    'moxie/file/File',
    'moxie/core/utils/Basic'
], function (extensions, File, Basic) {
    __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '425:930');
    var FileInput = {
            init: function (options) {
                __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '476:514');
                var comp = this, I = this.getRuntime();
                __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '520:740');
                this.bind('Change', function () {
                    __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '557:615');
                    var files = I.shimExec.call(comp, 'FileInput', 'getFiles');
                    __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '621:636');
                    comp.files = [];
                    __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '642:728');
                    Basic.each(files, function (file) {
                        __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '682:720');
                        comp.files.push(new File(I.uid, file));
                    });
                }, 999);
                __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '746:895');
                this.getRuntime().shimExec.call(this, 'FileInput', 'init', {
                    name: options.name,
                    accept: options.accept,
                    multiple: options.multiple
                });
                __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '901:922');
                this.trigger('ready');
            }
        };
    __$coverCall('src/javascript/runtime/flash/file/FileInput.js', '934:975');
    return extensions.FileInput = FileInput;
});

// Included from: src/javascript/runtime/flash/file/Blob.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/flash/file/Blob.js", "/**\n * Blob.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\n/**\n@class moxie/runtime/flash/file/Blob\n@private\n*/\ndefine(\"moxie/runtime/flash/file/Blob\", [\n\t\"moxie/runtime/flash/Runtime\",\n\t\"moxie/file/Blob\"\n], function(extensions, Blob) {\n\n\tvar FlashBlob = {\n\t\tslice: function(blob, start, end, type) {\n\t\t\tvar self = this.getRuntime();\n\n\t\t\tif (start < 0) {\n\t\t\t\tstart = Math.max(blob.size + start, 0);\n\t\t\t} else if (start > 0) {\n\t\t\t\tstart = Math.min(start, blob.size);\n\t\t\t}\n\n\t\t\tif (end < 0) {\n\t\t\t\tend = Math.max(blob.size + end, 0);\n\t\t\t} else if (end > 0) {\n\t\t\t\tend = Math.min(end, blob.size);\n\t\t\t}\n\n\t\t\tblob = self.shimExec.call(this, 'Blob', 'slice', start, end, type || '');\n\n\t\t\tif (blob) {\n\t\t\t\tblob = new Blob(self.uid, blob);\n\t\t\t}\n\t\t\treturn blob;\n\t\t}\n\t};\n\n\treturn (extensions.Blob = FlashBlob);\n});");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "248:934");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "375:890");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "894:930");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "440:468");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "474:605");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "611:730");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "736:808");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "814:866");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "871:882");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "495:533");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "566:600");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "630:664");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "695:725");
__$coverInitRange("src/javascript/runtime/flash/file/Blob.js", "830:861");
__$coverCall('src/javascript/runtime/flash/file/Blob.js', '248:934');
define('moxie/runtime/flash/file/Blob', [
    'moxie/runtime/flash/Runtime',
    'moxie/file/Blob'
], function (extensions, Blob) {
    __$coverCall('src/javascript/runtime/flash/file/Blob.js', '375:890');
    var FlashBlob = {
            slice: function (blob, start, end, type) {
                __$coverCall('src/javascript/runtime/flash/file/Blob.js', '440:468');
                var self = this.getRuntime();
                __$coverCall('src/javascript/runtime/flash/file/Blob.js', '474:605');
                if (start < 0) {
                    __$coverCall('src/javascript/runtime/flash/file/Blob.js', '495:533');
                    start = Math.max(blob.size + start, 0);
                } else if (start > 0) {
                    __$coverCall('src/javascript/runtime/flash/file/Blob.js', '566:600');
                    start = Math.min(start, blob.size);
                }
                __$coverCall('src/javascript/runtime/flash/file/Blob.js', '611:730');
                if (end < 0) {
                    __$coverCall('src/javascript/runtime/flash/file/Blob.js', '630:664');
                    end = Math.max(blob.size + end, 0);
                } else if (end > 0) {
                    __$coverCall('src/javascript/runtime/flash/file/Blob.js', '695:725');
                    end = Math.min(end, blob.size);
                }
                __$coverCall('src/javascript/runtime/flash/file/Blob.js', '736:808');
                blob = self.shimExec.call(this, 'Blob', 'slice', start, end, type || '');
                __$coverCall('src/javascript/runtime/flash/file/Blob.js', '814:866');
                if (blob) {
                    __$coverCall('src/javascript/runtime/flash/file/Blob.js', '830:861');
                    blob = new Blob(self.uid, blob);
                }
                __$coverCall('src/javascript/runtime/flash/file/Blob.js', '871:882');
                return blob;
            }
        };
    __$coverCall('src/javascript/runtime/flash/file/Blob.js', '894:930');
    return extensions.Blob = FlashBlob;
});

// Included from: src/javascript/runtime/flash/file/FileReader.js

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/javascript/runtime/flash/file/FileReader.js", "/**\n * FileReader.js\n *\n * Copyright 2013, Moxiecode Systems AB\n * Released under GPL License.\n *\n * License: http://www.plupload.com/license\n * Contributing: http://www.plupload.com/contributing\n */\n\n/**\n@class moxie/runtime/flash/file/FileReader\n@private\n*/\ndefine(\"moxie/runtime/flash/file/FileReader\", [\n\t\"moxie/runtime/flash/Runtime\",\n\t\"moxie/core/utils/Encode\"\n], function(extensions, Encode) {\n\n\tfunction _formatData(data, op) {\n\t\tswitch (op) {\n\t\t\tcase 'readAsText':\n\t\t\t\treturn Encode.atob(data, 'utf8');\n\t\t\tcase 'readAsBinaryString':\n\t\t\t\treturn Encode.atob(data);\n\t\t\tcase 'readAsDataURL':\n\t\t\t\treturn data;\n\t\t}\n\t\treturn null;\n\t}\n\n\tvar FileReader = {\n\t\tread: function(op, blob) {\n\t\t\tvar comp = this;\n\n\t\t\tcomp.result = '';\n\n\t\t\t// special prefix for DataURL read mode\n\t\t\tif (op === 'readAsDataURL') {\n\t\t\t\tcomp.result = 'data:' + (blob.type || '') + ';base64,';\n\t\t\t}\n\n\t\t\tcomp.bind('Progress', function(e, data) {\n\t\t\t\tif (data) {\n\t\t\t\t\tcomp.result += _formatData(data, op);\n\t\t\t\t}\n\t\t\t}, 999);\n\n\t\t\treturn comp.getRuntime().shimExec.call(this, 'FileReader', 'readAsBase64', blob.uid);\n\t\t}\n\t};\n\n\treturn (extensions.FileReader = FileReader);\n});");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "260:1140");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "403:634");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "638:1089");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "1093:1136");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "438:616");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "620:631");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "478:510");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "546:570");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "601:612");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "689:704");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "710:726");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "775:868");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "874:991");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "997:1081");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "809:863");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "920:979");
__$coverInitRange("src/javascript/runtime/flash/file/FileReader.js", "937:973");
__$coverCall('src/javascript/runtime/flash/file/FileReader.js', '260:1140');
define('moxie/runtime/flash/file/FileReader', [
    'moxie/runtime/flash/Runtime',
    'moxie/core/utils/Encode'
], function (extensions, Encode) {
    __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '403:634');
    function _formatData(data, op) {
        __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '438:616');
        switch (op) {
        case 'readAsText':
            __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '478:510');
            return Encode.atob(data, 'utf8');
        case 'readAsBinaryString':
            __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '546:570');
            return Encode.atob(data);
        case 'readAsDataURL':
            __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '601:612');
            return data;
        }
        __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '620:631');
        return null;
    }
    __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '638:1089');
    var FileReader = {
            read: function (op, blob) {
                __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '689:704');
                var comp = this;
                __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '710:726');
                comp.result = '';
                __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '775:868');
                if (op === 'readAsDataURL') {
                    __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '809:863');
                    comp.result = 'data:' + (blob.type || '') + ';base64,';
                }
                __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '874:991');
                comp.bind('Progress', function (e, data) {
                    __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '920:979');
                    if (data) {
                        __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '937:973');
                        comp.result += _formatData(data, op);
                    }
                }, 999);
                __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '997:1081');
                return comp.getRuntime().shimExec.call(this, 'FileReader', 'readAsBase64', blob.uid);
            }
        };
    __$coverCall('src/javascript/runtime/flash/file/FileReader.js', '1093:1136');
    return extensions.FileReader = FileReader;
});

expose(["moxie/core/utils/Basic","moxie/core/utils/Env","moxie/core/I18n","moxie/core/utils/Mime","moxie/core/utils/Dom","moxie/core/Exceptions","moxie/core/EventTarget","moxie/runtime/Runtime","moxie/runtime/RuntimeClient","moxie/file/FileInput","moxie/core/utils/Encode","moxie/file/Blob","moxie/file/FileReader","moxie/file/File","moxie/core/utils/Events"]);
})(this);

(function() {
	var baseDir = '';
	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		var src = scripts[i].src;
		if (src.indexOf('/moxie.cov.js') != -1) {
			baseDir = src.substring(0, src.lastIndexOf('/'));
		}
	}
	document.write('<script type="text/javascript" src="' + baseDir + '/../../src/javascript/o.js"></script>');
})();
