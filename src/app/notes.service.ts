import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  API_URL = 'http://127.0.0.1:8080/noteapp/noteservice';

  constructor(private http: HttpClient) {}
  getNotes() {
    return this.http.get<any>(this.API_URL + '/all');
  }

  postNotes(data: any) {
    return this.http.post<any>(this.API_URL + '/add', data);
  }

  updateNote(notesid: number, status: String) {
    return this.http.put<any>(
      this.API_URL + '/update/' + notesid + '/' + status,
      {}
    );
  }

  deleteNotes(notesid: number) {
    return this.http.delete<any>(this.API_URL + '/delete/' + notesid);
  }
}
