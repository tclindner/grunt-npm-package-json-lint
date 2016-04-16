module.exports = function(grunt) {

  grunt.config("jsonlint", {
    main: {
      src: [
        "src/**/*.json",
        "grunt/*.json",
        "*.json",
        ".jscsrc",
        ".jshintrc"
      ]
    }
  });

  grunt.loadNpmTasks("grunt-jsonlint");
};
