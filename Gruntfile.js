module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      css: {
        src: [
          'public/css/poole.css',
          'public/css/hyde.css',
          'public/css/syntax.css',
          'public/css/jonpitcherella.css'
        ],
        dest: 'public/css/site.css'
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat']);

};
