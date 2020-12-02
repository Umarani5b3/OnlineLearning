import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnChanges {
  data: any;
  subjectId: string;
  topicId: string;
  constructor(private router: Router, private questionService: QuestionsService, private route: ActivatedRoute) {

  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.subjectId = this.route.snapshot.paramMap.get("subjectId")
      this.topicId = this.route.snapshot.paramMap.get("topicId")
      this.questionService.getQuestions(this.subjectId, this.topicId).subscribe((res => {
        this.data = res;
      }))
    });
  }

}
