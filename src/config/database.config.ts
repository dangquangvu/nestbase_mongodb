export default (): Record<string, any> => ({
    mongoUri: process.env.MONGO_URI,
});
