// gulpfile.mjs

import gulp from 'gulp';
import pug from 'gulp-pug';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
// import clean from 'gulp-clean';
import browserSyncModule from 'browser-sync';
import newer from 'gulp-newer';

// Create browserSync instance
const browserSync = browserSyncModule.create();

// Paths configuration
const paths = {
  pug: {
    src: 'src/views/*.pug',
    watch: 'src/**/*.pug', // Watch all pug files including components, includes, layouts
    dest: 'public/'
  },
  styles: {
    src: 'src/styles/tailwind.css',
    watch: 'src/styles/**/*.css',
    dest: 'public/' // Changed from public/dist/ to public/
  },
  assets: {
    fonts: {
      src: 'src/assets/fonts/**/*',
      dest: 'public/assets/fonts/'
    },
    js: {
      src: 'src/assets/js/**/*.js',
      dest: 'public/assets/js/'
    }
  },
  components: {
    watch: 'src/components/**/*.pug'
  },
  includes: {
    watch: 'src/includes/**/*.pug'
  }
};

// // Clean public folder
// export function cleanAll() {
//   return gulp.src('public/*', { read: false, allowEmpty: true })
//     .pipe(clean());
// }

// Compile Pug templates
export function views() {
  return gulp.src(paths.pug.src)
    .pipe(pug({ 
      pretty: true,
      basedir: 'src' // Allow absolute imports from src folder
    }))
    .on('error', function(err) {
      console.error('Pug compilation error:', err.message);
      this.emit('end');
    })
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browserSync.stream());
}

// Compile Tailwind CSS for development
export function stylesDev() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(postcss()) // Không truyền plugins, sẽ đọc từ postcss.config.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Compile Tailwind CSS for production
export function stylesProd() {
  return gulp.src(paths.styles.src)
    .pipe(postcss()) // Không truyền plugins, sẽ đọc từ postcss.config.js
    .on('error', function(err) {
      console.error('PostCSS error:', err.message);
      this.emit('end');
    })
    .pipe(gulp.dest(paths.styles.dest));
}


// Copy fonts
export function fonts() {
  return gulp.src(paths.assets.fonts.src)
    .pipe(newer(paths.assets.fonts.dest))
    .pipe(gulp.dest(paths.assets.fonts.dest))
    .pipe(browserSync.stream());
}

// Copy JavaScript files
export function js() {
  return gulp.src(paths.assets.js.src)
    .pipe(newer(paths.assets.js.dest))
    .pipe(gulp.dest(paths.assets.js.dest))
    .pipe(browserSync.stream());
}

// Development server with file watching
export function serve() {
  // Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: 'public'
    },
    port: 3000,
    open: true,
    notify: false
  });

  // Watch files for changes
  gulp.watch(paths.pug.watch, views); // Watch all pug files
  gulp.watch(paths.styles.watch, stylesDev); // Watch all CSS files
  gulp.watch(paths.assets.fonts.src, fonts);
  gulp.watch(paths.assets.js.src, js);
}

// Development build
export const dev = gulp.series(
  gulp.parallel(views, stylesDev, fonts, js)
);

// Production build
export const build = gulp.series(
  gulp.parallel(views, stylesProd, fonts, js)
);

// Default task: development build and serve
export default gulp.series(dev, serve);

// Export serve as watch for backward compatibility
export { serve as watch };