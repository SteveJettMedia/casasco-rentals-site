import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/assets/js/main.js',
  output: {
    file: '_site/assets/js/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    postcss({
      extract: '../../assets/css/bundle.css',
      minimize: true,
      sourceMap: true,
      plugins: [postcssImport(), postcssNested(), autoprefixer()],
    }),
    terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
