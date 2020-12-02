import { Component, OnInit } from '@angular/core';
import { Subjects } from '../models/Subjects';
import { NgForm } from '@angular/forms';
import { Topics } from '../models/topics';
import { QuestionsService } from '../questions.service';
import { SubjectsService } from '../subjects.service';
import { TopicsService } from '../topics.service';

@Component({
  selector: 'app-addquestions',
  templateUrl: './addquestions.component.html',
  styleUrls: ['./addquestions.component.css']
})
export class AddquestionsComponent implements OnInit {

  subjectData: any
  data: any
  data2: any
  data3: any
  public subId:string
  public topId:string
  constructor(private service: SubjectsService, private topicService: TopicsService, public questionService: QuestionsService) { }

  ngOnInit(): void {
    this.service.getSubjectsList().subscribe((res) => {
      this.service.subjects = res as Subjects[];
      this.data = res
    }, (err) => {
      console.log(err)
    });
  }

  getSubjectDetails(subjectData) {
    this.getTopicDetails(subjectData._id)
  }

  getTopicAndSubjectIdForGet(topicData) {
    this.getQuestion(topicData._id, topicData._subjectId)
  }

  getTopicAndSubjectIdToPost(topicData) {
    this.subId=topicData._subjectId;
    this.topId=topicData._id;
  }

  getTopicDetails(id: string) {
    this.topicService.getTopics(id).subscribe((res) => {
      this.topicService.subjects = res as Topics[];
      this.data2 = res;
    }, (err) => {
      console.log(err)
    });
  }

  getQuestion(topicId: string, subjectId: string) {
    this.questionService.getQuestions(subjectId, topicId).subscribe((res => {
      this.data3 = res;
      console.log(this.data3)
    }))
  }

  onSubmit(form: NgForm){
    this.questionService.postQuestions(this.subId, this.topId,form.value).subscribe((res=>{
      console.log(res)
    }))
    
  }

}
