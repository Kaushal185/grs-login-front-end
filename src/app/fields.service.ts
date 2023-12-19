import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  private baseUrl = 'http://localhost:8082/fields/all';

  constructor(private http: HttpClient) {}

  fetchAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
