import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://reqres.in/api/login';
  private http = inject(HttpClient);


  login(loginBody: LoginFormUiModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/AdminUser/AdminUserLogin`, {...loginBody}, ).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }


}
