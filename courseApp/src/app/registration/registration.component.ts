import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginAndRegistrationService } from '../login-and-registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = []

  constructor(public fb: FormBuilder, public router: Router, public service: LoginAndRegistrationService) {
    this.form = this.fb.group({
      username: [''],
      mobile: [''],
      email: [''],
      password: [''],
      avatar: [null],
    })
  }

  ngOnInit(): void {
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
    this.service.addUser(
      this.form.value.username,
      this.form.value.mobile,
      this.form.value.email,
      this.form.value.password,
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
