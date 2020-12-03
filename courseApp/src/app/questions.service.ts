import { Injectable } from '@angular/core';
import { Questions } from './models/Questions';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  selectedQuestions: Questions;
  questions: Questions[];

  readonly ROOT_URL = 'http://localhost:3000/questions';

  constructor(private http:HttpClient) { }

  getQuestions(subjectId: string, topicId: string) {
    return this.http.get(`${this.ROOT_URL}/${subjectId}/${topicId}/questions`);
  }

  postQuestions(subjectId: string, topicId: string,que: Questions) {
    console.log("service me")
    return this.http.post(`${this.ROOT_URL}/${subjectId}/${topicId}/questions`,que);
  }

} 
  