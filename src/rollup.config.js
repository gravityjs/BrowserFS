import nodeResolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import buble from 'rollup-plugin-buble';
import {join} from 'path';

const outBase = join(__dirname, '..', 'build', 'temp', 'library');

export default {
  input: join(outBase, 'ts', 'index.js'),
  output: {
    file: join(outBase, 'rollup', 'browserfs.rollup.js'),
    sourceMap: false,
    strict: true,
    format: 'cjs',
    exports: 'named'
  },
  external: [
    'buffer', 'path'
  ],
  plugins: [
    alias({
      async: require.resolve('async-es'),
      dropbox_bridge: join(outBase, 'ts', 'generic', 'dropbox_bridge_actual.js')
    }),
    nodeResolve({
      main: true,
      jsnext: true,
      preferBuiltins: true
    }),
    buble({
      transforms: {
        // Assumes all `for of` statements are on arrays or array-like items.
        dangerousForOf: true
      }
    })
  ]
};
