module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! \n * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',

        clean: {
            src: ['dist']
        },

        concat: {
            deploy: {
                options: {
                    banner: '<%= banner %>',
                    stripBanners: true
                },
                files: {
                    'dist/jsheightfix.js': 'src/app/jsheightfix.js',
                    'dist/jsheightfix.css': 'src/assets/css/jsheightfix.css'
                }
            }
        },

        cssmin: {
            options: {
                banner: '<%= banner %>',
                report: 'gzip'
            },
            minify: {
                src: 'src/assets/css/jsheightfix.css',
                dest: 'dist/jsheightfix.min.css'
            }
        },

        uglify: {
            deploy: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [{
                    'dist/jsheightfix.min.js': 'dist/jsheightfix.js',
                }] 
            }
        },

        jshint: {
            gruntFile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/app/**/*.js']
            }
        },

        karma: {
            unit: {
                configFile: 'config/karma.conf.js',
                background: true
            }
        },

        watch: {
            files: [
                'vendor/jquery/dist/jquery.min.js',
                'vendor/angular/angular.min.js',
                'vendor/angular-mocks/angular-mocks.js',

                'src/app/**/*.js'
            ],
            tasks: ['karma:unit:run']
        },

        nodestatic: {
            server: {
                options: {
                    port: '8080',
                    base: 'src',

                    keepalive: true
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodestatic');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('devmode', ['jshint', 'karma:unit','clean', 'concat', 'uglify', 'watch']);
    grunt.registerTask('deploy', ['jshint', 'karma:unit', 'clean', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('default', ['karma']);
  
};