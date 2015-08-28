var expect = chai.expect;

describe('Config-Value Object', function() {
	describe('when validating a configuration,', function() {

		var runAll = function(test, results) {
			samples.forEach(function(sample) {
				results.push(test(sample));
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

		it('it should run all verifications at once', function() {
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
	});
});