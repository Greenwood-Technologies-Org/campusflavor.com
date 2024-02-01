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
                destination: "https://store.campusflavor.com/",
                permanent: true,
            },
        ]
    },
}

export default nextConfig
