"use strict";

/* eslint handle-callback-err: "off" */

const grunt = require("grunt");

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
  setUp(done) {
    // setup here if necessary
    done();
  },
  defaultOptions(test) {
    const numAssertions = 4;

    test.expect(numAssertions);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:defaultOptions", "--no-color"]
    }, (err, result) => {
      test.ok(result.stdout.includes("engines-required"), "Should throw error for engines-required lint ID");
      test.ok(result.stdout.includes("bugs-recommended"), "Should throw warning for bugs-recommended lint ID");
      test.ok(result.stdout.includes("license-required"), "Should throw error for license-required lint ID");
      test.ok(result.stdout.includes("homepage-recommended"), "Should throw warning for homepage-recommended lint ID");
      test.done();
    });
  },
  stoponerror(test) {
    const numAssertions = 1;

    test.expect(numAssertions);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:stoponerror", "--no-color"]
    }, (err, result) => {
      test.ok(result.stdout.includes("engines-required"), "Should throw error for engines-required lint ID");
      test.done();
    });
  },
  stoponwarning(test) {
    const numAssertions = 1;

    test.expect(numAssertions);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:stoponwarning", "--no-color"]
    }, (err, result) => {
      test.ok(result.stdout.includes("engines-required"), "Should throw error for engines-required lint ID");
      test.done();
    });
  },
  showallerrors(test) {
    const numAssertions = 1;

    test.expect(numAssertions);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:showallerrors", "--no-color"]
    }, (err, result) => {
      test.ok(result.stdout.includes("2 lint error(s) found across 4 file(s).  Use --force to continue."), "Should show all errors before hard fail.");
      test.done();
    });
  },
  showallerrswithstop(test) {
    const numAssertions = 1;

    test.expect(numAssertions);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:showallerrswithstop", "--no-color"]
    }, (err, result) => {
      test.ok(result.stdout.includes("2 lint error(s) found across 3 file(s).  Use --force to continue."), "Should show all errors before hard fail even if stopon* is set.");
      test.done();
    });
  },
  stoponboth(test) {
    const numAssertions = 1;

    test.expect(numAssertions);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:stoponboth", "--no-color"]
    }, (err, result) => {
      test.ok(result.stdout.includes("engines-required"), "Should throw error for engines-required lint ID");
      test.done();
    });
  },
  valid(test) {
    const numAssertions = 1;

    test.expect(numAssertions);
    grunt.util.spawn({
      grunt: true,
      args: ["npmpackagejsonlint:pass", "--no-color"]
    }, (err, result) => {
      test.ok(result.stdout.includes("1 file(s) lint free."), "Should print correct number of lint free files");
      test.done();
    });
  }
};
