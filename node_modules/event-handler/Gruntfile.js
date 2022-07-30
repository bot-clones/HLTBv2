module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        bt: {
            dist: 'dist',
            build: {
                files: {
                    'dist/device-manager.js': ['src/device-manager.js']
                },
                browserifyOptions: {
                    standalone: 'EventHandler'
                }
            },
            min: {
                files: {
                    'dist/device-manager-min.js': ['dist/device-manager.js']
                }
            },
            tests: {
                mocha: {
                    src: ['tests/*.js']
                }
            }
        }
    });

    require("load-grunt-tasks")(grunt);
};