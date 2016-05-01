module.exports = function(grunt) {
  grunt.config("eslint", {
    options: {
      configFile: ".eslintrc.json",
      format: "node_modules/eslint-formatter-pretty"
    },
    javascript: [
      "src/**/*.js",
      "grunt/*.js",
      "tests/*.js",
      "*.js"
    ]
  });

  grunt.loadNpmTasks("grunt-eslint");
};
