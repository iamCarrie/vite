import { defineConfig, loadEnv } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteImagemin from "vite-plugin-imagemin";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";
import vue from "@vitejs/plugin-vue";
const fs = require("fs");
const CONFIG = require("./config.js");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE,
    plugins: [
      vue(),
      basicSsl(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(`./src/${CONFIG.svg}`)],
        symbolId: "[name]",
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
            },
            {
              name: "removeEmptyAttrs",
              active: false,
            },
          ],
        },
      }),
    ],
    build: {
      outDir: env.VITE_OUTEPUT_DIR,
      chunkSizeWarningLimit: 1500,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          // assetFileNames: (assetInfo) => {
          //   let extType = assetInfo.name.split(".").at(1);
          //   if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
          //     extType = "imgs";
          //   }
          //   return `assets/${extType}/[name][extname]`;
          // },
          // entryFileNames: "scripts/[name].js",
          // chunkFileNames: "scripts/[name].js",
        },
        plugins: [
          {
            // writeBundle(opts, bundle) {
            //   const readWriteSync = (filename) => {
            //     let data = fs.readFileSync(`./dist/${filename}`, "utf-8");
            //     const timestamp = +new Date();
            //     for (let f in bundle) {
            //       const fold = /\.html/.test(f.split("/")[0])
            //         ? ""
            //         : f.split("/")[0];
            //       const file = f.split(`${fold}/`)[1];
            //       data = data.split(file).join(`${file}?${timestamp}`);
            //     }
            //     fs.writeFileSync(`./dist/${filename}`, data, "utf-8");
            //   };
            //   for (let f in bundle) {
            //     readWriteSync(f);
            //   }
            // },
          },
        ],
      },
      // target: "modules",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@img": path.resolve(`./src/${CONFIG.imgs}`),
        "@svg": path.resolve(`./src/${CONFIG.svg}`),
        "@css": path.resolve(`./src/${CONFIG.css}`),
        "@js": path.resolve(`./src/${CONFIG.js}`),
        "@router": path.resolve(`./src/router`),
        "@views": path.resolve(`./src/views`),
        "@store": path.resolve(`./src/stores`),
        "@static": path.resolve(`./src/${CONFIG.static}`),
        "@components": path.resolve(`./src/${CONFIG.components}`),
      },
    },
    server: {
      proxy: CONFIG.proxy ? CONFIG.proxy : null,
      https: CONFIG.https,
      host: "0.0.0.0",
      // hmr: {
      //   protocol: "ws",
      //   host: "localhost",
      // },
    },
  };
});
// minify: "terser",
// terserOptions: {
//   compress: {
//     drop_console: true,
//     drop_debugger: true,
//   },
// },
