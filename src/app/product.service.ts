import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private URL = 'https://2c65fm-8080.csb.app/product'
  constructor(private http: HttpClient) {}

  getProductHttp(): Observable<[]> {
    return this.http.get<[]>(this.URL);
  }

  getProductByIDHttp(id: number) {
    return this.http.get<[]>(`${this.URL}/${id}`);
  }

  addProduct(product: any){
    return this.http.post<any>(this.URL, {
      ...product, 
      view: 0,
      checked: false,
      thumbnail: []
    })
  }

  Update(id: any, product: any){
    return this.http.put<any>(`${this.URL}/${id}`, {
      ...product, 
      view: 0,
      checked: false,
      thumbnail: []
    })
  }

  Delete(id: any){
    return this.http.delete<any>(`${this.URL}/${id}`)
  }
}
