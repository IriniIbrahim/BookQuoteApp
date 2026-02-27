import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArchiveLog } from '../models/archive-log';

@Injectable({ providedIn: 'root' })
export class ArchiveService {
  private baseUrl = 'https://bookquoteapp-production.up.railway.app/api/archive';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ArchiveLog[]> {
    return this.http.get<ArchiveLog[]>(this.baseUrl);
  }
}