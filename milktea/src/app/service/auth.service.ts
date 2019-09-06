import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Accounts } from '../models/account';
@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private router: Router) { }
    login(user) {
        return this.http.post<any>('http://localhost:3000/api/login', user);
    }
    register(registerAccount) {
        return this.http.post<any>('http://localhost:3000/api/register', registerAccount);
    }
    getToken() {
        return localStorage.getItem('token');
    }
    loggedIn() {
        return !!localStorage.getItem('token');
    }
    logoutUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        alert('Đăng xuất thành công!');
        // this.router.navigate(['/'])
    }
    getProfile(): Observable<Accounts> {
        return this.http.get<Accounts>('http://localhost:3000/api/userprofile').pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(error => of(new Accounts()))
        );
    }
    decodeToken(token: string): boolean {
        if (!token) {
            return false;
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64)).admin;
    }
    decodeTokenEmail(token: string): string {
        if (!token) {
            return '';
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64)).email;
    }
    getUser(): Observable<Accounts[]> {
        return this.http.get<Accounts[]>('http://localhost:3000/api/getuser').pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(error => of([]))
        );
    }
    deleteUserById(_id: string): Observable<Accounts> {
        return this.http.delete<Accounts>('http://localhost:3000/api/deleteUserById/' + _id).pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(error => of(null))
        );
    }
    updateUserByAdmin(user: Accounts): Observable<any> {
        return this.http.put('http://localhost:3000/api/updateUserByAdmin', user).pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(error => of(new Accounts()))
        );
    }
    updateProfileByUser(user: Accounts): Observable<any> {
        return this.http.put('http://localhost:3000/api/updateProfileByUser', user).pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(error => of(new Accounts()))
        );
    }
}
