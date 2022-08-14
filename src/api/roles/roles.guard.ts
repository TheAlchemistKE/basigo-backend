import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    // const { user } = context.switchToHttp().getRequest();
    /**
     * The above is how I would implement my Role Based Authentication given enough time to setup a proper authentication flow.
     * Toggle the role of the user below to view how the guard works for different user roles.
     * Allowed Roles Are: 'admin', 'lead', 'lead_admin'
     * Functions Per Role.
     * Lead: Can view all leads and customers.
     * Admin: Can register a lead.
     * LeadAdmin: Creates customers.
     * **/

    const user: any = {
      name: 'Jane Doe',
      roles: ['admin', 'lead_admin', 'lead'],
    };

    return requiredRole.some((role) => user.roles.includes(role));
  }
}
