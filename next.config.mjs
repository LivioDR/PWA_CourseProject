/** @type {import('next').NextConfig} */
const nextConfig = {
    images:
    {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            port: '3000',
            pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
            },
        ],
    },


};

export default nextConfig;
