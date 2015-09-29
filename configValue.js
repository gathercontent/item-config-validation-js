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
			if (!res) arr = [arr];

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

			_debug('uniqueTabNames', isValid);
		};

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
			var createOption = function(options) {
				return {
					'name': 'opt' + _getRandomNr(),
					'label': 'Option',
					'selected': true };
			};

			arr.forEach(function(tab) {
				tab.elements.forEach(function(element) {
					for (var k in element) {
						if (k === 'options') {
							isValid = (element.options.length > 0);

							if (!isValid) {
								element.options.push(createOption());
								isValid = true;
							}
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
        			if (namesArray.indexOf(item.name) > -1) {
    					item.name = item.name + _getRandomNr();
    				}

    				namesArray.push(item.name);
      			});
   			});

			if (namesArray.length) {
				res = _hasNoDuplicates(namesArray);

				if (!res && shouldFix) {
					// Run again if the randomizer generated the same outpout
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
			        	return item.options.forEach(function(opt, i) {
			        		if (namesArray.indexOf(opt.name) > -1 || !opt.name) {
			        			opt.name = opt.name + _getRandomNr();
			        		}

			        		namesArray.push(opt.name);
			            });
			        }
			  	});
			});

			console.log(namesArray);

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
							el.options[el.options.length - 1].value = 'Other';
						}
					};
				});
			});
			_debug('otherOptionValueNotEmpty', isValid);
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
				return { name: 'opt' + _getRandomNr(), label: 'Option 1', selected: false };
			};

			_getElements(arr).map(function(item) {
			    item.forEach(function(c) {
			    	if (typeof c.other_option !== 'undefined' && c.other_option === true) {
			            if (c.options.length < 2) {
			            	// Add another option
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
		 * Ensures the title value for Guidelines/Section isn't empty.
		 *
		 * @param  {Array} arr         The configuration
		 * @param  {Boolean} shouldFix Tries to fix invalid config
		 * @return {Boolean}
		 */
		var guidelinesNotEmpty = function(arr, shouldFix) {
			var isValid = true;

			_getElements(arr).map(function(element) {
				element.filter(function(item) {
					return item.type === 'section';
				}).forEach(function(field) {
					if (!field.title || field.title === ' ') {
						switch (shouldFix) {
						case true:
							field.title = 'Guidelines';
							break;

						default:
							isValid = false;
							break;
						}
					}
				});
			});

			_debug('guidelinesNotEmpty', isValid);
			return isValid;
		};

		/**
		 * Ensures that only one selected radio box per element
		 * is selected.
		 *
		 * @param  {Array} arr       The config
		 * @param  {Boolean} shouldFix Attempts to fix invalid config
		 * @return {Boolean}           Passing
		 */
		var onlyOneRadioSelection = function(arr, shouldFix) {
			var isValid = true;
			var selectedOptions = [];

			_getElements(arr).map(function(element) {
				element.filter(function(item) {
					return item.type === 'choice_radio';
				}).map(function(radio) {
					return radio.options;
				}).forEach(function(option) {
					var count = 0;
					selectedOptions.push(option);

					// Count # of options with true
					for (var k in option) {
						if (option[k].selected === true) {
							count += 1;
						}
					}

					isValid = count > 1 ? false : true;

					// Make them false if there's more than one selected
					if (shouldFix && count > 1) {
						selectedOptions.forEach(function(option) {
							option.forEach(function(choice) {
								choice.selected = false;
							});
						});
						isValid = true;
					}
				});
			});

			_debug('onlyOneRadioSelection', isValid);
			return isValid;
		};

		/**
		 * Ensures the "option" fields don't have extra fields,
		 * based on their type.
		 *
		 * @param  {Array} arr The configuration
		 * @return {Boolean}
		 */
		var otherOptionNoExtraFields = function(arr) {
			var noOther_Keys = ['name', 'label', 'selected'];
			var other_Keys = ['name', 'label', 'selected', 'value'];

			var options = arr.map(function(tab) {
				return tab.elements;
			}).map(function(element) {
				return element.filter(function(item) {
					return item.type === 'choice_radio' || item.type === 'choice_checkbox';
				})
					.forEach(function(opt) {
						if (opt.other_option === false) {
							opt.options.forEach(function(object) {
								_compareObjects(object, noOther_Keys);
							});
						}

						if (opt.other_option === true) {
							opt.options.forEach(function(object) {
								_compareObjects(object, other_Keys);
							});
						}
				});
			});

			_debug('guidelinesNotEmpty', true);
			return true;
		};

		/**
		 * Ensures all option names are non-empty and valid strings.
		 * @param  {Array} arr The configuration
		 * @return {Boolean}     The validity
		 */
		var optionNameIsString = function(arr) {
			var isValid = true;

			_getElements(arr).map(function(elements) {
				return elements.map(function(element) {
					return element;
				}).filter(function(options) {
					return options.type === 'choice_radio' || options.type === 'choice_checkbox';
				}).map(function(list) {
					list.options.forEach(function(option) {
						// Verify if the attribute is present
						if (typeof option.name === 'undefined') {
							option.name = '';
						}
						// If there's no name, create one
						if (!option.name.length) {
							isValid = false;
							option.name = 'opt' + _getRandomNr();
						}
						// If it's a number, convert to string
						if (typeof option.name !== 'string') {
							isValid = false;
							option.name = option.name.toString();
						}
					});
				});
			});

			if (!isValid) return optionNameIsString(arr);

			_debug('optionNameIsString', isValid);
			return isValid;
		};

		/**
		 * Ensures the value attribute for a text field is present.
		 *
		 * @param  {Array} arr The configuration
		 * @return {Boolean}     Its validity
		 */
		var textValueAttributeExists = function(arr) {
			var isValid = false;

			_getElements(arr).map(function(elements) {
				return elements.map(function(element) {
					return element;
				}).filter(function(item) {
					return item.type === 'text';
				}).map(function(text) {
					for (var k in text) {
						if (text.hasOwnProperty('value')) {
							isValid = true;
						} else {
							text.value = ' ';
						}
					}
				});
			});

			isValid = true;
			_debug('textValueAttributeExists', isValid);
			return isValid;
		};

		/**
		 * Ensures a non-selected "other option" does not have a value.
		 * @param  {Array} arr    The configuration
		 * @return {Boolean}      Passing test
		 */
		var otherOptionValueEmptyNotSelected = function(arr) {
			var isValid = false;

			_getElements(arr).map(function(elements) {
				return elements.map(function(element) {
					return element;
				}).filter(function(item) {
					return item.type === 'choice_radio' && item.other_option === true;
				}).map(function(choice) {
					return choice.options;
				}).forEach(function(values) {
					values.forEach(function(option) {
						if (typeof option.value !== 'undefined'
							&& option.value !== ''
							&& option.selected === false) {
								option.value = '';
						}
					});
				});
			});

			isValid = true;
			_debug('otherOptionValueEmptyNotSelected', isValid);
			return isValid;
		};

		/**
		 * Ensure text elements do not contain extra attributes
		 * @param  {Array} arr The config
		 * @return {Boolean}
		 */
		var textElementNoExtraAttributes = function(arr) {
			var isValid = false;
			var allowedAttrs = ['type', 'required', 'name', 'label', 'value', 'microcopy',
								'limit_type', 'limit', 'plain_text'];

			_getElements(arr).map(function(elements) {
				return elements.map(function(element) {
					return element;
				}).filter(function(item) {
					return item.type === 'text';
				}).map(function(object) {
					_compareObjects(object, allowedAttrs);
				});
			});

			isValid = true;

			_debug('textElementNoExtraAttributes', isValid);
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
				&& otherOptionValueNotEmpty(arr) && guidelinesNotEmpty(arr, shouldFix)
				&& otherOptionNoExtraFields(arr) && textValueAttributeExists(arr)
				&& otherOptionValueEmptyNotSelected(arr) && textElementNoExtraAttributes(arr);
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

		/**
		 * Deletes unwanted properties in an object.
		 * @param  {Object} object     The object
		 * @param  {Array} properties  The array of keys to have
		 */
		var _compareObjects = function(object, properties) {
			Object.keys(object).forEach(function(key) {
				if (properties.indexOf(key) === -1) {
					return delete object[key];
				}
			});
		};

		/**
		 * Converts string faux booleans to real Booleans.
		 * @param  {String|Boolean} input The real or faux boolean
		 * @return {Boolean}
		 */
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
			guidelinesNotEmpty: guidelinesNotEmpty,
			onlyOneRadioSelection: onlyOneRadioSelection,
			otherOptionNoExtraFields: otherOptionNoExtraFields,
			optionNameIsString: optionNameIsString,
			textValueAttributeExists: textValueAttributeExists,
			otherOptionValueEmptyNotSelected: otherOptionValueEmptyNotSelected,
			textElementNoExtraAttributes: textElementNoExtraAttributes,
			validateAll : validateAll
		};
	};

	exports.validateConfig = validateConfig;
}(this));