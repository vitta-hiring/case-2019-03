const withCss = require("@zeit/next-css");
const withSaas = require("@zeit/next-sass");

module.exports = withCss(
  withSaas({
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style\/css.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals)
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: "null-loader"
        });
      }
      return config;
    },
    env: {
      BACKEND_URL:
        process.env.NODE_ENV === "production" ? "http://localhost:3123" :
        //   ? "https://simplenoteapi.becoder.com.br"
        //   : process.env.NODE_ENV === "local"
        //   ? "http://localhost:3000"
        //   : "https://simplenotedevapi.becoder.com.br"
        "http://localhost:8010/proxy"
    }
  })
);
