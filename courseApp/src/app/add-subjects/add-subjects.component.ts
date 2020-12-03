import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Subjects } from '../models/Subjects';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css']
})
export class AddSubjectsComponent implements OnInit {

  form: FormGroup;
  percentDone: any =0 ;
  preview: string;
  constructor(private fb: FormBuilder, public service: SubjectsService) {
    this.form = this.fb.group({
      avatar: [null],
    })
   }

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

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    console.log(this.form)
    this.service.postSubjectsViaFile(
      this.form.value.avatar,

    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
        //this.router.navigate(['users-list'])
      }
    })
  }

}
