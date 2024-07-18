import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {LoginFormUiModel, LoginResponse} from "../models/login-form-ui.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://reqres.in/api/login';
  private http = inject(HttpClient);


  login(loginBody: LoginFormUiModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}`, {...loginBody}, ).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
