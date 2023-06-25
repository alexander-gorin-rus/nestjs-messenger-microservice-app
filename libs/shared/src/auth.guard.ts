import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { BrokerMessages } from 'utils/broker-messages';
import { SERVICE_NAME } from 'utils/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(SERVICE_NAME.AUTH_SERVICE)
    private readonly authService: ClientProxy,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'http') {
      return false;
    }

    const authHeader = context.switchToHttp().getRequest().headers[
      'authorization'
    ] as string;

    if (!authHeader) return false;

    const authHeaderParts = authHeader.split('  ');

    if (authHeaderParts.length !== 2) return false;

    const [, jwt] = authHeaderParts;

    return this.authService
      .send({ cmd: BrokerMessages.VERIFY_JWT }, { jwt })
      .pipe(
        switchMap(({ exp }) => {
          if (!exp) return of(false);

          const TOKEN_EXP_MS = exp * 1000;

          const isValidToken = Date.now() < TOKEN_EXP_MS;
          return of(isValidToken);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }
}
