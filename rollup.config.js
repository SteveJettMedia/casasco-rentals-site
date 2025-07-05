import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
 input: 'src/assets/js/main.js',
 output: {
   file: '_site/assets/js/bundle.js',
   format: 'iife',
   sourcemap: true
 },
 plugins: [
   nodeResolve(),
   terser()
 ],
 watch: {
   clearScreen: false
 }
};
