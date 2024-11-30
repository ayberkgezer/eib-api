export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    apiKey: process.env.API_KEY,
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
    aiApiUrl: process.env.AI_API_URL,
});
