import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';

const isDev = process.env.NODE_ENV !== 'production';

export default {
  input: 'src/assets/js/main.js',
  output: {
    file: '_site/assets/js/bundle.js',
    format: 'iife',
    sourcemap: isDev,
  },
  plugins: [
    nodeResolve(),
    postcss({
      extract: true, // This will extract to bundle.css next to bundle.js
      minimize: !isDev,
      sourceMap: isDev,
      plugins: [postcssImport(), postcssNested(), autoprefixer()],
    }),
    !isDev && terser(),
  ].filter(Boolean),
  watch: {
    clearScreen: false,
    include: 'src/assets/**/*',
  },
};
