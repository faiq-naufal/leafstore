const withPlugins = require("next-compose-plugins");

const nextConfig = {
  images: {
    domains: ["cdn.chec.io"],
  },
};

module.exports = withPlugins([], nextConfig);
