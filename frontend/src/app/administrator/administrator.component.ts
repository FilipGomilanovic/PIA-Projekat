import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Workshop } from '../models/workshops';
import { UserService } from '../user.service';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private userService: UserService, private workshopService: WorkshopService) { }

  ngOnInit(): void {
    // if (!localStorage.getItem("footer")) {
    //   localStorage.setItem("footer", 'yes')
    //   window.location.reload()
    // }
    this.logged = JSON.parse(sessionStorage.getItem('logged'))
    this.userService.getAllRequests().subscribe((users: User[]) => {
      this.newRequests = users;
    })
    this.workshopService.getAllWorkshopsAdmin().subscribe((workshops : Workshop[]) => {
      this.newWorkshops = workshops;
    })
  }
  logged = null

  acceptWorkshop(id){
    this.workshopService.updateStatus(id, "active").subscribe(respObj => {
      window.location.reload()
    })
  }
  
  rejectWorkshop(id){
    this.workshopService.updateStatus(id, "rejected").subscribe(respObj => {
      window.location.reload()
    })
  }

  accept(username){
    this.userService.updateStatus(username, "active").subscribe(respObj => {
      window.location.reload()
    })
  }
  
  reject(username){
    this.userService.updateStatus(username, "inactive").subscribe(respObj => {
      window.location.reload()
    })
  }
  
  newRequests = []
  newWorkshops = []

}
