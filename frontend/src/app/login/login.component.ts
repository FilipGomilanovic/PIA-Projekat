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
        this.errorMessage = "All fields required"
      } else {
        if (user){
          if (user.type == "participant") {
            sessionStorage.setItem('logged',JSON.stringify(user));
            window.location.href = window.location.protocol + '//' + window.location.host + '/participant';
            // this.router.navigate(['/participant']).then(() => {
            //   window.location.reload();
            // });
            
           
          }
          else {
            sessionStorage.setItem('logged',JSON.stringify(user));
            window.location.href = window.location.protocol + '//' + window.location.host + '/organizer';
            // this.router.navigate(['/organizer']).then(() => {
            //   window.location.reload();
            // });
          }
        }
        else {
          this.errorMessage = "Wrong data"
        }
      }
    })
  }

  testEmail(){
    this.changePassword = true
  }



  sendEmail(){
    let exist = false;
    this.userService.getAllUsers().subscribe((users: User[])=>{
      users.forEach(user =>{
        if (user.email == this.email){
          exist = true;
          this.user = user.username
        }
      })
      if (exist) {
        this.emailErrorMessage=null
        
        this.userService.sendEmail(this.email).subscribe(resp=>{
          this.userService.getUser(this.user).subscribe((userr : User) =>{
            localStorage.setItem('changePasswordUser', JSON.stringify(userr))
          })
         
        })
      }
      else {
        this.emailErrorMessage="User with that email doesn't exist"
      }
    })
   
  }
  changePassword = false
  email = ''
  username = '';
  password = '';
  type = 'participant';
  errorMessage = '';
  emailErrorMessage = '';
  user = null

}
