/**
 * @license
 * Copyright 2019 Land Group FE. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import node from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';

const copyright =
  `// Land Group FE/react-vehicle-keyboard-js Copyright ${(new Date).getFullYear()} Land Group`;

function minify() {
  return uglify({
    output: {
      preamble: copyright,
    }
  });
}
const babelOptions = {}
function config({ plugins = [], output = {}, external = [] }) {
  return {
    input: 'src/index.js',
    plugins: [
      node(),
      // Polyfill require() from dependencies.
      commonjs({
        ignore: ['crypto'],
        include: 'node_modules/**'
      }),
      json(),
      // We need babel to compile the compiled_api.js generated proto file from
      // es6 to es5.
      babel({
        babelrc: false,
        exclude: "node_modules/**",
        runtimeHelpers: true,
        "plugins": [
          "external-helpers"
        ],
        "presets": [
          [
            "env",
            {
              "modules": false
            }
          ],
          "react"
        ]
      }),
      sourcemaps(),
      ...plugins,
    ],
    output: {
      banner: copyright,
      globals: {
        'node-fetch': 'nodeFetch',
        'react': 'React',
        'react-dom': 'ReactDom'
      },
      sourcemap: true,
      ...output,
    },
    // 指出外部模块，不会与库打包在一起
    external: [
      // node-fetch is only used in node. Browsers have native "fetch".
      'node-fetch',
      'crypto',
      'react',
      'react-dom',
      ...external,
    ],
    onwarn: warning => {
      let { code } = warning;
      if (code === 'CIRCULAR_DEPENDENCY' || code === 'CIRCULAR' ||
        code === 'THIS_IS_UNDEFINED') {
        return;
      }
      console.warn('WARNING: ', warning.toString());
    }
  };
}

export default [
  config({
    output: {
      format: 'umd',
      name: 'react-vehicle-keyboard-js',
      extend: true,
      file: 'dist/react-vehicle-keyboard-js.js',
    }
  }),
  config({
    plugins: [minify()],
    output: {
      format: 'umd',
      name: 'react-vehicle-keyboard-js',
      extend: true,
      file: 'dist/react-vehicle-keyboard-js.min.js',
    }
  })
];
