'use strict';

const chalk = require('chalk');
const CLIEngine = require('npm-package-json-lint').CLIEngine;
const Reporter = require('./reporter/Reporter');
const plur = require('plur');

const noErrorCount = 0;

module.exports = function(grunt) {
  grunt.registerMultiTask('npmpackagejsonlint', 'A package.json linter for Node.js projects', function() {
    const options = this.options({
      configFile: '',
      quiet: false,
      maxWarnings: -1
    });

    if (this.filesSrc.length === 0) {
      grunt.log.writeln(chalk.magenta('No files/patterns specified.'));

      return true;
    }

    const cliEngine = new CLIEngine({configFile: options.configFile});

    let cliResults;

    try {
      cliResults = cliEngine.executeOnPackageJsonFiles(this.filesSrc);
    } catch (err) {
      grunt.warn(err);

      return false;
    }

    const totalFileCount = cliResults.results.length;
    const totalErrorCount = cliResults.errorCount;
    const totalWarningCount = cliResults.warningCount;

    if (options.quiet) {
      cliResults.results = CLIEngine.getErrorResults(cliResults.results);
    }

    Reporter.write(cliResults, options.quiet);

    const tooManyWarnings = options.maxWarnings >= 0 && totalWarningCount > options.maxWarnings;

    if (totalErrorCount === noErrorCount && tooManyWarnings) {
      grunt.warn(`npm-package-json-lint found too many warnings (maximum: ${options.maxWarnings})`);

      return false;
    } else if (totalErrorCount > noErrorCount) {
      grunt.warn(`${totalErrorCount} lint ${plur('error', totalErrorCount)} found across ${totalFileCount} ${plur('file', totalFileCount)}.`);

      return false;
    } else {
      grunt.log.ok(`${totalFileCount} ${plur('file', totalFileCount)} lint free.`);
    }

    return report.errorCount === 0;
  });
};
