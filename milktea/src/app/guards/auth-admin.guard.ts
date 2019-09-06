import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(): boolean {
        if (this.authService.decodeToken(localStorage.getItem('token'))) {
            return true;
        } else {
            alert('Không có quyền');
            this.router.navigate(['/home']);
            return false;
        }
    }
}
