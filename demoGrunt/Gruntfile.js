module.exports = function(grunt) {

    // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({

    // Project settings
    config: config,

    pkg: grunt.file.readJSON('package.json'),

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.*'
          ],
          src: [
            '*.{ico,png,txt}',
            '{,*/}*.html',
            'fonts/{,*/}*.*'
          ]
        }]
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist : {},
      generated: {
        files: [
          {
            dest: 'dist/scripts/output.min.js',
            src: [
              '<%= config.app %>/scripts/angular.js', 
              '<%= config.app %>/scripts/*.js'
            ]
          }
        ]
      }
    },

    uglify: {
      dist : {},
      generated : {               
        files: {
          dest: '<%= config.dist %>/scripts/output.min.js',
          src: ['<%= config.dist %>/scripts/output.min.js']
        }
      }
    },

    cssmin: {
      generated : {  
        options: {          
          banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        },
        build: {
          files: {
            '<%= config.dist %>/styles/styles.min.css': '<%= config.app %>/styles/*.css'
          }
        }
      }
    },

    useminPrepare: {
      html: '<%= config.app %>/index.html', 
      options: {
        dest: '<%= config.dist %>'
      }   
    },

    usemin: {
      html: '<%= config.dist %>/index.html',      
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        src: [
          ['<%= config.dist %>*','.tmp']
        ]
      },
      temp: {
        src: [
          ['.tmp']
        ]
      }
    },

    // configure watch to auto update ----------------
    watch: {
      files: ['styles/*.css'], 
      tasks: ['useminPrepare','cssmin'],
      options: {
        cwd:'<%= config.app %>',
        livereload: true,
      },
    },

   
  });

  //load task
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('cleanAll', ['clean']);

  grunt.registerTask('build', [
    'clean',
    'copy:dist',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',  
    'usemin',
    'clean:temp'
]);

  grunt.registerTask('default', ['build']);

};