import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  fetchAccountById(id: string): Observable<{ message: string }> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<{ message: string }>(url);
  }
  
}
