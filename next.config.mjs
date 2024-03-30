/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        // return [
        //     {
        //         source: "/",
        //         destination: "/design-board",
        //         permanent: true,
        //     },
        //     {
        //         source: "/shop",
        //         destination: "https://shop.campusflavor.com/collections/cwru",
        //         permanent: true,
        //     },
        // ];

        // cease and desist mode
        return [
            { source: "/api/:path*", destination: "/cease", permanent: false },
            { source: "/auth", destination: "/cease", permanent: false },
            {
                source: "/reset-password",
                destination: "/cease",
                permanent: false,
            },
            { source: "/signin", destination: "/cease", permanent: false },
            { source: "/signout", destination: "/cease", permanent: false },
            { source: "/signup", destination: "/cease", permanent: false },
            { source: "/submit", destination: "/cease", permanent: false },
            {
                source: "/design-board",
                destination: "/cease",
                permanent: false,
            },
            { source: "/submit-info", destination: "/cease", permanent: false },
            { source: "/about", destination: "/cease", permanent: false },
            { source: "/legal-terms", destination: "/cease", permanent: false },
            {
                source: "/privacy-policy",
                destination: "/cease",
                permanent: false,
            },
            {
                source: "/terms-of-use",
                destination: "/cease",
                permanent: false,
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
