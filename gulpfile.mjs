// gulpfile.mjs
import gulp from 'gulp';
import pug from 'gulp-pug';
import postcss from 'gulp-postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean';
import browserSyncModule from 'browser-sync';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';

const { src, dest, series, parallel, watch } = gulp;
const browserSync = browserSyncModule.create();

const paths = {
  views: {
    src: ['src/views/**/*.pug', 'src/components/**/*.pug', 'src/includes/**/*.pug'],
    dest: 'public/'
  },
  styles: {
    src:  'src/styles/tailwind.css',
    dest: 'public/dist/'
  },
  scripts: {
    src:  'src/assets/js/**/*.js',
    dest: 'public/assets/js/'
  },
  images: {
    src:  'src/assets/images/**/*',
    dest: 'public/assets/images/'
  },
  fonts: {
    src:  'src/assets/fonts/**/*',
    dest: 'public/assets/fonts/'
  }
};

// Xoá sạch public trước build
export function cleanAll() {
  return src('public/*', { read: false, allowEmpty: true })
    .pipe(clean());
}

// Pug → HTML
export function views() {
  return src(paths.views.src, { base: 'src' })
    .pipe(pug({ pretty: true, basedir: 'src' }))
    .pipe(dest(paths.views.dest))
    .pipe(browserSync.stream());
}

// Tailwind via PostCSS + sourcemaps + autoprefixer
export function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([ tailwindcss(), autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Copy JS
export function scripts() {
  return src(paths.scripts.src)
    .pipe(newer(paths.scripts.dest))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Copy & optimize images
export function images() {
  return src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(cache(imagemin({ interlaced: true })))
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Copy fonts
export function fonts() {
  return src(paths.fonts.src)
    .pipe(newer(paths.fonts.dest))
    .pipe(dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}

// Server + watch
export function serve() {
  browserSync.init({
    server: { baseDir: 'public' },
    port: 3000,
    open: true
  });

  watch(paths.views.src, views);
  watch('src/styles/**/*.css', styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
  watch(paths.fonts.src, fonts);
}

// Build và default
export const build = series(
  cleanAll,
  parallel(views, styles, scripts, images, fonts)
);

export default series(build, serve);
export { serve as watch };
