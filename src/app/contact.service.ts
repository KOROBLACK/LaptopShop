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
  
  private URL = 'http://localhost:3000/contact'

  constructor(private http: HttpClient) {}
}
