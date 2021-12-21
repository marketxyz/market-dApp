const url = process.env.VERCEL_URL!.toLowerCase();
const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
const uriProtocol = isLocal ? "http" : "https";
export const vercelURL = `${uriProtocol}://${url}`;
