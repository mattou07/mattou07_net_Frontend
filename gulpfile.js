const gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    twig        = require('gulp-twig'),
    prettify    = require('gulp-html-prettify'),
    imagemin    = require('gulp-imagemin'),
    pump        = require('pump'),
    postcss     = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    terser      = require('gulp-terser'),
    cssnano     = require('cssnano')

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'templates', 'js'], function() {

    browserSync.init({
        server: "./dist",
        directory: true
    });

    gulp.watch("src/img/*", ['imagemin']);
    gulp.watch("src/img/**/*", ['imagemin']);
    gulp.watch("src/scss/*", ['sass']);
    gulp.watch("src/scss/**/*", ['sass']);
    gulp.watch("src/js/*", ['js']);
    gulp.watch("src/**/*", ['templates']);
    gulp.watch("src/*", ['templates']);
});

// Build a verison of the site
gulp.task('build', ['sass', 'templates', 'js', 'imagemin', 'fonts'], function() {
    console.log("Site build into the /dist folder");
});

gulp.task("fonts", function () {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('templates', function() {
    gulp.src('src/**/*.html')
        .pipe(twig())
        .pipe(prettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('dist'))
        .on('end', function() {
            browserSync.reload();
        });
});

//image compression
gulp.task('imagemin', () =>
	gulp.src('src/img/**/*')
		.pipe(imagemin({quality: '75-90'}))
		.pipe(gulp.dest('dist/img/'))
);

//js compression
gulp.task('js', function() {
    return gulp.src("src/js/*.js")
        // // .pipe(babel({
        // //     presets: ['es2015']
        // // }))
        // .pipe(uglify())
        .pipe(terser())
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

//error logging compression of JS
gulp.task('compress-js', function (cb) {
    pump([
        gulp.src('src/js/*.js'),
        terser(),
        gulp.dest('dist/js')
    ],cb);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {

        var plugins = [
            autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }),
            cssnano
        ];
        return gulp.src("src/scss/*.scss")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(postcss(plugins))
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
