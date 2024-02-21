import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { uniqueConstraintError, validationError } from './errorsConstants';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        // Check if it's a custom error
        if (err.status) {
          return throwError(() => err);
        }

        // Unique key error
        if (err.name === uniqueConstraintError) {
          return throwError(
            () => new BadRequestException(err.errors[0].message),
          );
        }

        // Validation error
        if (err.name === validationError) {
          return throwError(
            () => new BadRequestException(err.errors[0].message),
          );
        }

        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
