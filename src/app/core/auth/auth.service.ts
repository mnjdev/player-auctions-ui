import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserRegistration } from './auth.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  registerUser(data: UserRegistration) {
    return this.http.post(`${environment.apiUrl}${environment.apiModules.auth}/user-registration`, data);
  }
}
