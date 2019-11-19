const VarieBundler = require("varie-bundler");

module.exports = function(env) {
  let build = new VarieBundler(env, {
    vue : {
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
    .chainWebpack((config) => {
      config.target("electron-renderer");
      config.output.globalObject("(typeof self !== 'undefined' ? self : this)");
      config.devServer.open(false);

      config.module
        .rule("sass")
        .oneOf("normal")
        .use("postcss-loader")
        .tap((options) => {
          options.plugins.unshift(require("tailwindcss"));
          return options;
        });

      config.module
        .rule("sass")
        .oneOf("vue")
        .use("postcss-loader")
        .tap((options) => {
          options.plugins.unshift(require("tailwindcss"));
          return options;
        });
    })
    .build();

  build[0].module.rules.push({
    test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
    resolve: {
      aliasFields: ["main"],
    },
  });
  return build;
};
