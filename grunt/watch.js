module.exports = function(grunt) {
  grunt.config.set("watch", {
    json: {
      files: [
        "**/*.json"
      ],
      tasks: [
        "jsonlint"
      ]
    },
    js: {
      files: [
        "tasks/**/*.js",
        "test/**/*_test.js"
      ],
      tasks: [
        "jshint",
        "jscs",
        "nodeunit"
      ]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
};
