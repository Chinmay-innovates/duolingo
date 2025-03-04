/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: "/api/(.*)",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization",
					},
					{
						key: "Content-Range",
						value: "bytes : 0-9/*",
					},
				],
			},
		];
	},
	webpack: (config, { isServer, dev }) => {
		if (!dev && isServer) {
			// Customize the caching strategy for the server-side build
			const { PackFileCacheStrategy } = require("webpack").cache;

			class CustomCacheStrategy extends PackFileCacheStrategy {
				serialize(data) {
					if (typeof data === "string" && data.length > 1024 * 100) {
						// Convert large strings to Buffer
						const buffer = Buffer.from(data, "utf-8");
						return buffer.toString("base64"); // Serialize as base64
					}
					return super.serialize(data);
				}

				deserialize(data) {
					if (typeof data === "string" && data.length > 1024 * 100) {
						// Convert base64-encoded Buffer back to string
						const buffer = Buffer.from(data, "base64");
						return buffer.toString("utf-8");
					}
					return super.deserialize(data);
				}
			}

			config.cache = {
				type: "custom",
				strategy: new CustomCacheStrategy(),
			};
		}

		return config;
	},
};

export default nextConfig;
