class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export = {
    CustomError
}