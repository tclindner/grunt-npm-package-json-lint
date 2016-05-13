'use strict';

const chalk = require('chalk');

class Reporter {

  /**
   * Write output
   * @param  {Object} grunt  Grunt object
   * @param  {Array}  issues Array of issues
   * @return {undefined}        No return
   */
  write(grunt, issues) {
    const issueCount = issues.length;

    if (issueCount) {
      for (const issue of issues) {
        grunt.log.warn(issue);
      }
    }
  }

}

module.exports = Reporter;
