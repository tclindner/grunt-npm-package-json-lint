"use strict";

let grunt = require("grunt");

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.npmPackageJsonLint = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(4);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:default_options", "--no-color"]
    }, function(err, result) {
      test.ok(result.stdout.indexOf("engines-required") >= 0, "Should throw error for engines-required lint ID");
      test.ok(result.stdout.indexOf("bugs-recommended") >= 0, "Should throw warning for bugs-recommended lint ID");
      test.ok(result.stdout.indexOf("license-required") >= 0, "Should throw error for license-required lint ID");
      test.ok(result.stdout.indexOf("homepage-recommended") >= 0, "Should throw warning for homepage-recommended lint ID");
      test.done();
    });
  },
  stoponerror(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:stoponerror", "--no-color"]
    }, function(err, result) {
      test.ok(result.stdout.indexOf("engines-required") >= 0, "Should throw error for engines-required lint ID");
      test.done();
    });
  },
  stoponwarning(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:stoponwarning", "--no-color"]
    }, function(err, result) {
      test.ok(result.stdout.indexOf("engines-required") >= 0, "Should throw error for engines-required lint ID");
      test.done();
    });
  },
  showallerrors(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:showallerrors", "--no-color"]
    }, function(err, result) {
      test.ok(result.stdout.indexOf("2 lint error(s) found across 4 file(s).  Use --force to continue.") >= 0, "Should show all errors before hard fail.");
      test.done();
    });
  },
  showallerrorswithstop(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:showallerrorswithstop", "--no-color"]
    }, function(err, result) {
      test.ok(result.stdout.indexOf("2 lint error(s) found across 3 file(s).  Use --force to continue.") >= 0, "Should show all errors before hard fail even if stopon* is set.");
      test.done();
    });
  },
  stoponboth(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:stoponboth", "--no-color"]
    }, function(err, result) {
      test.ok(result.stdout.indexOf("engines-required") >= 0, "Should throw error for engines-required lint ID");
      test.done();
    });
  },
  valid(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:pass", "--no-color"]
    }, function(err, result) {
      test.ok(result.stdout.indexOf("1 file(s) lint free.") >= 0, "Should print correct number of lint free files");
      test.done();
    });
  }
};
