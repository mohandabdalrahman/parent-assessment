import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, shareReplay, throwError} from "rxjs";
import {User, UserList} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://reqres.in/api/users';
  private http = inject(HttpClient);


  getAllUsers() {
    return this.http.get<UserList>(`${this.baseUrl}`).pipe(
      shareReplay(),
      catchError((error) => {
        return throwError(() => error);
      }),
    )
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(
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
    return this.http.put<any>(`${this.baseUrl}/${user.id}`, user).pipe(
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
