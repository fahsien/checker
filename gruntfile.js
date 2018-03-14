module.exports = function (grunt) {
    // Unified Watch Object
    var watchFiles = {
        serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
        clientJS: ['templates/modules/**/*.js'],
        clientViews: ['templates/**/views/**/*.jade'],
        clientLESS: ['templates/**/*.less'],
    },
    lessFiles = [{
        expand: true,
        cwd: 'templates/modules/',
        src: ['**/*.less'],
        dest: 'public/modules/',
        ext: '.css'
    }];

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint', 'babel'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                tasks: ['jade'],
                options: {
                    livereload: true,
                }
            },
            clientLESS: {
                files: watchFiles.clientLESS,
                tasks: ['less:dev'],
                options: {
                    livereload: true
                }
            },
        },
        jshint: {
            all: {
                // src: watchFiles.clientJS.concat(watchFiles.serverJS),
                src: [
                    'templates/*.js',
                    'templates/**/*.js'
                ],
                options: {
                    jshintrc: true,
                    esnext: true,
                }
            }
        },
        babel: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'templates/modules/',
                    src: ['**/*.js'],
                    dest: 'public/modules/'
                }, {
                    expand: true,
                    cwd: 'templates/',
                    src: ['*.js'],
                    dest: 'public/'
                }]
            }
        },
        jade: {
            compile: {
                options: {
                    // pretty: true,
                    livereload: true
                },
                files: [{
                    expand: true,
                    cwd: 'templates/modules/',
                    src: ['**/*.jade'],
                    dest: 'public/modules/',
                    ext: '.html'
                }]
            }
        },
        less: {
            dev: {
                files: lessFiles,
                options: {
                    modifyVars: {production: 'false'}
                }
            },
            prod: {
                files: lessFiles,
                options: {
                    modifyVars: {production: 'false'}
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--inspect-brk'],
                    ext: 'js,html',
                    watch: watchFiles.serverJS
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Default task(s).
    grunt.registerTask('default', ['jade','less:dev','lint','babeljs','concurrent:default']);

    // Lint task(s).
    // disable csslint
    grunt.registerTask('lint', ['jshint']);

    // babel: es6 to es5
    grunt.registerTask('babeljs', ['babel']);

    // Build task(s).
    grunt.registerTask('build', ['jade','less:prod']);




};
