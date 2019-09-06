import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable, of } from 'rxjs'
import { catchError, tap} from 'rxjs/operators';
import { Carts } from '../models/cart';
@Injectable()
export class CartService{
    constructor(private http: HttpClient, private router: Router){}
    insertCart(newCart : Carts):Observable<Carts>{
        return this.http.post<Carts>('http://localhost:3000/api/addCart',newCart).pipe(
            tap((cart: Carts)=>console.log(JSON.stringify(cart))),
            catchError(error=>of(new Carts()))
        )
    }
    getCart():Observable<Carts[]>{
        return this.http.get<Carts[]>('http://localhost:3000/api/getCart').pipe(
            tap(res=>console.log(JSON.stringify(res))),
            catchError(error=> of([]))
        )
    }
    deleteCartById(_id : string): Observable<Carts>{
        return this.http.delete<Carts>('http://localhost:3000/api/deleteCart/'+_id).pipe(
            tap(res=>{
                alert('Đã xóa đơn hàng thành công!')
            }),
            catchError(error=>of(null))
        )
    }
    getListCart():Observable<Carts[]>{
        return this.http.get<Carts[]>('http://localhost:3000/api/getListCart').pipe(
            tap(res=>console.log(JSON.stringify(res))),
            catchError(error=> of([]))
        )
    }
    updateCartById(cart : Carts): Observable<any>{
        return this.http.put('http://localhost:3000/api/updateCart', cart).pipe(
            tap(res=>console.log(JSON.stringify(res))),
            catchError(error=>of(new Carts()))
        )
    }
    deleteCartByAdmin(_id : string): Observable<Carts>{
        return this.http.delete<Carts>('http://localhost:3000/api/delteCartByAdmin/'+_id).pipe(
            tap(res=>console.log(JSON.stringify(res))),
            catchError(error=>of(null))
        )
    }

}