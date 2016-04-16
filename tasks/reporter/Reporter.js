"use strict";

let chalk = require("chalk");

class Reporter {
    write(grunt, issues) {
        let issueCount = issues.length;

        if (issueCount) {
            for (let issue of issues) {
                grunt.log.warn(issue);
            }
        }
    }
}

module.exports = Reporter;
