import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @description
 *  - 데이터가 undefined일 경우 null로 변환하고 그게 아니라면 그대로 반환
 */
@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => (data === undefined ? null : data)));
  }
}
