import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable()
export class RegisterAuth implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(): boolean {
        if (this.authService.loggedIn()) {
            alert('Đăng xuất đã!');
            this.router.navigate(['/home']);
            return false;
        } else {
            return true;
        }
    }
}