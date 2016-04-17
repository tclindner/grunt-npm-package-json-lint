# grunt-package-json-lint

> A Grunt wrapper for [package-json-lint](https://github.com/tclindner/package-json-lint)

## Getting Started

This plugin requires Grunt `^1.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-package-json-lint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-package-json-lint');
```

## The "packagejsonlint" task

### Overview

In your project's Gruntfile, add a section named `packagejsonlint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  packagejsonlint: {
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

#### options.ignorewarnings

* Type: `Boolean`
* Default: `false`

Ignores warnings and suppresses all output.

#### options.stoponerror

* Type: `Boolean`
* Default: `false`

Stops Grunt when the first error is encountered. Use `--force` to force continue.

#### options.stoponwarning

* Type: `Boolean`
* Default: `false`

Stops Grunt when the first warning is encountered. Use `--force` to force continue.

#### options.showallerrors

* Type: `Boolean`
* Default: `false`

Shows all errors and warnings before stopping the task. (Overrides `stoponerror` and `stoponwarning`, above.)

### Usage Examples

#### Default Options

In this example, the default options are used to lint package.json files.

```js
grunt.initConfig({
  packagejsonlint: {
    options: {
      ignorewarnings: false,
      showallerrors: false,
      stoponerror: false,
      stoponwarning: false
    },
    files: {
      src: ['package.json']
    }
  }
});
```

#### Custom Options

In this example, the custom options are used to lint package.json files. All warnings will be ignored, but all errors will show across all files.

```js
grunt.initConfig({
  packagejsonlint: {
    options: {
      ignorewarnings: true,
      showallerrors: true
    },
    files: {
      src: ['package.json']
    }
  }
})
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Release History

* 2016-04-17 - v0.1.0: First release

## License

Copyright (c) 2016 Thomas Lindner. Licensed under the MIT license.
