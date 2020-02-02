import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public headers;
  constructor(private http: HttpClient) { }

  sendPost(url: string, data: any): Observable<any> {
    return this.http.post(
      url,
      JSON.stringify(data),
      {headers: {'Content-Type': 'application/json'}}
    )
  }
}
