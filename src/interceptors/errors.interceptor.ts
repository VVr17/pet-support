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
import {
  databaseError,
  foreignKeyConstraintError,
  uniqueConstraintError,
  validationError,
} from '../utils/errorsConstants';

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

        if (err.name === foreignKeyConstraintError) {
          return throwError(() => new BadRequestException(err.parent.detail));
        }

        // Validation error
        if (err.name === validationError) {
          return throwError(
            () => new BadRequestException(err.errors[0].message),
          );
        }

        // Database format error
        if (err.name === databaseError) {
          return throwError(() => new BadRequestException('Invalid DB syntax'));
        }

        console.log('err', err);
        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
