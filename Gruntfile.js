module.exports = function (grunt) {

  grunt.initConfig({

    // Watches for changes and runs tasks
    watch : {
      sass : {
        files : ['scss/**/*.scss'],
        tasks : ['compass:dev'],
        options : {
          livereload : true
        }
      },
      js : {
        files : ['js/**/*.js'],
        tasks : ['jshint'],
        options : {
          livereload : true
        }
      },
      php : {
        files : ['**/*.php'],
        options : {
          livereload : true
        }
      }
    },

    // JsHint your javascript
    jshint : {
      all : ['js/*.js', '!js/modernizr.js', '!js/*.min.js', '!js/vendor/**/*.js'],
      options : {
        browser: true,
        curly: false,
        eqeqeq: false,
        eqnull: true,
        expr: true,
        immed: true,
        newcap: true,
        noarg: true,
        smarttabs: true,
        sub: true,
        undef: false
      }
    },

    // Compass building
    compass: {
      options: {
        require: ['susy', 'compass-normalize'],
        relativeAssets: true
      },
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          outputStyle: 'compressed',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          outputStyle: 'expanded'
        }
      }
    },

    // Image min
    imagemin : {
      production : {
        files : [
          {
            expand: true,
            cwd: 'images',
            src: '**/*.{png,jpg,jpeg}',
            dest: 'images'
          }
        ]
      }
    },

    // SVG min
    svgmin: {
      production : {
        files: [
          {
            expand: true,
            cwd: 'images',
            src: '**/*.svg',
            dest: 'images'
          }
        ]
      }
    }

  });

  // Default task
  grunt.registerTask('default', ['watch']);

  // Build task
  grunt.registerTask('build', ['jshint', 'compass:dist', 'imagemin:production', 'svgmin:production']);

  // Template Setup Task
  grunt.registerTask('setup', ['compass:dev']);

  // Load up tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');

  // Run bower install
  grunt.registerTask('bower-install', function() {
    var done = this.async();
    var bower = require('bower').commands;
    bower.install().on('end', function(data) {
      done();
    }).on('data', function(data) {
      console.log(data);
    }).on('error', function(err) {
      console.error(err);
      done();
    });
  });

};
