import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAndRegistrationService } from '../login-and-registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private service:LoginAndRegistrationService) { }

  ngOnInit(): void {
    if(localStorage.getItem('x-access-token')){
      this.router.navigate(['/']);
    }
  }

  signIn(form: NgForm){
    this.service.signIn(form.value).subscribe((res) =>{
      console.log(res)
      this.router.navigate(['/']);
    },(err)=>{
      console.log(err)
    });
  }

}
