import { environment } from '../../environments/environment.development';
import { roots } from './../shared/configs/endPoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  apiUrl: string = environment?.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.posts}`);
  }
  addEditPost(data: any, id?: number | null): Observable<any> {
    if (id) {
      return this.http.put(`${this.apiUrl}/${roots?.posts}/${id}`, data);
    }
    return this.http.post(`${this.apiUrl}/${roots?.posts}`, data);
  }
}
