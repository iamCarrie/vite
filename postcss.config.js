module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-pxtorem": {
      propList: ["*", "!text-shadow", "!box-shadow"],
      minPixelValue: 1,
    },
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
