import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Products } from '../models/product';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Categories } from '../models/categorie';
import { Comments } from '../models/comment';
@Injectable()
export class ProductService {
    constructor(private http: HttpClient, private router: Router) { }
    getListProducts(page: number): Observable<Products[]> {
        return this.http.get<Products[]>(`http://localhost:3000/api/products/${JSON.stringify(page)}`).pipe(
            tap(re => console.log(re)),
            catchError(error => of([]))
        );
    }
    searchProducts(typeString: string): Observable<Products[]> {
        if (!typeString.trim()) {
            return of([]);
        }
        return this.http.get<Products[]>('http://localhost:3000/api/searchProducts/' + typeString).pipe(
            tap(products => console.log(JSON.stringify(products))),
            catchError(error => of(null))
        );
    }
    getProductbyID(_id: string): Observable<Products> {
        return this.http.get<Products>('http://localhost:3000/api/getProduct/' + _id).pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(err => of(new Products()))
        );
    }
    getCategories(loai: string): Observable<Categories> {
        return this.http.get<Categories>('http://localhost:3000/api/categorie/' + loai).pipe(
            tap(categories => console.log(JSON.stringify(categories))),
            catchError(err => of(new Categories()))
        );
    }
    getProductByCategories(loai: string): Observable<Products[]> {
        return this.http.get<Products[]>('http://localhost:3000/api/getProductByLoai/' + loai).pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(error => of(null))
        );
    }
    getProducts(): Observable<Products[]> {
        return this.http.get<Products[]>('http://localhost:3000/api/getproducts').pipe(
            tap(re => console.log(re)),
            catchError(error => of([]))
        );
    }
    insertProductByAdmin(product: Products): Observable<Products> {
        return this.http.post<Products>('http://localhost:3000/api/insertProduct', product).pipe(
            tap(re => console.log(JSON.stringify(re))),
            catchError(error => of(new Products()))
        );
    }
    deleteProductByAdmin(_id: string): Observable<Products> {
        return this.http.delete<Products>('http://localhost:3000/api/deleteProductByAdmin/' + _id).pipe(
            tap(re => console.log(JSON.stringify(re))),
            catchError(error => of(null))
        );
    }
    getHotProduct(): Observable<Products[]> {
        return this.http.get<Products[]>('http://localhost:3000/api/getHotProduct').pipe(
            tap(re => console.log(re)),
            catchError(error => of([]))
        );
    }
    updateLuotXem(product: Products): Observable<any> {
        return this.http.patch('http://localhost:3000/api/updateLuotXem', product).pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(error => of(new Products()))
        );
    }

    insertComment(comment: Comments): Observable<Comments> {
        return this.http.post<Comments>('http://localhost:3000/api/addcomment', comment).pipe(
            tap(re => console.log(JSON.stringify(re))),
            catchError(error => of(new Comments()))
        );
    }
    getComments(idProduct: string): Observable<Comments[]> {
        return this.http.get<Comments[]>('http://localhost:3000/api/getComments/' + idProduct).pipe(
            tap(re => console.log(re)),
            catchError(error => of([]))
        );
    }
    updateProduct(product: Products): Observable<any> {
        return this.http.put('http://localhost:3000/api/updateProduct', product).pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(error => of(new Products()))
        );
    }
}
