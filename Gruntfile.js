module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-babel');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      // 'doozy/client/lib/**/*.js'],
      all: [
        'Gruntfile.js',
        'doozy/**/*.js',
        '!doozy/client/lib/**',
        'test/**/*.js',
      ],
      options: {
        esnext: true,
        globals: {
          eqeqeq: true
        },
        ignores: ['doozy/dist/**/*',
          'doozy/seed.js'
        ]
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'nyan',
          growl: true,
          clearRequireCache: true
        },
        src: ['test/unit/*.js', 'test/integration/*.js']
      }
    },
    nodemon: {
      dev: {
        script: 'doozy/index.js'
      }
    },
    express: {
      dev: {
        options: {
          script: 'doozy/index.js'
        }
      }

    },
    watch: {
      server: {
        files: ['doozy/**'],
        tasks: ['test', 'express:dev'],
        options: {
          spawn: false
        }
      },
      test: {
        files: ['test/**/*.js'],
        tasks: ['test']
      }
    },
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {

        }
      }
    },

    copy: {
      main: {
        files : [
          {expand: true, cwd:'doozy/client/', src: ['lib/**', 'index.html', 'assets/**', 'app/**/*.html'], dest: 'doozy/dist/'},
        ]
      }
    },

    // Injects all bower dependencies into index.html
    // Injects between <!-- bower:css / js --><!-- endbower -->
    wiredep: {
      task: {
        src: ['doozy/dist/index.html'],
        options: {
          ignorePath : '../client'
        }
      }
    },

    // Remove all files from the dist folder
    clean: ['doozy/dist/**/*'],

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        files: {
          // Concat all js files in client
          'doozy/dist/scripts/app.js': ['doozy/client/app/app.js', 'doozy/client/app/**/*.js'],
        }
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'doozy/dist/scripts/app.bundle.js': 'doozy/dist/scripts/app.js'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          // Minify concatenated files
          'doozy/dist/scripts/app.min.js': ['doozy/dist/scripts/app.bundle.js'],
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'doozy/dist/styles/style.min.css': ['doozy/client/styles/**/*.css']
        }
      }
    }

  });

  // Runs jshint, concats and minifies js and css to dist folder.
  // jsHint removed bc error in tasks.js
  grunt.registerTask('build', [
    'clean',
    'jshint',
    'copy',
    'wiredep',
    'concat',
    'babel',
    'cssmin',
  ]);

  grunt.registerTask('hint', [
    'jshint'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('default', [
    'nodemon'
  ]);
};
