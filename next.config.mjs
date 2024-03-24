/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    headers: async () => {
        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3000',
                    },
                ],
            },
            {
                source: '/article/[id]',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3000',
                    },
                ],
            },
        ]
    },
    webpack: (config, { dev }) => {
        if (dev) {
            config.devtool = 'cheap-module-source-map'
        } else {
            config.devtool = 'source-map'
        }

        return config
    },
}

export default nextConfig
