import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topics } from './models/topics';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  readonly ROOT_URL;

  selectedTopic:Topics;
  subjects: Topics[];

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000/topics';
  }

  getTopics(subjectId: string) {
    return this.http.get(`${this.ROOT_URL}/subject/${subjectId}/topics`);
  }

  postTopic(subjectId:string, sub: Topics) {
    return this.http.post(`${this.ROOT_URL}/subject/${subjectId}/topics`, sub);
  }

  updateTopic(sub: Topics) {
    return this.http.put(`${this.ROOT_URL}/subject/${sub._subjectId}/topics/${sub._id}`, sub);
  }

  deleteTopic(subjectId: string,id: string) {
    return this.http.delete(`${this.ROOT_URL}/subject/${subjectId}/topics//${id}`);
  }
}
