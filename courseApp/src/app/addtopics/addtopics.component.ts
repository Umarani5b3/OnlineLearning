import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Topics } from '../models/topics';
import { SubjectsService } from '../subjects.service';
import { TopicsService } from '../topics.service';
@Component({
  selector: 'app-addtopics',
  templateUrl: './addtopics.component.html',
  styleUrls: ['./addtopics.component.css']
})
export class AddtopicsComponent implements OnInit {
  data: any;
  public subId: any;
  constructor(private subjectService: SubjectsService, public topicService: TopicsService) { }

  ngOnInit(): void {
    this.subjectService.getSubjectsList().subscribe((res => {
      this.data = res;
      console.log(this.data)
    }))
    this.resetForm();
  }

  public onChange(event: Event): void {
    this.subId=event
    console.log(event)
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.topicService.selectedTopic = {
      _id: "",
      _subjectId: "",
      topic: ""
    }
  }

  refreshTopicList(subjectId ?:string) {
    this.topicService.getTopics(subjectId).subscribe((res) => {
      this.topicService.subjects = res as Topics[];
      this.data=res;
      console.log(this.data)
    }, (err) => {
      console.log(err)
    });
  }

  onSubmit(form: NgForm) {
    if (form.value._id) {
      console.log(form.value._id)
      this.topicService.updateTopic(form.value).subscribe((res) => {
        console.log("PUT")
        this.resetForm(form);
        this.refreshTopicList();
      }, (err) => {
        console.log(err)
      });
    }
    else {
      console.log(this.subId)
      this.topicService.postTopic(this.subId,form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshTopicList();
        console.log("POST")
      }, (err) => {
        console.log(err)
      });
    }
  }

  onEdit(top: Topics) {
    this.topicService.selectedTopic = top;
  }

  onDelete(_id: string, form: NgForm,_subjectId:string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.topicService.deleteTopic(_subjectId,_id).subscribe((res) => {
        this.refreshTopicList();
        this.resetForm(form);
      }, (err) => {
        console.log(err)
      });
    }
  }


}
