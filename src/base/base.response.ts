export class BaseResponse<T> {
    data: T;
    message: string;
    success: boolean;
    code: number;
    constructor(data: T, message: string, success: boolean, code: number) {
        this.data = data;
        this.message = message;
        this.success = success;
        this.code = code;
    }
}