import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: ''
  password: ''
  errorMessage = ''

   login(){
    this.userService.loginAdmin(this.username, this.password).subscribe((user: User)=>{
      if (!this.username || !this.password){
        this.errorMessage = "All fileds required!"
      } else {
        if (user){
          this.router.navigate(['/administrator'])
        }
        else {
          this.errorMessage = "Wrong data!"
        }
      }
    })
  }
}
