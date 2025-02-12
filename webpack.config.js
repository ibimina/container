const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const URL = process.env.REACT_APP_REMOTE_URL || "http://localhost:3001";
const PORT = process.env.REACT_APP_PORT || 3000;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: PORT,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // or /\.(ts|tsx)$/ if using TypeScript
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /component/, // Use "?component" in import to load as React component
                        use: ["@svgr/webpack"],
                    },
                    {
                        use: {
                            loader: "file-loader",
                            options: {
                                name: "[name].[hash].[ext]",
                                outputPath: "assets", // Save inside "dist/assets/"
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },    
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        microfrontend: `microfrontend@${URL}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
