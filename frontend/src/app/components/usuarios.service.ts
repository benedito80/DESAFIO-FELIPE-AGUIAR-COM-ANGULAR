import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getUsuarios(): Observable<any[]> {
    const url = `${environment.API}/usuarios`;
    return this.http.get<any[]>(url, this.httpOptions).pipe(
      map((obj) => obj),
      delay(2000),
      // tap(console.log),
      catchError(this.handleError)
    );
  }

  saveUser(obj: any): Observable<any> {
    const url = `${environment.API}/usuarios`;
    return this.http
      .post<any>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateUser(id: any, obj: any): Observable<any> {
    const url = `${environment.API}/usuarios/${id}`;
    return this.http
      .put<any>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteUser(id: any): Observable<any> {
    const url = `${environment.API}/usuarios/${id}`;
    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deletePost(id: any): Observable<any> {
    const url = `${environment.API}/posts/${id}`;
    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  savePost(post: File): Observable<File> {
    const url = `${environment.API}/posts}`;
    return this.http
      .post<File>(url, JSON.stringify(post), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }



  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
