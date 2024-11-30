import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { DtoPrefix } from "../enums/validation.Messages.enum";
import { BaseResponse } from "../../base/base.response";
import { ResponseMessages } from "../enums/response.messages.enum";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        let errorMessage: string;

        const prefixList: DtoPrefix[] = Object.values(DtoPrefix);
        const validationType = prefixList.find((prefix) => {
            return exception.message && exception.message.includes(prefix);
        });

        if (validationType) {
            errorMessage = exception.message;
        } else {
            switch (status) {
                case HttpStatus.UNAUTHORIZED:
                    errorMessage = ResponseMessages.UNAUTHORIZED;
                    break;
                case HttpStatus.BAD_REQUEST:
                    errorMessage = `${ResponseMessages.BAD_REQUEST}: ${exception.message}`;
                    break;
                case HttpStatus.NOT_FOUND:
                    errorMessage = ResponseMessages.NOT_FOUND;
                    break;
                case HttpStatus.REQUEST_TIMEOUT:
                    errorMessage = ResponseMessages.REQUEST_TIMEOUT;
                    break;
                case HttpStatus.INTERNAL_SERVER_ERROR:
                    errorMessage = ResponseMessages.INTERNAL_SERVER_ERROR;
                    break;
                default:
                    errorMessage = `${ResponseMessages.BAD_GATEWAY} | ${exception.message}`;
                    break;
            }
        }

        response.status(status).json(
            new BaseResponse(
                null,
                errorMessage,
                false,
                status
            )
        );
    }
}