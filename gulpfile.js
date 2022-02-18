const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del"); 

const paths = {
	styles: {
		src: "src/styles/**/*.sass",
		dist: "dist/css/",
	},
	scripts: {
		src: "src/scripts/**/*.js",
		dist: "dist/js/",
	},
};

function clean() {
	return del(["dist"]);
}
function styles() {
	return gulp
		.src(paths.styles.src)
        .pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCss())
		.pipe(
			rename({
				basename: "main",
				suffix: ".min",
			})
		)
        .pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.styles.dist));
}
function scripts() {
	return gulp
		.src(paths.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat("main.min.js"))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.scripts.dist));
}
function watch() {
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.scripts.src, scripts);
}
const build = gulp.series(clean, gulp.parallel(styles, scripts), watch);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
