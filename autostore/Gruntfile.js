module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            build: {
                files: {
                    'css/style.css': 'grunt/main.less'
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'css/style.min.css': 'css/style.css'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.less',
                tasks: ['less', 'cssmin'],
            }
        }
});
    grunt.registerTask('default', ['less', 'cssmin']);
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
