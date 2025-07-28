module.exports = {
    // It is highly recommended to use a long, complex, and randomly generated string for your JWT secret.
    // This secret should be stored in an environment variable and not hardcoded in the source code.
    JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-fallback-for-development-only'
}; 