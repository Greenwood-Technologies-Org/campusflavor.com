/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/design-board",
                permanent: true,
            },
            {
                source: "/shop",
                destination: "https://shop.campusflavor.com/",
                permanent: true,
            },
        ];
    },

    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        config.externals.push({ canvas: "commonjs canvas" });
        return config;
    },

    images: {
        domains: [
            "mediamodifier.com",
            "assets.mediamodifier.com",
            "nhxchoaxvofyfgvsgssh.supabase.co",
        ],
    },
};

export default nextConfig;
