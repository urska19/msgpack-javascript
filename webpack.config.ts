import path from "path";
import webpack from "webpack";
import _ from "lodash";

const config = {
  mode: "production",

  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist.es5"),
    library: "MessagePack",
    libraryTarget: "umd",
    globalObject: "this",
    filename: "",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".wasm"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.dist.webpack.json",
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.TEXT_ENCODING": "undefined",
      "process.env.TEXT_DECODER": "undefined",
    }),
  ],

  optimization: {
    emitOnErrors: true,
    minimize: false,
  },

  // We don't need NodeJS stuff on browsers!
  // https://webpack.js.org/configuration/node/
  node: false,

  devtool: "source-map",
};

// eslint-disable-next-line import/no-default-export
export default [
  ((config) => {
    config.output.filename = "msgpack.min.js";
    config.optimization.minimize = true;
    return config;
  })(_.cloneDeep(config)),

  ((config) => {
    config.output.filename = "msgpack.js";
    config.optimization.minimize = false;
    return config;
  })(_.cloneDeep(config)),
];
