module.exports = {
  ignore: ['./node_modules'],
  presets: [
    '@babel/preset-env',
    {
      targets: {
        node: 'current'
      }
    }
  ],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: true
      }
    ]
  ]
};
