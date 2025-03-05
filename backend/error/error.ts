

export class BaseError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class ValidationError extends BaseError {
    errorData: Record<string, string>[];

    constructor(data: Record<string, string>[]) {
        super("Validation Error", 400);
        this.errorData = data;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class BadRequestError extends BaseError {
    constructor(message: string) {
        super(message, 400);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class InternalServerError extends BaseError {
    constructor(message: string) {
        super(message, 500);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}