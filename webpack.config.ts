import { WebBundler } from "varie-bundler";
import VarieTailwindCssPlugin from "varie-bundler-tailwindcss-plugin";
import VarieElectronPlugin from "./varie-bundler-plugins/VarieElectronPlugin";

export default function(env) {
  let build = new WebBundler(env, {
    // TODO - see if we can make this not a thing when fixing up varie
    vue: {
      runtimeOnly: false,
    },
    webpack: {
      devServer: {
        open: false,
      },
    },
  })
    .entry("app", ["app/app.ts", "resources/sass/app.scss"])
    .aliases({
      "@app": "app",
      "@views": "views",
      "@store": "store",
      "@config": "config",
      "@routes": "routes",
      "@models": "app/models",
      "@resources": "resources",
      "@components": "app/components",
    })
    .purgeCss(["app", "views", "node_modules/varie"])
    .globalSassIncludes("resources/sass/base/_variables.scss")
    .aggressiveVendorSplitting()
    .eslint()
    .plugin(VarieElectronPlugin)
    .plugin(VarieTailwindCssPlugin)
    .build();

  // https://github.com/ashtuchkin/iconv-lite/issues/204#issuecomment-432048618
  build[0].module.rules.push({
    test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
    resolve: {
      aliasFields: ["main"],
    },
  });

  return build;
}
