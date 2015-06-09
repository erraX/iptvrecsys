module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      dist: {
        src: ['dist/js/*.js'],
        dest: 'dist/js/iptv.min.js'
      }
    },

    jshint: {
      options: {
        "curly": true, "eqeqeq": true, "immed": true, "latedef": true, "newcap": true, "noarg": true, "sub": true, "undef": true, "boss": true, "eqnull": true, "node": true,
        globals: {
          jQuery: true
        },
      },
      all: ['dist/js/view.js', 'dist/js/model.js', 'dist/js/collection.js', 'dist/js/logger.js']
    },

    sass: {
      dist: {
        src: 'src/sass/layout.scss',
        dest: 'dist/css/layout.css'
      }
    },

    autoprefixer: {
      dist: {
         // src: '<%= sass.dist.dest =>',
         src: 'dist/css/layout.css',
         dest: 'dist/css/layout.css'
      },
    },

    connect: {
      server: {
        options: {
          port: 8888,
          base: '.',
        }
      }
    },

    open: {
      myweb: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.server.options.port%>'
      }
    },

    watch: {
      options: {
          livereload: true,
          spawn: false
      },
      css: {
        files: '<%= sass.dist.src %>',
        tasks: ['sass', 'autoprefixer'],
      },
 
      // js: {
      //   files: '<%= uglify.dist.src %>',
      //   tasks: ['jshint','uglify'],
      // }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.registerTask('default', ['connect', 'open', 'watch']);
};
