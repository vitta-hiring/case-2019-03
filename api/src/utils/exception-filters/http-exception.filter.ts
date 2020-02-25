import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        error: exception.message !== null && typeof exception.message === 'object' ? exception.message.error : exception.message,
        message: exception.message !== null && typeof exception.message === 'object' ? exception.message.message : exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}