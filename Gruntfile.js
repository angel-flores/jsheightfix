module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            src: ['dist']
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/app/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('devmode', ['karma:unit','clean', 'concat', 'uglify', 'watch']);
    grunt.registerTask('default', ['karma']);
  
}