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

  postSubjectsViaFile(profileImage: File ) {
    var formData: any = new FormData();
    formData.append("myFile", profileImage);

    console.log("service",formData)
    return this.http.post(`${this.baseURL}/uploadfile`, formData, {
      reportProgress: true,
      observe: 'events'
    })
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
