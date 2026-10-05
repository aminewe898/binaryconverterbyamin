const config = {
 output: "export",
 trailingSlash: true,
 basePath: process.env.GITHUB_ACTIONS === "true" ? "/binaryconverterbyamin" : "",
 images: { unoptimized: true },
};
export default config;
