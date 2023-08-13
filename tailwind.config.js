const { screens, screenSize } = require("./tailwind.setting.js");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {},
    },
    fontSize: {
      ...{
        vmp: `${(16 / screenSize.pc) * 100}vw`,
        vmt: `${(16 / 768) * 100}vw`,
        vmm: `${(16 / screenSize.m) * 100}vw`,
        vmmls: `${((16 / screenSize.m) * 100) / 1.77}vw`,
      },
    },

    screens: {
      ...screens,
    },
  },

  corePlugins: {
    fontFamily: false,
  },
  variants: {},
  plugins: [
  ],
};
