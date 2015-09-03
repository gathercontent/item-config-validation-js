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
		 * Ensures the tab labels names are not empty
		 * @param  {Array} arr  The config
		 * @return {Boolean}
		 */
		var noEmptyLabels = function(arr, shouldFix) {
			var isValid = true;

			arr.forEach(function(tab, idx) {
				if (!tab.label || tab.label === ' ') {
					// Attempt to fix empty labels
					if (shouldFix) tab.label = 'Untiled' + idx;
					else isValid = false;
				} else {
					isValid = true;
				}
			});

			_debug('noEmptyLabels', isValid);

			return isValid;
		};

		/**
		 * Ensures all tab internal names are unique.
		 *
		 * @param  {Array} arr       The configuration
		 * @param  {Boolean} shouldFix Fixes an invalid configuration
		 * @param  {Boolean} invalid   Internal flag for invalid configuration
		 * @return {Boolean}           True if passing
		 */
		var uniqueTabNames = function(arr, shouldFix, invalid) {
			var isValid = true,
				namesArray = [];

			arr.forEach(function(tab) {
				if (invalid) tab.name = tab.name + _getRandomNr();
				namesArray.push(tab.name);
			});

			if (!_hasNoDuplicates(namesArray)) {
				return uniqueTabNames(arr, true, true);
			} else {
				return true;
			}
		}

		/**
		 * Ensures the limits option is a number.
		 *
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
		 * @param  {Boolean} shouldFix Tries to fix an invalid config
		 * @return {Boolean}
		 */
		var booleanSelected = function(arr, shouldFix) {
			var isValid = true;

			arr.forEach(function(tab) {
				tab.elements.forEach(function(element) {
					for (var k in element) {
						if (k === 'options') {
							for (var j in element.options) {
								if (shouldFix) {
									element.options[j].selected = _booleanTransform(element.options[j].selected);
								}

								isValid = typeof element.options[j].selected === 'boolean';
							}
						}
					}
				});
			});

			_debug('booleanSelected', isValid);

			return isValid;
		};

		/**
		 * Ensures all elements have a unique name across all tabs.
		 * @param  {Array} arr       The configuration
		 * @param  {Boolean} shouldFix Tries to fix an invalid config
		 * @param  {Boolean} invalid   Recursive boolean meaning it's still not valid
		 * @return {Boolean}           Passing configuration
		 */
		var uniqueElementNames = function(arr, shouldFix, invalid) {
  			var namesArray = [],
  				res;

  			_getElements(arr).map(function(el, i) {
      			return el.forEach(function(item) {
        			if (invalid === true) {
          				item.name = item.name + _getRandomNr();
        			}
        			namesArray.push(item.name);
      			});
   			});

			if (namesArray.length) {
				res = _hasNoDuplicates(namesArray);

				if (!res && shouldFix) {
					return uniqueElementNames(arr, true, true);
				}
				return res;
			} else return true;
		};

		/**
		 * Ensures all option names are unique
		 *
		 * @param  {Array} arr         The config
		 * @param  {Boolean} shouldFix Tries to fix an invalid configuration
		 * @return {Boolean}
		 */
		var uniqueOptionNames = function(arr, shouldFix, invalid) {
			var namesArray = [],
				res;

			_getElements(arr).map(function(ea) {
				ea.forEach(function(item) {
	      	    	if (item.options) {
			        	return item.options.map(function(opt, i) {
			        		if (invalid === true) {
			        			opt.name = opt.name + _getRandomNr();
			        		}
			       	    	namesArray.push(opt.name);
			            });
			        }
			  	});
			});

			if (namesArray.length) {
				res = _hasNoDuplicates(namesArray);

				// If there are duplicates and it needs fixing, re-run in order to fix the issue.
				if (!res && shouldFix) {
					return uniqueOptionNames(arr, true, true);
				}

				_debug('uniqueOptionNames', res);
				return res;
			} else {
				_debug('uniqueOptionNames', true);
				return true;
			}
		};

		/**
		 * Ensures the value property for radioboxes with a 'other_option'
		 * setting are never empty.
		 *
		 * @param  {Array} arr The configuration
		 * @return {Boolean}
		 */
		var otherOptionValueNotEmpty = function(arr) {
			var isValid = true;

			_getElements(arr).map(function(item) {
				item.forEach(function(el) {
					if (el.hasOwnProperty('other_option') && el['other_option'] === true) {
						if (!el.options[el.options.length - 1].value) {
							_debug('otherOptionValueNotEmpty - adding value key');
							el.options[el.options.length - 1].value = 'Other';
						}
					};
				});
			});

			return true;
		};

		/**
		 * Ensures the "other" option field has at least two options present.
		 * @param  {Array} arr The config
		 * @return {Boolean}
		 */
		var otherOptionNotSingle = function(arr, shouldFix, invalid) {
			var isValid = true;

			var createOption = function(options) {
				return { 'name': 'op001', 'label': 'Option 1', 'selected': true };
			};

			_getElements(arr).map(function(item) {
			    item.forEach(function(c) {
			    	if (typeof c.other_option !== 'undefined' && c.other_option === true) {
			            if (c.options.length < 2) {
			            	c.options.push(createOption());
			            	return (otherOptionNotSingle(arr));
			            }
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
		var validateAll = function(arr, shouldFix) {
			return shouldBeArray(arr) && noEmptyLabels(arr, shouldFix)
				&& noStringLimits(arr) && uniqueOptionNames(arr, shouldFix)
				&& booleanSelected(arr, shouldFix) && noEmptyOptions(arr)
				&& otherOptionNotSingle(arr, shouldFix) && uniqueElementNames(arr, shouldFix)
				&& otherOptionValueNotEmpty(arr);
		};

		/********************
		 * Private Methods **
		 ********************/

		/**
		 * Find duplicated items in an array.
		 * @param  {Array}  arr  The array
		 * @return {Boolean}     If there are no duplicates
		 */
		var _hasNoDuplicates = function(arr) {
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
		 * Gets a random number.
		 * @return {Number} Between 1 and 10000
		 */
		var _getRandomNr = function() {
			return Math.round(Math.random() * 10000 - 1 + 1);
		};

		var _booleanTransform = function(input) {
			if (input === 'true' || input === true) {
				return true;
			} else if (input === 'false' || input === false) {
				return false;
			}
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
			uniqueTabNames: uniqueTabNames,
			otherOptionValueNotEmpty: otherOptionValueNotEmpty,
			validateAll : validateAll
		};
	};

	exports.validateConfig = validateConfig;
}(this));