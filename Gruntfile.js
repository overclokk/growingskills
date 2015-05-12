/**
 * Bootstrap path
 * @type {String}
 */
var bootstrap = "bower_components/bootstrap/";

var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Minimize images
         * @link https://github.com/gruntjs/grunt-contrib-imagemin
         * @link https://github.com/imagemin/imagemin-mozjpeg
         */
        imagemin: {                                 // Task
            dynamic: {                              // Another target
                options: {                          // Target options
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,                   // Enable dynamic expansion
                    cwd: 'src/',                    // Src matches are relative to this path
                    src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dest/'                   // Destination path prefix
                }]
            },
        },

        /**
         * Minimize JavaScript
         * @link https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            dist: {
                files: {
                    'src/js/script.min.js': [
                        bootstrap + 'js/transition.js',
                        bootstrap + 'js/alert.js',
                        bootstrap + 'js/button.js',
                        bootstrap + 'js/carousel.js',
                        bootstrap + 'js/collapse.js',
                        bootstrap + 'js/dropdown.js',
                        bootstrap + 'js/modal.js',
                        bootstrap + 'js/tooltip.js',
                        bootstrap + 'js/popover.js',
                        bootstrap + 'js/scrollspy.js',
                        bootstrap + 'js/tab.js',
                        bootstrap + 'js/affix.js',
                        'src/js/src/script.js'
                    ],
                    'dest/js/script.min.js': [
                        bootstrap + 'js/transition.js',
                        bootstrap + 'js/alert.js',
                        bootstrap + 'js/button.js',
                        bootstrap + 'js/carousel.js',
                        bootstrap + 'js/collapse.js',
                        bootstrap + 'js/dropdown.js',
                        bootstrap + 'js/modal.js',
                        bootstrap + 'js/tooltip.js',
                        bootstrap + 'js/popover.js',
                        bootstrap + 'js/scrollspy.js',
                        bootstrap + 'js/tab.js',
                        bootstrap + 'js/affix.js',
                        'src/js/src/script.js'
                    ],                  
                }
            }
        },

        /**
         * Compile Bootstrap
         * @link https://github.com/gruntjs/grunt-contrib-less
         */
        less: {
            development: {
                options: {
                    compress: false, // Se voglio minificare imposto su true
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'src/css/src/bootstrap.css': [
                        bootstrap + 'less/bootstrap.less'
                        ],
                  }
            }
        },

        /**
         * Minify CSS
         * @link https://github.com/gruntjs/grunt-contrib-cssmin
         */
        cssmin: {
            options: {

            },
            // dest: {
            //     files: {
            //         'dest/css/style.min.css': [
            //                         'src/css/src/bootstrap.css',
            //                         'src/css/src/style.css'
            //                         ]
            //     }
            // },
            src: {
                files: [{
                    expand: true,
                    cwd: 'src/css/src',
                    src: ['*.css', '!*.min.css'],
                    dest: 'src/css',
                    ext: '.min.css'
                }]
            },
            dest: {
                files: [{
                    expand: true,
                    cwd: 'src/css/src',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dest/css',
                    ext: '.min.css'
                }]
            },
        },

        /**
         * Minify HTML
         * @link https://github.com/gruntjs/grunt-contrib-htmlmin
         * @link https://github.com/kangax/html-minifier#options-quick-reference
         * @link https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically
         */
        htmlmin: {                                              // Task
            dist: {                                             // Target
                options: {                                      // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {                                        // Dictionary of files
                    'dest/index.html': 'src/index.html',        // 'destination': 'source'
                }
            },
        },

        /**
         * Watch tasks
         * @link https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            img:{
                files: ['src/img/*.{jpg,png,gif}'],
                tasks: ['imagemin'],
            },
            // less: {
            //     files: ['**/*.less'],
            //     tasks: ['yourtask'],
            // },
            // compass: {
            //     files: ['src/css/src/*.{scss,sass}'],
            //     tasks: ['yourtask'],
            // },
            css: {
                files: ['src/css/src/*.css'],
                tasks: ['cssmin'],
            },
            js: {
                files: ['src/js/src/*.js'],
                tasks: ['uglify'],
            },
            html: {
                files: ['src/*.html'],
                tasks: ['htmlmin'],
            },
            options: {
                livereload: 9001,
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('build', [
                                'less',
                                // 'compass',
                                'cssmin',
                                'imagemin',
                                'uglify',
                                'htmlmin'
                                ]);

    // grunt.registerTask('prova', [
    //                             'uglify:prova',
    //                             'cssmin',
    //                             // 'uglify',
    //                             ]);

    grunt.event.on('watch', function(action, filepath) {
      grunt.log.writeln(filepath + ' has ' + action);
    });

};