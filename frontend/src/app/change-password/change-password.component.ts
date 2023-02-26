import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('changePasswordUser'))
    let currentTime = new Date()
    let diffInMilliseconds = currentTime.getTime() - new Date(this.user.change_password_request_time).getTime()
    if (diffInMilliseconds / 1000 / 60 > 30) {
      this.timePassed = true
    }
  }

  password1 = ''
  password2 = ''
  errorMessage = null
  errorCodeMessage = null
  code = ''
  user = null
  timePassed = null

  testPassword(){
    // min 8, max - 16 karaktera,
    // bar jedan broj,
    // bar jedno veliko slovo,
    // bar jedan specijalni karakter(@$!%*?&_)
    if (this.password1 && this.password2) {
      if (this.password1 != this.password2) {
        this.errorMessage = "Passwords does not match"
      } else if (!(/(?=.*[A-Z])^[a-zA-Z](?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{7,15}$/).test(this.password2)){
        this.errorMessage = "Invalid format"
      } else {
        this.errorMessage = null;
      }
    }
    else {
      this.errorMessage = null;
    }
  }

  change(){
    if (this.user.verification_number != this.code){
      this.errorCodeMessage = "Wrong verification code"
    }
    else {
      this.errorCodeMessage = null
      if (this.password1.length == 0 || this.password2.length == 0 || this.code.length == 0) {
        this.errorMessage = "All fields required"
      }
      else {
        if (!this.errorCodeMessage || !this.errorMessage) {
          this.userService.changePassword(this.user.username, this.password1).subscribe(respObj =>{
            window.location.href = window.location.protocol + '//' + window.location.host + '/login';
          })
        }
      }
    }
    
  }

}
