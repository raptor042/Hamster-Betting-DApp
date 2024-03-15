/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.externals.push("pino-pretty", "loki.js", "encoding")
        return config
    }
};

export default nextConfig;
