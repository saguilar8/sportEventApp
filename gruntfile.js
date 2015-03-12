module.exports = function (grunt) {
	var ENV = process.env.APP_ENV || 'devel';
	console.log('Running grunt for environment: ' + ENV);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		jshint: {
			server: {
				src: [ 'app/**/*.js' ],  
				options: {					
					curly: true,
					eqeqeq: false,
					eqnull: true,
					browser: true,
					globals: {
                        node: true
					}
				}
			},
			client: {
				src: [ 'public/**/*.js', 
					   //exclusions
                       '!**/*.min.js', '!public/lib/**/*.js'
                       ],  
				options: {					
					curly: true,
					eqeqeq: false,
					eqnull: true,
					browser: true,
					globals: {
                        angular: true
					}
				}
			}
		}
         
    });

	grunt.loadNpmTasks('grunt-contrib-jshint');

	//lauch JS check with: 		grunt jshint
};
