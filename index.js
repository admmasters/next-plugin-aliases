const path = require("path");

module.exports =
  ({ enabled = true, modules = [], aliases = {}, logger } = {}) =>
  (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        if (enabled) {
          config.resolve.alias = {
            ...config.resolve.alias,
            ...aliases,
          };

          /* We need to link the local version of react-components and any other libraries containing react and other duplicate dependencies */
          modules.forEach((moduleName) => {
            config.resolve.alias[moduleName] = path.resolve(
              process.cwd(),
              ".",
              "node_modules",
              moduleName
            );
            logger?.info(`Link local module: ${moduleName}`);
          });
        }

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  };
