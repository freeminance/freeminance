const wpk = require("../webpack.config.js");

module.exports = {
    stories: ["../test/stories/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    webpackFinal: (config) => {
      return {
        ...config,
        module: {
          ...config.module,
          rules: wpk.find(t => t.name === "storybook").module.rules,
        }
      }
    },
};
