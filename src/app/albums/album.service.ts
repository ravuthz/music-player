import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from './album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private baseUrl = 'http://localhost:8000/api/v1/albums';

  constructor(private http: HttpClient) { }

  create(album: Album): Observable<object> {
    return this.http.post(`${this.baseUrl}/`, album);
  }

  update(id: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}/`, value);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/`);
  }

  getById(id: number): Observable<object> {
    return this.http.get(`${this.baseUrl}/${id}/`);
  }

  getList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getFilter(filter): Observable<any> {
    const params = this.pageEventFilter(filter);
    return this.http.get(`${this.baseUrl}/`, { params });
  }

  private pageEventFilter(pageEvent) {
    return {
      page: pageEvent.pageIndex ? pageEvent.pageIndex + 1 : 1,
      size: pageEvent.pageSize ? pageEvent.pageSize : 0,
      ...pageEvent.filterValue,
    };
  }
}
