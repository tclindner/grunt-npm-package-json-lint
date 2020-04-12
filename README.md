# Deprecated!

As of April 12th 2020, `grunt-npm-package-json-lint` is fully deprecated. No new changes are planned. Please use `npm-package-json-lint`'s [cli](https://npmpackagejsonlint.org/docs/en/cli) or [Node.js API](https://npmpackagejsonlint.org/docs/en/api) directly instead.


# grunt-npm-package-json-lint

> A Grunt wrapper for [npm-package-json-lint](https://github.com/tclindner/npm-package-json-lint)

[![license](https://img.shields.io/github/license/tclindner/grunt-npm-package-json-lint.svg?maxAge=2592000&style=flat-square)](https://github.com/tclindner/grunt-npm-package-json-lint/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/grunt-npm-package-json-lint.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/grunt-npm-package-json-lint)
[![CircleCI](https://circleci.com/gh/tclindner/grunt-npm-package-json-lint.svg?style=svg)](https://circleci.com/gh/tclindner/grunt-npm-package-json-lint)
[![Dependency Status](https://david-dm.org/tclindner/grunt-npm-package-json-lint.svg?style=flat-square)](https://david-dm.org/tclindner/grunt-npm-package-json-lint)
[![devDependency Status](https://david-dm.org/tclindner/grunt-npm-package-json-lint/dev-status.svg?style=flat-square)](https://david-dm.org/tclindner/grunt-npm-package-json-lint#info=devDependencies)

## Getting Started

This plugin requires Grunt `>=0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-npm-package-json-lint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-npm-package-json-lint');
```

## The "npmpackagejsonlint" task

### Overview

In your project's Gruntfile, add a section named `npmpackagejsonlint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  npmpackagejsonlint: {
    options: {
      // Task-specific options go here.
    },
    files: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

### Options

#### options.configFile

* Type: `String`
* Default: ``

.npmpackagejsonlintrc file to use for rules config

#### options.quiet

* Type: `Boolean`
* Default: `false`

Report errors only.

#### options.maxWarnings

* Type: `Number`
* Default: `-1` *(means no limit)*

Number of warnings to trigger non-zero exit code.

### Usage Examples

#### Default Options

In this example, the default options are used to lint package.json files.

```js
grunt.initConfig({
  npmpackagejsonlint: {
    options: {
      quiet: false,
      maxWarnings: -1
    },
    files: {
      src: ['./package.json']
    }
  }
});
```

#### Custom Options

In this example, the custom options are used to lint package.json files. All warnings will be suppressed.

```js
grunt.initConfig({
  npmpackagejsonlint: {
    options: {
      configFile: '.npmpackagejsonlintrc.json',
      quiet: true
    },
    files: {
      src: ['./package.json']
    }
  }
})
```

## Migrating from v2 to v3

The following options have been removed:

* ignorewarnings
* stoponwarning
* showallerrors

If you were using `ignorewarnings`, please use `quiet` instead. If you were using `stoponwarning`, please use `maxWarnings` and set the threshold you would like a non-zero exit code to be returned.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Release History

Please see [CHANGELOG.md](CHANGELOG.md).

## License

Copyright (c) 2016-2020 Thomas Lindner. Licensed under the MIT license.
