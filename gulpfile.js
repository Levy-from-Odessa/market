let gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync');


gulp.task('clean' , async function(){
	del.sync('dist')
});


gulp.task('scss', function(){
	return gulp.src('./app/style/**/*.scss')
	.pipe(sass({outputStyle:'compact'}))
	.pipe(autoprefixer({
		browsers: ['last 8 versions']
	}))
	.pipe(rename({suffix : '.min'}))
	.pipe(gulp.dest('./app/style'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
	return gulp.src([
		'./node_modules/normalize.css/normalize.css',
		'./node_modules/slick-carousel/slick/slick.css',
		'./node_modules/magnific-popup/dist/magnific-popup.css'
	])
	.pipe(sass({outputStyle:'compressed'}))
	
	.pipe(concat('_libs.scss'))
	.pipe(gulp.dest('./app/style'))
	.pipe(browserSync.reload({stream: true}))
});



gulp.task('html', function(){
	return gulp.src('./app/*.html')
	 .pipe(browserSync.reload({stream: true}))
});
gulp.task('script', function(){
	return gulp.src('./app/js/*.js')
	 .pipe(browserSync.reload({stream: true}))
});

gulp.task('js',function(){
	return gulp.src([
		'./node_modules/slick-carousel/slick/slick.js',
		'./node_modules/magnific-popup/dist/jquery.magnific-popup.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/js'))
	.pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function(){
	browserSync.init({
		server: {baseDir:"./app"	},
		tunnel: true,

		// Attempt to use the URL "http://my-private-site.localtunnel.me"
		tunnel: "my-private-site"
		
	})
});



gulp.task('import',  function(){
	let buildHtml = gulp.src('./app/**/*.html')
		.pipe(gulp.dest('dist'));

	let buildCss = gulp.src('./app/style/**/*.css')
		.pipe(gulp.dest('dist/css'));

	let buildJS = gulp.src('./app/js/**/*.js')
		.pipe(gulp.dest('dist/js'));

	let buildFonts = gulp.src('./app/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts'));

	let buildImg = gulp.src('./app/img/**/*.*')
		.pipe(gulp.dest('dist/img'));
});


gulp.task('watch',function(){
	gulp.watch('./app/style/**/*.scss', gulp.parallel('scss'))
	gulp.watch('./app/*.html', gulp.parallel('html'))
	gulp.watch('./app/js/*.js', gulp.parallel('script'))
});


gulp.task('build', gulp.series('clean', 'import'));

gulp.task('default', gulp.parallel('css' , 'scss','js','browser-sync', 'build', 'watch'));







