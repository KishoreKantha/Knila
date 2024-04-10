import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact, SignIn } from '../BO/Contact';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API: string = "http://localhost:5098/api/";
  constructor(private http: HttpClient) { }

  authAction(payload: SignIn|Contact, endpoint: string) {
    return this.http.post(this.API + endpoint, payload).pipe(map(x => x));
  }
}
