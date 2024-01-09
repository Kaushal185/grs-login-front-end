import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  private baseUrl = 'http://localhost:8082/fields';

  constructor(private http: HttpClient) {}

  // fetchAccounts(): Observable<any[]> {
  //   return this.http.get<any[]>(this.baseUrl);
  // }
  fetchAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/all'); // Appending '/all' to the URL
  }
  fetchAccountsByPage(page: number, size: number): Observable<any[]> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any[]>(this.baseUrl + '/bypage', { params });
  }
  fetchAccountById(id: string): Observable<{ message: string }> {
    const url = `${this.baseUrl + '/demo2'}/${id}`;
    return this.http.get<{ message: string }>(url);
  }
  fetchOnlyTwoAccountById(id: string): Observable<{ message: string }> {
    const url = `${this.baseUrl + '/nothing'}/${id}`;
    return this.http.get<{ message: string }>(url);
  }
}
