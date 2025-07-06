import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/assets/js/main.js',

  // → JS bundle stays beside main.js
  output: {
    file: 'src/assets/js/bundle.js',
    format: 'iife',
    sourcemap: true,
  },

  plugins: [
    nodeResolve(),

    // → CSS bundle stays beside main.css
    postcss({
      extract: 'src/assets/css/bundle.css',
      minimize: true,
      sourceMap: true,
      plugins: [postcssImport(), postcssNested(), autoprefixer()],
    }),

    terser(),
  ],

  watch: { clearScreen: false },
};
