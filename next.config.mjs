/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /sequelize/,
      loader: "ignore-loader",
    });
    return config;
  },
};

export default nextConfig;
