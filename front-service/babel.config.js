module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~': './src',
          '~apis': './src/apis',
          '~components': './src/components',
          '~nav': './src/nav',
          '~container': './src/container',
          '~presentation': './src/presentation',
          '~recoil': './src/recoil',
          '~icons': './src/static/icons',
          '~images': './src/static/images',
        },
      },
    ],
  ],
};
