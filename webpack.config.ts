const {join} = require('path')
const pkg = require('./package.json')

const libraryName = pkg.name

let entry: string | string[] = [
  `./src/${libraryName}.ts`
]

module.exports = {
  entry: {
    index: entry
  },
  devtool: 'source-map',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: libraryName,
    filename: `${libraryName}.js`
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                'declaration': true,
                'declarationDir': '../lib/'
              }
            }
          }
        ]
      }
    ]
  }
}
