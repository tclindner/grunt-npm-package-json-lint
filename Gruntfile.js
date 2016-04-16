"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Configuration to be run (and then tested).
    packagejsonlint: {
      default_options: {
        options: {
        },
        files: {
          "tmp/default_options": [
            "test/fixtures/invalid-one/package.json",
            "test/fixtures/invalid-two/package.json",
            "test/fixtures/invalid-three/package.json"
          ]
        }
      },
      ignoreWarnings: {
        options: {
          ignorewarnings: true
        },
        files: {
          "tmp/ignorewarnings": [
            "test/fixtures/invalid-one/package.json",
            "test/fixtures/invalid-two/package.json",
            "test/fixtures/invalid-three/package.json"
          ]
        }
      },
      stoponerror: {
        options: {
          stoponerror: true
        },
        files: {
          "tmp/stoponerror": [
            "test/fixtures/invalid-one/package.json",
            "test/fixtures/invalid-two/package.json",
            "test/fixtures/invalid-three/package.json"
          ]
        }
      },
      stoponwarning: {
        options: {
          stoponwarning: true
        },
        files: {
          "tmp/stoponwarning": [
            "test/fixtures/invalid-one/package.json",
            "test/fixtures/invalid-two/package.json",
            "test/fixtures/invalid-three/package.json"
          ]
        }
      },
      showallerrors: {
        options: {
          showallerrors: true
        },
        files: {
          "tmp/showallerrors": [
            "test/fixtures/invalid-one/package.json",
            "test/fixtures/invalid-two/package.json",
            "test/fixtures/invalid-three/package.json",
            "test/fixtures/valid/package.json"
          ]
        }
      },
      showallerrorswithstop: {
        options: {
          showallerrors: true,
          stoponwarning: true
        },
        files: {
          "tmp/showallerrorswithstop": [
            "test/fixtures/invalid-one/package.json",
            "test/fixtures/invalid-two/package.json",
            "test/fixtures/invalid-three/package.json"
          ]
        }
      },
      stoponboth: {
        options: {
          stoponwarning: true,
          stoponerror: true
        },
        files: {
          "tmp/stoponboth": [
            "test/fixtures/invalid-one/package.json",
            "test/fixtures/invalid-two/package.json",
            "test/fixtures/invalid-three/package.json"
          ]
        }
      },
      pass: {
        options: {
        },
        files: {
          "tmp/pass": "test/fixtures/valid/package.json"
        }
      }
    }
  });

  // Load Grunt plugins from the config files in the grunt/ directory
  grunt.loadTasks("grunt");
  grunt.loadTasks("tasks");
  require("time-grunt")(grunt);

  // Register task for running linters
  grunt.registerTask("lint", [
    "jsonlint",
    "jshint",
    "jscs"
  ]);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin"s task(s), then test the result.
  grunt.registerTask("test", [
    "clean",
    "nodeunit"
  ]);

  // By default, lint and run all tests.
  grunt.registerTask("default", [
    "lint",
    "test"
  ]);
};
