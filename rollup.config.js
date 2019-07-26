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
import babel from 'rollup-plugin-babel'; // es6转es5
import node from 'rollup-plugin-node-resolve'; // node_modules - 解析commonjs
import commonjs from 'rollup-plugin-commonjs'; // node_modules - 将commonjs转化为es6 module(import)
import json from 'rollup-plugin-json'; // rollup读取json文件
import sourcemaps from 'rollup-plugin-sourcemaps'; // 生成map文件
import uglify from 'rollup-plugin-uglify'; // 压缩打包文件
import peerDepsExternal from 'rollup-plugin-peer-deps-external'; //peerdependence中依赖配置

const copyright =
  `// Land Group FE/react-vehicle-keyboard Copyright ${(new Date).getFullYear()} Land Group`;

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
    // 入口
    input: 'src/index.js',
    // 插件
    plugins: [
      // node_modules中的包大部分是commonjs格式的，要在rollup中使用必须先转为es6语法
      node(),
      // Polyfill require() from dependencies.
      // 将非es6语法的包转为es6可用
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
          // 协助排除external的外部模块，不打包进库里
          "external-helpers"
        ],
        "presets": [
          [
            "env",
            {
              "modules": false
            }
          ],
          "stage-0",
          "react"
        ]
      }),
      sourcemaps(),
      peerDepsExternal({
        includeDependencies: true,
      }),
      ...plugins,
    ],
    // 出口
    output: {
      banner: copyright,
      // 设置全局变量
      globals: {
        'react': 'React',
        'react-dom': 'ReactDom'
      },
      sourcemap: true,
      ...output,
    },
    // 是否开启代码分割,用户定义多出口
    experimentalCodeSplitting: false,
    // 指出外部模块，不会与库打包在一起
    external: [
      'crypto',
      'react',
      'react-dom',
      'less',
      ...external,
    ],
    // 拦截警告
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
      name: 'react-vehicle-keyboard',
      extend: true,
      file: 'dist/react-vehicle-keyboard.js',
      // exports: 'named' // 导出模式 named:导出多个东西 default: 仅仅导出一个东西
    }
  }),
  config({
    plugins: [minify()],
    output: {
      format: 'umd',
      name: 'react-vehicle-keyboard',
      extend: true,
      file: 'dist/react-vehicle-keyboard.min.js'
    }
  })
];
