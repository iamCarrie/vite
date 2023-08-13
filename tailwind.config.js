const {
  screens,
  screenSize
} = require('./tailwind.setting.js');

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.ejs',
      './src/**/*.js',
      './src/**/*.css'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
      },
      fontFamily:{
        'poppins':'Poppins,sans-serif'
      }

    },
    fontSize: {
      ...{
        vmp: `${((16 / screenSize.pc) * 100)}vw`,
        vmt: `${((16 / screenSize.tab) * 100)}vw`,
        vmm: `${((16 / screenSize.m) * 100)}vw`,
        vmmls: `${(((16 / screenSize.m) * 100) / 1.77)}vw`
      }
    },

    screens: {
      ...screens
    }

  },

  corePlugins: {
    fontFamily: false
  },
  variants: {},
  plugins: []
};
