'use strict';

const chalk = require('chalk');
const NpmPackageJsonLint = require('npm-package-json-lint');
const Reporter = require('./reporter/Reporter');
const path = require('path');
const emptyArray = 0;
const noErrorCount = 0;
const incrementByOne = 1;

module.exports = function(grunt) {
  grunt.registerMultiTask('npmpackagejsonlint', 'A package.json linter for Node.js projects', function() {
    const options = this.options({
      configFile: '',
      ignorewarnings: false,
      stoponerror: false,
      stoponwarning: false,
      showallerrors: false
    });

    let config = {};

    if (options.configFile !== '') {
      config = path.join(process.cwd(), options.configFile);
    }

    let totalErrorCount = 0;
    let totalWarningCount = 0;
    let totalFileCount = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      file.src.filter(function(filePath) {
        if (grunt.file.exists(filePath)) {
          return true;
        } else {
          grunt.log.warn(`Source file ${filePath} not found.`);

          return false;
        }

      }).forEach((filePath) => {
        const fileData = grunt.file.readJSON(filePath);
        const output = new NpmPackageJsonLint(fileData, config, options).lint();
        const reporter = new Reporter();

        let hasErrors = false;
        let hasWarnings = false;

        if (output.errors.length > emptyArray) {
          totalErrorCount += output.errors.length;
          hasErrors = true;
          reporter.write(grunt, output.errors);
        }

        if (output.warnings.length > emptyArray && !options.ignorewarnings) {
          totalWarningCount += output.warnings.length;
          hasWarnings = true;
          reporter.write(grunt, output.warnings);
        }

        if ((!options.showallerrors) && ((hasErrors && options.stoponerror) || (hasWarnings && options.stoponwarning))) {
          grunt.fail.warn('Too many npm-package-json-lint errors/warnings.');
        }

        totalFileCount += incrementByOne;
      });

      if (totalErrorCount > noErrorCount && !options.showallerrors) {
        grunt.log.writeln().fail(`${totalErrorCount} lint error(s) found across ${totalFileCount} file(s).`);
      } else if (totalErrorCount > noErrorCount && options.showallerrors) {
        grunt.fail.warn(`${totalErrorCount} lint error(s) found across ${totalFileCount} file(s).`);
      } else {
        grunt.log.ok(`${totalFileCount} file(s) lint free.`);
      }
    });
  });
};
