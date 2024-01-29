/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'www.useflytrap.com',
				pathname: '/**'
			},
		]
	}
};

export default nextConfig;
