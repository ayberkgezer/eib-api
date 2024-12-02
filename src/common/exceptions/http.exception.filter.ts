import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { DtoPrefix } from "../enums/validation.Messages.enum";
import { BaseResponse } from "../../base/base.response";
import { ResponseMessages } from "../enums/response.messages.enum";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        //const request = ctx.getRequest();
        const status = exception.getStatus();

        const prefixList: DtoPrefix[] = Object.values(DtoPrefix);
        const validationType = prefixList.find((prefix) => {
            return exception.message && exception.message.includes(prefix);
        });

        let responseMessage: string;

        if (validationType) {
            responseMessage = `${ResponseMessages.VALIDATION_ERROR}: ${exception.message}`;
            response.set('validation-type', exception.message);
        } else {
            responseMessage = this.getDefaultErrorMessage(status, exception.message);
        }

        response.status(status).json(
            new BaseResponse(null, responseMessage, false, status)
        );
    }
    private getDefaultErrorMessage(status: number, message: string): string {
        switch (status) {
            case HttpStatus.BAD_REQUEST:
                return `${ResponseMessages.BAD_REQUEST}: ${message}`;
            case HttpStatus.NOT_FOUND:
                return ResponseMessages.NOT_FOUND;
            case HttpStatus.REQUEST_TIMEOUT:
                return ResponseMessages.REQUEST_TIMEOUT;
            case HttpStatus.INTERNAL_SERVER_ERROR:
                return ResponseMessages.INTERNAL_SERVER_ERROR;
            case HttpStatus.UNAUTHORIZED:
                return ResponseMessages.UNAUTHORIZED;
            default:
                return `${ResponseMessages.BAD_GATEWAY} | ${message}`;
        }
    }
}