import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { __param } from 'tslib';
import { LoginAndRegistrationService } from '../login-and-registration.service';
import { Subjects } from '../models/Subjects';
import { Topics } from '../models/topics';
import { QuestionsService } from '../questions.service';
import { SubjectsService } from '../subjects.service';
import { TopicsService } from '../topics.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  data: any;
  subjects: Subjects[];
  topics: Topics[];
  selectedSubjectId: string;
  
  constructor(private subjectService: SubjectsService, 
    private topicService: TopicsService, private router: Router, 
    private route: ActivatedRoute, private service:LoginAndRegistrationService) {
    this.subjectService.getSubjectsList().subscribe((subjects: Subjects[]) => {
      this.subjects = subjects;
    })
  }
  ngOnInit() {
    
  }
  onSubjectClick(id: string) {
    if (id) {
      this.selectedSubjectId = id;
      this.topicService.getTopics(id).subscribe((topicsResult: Topics[]) => {
        this.topics = topicsResult;
      })
    } else {
      this.topics = undefined;
      console.log("undefined")
    }
  } 
  stop(event: Event, data: Topics){
    event.stopImmediatePropagation();
  }


}
