(function(exports) {
	'use strict';

	/**
	 * Run validation on a configuration object.
	 * @param  {Array} obj  The configuration to test
	 * @return {Object}     Individual methods to test against.
	 */
	function validateConfig(debug) {

		var debug = debug || false;

		/**
		 * Ensures the config object is an Array.
		 * @param  {Array} arr  The config
		 * @return {Boolean}
		 */
		var shouldBeArray = function(arr) {
			var res = Array.isArray(arr);
			_debug('shouldBeArray', res);

			return res;
		};

		/**
		 * Ensures the labels names are not empty
		 * @param  {Array} arr  The config
		 * @return {Boolean}
		 */
		var noEmptyLabels = function(arr) {
			var isValid = true;

			arr.forEach(function(tab) {
				if (!tab.label || tab.label === ' ') isValid = false;
			});

			_debug('noEmptyLabels', isValid);

			return isValid;
		};

		/**
		 * Ensures the limits option is a number
		 * @param  {Array} arr  The config
		 * @return {Boolean}
		 */
		var noStringLimits = function(arr) {
			var isValid = true;

			arr.forEach(function(tab) {
				tab.elements.forEach(function(element) {
					if (typeof element.limit !== 'undefined') {
						if (typeof element.limit !== 'number') isValid = false;
					}
				});
			});

			_debug('noStringLimits', isValid);

			return isValid;
		};

		/**
		 * Ensures the options fields, if present, are not empty
		 * @param  {Array} arr  The config
		 * @return {Boolean}
		 */
		var noEmptyOptions = function(arr) {
			var isValid = true;

			arr.forEach(function(tab) {
				tab.elements.forEach(function(element) {
					for (var k in element) {
						if (k === 'options') {
							isValid = !!(element.options.length > 0);
						}
					}
				});
			});

			_debug('noEmptyOptions', isValid);

			return isValid;
		};

		/**
		 * Ensures all selected fields are booleans
		 * @param  {Array} arr  The config
		 * @return {Boolean}
		 */
		var booleanSelected = function(arr) {
			var isValid = true;

			arr.forEach(function(tab) {
				tab.elements.forEach(function(element) {
					for (var k in element) {
						if (k === 'options') {
							for (var j in element.options) {
								isValid = typeof element.options[j].selected === 'boolean'
							}
						}
					}
				});
			});

			_debug('booleanSelected', isValid);

			return isValid;
		};

		var uniqueElementNames = function(arr, shouldFix, invalid) {
  			var namesArray = [],
  				res;

  			_getElements(arr).map(function(el, i) {
      			return el.forEach(function(item) {
        			if (invalid === true) {
          				item.name = item.name + Math.round(Math.random() * 1000 - 1 + 1);
        			}
        			namesArray.push(item.name);
      			});
   			});

			if (namesArray.length) {
				res = _hasDuplicates(namesArray);

				if (!res && shouldFix) {
					return uniqueElementNames(arr, true, true);
				}
				return res;
			} else {
				return true;
			}
		};

		/**
		 * Ensures all option names are unique
		 *
		 * @param  {Array} arr         The config
		 * @param  {Boolean} shouldFix Tries to fix an invalid configuration
		 * @return {Boolean}
		 */
		var uniqueOptionNames = function(arr, shouldFix) {
			var namesArray = [],
				res;

			_getElements(arr).map(function(ea) {
				ea.forEach(function(item) {
	      	    	if (item.options) {
			        	return item.options.map(function(opt, i) {
			        		if (shouldFix === true) {
			        			opt.name = i + opt.name;
			        		}
			       	    	namesArray.push(opt.name);
			            });
			        }
			  	});
			});

			if (namesArray.length) {
				res = _hasDuplicates(namesArray);

				// If there are duplicates and it needs fixing,
				// re-run in order to fix the issue.
				if (!res && fix) {
					return uniqueOptionNames(arr, true);
				}

				_debug('uniqueOptionNames', res);
				return res;
			} else {
				_debug('uniqueOptionNames', true);
				return true;
			}
		};

		/**
		 * Ensures the "other" option field has at least two options present.
		 * @param  {Array} arr The config
		 * @return {Boolean}
		 */
		var otherOptionNotSingle = function(arr) {
			var isValid = true;

			_getElements(arr).map(function(item) {
			    item.forEach(function(c) {
			        if (typeof c.other_option !== 'undefined' && c.other_option === true) {
			            if (c.options.length < 2) isValid = false;
			      }
			    });
			});

			_debug('otherOptionNotSingle', isValid);

			return isValid;
		};

		/**
		 * Runs all validations at once.
		 * @param  {Array} arr   The config
		 * @return {Boolean}     If all tests pass
		 */
		var validateAll = function(arr) {
			return shouldBeArray(arr) && noEmptyLabels(arr)
				&& noStringLimits(arr) && uniqueOptionNames(arr)
				&& booleanSelected(arr) && noEmptyOptions(arr)
				&& otherOptionNotSingle(arr) && uniqueElementNames(arr, true);
		};

		/********************
		 * Private Methods **
		 ********************/

		/**
		 * Find duplicated items in an array.
		 * @param  {Array}  arr  The array
		 * @return {Boolean}     If there are no duplicates
		 */
		var _hasDuplicates = function(arr) {
		    var counts = [];
		    for (var i = 0; i <= arr.length; i++) {
		        if (counts[arr[i]] === undefined) {
		            counts[arr[i]] = 1;
		        } else {
		            return false;
		        }
		    }
		    return true;
		};

		/**
		 * Gets the individual items of a tab configuration.
		 * @param  {Array} arr The config
		 * @return {Array}
		 */
		var _getElements = function(arr) {
  			return arr.map(function(tab) {
    			return tab;
  			}).map(function(elements) {
    			return elements.elements;
  			});
		};

		/**
		 * Outputs individual tests.
		 * @param  {String} name Name of the test
		 * @param  {Boolean} res  The result of the test
		 * @return {Output}
		 */
		var _debug = function(name, res) {
			return debug ? console.log(name + ': ' + res) : null;
		};

		return {
			shouldBeArray: shouldBeArray,
			noEmptyLabels: noEmptyLabels,
			noStringLimits: noStringLimits,
			noEmptyOptions: noEmptyOptions,
			booleanSelected: booleanSelected,
			uniqueOptionNames: uniqueOptionNames,
			uniqueElementNames: uniqueElementNames,
			otherOptionNotSingle: otherOptionNotSingle,
			validateAll : validateAll
		};
	};

	exports.validateConfig = validateConfig;
}(this));