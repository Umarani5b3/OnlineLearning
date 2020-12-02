import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subjects } from './models/Subjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  selectedSubjects: Subjects;
  subjects: Subjects[];
  readonly baseURL = 'http://localhost:3000/subjects';
  constructor(private http:HttpClient) { }

  postSubjects(sub: Subjects) {
    return this.http.post(this.baseURL, sub);
  }
  
  getSubjectsList() {
    return this.http.get(this.baseURL);
  }

  updateSubject(sub: Subjects) {
    return this.http.put(this.baseURL + `/${sub._id}`, sub);
  }

  deleteSubject(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
