"use strict";

let chalk = require("chalk");
let NpmPackageJsonLint = require("npm-package-json-lint");
let Reporter = require("./reporter/Reporter");

module.exports = function(grunt) {
  grunt.registerMultiTask("npmpackagejsonlint", "A package.json linter for Node.js projects", function() {
    let options = this.options({
      ignorewarnings: false,
      stoponerror: false,
      stoponwarning: false,
      showallerrors: false
    });

    let totalErrorCount = 0;
    let totalWarningCount = 0;
    let totalFileCount = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      f.src.filter(function(filePath) {
        if (!grunt.file.exists(filePath)) {
          grunt.log.warn("Source file " + filePath + " not found.");

          return false;
        } else {
          return true;
        }

      }).forEach(function(filePath) {
        let fileData = grunt.file.readJSON(filePath);

        let npmPackageJsonLint = new NpmPackageJsonLint(fileData, {}, options);
        let output = npmPackageJsonLint.lint();

        let reporter = new Reporter();

        let hasErrors = false;
        let hasWarnings = false;

        if (output.errors) {
          totalErrorCount += output.errors.length;
          hasErrors = true;
          reporter.write(grunt, output.errors);
        }

        if (output.warnings && !options.ignorewarnings) {
          totalWarningCount += output.warnings.length;
          hasWarnings = true;
          reporter.write(grunt, output.warnings);
        }

        if (!options.showallerrors) {
          if ((hasErrors && options.stoponerror) || (hasWarnings && options.stoponwarning)) {
            grunt.fail.warn("Too many npm-package-json-lint errors/warnings.");
          }
        }

        totalFileCount++;
      });

      if (totalErrorCount > 0 && !options.showallerrors) {
        grunt.log.writeln().fail(totalErrorCount + " lint error(s) found across " + totalFileCount + " file(s).");
      } else if (totalErrorCount > 0 && options.showallerrors) {
        grunt.fail.warn(totalErrorCount + " lint error(s) found across " + totalFileCount + " file(s). ");
      } else {
        grunt.log.ok(totalFileCount + " file(s) lint free.");
      }
    });
  });
};
