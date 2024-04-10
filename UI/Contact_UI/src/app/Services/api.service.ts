import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../BO/Contact';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API: string = "http://localhost:5098/api/";
  constructor(private http: HttpClient) { }
  get(endpoint: string) {
    return this.http.get(this.API + endpoint).pipe(map(x => x));
  }
  post(payload: Contact, endpoint: string) {
    return this.http.post(this.API + endpoint, payload).pipe(map(x => x));
  }
  put(payload: Contact, endpoint: string) {
    return this.http.put(this.API + endpoint, payload).pipe(map(x => x));
  }
  delete(endpoint: string) {
    return this.http.delete(this.API + endpoint).pipe(map(x => x));
  }
}
