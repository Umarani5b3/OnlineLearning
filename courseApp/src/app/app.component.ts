import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from './login-and-registration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'courseApp';
  data: any;
  iconHidden: string
  userId: string
  username: string
  name: string
  temp: any
  imageUrl: string
  profileHidden: string
  logoutIconHidden:string

  constructor(private service: LoginAndRegistrationService) {
    if (localStorage.getItem('x-access-token')) {
      this.iconHidden = 'none';
      this.profileHidden = 'block'
      this.logoutIconHidden='block'
      this.userId = (localStorage.getItem('user_id'))
      this.service.getCurrentUserData(this.userId).subscribe((res) => {
        this.data = res;
        this.username = this.data.username
        this.imageUrl = this.data.avatar
        this.temp = this.username.split(" ");
        this.name = this.temp[0] + " " + this.temp[1].charAt(0)
      })
    } else {
      this.iconHidden = 'block'
      this.profileHidden = 'none'
      this.logoutIconHidden='none'
    }

  }
  ngOnInit() {
  }

  OnlogoutClick(){
    this.service.logout();
  }
}
