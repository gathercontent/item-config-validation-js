var expect = chai.expect;

describe('Config-Value Object', function() {
	describe('when validating a configuration,', function() {

		var runAll = function(test, results) {
			samples.forEach(function(sample) {
				results.push(test(sample, true));
			});

			return results;
		}

		it('it should be of type Array', function() {
			var results = runAll(validateConfig().shouldBeArray, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should have no empty labels', function() {
			var results = runAll(validateConfig().noEmptyLabels, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should have limit fields as integers', function() {
			var results = runAll(validateConfig().noStringLimits, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should have options with at least 1 value', function() {
			var results = runAll(validateConfig().noEmptyOptions, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should have only boolean values for selected fields', function() {
			var results = runAll(validateConfig().booleanSelected, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should have unique names for all option fields', function() {
			var results = runAll(validateConfig().uniqueOptionNames, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should have unique names for elements across all tabs', function() {
			var results = runAll(validateConfig().uniqueElementNames, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should run and pass all verifications at once', function() {
			var results = runAll(validateConfig().validateAll, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should contain at least 1 option if "other" is active', function() {
			var results = runAll(validateConfig().otherOptionNotSingle, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should have unique names for all tabs', function() {
			var results = runAll(validateConfig().uniqueTabNames, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should have a non-empty value for other option fields', function() {
			var results = runAll(validateConfig().otherOptionValueNotEmpty, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should ensure guidelines sections always have a value', function() {
			var results = runAll(validateConfig().guidelinesNotEmpty, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should ensure radioboxes only have one selection', function() {
			var results = runAll(validateConfig().onlyOneRadioSelection, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should prevent "other_option" from having additional fields', function() {
			var results = runAll(validateConfig().otherOptionNoExtraFields, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should make sure the option name attribute is a string', function() {
			var results = runAll(validateConfig().optionNameIsString, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should make sure the text value attribute exists', function() {
			var results = runAll(validateConfig().textValueAttributeExists, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});

		it('it should make sure the other option value is empty if its not selected', function() {
			var results = runAll(validateConfig().otherOptionValueEmptyNotSelected, []);

			results.forEach(function(test) {
				expect(test).to.equal(true);
			});
		});


	});
});