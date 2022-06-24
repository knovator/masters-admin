import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import pkg from './package.json';

const config = {
  input: 'src/index.tsx',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  output: [
    {
      name: '@knovator/masters',
      file: pkg.main,
      format: 'cjs',
      globals: {
        react: 'React',
      },
      exports: 'auto',
    }, {
      name: '@knovator/masters',
      file: pkg.module,
      format: 'esm',
      globals: {
        react: 'React',
      },
      exports: 'auto',
    },
  ],
  plugins: [
    resolve({ browser: true }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      minimize: true,
      // modules: true,
      // extract: true,
      inject: {
        insertAt: 'top',
      },
    }),
    json(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/__tests__', '**/*.test.ts', '**/*.test.tsx'],
    }),
    terser(),
    peerDepsExternal(),
  ],
};

export default config;
