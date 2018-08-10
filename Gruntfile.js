"use strict";

module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
        banner: grunt.file.read("src/banner.js").replace(/@VERSION/, pkg.version),
        // Task configuration.
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            dist: {
                src: "<%= build.dist.dest %>",
                dest: "package/fusioncharts-jquery-plugin.min.js"
            }
        },
        build: {
            options: {
                banner: "<%= banner %>"
            },
            dist: {
                dest: "package/fusioncharts-jquery-plugin.js",
                src: [
                    "src/transcoder-htmltable/transcoder-htmltable.js",
                    "src/fusioncharts-jquery-plugin.js"
                ]
            }
        },
        jshint: {
            options: pkg.jshintConfig,
            all: ["src/*"]
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    // Special concat/build task to handle FusionCharts jQuery plugin build requirements
    grunt.registerMultiTask(
        "build",
        "Concatenate source, remove individual closures, embed version",
        function() {
            var data = this.data,
                name = data.dest,
                src = data.src,
                options = this.options({
                    banner: ""
                }),
                // Start with banner
                compiled = options.banner;
            // Concatenate src
            src.forEach(function(path) {
                var source = grunt.file.read(path);

                compiled += source;
            });

            grunt.file.write(name, compiled);
        }
    );

    // Default task.
    grunt.registerTask("default", ["jshint", "build", "uglify"]);
};