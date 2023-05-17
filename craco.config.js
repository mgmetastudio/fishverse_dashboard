const webpack = require('webpack');
const path = require('path');

let localCanisters, prodCanisters, canisters;

let localEnv = true;
let network = 'local';

function initCanisterIds() {
  if ((dfx_network = process.env.DFX_NETWORK)) {
    network = dfx_network;
    console.log(`network was inferred from environment variable DFX_NETWORK`);
  } else {
    network = process.env.NODE_ENV === "production" ? "ic" : "local";
    console.log(
      `environment variable DFX_NETWORK not set, inferring network from node environment`
    );
  }

  network_alphanum = network.replace(/[^a-zA-Z0-9]/g, "_"); // replace non-alphanumeric like dfx
  console.log(`network is '${network}' (${network_alphanum})`);

  function getCanisterIds(path) {
    try {
      return require(path);
    } catch (error) {
      console.log(
        `No canister_ids.json found for network ${network} (${path}), try a different network..`
      );
      throw error;
    }
  }

  canisters =
    network === "ic"
      ? getCanisterIds(path.resolve("canister_ids.json"))
      : getCanisterIds(
        path.resolve(".dfx", network_alphanum, "canister_ids.json")
      );

  for (const canister in canisters) {
    process.env[canister.toUpperCase() + "_CANISTER_ID"] =
      canisters[canister][network_alphanum];
  }
}

const isDevelopment = process.env.NODE_ENV !== "production" || localEnv;

initCanisterIds();

const asset_entry = path.join(
  "src",
  "index.html"
);


module.exports = {
  mode : "development",
  eslint: {
    enable: false,
  },
  css: {
    loaderOptions: (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions; }
  },
  webpack: {
    alias: {},
    plugins: [
      new webpack.EnvironmentPlugin({
        ICRC1_LEDGER_CANISTER_ID: canisters["icrc1_ledger"],
        II_CANISTER_ID: process.env.INTERNET_IDENTITY_CANISTER_ID,
        EXT_CANISTER_ID: process.env.FISHVERSE_EXT_CANISTER_ID,
        DFX_NETWORK: process.env.DFX_NETWORK || "local",
        NODE_ENV: isDevelopment,
      }),
    ],
    configure: (webpackConfig, { env, paths }) => { return webpackConfig; }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:4943",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    hot: true,
  },
  plugins: {
    plugin: {
      overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
        return {
          ...webpackConfig,
          mode: isDevelopment ? "development" : "production",
          entry: {
            index: path.join(__dirname, asset_entry).replace(/\.html$/, ".js"),
          },
          devtool: isDevelopment ? "source-map" : false,
          optimization: {
            minimize: !isDevelopment,
            minimizer: [new TerserPlugin()],
          },
          resolve: {
            extensions: [".js", ".ts", ".jsx", ".tsx"],
            fallback: {
              assert: require.resolve("assert/"),
              buffer: require.resolve("buffer/"),
              events: require.resolve("events/"),
              stream: require.resolve("stream-browserify/"),
              util: require.resolve("util/"),
            },
          },
          output: {
            filename: "index.js",
            path: path.join(__dirname, "build"),
          },
        };
      } 
    },
  }
};