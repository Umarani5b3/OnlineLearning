import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { Subjects } from '../models/Subjects';
import { Topics } from '../models/topics';
import { TopicsService } from '../topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topicId: string;
  topics: Topics[];
  constructor(private router: Router, private topicService: TopicsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.topicId = this.route.snapshot.paramMap.get("id")
      this.topicService.getTopics(this.topicId).subscribe((topicsResult: Topics[]) => {
        this.topics = topicsResult;
      })
    });
  }

  stop(event: Event, data: Topics){
    event.stopImmediatePropagation();
  }

}
