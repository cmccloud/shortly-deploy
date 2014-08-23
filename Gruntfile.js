module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      client: {
        src: [
          './public/client/*.js'
        ],
        dest: './public/dist/clientbuild.js',
      },
      libs:{
        src: [
        './public/lib/jquery.js',
        './public/lib/underscore.js',
        './public/lib/backbone.js',
        './public/lib/handlebars.js',
        ],
        dest: './public/dist/libs.js',
      },
      // all: {
      //   src: [
      //   './public/dist/clientbuild.min.js',
      //   './public/dist/libs.min.js'
      //   ],
      //   dest: './public/dist/production.min.js'
      // },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
     options:{
      mangle:{
        except: ['jQuery','Backbone','_', 'Handlebars', 'Templates']
      }
     },
     my_target: {
      files: {
        './public/dist/production.min.js' : [
        './public/dist/libs.js',
        './public/dist/clientbuild.js'
        ]
      }
     }
    },

    jshint: {
      beforeconcat: ['./public/client/*.js'],
      afterconcat: ['./public/dist/clientbuild.js'],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js'
        ]
      }
    },

    cssmin: {
      minify: {
        files: {
          './public/dist/styles.min.css' : ['./public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'jshint:beforeconcat',
    'concat:client',
    'jshint:afterconcat',
    'concat:libs',
    'uglify',
    'cssmin',
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
