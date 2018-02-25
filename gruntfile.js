module.exports = function (grunt) {
    // Unified Watch Object
    var watchFiles = {
        serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
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
    grunt.registerTask('default', ['jade','less:dev','concurrent:default']);

    // Build task(s).
    grunt.registerTask('build', ['jade','less:prod']);




};
