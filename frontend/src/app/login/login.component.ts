import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.username, this.password, this.type).subscribe((user: User)=>{
      if (!this.username || !this.password){
        this.errorMessage = "***All fields required***"
      } else {
        if (user){
          if (user.type == "participant") {
            this.router.navigate(['/participiant'])
            sessionStorage.setItem('logged',JSON.stringify(user));
          }
          else {
            this.router.navigate(['/organizer'])
            sessionStorage.setItem('logged',JSON.stringify(user));
          }
        }
        else {
          this.errorMessage = "***Wrong data***"
        }
      }
    })
  }
  username = '';
  password = '';
  type = 'participant'
  errorMessage = '';

}
