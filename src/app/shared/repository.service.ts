import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public create(route: string, body, headers = {}) {
    return this.http.post(this.createCompleteRoute(route), body, headers);
  }

  public update(route: string, body, headers = {}) {
    return this.http.put(this.createCompleteRoute(route), body, headers);
  }

  public delete(route: string) {
    return this.http.delete(this.createCompleteRoute(route));
  }

  public fetch(route: string) {
    return this.http.get(this.createCompleteRoute(route));
  }

  private createCompleteRoute(route: string) {
    const baseUrl = this.baseUrl.replace(/\/$/, '');
    const routeUrl = route.replace(/\/$/, '');
    return `${baseUrl}/${routeUrl}/`;
  }

  private headers() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}
