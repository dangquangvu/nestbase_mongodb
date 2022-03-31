export default (): Record<string, string> => ({
    jwtSecretKey: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRATION,
});
