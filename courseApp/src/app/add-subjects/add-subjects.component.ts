import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subjects } from '../models/Subjects';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css']
})
export class AddSubjectsComponent implements OnInit {

  constructor(public service: SubjectsService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshSubjectList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.service.selectedSubjects = {
      _id: "",
      subject: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id) {
      console.log(form.value._id)
      this.service.updateSubject(form.value).subscribe((res) => {
        console.log("PUT")
        this.resetForm(form);
        this.refreshSubjectList();
      }, (err) => {
        console.log(err)
      });
    }
    else {
      this.service.postSubjects(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshSubjectList();
        console.log("POST")
      }, (err) => {
        console.log(err)
      });
    }
  }

  refreshSubjectList() {
    this.service.getSubjectsList().subscribe((res) => {
      this.service.subjects = res as Subjects[];
    }, (err) => {
      console.log(err)
    });
  }

  onEdit(sub: Subjects) {
    this.service.selectedSubjects = sub;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.service.deleteSubject(_id).subscribe((res) => {
        this.refreshSubjectList();
        this.resetForm(form);
      }, (err) => {
        console.log(err)
      });
    }
  }


}
