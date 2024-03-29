import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  addContact(contact: any){
    return this.http.post<any>(this.URL, contact)
  }


  getContact(): Observable<[]>{
    return this.http.get<[]>(this.URL)
  }

  UpdateContact(id: any, contact: any){
    return this.http.put<any>(`${this.URL}/${id}`, contact)
  }
  
  private URL = 'https://2c65fm-8080.csb.app/contact'

  constructor(private http: HttpClient) {}
}
