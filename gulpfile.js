var gulp = require('gulp'),
	gutil = require('gulp-util'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	fs = require('fs'),
	util = require('gulp-util'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	// scsslint = require('gulp-scss-lint'),
	// scsslint = require('gulp-scss-lint'),
	// jshint = require('gulp-jshint'),
	del = require('del'),
	runSequence = require('run-sequence'),
	sourcemaps = require('gulp-sourcemaps'),
 	autoprefixer = require('gulp-autoprefixer'),
 	imagemin = require('gulp-imagemin'),
 	source = require('vinyl-source-stream'),
 	buffer = require('vinyl-buffer'),
 	htmlInjector = require('bs-html-injector'),
 	webpack = require('gulp-webpack'),
	webpack2 = require('webpack'),
	LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
 	browserSync = require('browser-sync').create();

var conf = require('./config.json');
conf.production = !!util.env.production;

gulp.task('js', function() {
	return gulp.src(conf.src.js)
		.pipe(webpack({
			module: {
				loaders: [{
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						plugins: ['transform-runtime', 'lodash'],
						presets: ['es2015']
					}
				}],
			},
			'plugins': [
    			new LodashModuleReplacementPlugin
			],
			output: {
				filename: 'main.js'
			}
		}, webpack2))
		.pipe(conf.production ? uglify({ compress: { drop_console: true}}) : util.noop()) //compress js on prod // gulp --production
		.pipe(gulp.dest(conf.dist.js))
})

gulp.task('js-watch', function() {
	return gulp.src(conf.src.js)
		.pipe(webpack({
			watch: true,
			module: {
				loaders: [{
					loader: 'babel-loader',
					exlude: '/node_modules',
					query: {
						presets: ['es2015']
					}
				}],
			},
			output: {
				filename: 'main.js'
			}
		}))
		.pipe(gulp.dest(conf.dist.js))
})


//Copies fonts from src to dist
gulp.task('fonts', function(){
	gulp.src(conf.src.fonts)
		.pipe(gulp.dest(conf.dist.fonts));
	//Font Awesome
	gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(conf.dist.fonts))
	browserSync.reload();
	// done();
});

gulp.task('blueprints', function() {
	gulp.src(conf.src.blueprints)
		.pipe(gulp.dest(conf.dist.blueprints));
})

gulp.task('grav-theme-files', function() {
	gulp.src(conf.src.root + 'blueprints.yaml')
		.pipe(gulp.dest(conf.dist.root));
	gulp.src(conf.src.root + 'knopp-theme.yaml')
		.pipe(gulp.dest(conf.dist.root));
	gulp.src(conf.src.root + 'knopp-theme.php')
		.pipe(gulp.dest(conf.dist.root));
})


//Minify images
gulp.task('imgs', function() {
	gulp.src(conf.src.imgs)
        .pipe(imagemin())
        .pipe(gulp.dest(conf.dist.imgs));
    	browserSync.reload();
});


//Copies docs from src to dist
gulp.task('docs', function(){
	gulp.src(conf.src.docs)
		.pipe(gulp.dest(conf.dist.docs));
	// browserSync.reload();
	// done();
});

gulp.task('html', function(){
	// var dest = conf.dist + "/css/"
	return gulp.src(conf.src.html)
	    .pipe(gulp.dest(conf.dist.html))
	    // .pipe(browserSync.stream());
});

//Scss with autoprefixer and sourcemaps
gulp.task('scss', function(){
	// console.log(__dirname + '/node_modules')
	gulp.src(conf.src.scss)
		.pipe(plumber())
		.pipe(sourcemaps.init())
	    .pipe(sass.sync().on('error', sass.logError))
	    // .pipe(scsslint())
	    .pipe(autoprefixer())
		.pipe(conf.production ? cleanCSS() : util.noop())
		.pipe(sourcemaps.write())
	    .pipe(gulp.dest(conf.dist.css))
	    .pipe(browserSync.stream());
});


//Deletes dist root before every build
gulp.task('clean', function(){
	return del(conf.dist.root+'**/*', {force: true});
});

//Start browser-Sync Server
gulp.task('server', function() {
	
	//Inject html without reloading
	// browserSync.use(htmlInjector, {
 //    	files: conf.dist.html
 //  	});

	browserSync.init({
        proxy: "grav.kevin.dev",
        open: false,
        xip: true
    });
})

//Default gulp cmd
gulp.task('default', function() {
	runSequence('clean', ['html', 'scss', 'js', 'fonts', 'blueprints', 'grav-theme-files', 'imgs', 'docs'])
});

gulp.task('watch', function() {
	runSequence('clean', ['html', 'scss', 'js-watch', 'fonts', 'blueprints', 'grav-theme-files', 'imgs', 'docs']);
	gulp.watch(conf.src.html, ['html']);
	gulp.watch(conf.src.scss, ['scss']);
	gulp.watch(conf.src.imgs, ['imgs']);
	gulp.watch(conf.src.docs, ['docs']);
})


//gulp dev cmd
gulp.task('dev', function() {
	runSequence('server', 'watch')
}); 