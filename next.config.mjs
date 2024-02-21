/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/competitions",
                permanent: true,
            },
            {
                source: "/shop",
                destination: "https://shop.campusflavor.com/",
                permanent: true,
            },
        ];
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        // Add external library config here
        config.externals.push({ canvas: 'commonjs canvas' });

        // Return the modified config
        return config;
    },
};

export default nextConfig;
