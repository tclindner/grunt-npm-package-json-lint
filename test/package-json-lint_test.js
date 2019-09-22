/* eslint handle-callback-err: "off" */

const grunt = require('grunt');

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
    const numAssertions = 7;

    test.expect(numAssertions);
    grunt.util.spawn(
      {
        grunt: true,
        args: ['npmpackagejsonlint:defaultOptions', '--no-color']
      },
      (err, result) => {
        test.ok(result.stdout.includes('license-type'), 'Should throw warning for license-type lint ID');
        test.ok(result.stdout.includes('name-format'), 'Should throw error for name-format lint ID');
        test.ok(result.stdout.includes('version-format'), 'Should throw error for version-format lint ID');
        test.ok(result.stdout.includes('Totals'), 'Should output "Totals" heading');
        test.ok(result.stdout.includes('2 errors'), 'Should log 2 total errors');
        test.ok(result.stdout.includes('1 warning'), 'Should log 1 total warning');
        test.ok(result.stdout.includes('2 lint errors found across 3 files'), 'Should log summary lint');
        test.done();
      }
    );
  },
  quiet(test) {
    const numAssertions = 4;

    test.expect(numAssertions);
    grunt.util.spawn(
      {
        grunt: true,
        args: ['npmpackagejsonlint:quiet', '--no-color']
      },
      (err, result) => {
        test.ok(result.stdout.includes('name-format'), 'Should throw error for name-format lint ID');
        test.ok(result.stdout.includes('version-format'), 'Should throw error for version-format lint ID');
        test.ok(result.stdout.includes('Totals'), 'Should output "Totals" heading');
        test.ok(result.stdout.includes('2 errors'), 'Should log 2 total errors');
        test.done();
      }
    );
  },
  maxWarningsOne(test) {
    const numAssertions = 2;

    test.expect(numAssertions);
    grunt.util.spawn(
      {
        grunt: true,
        args: ['npmpackagejsonlint:maxWarningsOne', '--no-color']
      },
      (err, result) => {
        test.ok(result.stdout.includes('license-type'), 'Should throw warning for license-type lint ID');
        test.ok(
          result.stdout.includes('npm-package-json-lint found too many warnings (maximum: 0)'),
          'Should log max warning'
        );
        test.done();
      }
    );
  },
  maxWarningsTwo(test) {
    const numAssertions = 2;

    test.expect(numAssertions);
    grunt.util.spawn(
      {
        grunt: true,
        args: ['npmpackagejsonlint:maxWarningsTwo', '--no-color']
      },
      (err, result) => {
        test.ok(result.stdout.includes('license-type'), 'Should throw warning for license-type lint ID');
        test.ok(result.stdout.includes('1 file lint free.'), 'Should print correct number of lint free files');
        test.done();
      }
    );
  },
  empty(test) {
    const numAssertions = 1;

    test.expect(numAssertions);
    grunt.util.spawn(
      {
        grunt: true,
        args: ['npmpackagejsonlint:empty', '--no-color']
      },
      (err, result) => {
        test.ok(
          result.stdout.includes('No files/patterns specified.'),
          'Should print warning that no files/patterns were specified'
        );
        test.done();
      }
    );
  },
  valid(test) {
    const numAssertions = 1;

    test.expect(numAssertions);
    grunt.util.spawn(
      {
        grunt: true,
        args: ['npmpackagejsonlint:pass', '--no-color']
      },
      (err, result) => {
        test.ok(result.stdout.includes('1 file lint free.'), 'Should print correct number of lint free files');
        test.done();
      }
    );
  }
};
