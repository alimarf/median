// src/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        const url = request.url;

        // Check if the request is for the login endpoint
        if (url.includes('/auth/login')) {
          // Return the data directly for login, which includes the access token
          return data;
        }

        // Default response format
        return {
          statusCode: HttpStatus.OK,
          message: 'Request successful',
          data: data,
        };
      }),
    );
  }
}
