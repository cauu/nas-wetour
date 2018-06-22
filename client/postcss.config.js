module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    // "postcss-px-to-viewport": { 
    //   viewportWidth: 750, 
    //   viewportHeight: 1334, 
    //   unitPrecision: 5, 
    //   viewportUnit: 'vw', 
    //   selectorBlackList: [], 
    //   minPixelValue: 1, 
    //   mediaQuery: false 
    // },
    "postcss-pxtorem": {
      rootValue: 32,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
})
