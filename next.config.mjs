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
};

export default nextConfig;
