import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  firstname: string;
  lastname: string;
  username: string;
  password1: string;
  password2: string;
  organizer: boolean;
  phone: string;
  email: string;
  type: string;
  o_name: string;
  street: string;
  country: string;
  city: string;
  zip: string;
  o_id: string;
  message: string;
  firstnameCheck: string;
  lastnameCheck: string;
  usernameCheck: string;
  passwordCheck: string;
  phoneCheck: string;
  emailCheck: string;
  url: string|null|ArrayBuffer = null 

  onFileSelected(files: FileList | null) {
    if (files) {
        var reader = new FileReader()
        reader.readAsDataURL(files[0])
        //reader.readAsBinaryString(files[0])
        reader.onload = (event:Event) => {
          let fileReader = event.target as FileReader
          this.url = fileReader.result;
        }
    }
  }

testPhone(){
 if (this.phone) {
  if (!(/^(\+381|0)[0-9]{9,12}$/).test(this.phone)) {
    this.phoneCheck = "Invalid format" 
  } else {
    this.phoneCheck = null
  }
 }
 else {
  this.phoneCheck = null
 }
}

testEmail(){
  if (this.email) {
    if (!(/^[a-zA-Z]\w*@[a-z]+\.[a-z]{2,3}$/).test(this.email)) {
      this.emailCheck = "Invalid format"
    } else {
      this.emailCheck = null
    }
  }
  else {
    this.emailCheck = null
  }
}

testPassword(){
  // min 8, max - 16 karaktera,
  // bar jedan broj,
  // bar jedno veliko slovo,
  // bar jedan specijalni karakter(@$!%*?&_)
  if (this.password1 && this.password2) {
    if (this.password1 != this.password2) {
      this.passwordCheck = "Passwords does not match"
    } else if (!(/(?=.*[A-Z])^[a-zA-Z](?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{7,15}$/).test(this.password2)){
      this.passwordCheck = "Invalid format"
    } else {
      this.passwordCheck = null;
    }
  }
  else {
    this.passwordCheck = null;
  }
}

testUsername(){
  //Najmanje 3 karaktera, prvi karakter mora biti slovo
  if(!(/^[a-zA-Z]\w{2}/).test(this.username)) {
    this.usernameCheck= "Invalid format"
  } else {
    this.usernameCheck=null
  }
}

testLastname(){
  //Najmanje 3 karaktera, prvi karakter mora biti slovo
  if(!(/^[a-zA-Z]\w{2}/).test(this.lastname)) {
    this.lastnameCheck= "Invalid format"
  } else {
    this.lastnameCheck=null
  }
}

testFirstname(){
  //Najmanje 3 karaktera, prvi karakter mora biti slovo
  if(!(/^[a-zA-Z]\w{2}/).test(this.firstname)) {
    this.firstnameCheck= "Invalid format" 
  } else {
    this.firstnameCheck=null
  } 
}

register(){
  if (!this.firstname || !this.lastname || !this.username || !this.password1 || !this.password2 || !this.phone || !this.email) {
    this.message="All fields required"
  } else if (this.firstnameCheck || this.lastnameCheck || this.emailCheck || this.passwordCheck || this.phoneCheck){
    this.message="All fields must be in vaild format"
  } else {
    let exist = false;
    this.userService.getAllUsers().subscribe((users: User[])=>{
      users.forEach(user =>{
        if (user.username == this.username){
          alert(user.username)
          exist = true;
        }
      })
      if (!exist) {
        this.message=null
        if (this.organizer) {
          this.type="organizer"
        }
        else {
          this.type="participant"
        }    
        this.userService.register(this.firstname, this.lastname, this.username, this.password1, this.email, this.phone, this.type, this.url, this.o_name, this.o_id, this.street,this.country, this.city, this.zip).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            this.message = 'User added'
          }
          else{
            this.message = 'Error'
          }
          }); 
      }
      else {
        this.usernameCheck="Username already exist"
      }
    })
    
  }
}
}
