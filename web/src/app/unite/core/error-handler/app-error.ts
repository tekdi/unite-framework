import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) { }
}

export class AppError {
    constructor(public originalError?: any) {
        console.log('App Error', originalError);
    }
}

export class NotFoundError extends AppError {
}

export class BadInput extends AppError {
}
