'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: 'scripts/**/*.js',
                options: {
                    livereload: true,
                }
            },
            style: {
                files: 'style/**/*.css',
                options: {
                    livereload: true,
                }
            },
            sites: {
                files: 'sites/**/*',
                options: {
                    livereload: true,
                }
            },
            scaffold: {
                files: 'Scaffold.html',
                options: {
                    livereload: true,
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['watch']);

};
