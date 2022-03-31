import {AuthGuard} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // protected authService: AuthService
    constructor(private readonly reflector: Reflector) {
        super();
    }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //   const routeRoles = this.getRouteRoles(context);
    //   const user = await this.getUserData(context);
    //   if (!routeRoles) {
    //     return true;
    //   }
    //   const hasRole = () => user.roles.some((role) => routeRoles.includes(role));
    //   if (!user) {
    //     throw new UnauthorizedException();
    //   }
    //   if (!hasRole()) {
    //     throw new ForbiddenException('Forbidden');
    //   }
    //   return true && user;
    // }

    // private async getUserData(context: ExecutionContext): Promise<any> {
    //   const request = context.switchToHttp().getRequest();

    //   const authHeader = request.get('authorization');
    //   const accessToken = authHeader && authHeader.split(' ')[1];
    //   if (!accessToken) {
    //     throw new UnauthorizedException();
    //   }

    //   const user = await this.authService.checkUserToken(accessToken);
    //   return user;
    // }

    // private getRouteRoles(context: ExecutionContext): string[] {
    //   let routeRoles = this.reflector.get<string[]>('roles', context.getClass());
    //   if (!routeRoles) {
    //     routeRoles = this.reflector.get<string[]>('roles', context.getHandler());
    //   }

    //   return routeRoles;
    // }
}
