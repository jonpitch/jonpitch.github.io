module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            main: {
                src: 'public/js/<%= pkg.name %>.js',
                dest: 'public/js/<%= pkg.name %>.min.js'
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["public/css"]
                },
                files: {
                    "public/css/<%= pkg.name %>.css": "public/less/<%= pkg.name %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["public/css"],
                    cleancss: true
                },
                files: {
                    "public/css/<%= pkg.name %>.min.css": "public/less/<%= pkg.name %>.less"
                }
            }
        },
        concat: {
            js: {
                src: [
                    'public/js/jquery.min.js',
                    'public/js/bootstrap.min.js',
                    'public/js/jonpitcherella.com.min.js'
                ],
                dest: 'public/js/site.js'
            },
            css: {
                src: [
                    'public/css/bootstrap.min.css',
                    'public/css/syntax.css',
                    'public/css/font-awesome.min.css',
                    'public/css/jonpitcherella.com.min.css'
                ],
                dest: 'public/css/site.css'
            }
        },
        watch: {
            scripts: {
                files: ['public/js/<%= pkg.name %>.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['public/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        },
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less', 'concat']);

};
