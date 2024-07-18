import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, shareReplay, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://reqres.in/api/users';
  private http = inject(HttpClient);


  getAllUsers() {
    return this.http.get<any>(`${this.baseUrl}`).pipe(
      shareReplay(),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }

  getUserById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      shareReplay(),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }


  createUser(user: any) {
    return this.http.post<any>(`${this.baseUrl}`, user).pipe(
      shareReplay(),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }

  updateUser(user: any) {
    return this.http.put<any>(`${this.baseUrl}`, user).pipe(
      shareReplay(),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      shareReplay(),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }
}
