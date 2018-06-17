import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomRepositoryService {

  constructor(private http: HttpClient) { }

  getAll() {
    let url = 'http://localhost:8000/api/rooms';

    return this.http
      .get<any[]>(url)
  }
}
