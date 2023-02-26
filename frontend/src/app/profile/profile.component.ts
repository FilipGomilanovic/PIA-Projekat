import { Component, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { Workshop } from '../models/workshops';
import { UserService } from '../user.service';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("logged"))

    this.name = this.logged.first_name
    this.surname = this.logged.last_name
    // this.password = this.logged.password
    this.username = this.logged.username
    this.photo = this.logged.image
    this.email = this.logged.email
    this.phone = this.logged.phone
    if (this.logged.type == 'organizer'){
      this.oName = this.logged.organization.organization_name
      this.oID = this.logged.organization.organization_id
      this.oStreet = this.logged.organization.street_name
      this.oCity = this.logged.organization.city
      this.oZip = this.logged.organization.postal_code
      this.oCountry = this.logged.organization.country
    }
    this.getAtendedWorkshops();
    this.getLikedWorkshops();
    this.getCommentedWorkshops();
    this.getCurrentlyWorkshops();

    
    // let sampleRegEx: RegExp = 
    // let regex = new RegExp("(?=.*[A-Z])^[a-zA-Z](?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{7,15}$")
    // alert(this.generatePassword(regex))
  }

 generatePassword(regex: RegExp): string {
    let password = "";
    let regexMatches: RegExpMatchArray | null;
  
    while (!regex.test(password)) {
      password = "";
      regexMatches = regex.exec(regex.source);
      if (!regexMatches) {
        throw new Error("Invalid regular expression pattern");
      }
      for (let i = 0; i < regexMatches.length; i++) {
        const match = regexMatches[i];
        const charRange = match.charAt(1) === "-" ? match.substring(2, match.length - 1) : match.substring(1, match.length - 1);
        password += String.fromCharCode(Math.floor(Math.random() * (charRange.charCodeAt(1) - charRange.charCodeAt(0) + 1)) + charRange.charCodeAt(0));
      }
    }
    return password;
  }


  
  getAtendedWorkshops(){
    this.workshopService.getAllWorkshops().subscribe((workshops : Workshop[])=>{
      workshops.forEach(element => {
        let flag = false;
        element.participants.forEach(part =>{
          if(!flag) {
            if (part == this.logged.username && element.finished==true) {
              this.atendedWorkshops.push(element);
              flag = true;
            }
          }
        })
      });
    })
  }  

  getCurrentlyWorkshops(){
    this.workshopService.getAllWorkshops().subscribe((workshops : Workshop[])=>{
      workshops.forEach(element => {
        let flag = false;
        element.participants.forEach(part =>{
          if(!flag) {
            if (part == this.logged.username && element.finished==false) {
              this.currentlyWorkshops.push(element);
              flag = true;
            }
          }
        })
      });
    })
  } 
  //OVO NIJE SVE PROVERENO!!!!!
  getLikedWorkshops(){
    this.workshopService.getAllWorkshops().subscribe((workshops : Workshop[])=>{
      workshops.forEach(element => {
        let flag = false;
        element.likes.forEach(part =>{
          if (!flag) {
            if (part == this.logged.username) {
              this.likedWorkshops.push(element);
              flag = true;
            }
          }
        })
      });
    })
  }
  getCommentedWorkshops(){
    this.workshopService.getAllWorkshops().subscribe((workshops : Workshop[])=>{
      workshops.forEach(element => {
        let flag = false;
        element.comments.forEach((part:Comment) =>{
          if (!flag) {
            if (part.user.username == this.logged.username) {
              this.commentedWorkshops.push(element);
              flag = true;
            }
          }
        })
      });
    })
  }

  showUserInt(){
    this.showUserInteractions = !this.showUserInteractions;
  }

  workshopProfile(workshop){
      sessionStorage.setItem("workshop", JSON.stringify(workshop))
      window.location.href = window.location.protocol + '//' + window.location.host + '/workshop';

  }

  showUserInteractions = false;
  currentlyWorkshops = [];
  atendedWorkshops = [];
  likedWorkshops = [];
  commentedWorkshops = [];
  changedSomething = false;
  editPassword = false;
  editName = false;
  editSurname = false;
  editUsername = false;
  editEmail = false;
  editPhone = false;
  editOName = false;
  editOID = false;
  editOAddress = false;
  newPassword = ''
  newPasswordConfirm = ''
  password = ''
  name = ''
  surname = ''
  username = ''
  email = ''
  phone = ''
  oName = ''
  oID = ''
  oStreet = ''
  oCity = ''
  oZip = ''
  oCountry = '' 
  password1 = ''
  password2 = ''
  photo: string|null|ArrayBuffer = null 

  nameCheck= ''
  surnameCheck = ''
  usernameCheck = ''
  emailCheck = ''
  phoneCheck = ''
  passwordCheck = ''
  currentPasswordCheck = ''
  buttonCheck = ''


  logged = null

  changeFlag(number) {
    if (number == '0') {
      this.editPassword = !this.editPassword;
    }
    if (number == '1'){
      this.editName = !this.editName;
    } 
    else if (number == '2'){
      this.editSurname = !this.editSurname;
    }
    else if (number == '3'){
      this.editUsername = !this.editUsername;
    }
    else if (number == '4'){
      this.editEmail = !this.editEmail;
    }
    else if (number == '5'){
      this.editPhone = !this.editPhone;
    }
    else if (number == '6'){
      this.editOName = !this.editOName;
    }
    else if (number == '7'){
      this.editOID = !this.editOID;
    }
    else if (number == '8'){
      this.editOAddress = !this.editOAddress;
    }
    this.changedSomething = true;
  }

  changedPhoto(event){
    this.changedSomething = true;
    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (event:Event) => {
      let fileReader = event.target as FileReader
      this.photo = fileReader.result;
    }
  }

  testName(){
     //Najmanje 3 karaktera, prvi karakter mora biti slovo
    if(!(/^[a-zA-Z]\w{2}/).test(this.name)) {
      this.nameCheck= "Invalid format" 
    } else {
      this.nameCheck=null
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

   testCurrentPassword(){
    if (this.password != this.logged.password){
      this.currentPasswordCheck = "Wrong current password"
    }
    else {
      this.currentPasswordCheck = ''
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
   
   testSurname(){
     //Najmanje 3 karaktera, prvi karakter mora biti slovo
     if(!(/^[a-zA-Z]\w{2}/).test(this.surname)) {
       this.surnameCheck= "Invalid format"
     } else {
       this.surnameCheck=null
     }
   }

  saveChanges(){
    if (this.nameCheck || this.surnameCheck || this.usernameCheck || this.emailCheck || this.phoneCheck || this.passwordCheck || this.currentPasswordCheck ){
      this.buttonCheck = "All fields must be in valid format"
    } else {
      this.buttonCheck = ''
      if (this.password1 == ''){
        this.password1 = this.logged.password
      }
      if (this.logged.type=='organizer') {
        this.userService.updateOrganizer(this.logged._id, this.logged.username, this.name, this.surname, this.username, this.email, this.phone, this.photo, this.password1, this.oName, this.oID, this.oStreet, this.oCity, this.oZip, this.oCountry).subscribe(resObj=>{
          this.userService.getUser(this.username).subscribe(user =>{

            this.logged = user;
            sessionStorage.setItem("logged", JSON.stringify(user))
            window.location.href = window.location.protocol + '//' + window.location.host + '/profile'
          })
        })
      }
      else {
        this.userService.updateParticipant(this.logged._id, this.logged.username, this.name, this.surname, this.username, this.email, this.phone, this.photo, this.password1).subscribe(resObj=>{
          this.userService.getUser(this.username).subscribe(user =>{
            this.logged = user;
            sessionStorage.setItem("logged", JSON.stringify(user))
            window.location.href = window.location.protocol + '//' + window.location.host + '/profile'
          })
        })
      }
    }
  }

}
