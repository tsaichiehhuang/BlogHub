/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
        NEXT_PUBLIC_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_GITHUB_OWNER_NAME: process.env.NEXT_PUBLIC_GITHUB_OWNER_NAME,
        NEXT_PUBLIC_GITHUB_REPO_NAME: process.env.NEXT_PUBLIC_GITHUB_REPO_NAME,
    },
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
