const chalk = require('chalk');
const {NpmPackageJsonLint} = require('npm-package-json-lint');
const plur = require('plur');
const Reporter = require('./reporter/Reporter');

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

    let results;

    try {
      const npmPackageJsonLint = new NpmPackageJsonLint({
        patterns: this.filesSrc,
        configFile: options.configFile,
        quiet: options.quiet
      });

      results = npmPackageJsonLint.lint();
    } catch (err) {
      grunt.warn(err);

      return false;
    }

    const totalFileCount = results.results.length;
    const totalErrorCount = results.errorCount;
    const totalWarningCount = results.warningCount;

    Reporter.write(results, options.quiet);

    const tooManyWarnings = options.maxWarnings >= 0 && totalWarningCount > options.maxWarnings;

    if (totalErrorCount === noErrorCount && tooManyWarnings) {
      grunt.warn(`npm-package-json-lint found too many warnings (maximum: ${options.maxWarnings})`);

      return false;
    }

    if (totalErrorCount > noErrorCount) {
      grunt.warn(
        `${totalErrorCount} lint ${plur('error', totalErrorCount)} found across ${totalFileCount} ${plur(
          'file',
          totalFileCount
        )}.`
      );

      return false;
    }

    grunt.log.ok(`${totalFileCount} ${plur('file', totalFileCount)} lint free.`);

    return results.errorCount === 0;
  });
};
