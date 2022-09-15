class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

module.exports = CustomError;