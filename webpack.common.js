const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main-bundle-[fullhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  plugins: [new CleanWebpackPlugin()],
};
