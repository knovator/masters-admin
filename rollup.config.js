import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs"
import {terser} from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

const config = {
    input: 'src/index.tsx',
    external: ['react'],
    output: [
        {
            name: '@knovator/masters',
            file: pkg.browser,
            format: 'umd',
            globals: {
                react: "React"
            },
            exports: "default",
        }, {
            name: "@knovator/masters",
            file: pkg.main,
            format: "cjs",
            globals: {
                react: "React"
            },
            exports: "default",
        }, {
            name: "@knovator/masters",
			file: pkg.module,
			format: "esm",
            globals: {
                react: "React"
            },
            exports: "default",
        }
    ],
    plugins: [
        postcss(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
        terser(),
    ]
}
export default config