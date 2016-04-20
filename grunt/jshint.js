module.exports = function(grunt) {

  grunt.config("jshint", {
    options: {
      reporter: require("jshint-stylish"),
      jshintrc: ".jshintrc"
    },
    all: [
      "tasks/**/*.js",
      "grunt/**/*.js",
      "test/**/*_test.js",
      "*.js"
    ]
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
};
