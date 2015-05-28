module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'pomo.min.js': ['js/Model.js', 'js/Collection.js', 'js/View.js', 'js/app.js']
        }
      }
    },

    coffee: {
      compileBare: {
        options: {
          bare: true,
          join: true
        },
        files: {
          'dist/js/tiny.js': ['js/coffee/Model.coffee', 'js/coffee/Collection.coffee', 'js/coffee/View.coffee', 'js/coffee/app.coffee']
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/layout.css': 'src/sass/layout.scss',
        }
      }
    },

    watch: {
      css: {
        files: ['src/sass/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },

      // js: {
      //   files: ['js/coffee#<{(|.coffee'],
      //   tasks: ['coffee'],
      //   options: {
      //     spawn: false
      //   }
      // }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

};

