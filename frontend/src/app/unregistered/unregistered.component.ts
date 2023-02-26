import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Workshop } from '../models/workshops';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-unregistered',
  templateUrl: './unregistered.component.html',
  styleUrls: ['./unregistered.component.css']
})
export class UnregisteredComponent implements OnInit {

  constructor(private router: Router, private workshopService: WorkshopService) { }

  logged = null
  alerts = []
  sort = 'sortTitleAscending'

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("logged"))
    this.workshopService.getAllWorkshops().subscribe((workshops: []) =>{
      this.workshops = workshops
      for (let i = 0; i < workshops.length; i++){
        this.alerts.push(false)
      }
      this.workshopsTop5 = this.workshops.sort((a, b) => b.numberOfLikes - a.numberOfLikes)
      if (this.workshops.length == 0){
        this.noWorkshopsMessage = 'No workshops'
      } else {
        this.noWorkshopsMessage = ''
      }
    })
    this.updateFinishedWorkshops();
    
  }

  updateFinishedWorkshops(){
    this.workshopService.getAllWorkshops().subscribe((workshops: Workshop[]) => {
      workshops.forEach(element => {
        if (!element.finished && new Date(element.date).getTime() < new Date().getTime()) {
          this.workshopService.setFinished(element._id).subscribe(resp=>{

          })
        }
      });
    })
  }

  sortWorkshops(){
    if (this.sort == 'sortTitleAscending') {
      for (let i = 0; i < this.workshops.length - 1; i++){
        for (let j = i+1; j < this.workshops.length; j++){
          if (this.workshops[i].title.toLowerCase() > this.workshops[j].title.toLowerCase()) {
            let temp = this.workshops[i];
            let tempBool = this.alerts[i];
            this.workshops[i] = this.workshops[j];
            this.workshops[j] = temp;
            this.alerts[i] = this.alerts[j];
            this.alerts[j] = tempBool;
          }
        }
      }
    }
    else if (this.sort == 'sortTitleDescending') {
      for (let i = 0; i < this.workshops.length - 1; i++){
        for (let j = i+1; j < this.workshops.length; j++){
          if (this.workshops[i].title.toLowerCase() < this.workshops[j].title.toLowerCase()) {
            let temp = this.workshops[i];
            let tempBool = this.alerts[i];
            this.workshops[i] = this.workshops[j];
            this.workshops[j] = temp;
            this.alerts[i] = this.alerts[j];
            this.alerts[j] = tempBool;
          }
        }
      }
    }
    else if (this.sort == 'sortDateAscending') {
      for (let i = 0; i < this.workshops.length - 1; i++){
        for (let j = i+1; j < this.workshops.length; j++){
          if (new Date(this.workshops[i].date) > new Date(this.workshops[j].date)) {
            let temp = this.workshops[i];
            let tempBool = this.alerts[i];
            this.workshops[i] = this.workshops[j];
            this.workshops[j] = temp;
            this.alerts[i] = this.alerts[j];
            this.alerts[j] = tempBool;
          }
        }
      }
    }
    else if (this.sort == 'sortDateDescending') {
      for (let i = 0; i < this.workshops.length - 1; i++){
        for (let j = i+1; j < this.workshops.length; j++){
          if (new Date(this.workshops[i].date) < new Date(this.workshops[j].date)) {
            let temp = this.workshops[i];
            let tempBool = this.alerts[i];
            this.workshops[i] = this.workshops[j];
            this.workshops[j] = temp;
            this.alerts[i] = this.alerts[j];
            this.alerts[j] = tempBool;
          }
        }
      }
    }
  }


  search(){
    this.workshopService.getAllWorkshops().subscribe((workshops: []) =>{
      this.workshops = workshops
      this.workshops = this.workshops.filter(workshop=>(workshop.title.toLowerCase()).includes(this.searchTitle.toLowerCase()))
      // ((workshop.street.includes(this.searchLocation)) || (workshop.city.includes(this.searchLocation)) || (workshop.country.includes(this.searchLocation))));
      this.alerts = []
      for (let i = 0; i < workshops.length; i++){
        this.alerts.push(false)
      }
      if (this.workshops.length == 0){
        this.noWorkshopsMessage = 'No workshops'
      } else {
        this.noWorkshopsMessage = ''
      }
    })

    }

    workshopProfile(workshop){
      if (!this.logged){
        this.showAlert = true
      } else {
        sessionStorage.setItem("workshop", JSON.stringify(workshop))
        window.location.href = window.location.protocol + '//' + window.location.host + '/workshop';
      }
    }
    workshopProfile2(workshop, index){
      if (!this.logged){
        this.alerts[index] = true
      } else {
        sessionStorage.setItem("workshop", JSON.stringify(workshop))
        window.location.href = window.location.protocol + '//' + window.location.host + '/workshop';
      }
    }

  showProfile(organizer){
    if (!this.logged){
      this.showAlert = true
    } else {
      sessionStorage.setItem("profile", JSON.stringify(organizer))
      window.location.href = window.location.protocol + '//' + window.location.host + '/profile';
    }
  }

  showProfile2(organizer, index){
    if (!this.logged){
      this.alerts[index] = true
    } else {
      sessionStorage.setItem("profile", JSON.stringify(organizer))
      window.location.href = window.location.protocol + '//' + window.location.host + '/profile';
    }
  }
  closeAlert(){
    this.showAlert = false;
  }
  closeAlert2(index){
    this.alerts[index] = false
  }
    

  navigateLogin(){
    this.router.navigate(['login'])
  }
  showAlert2 = true
  showAlert = false
  searchTitle = ''
  searchLocation= ''
  ids = []
  jedan = 'jedan'
  dva = 'dva'
  workshops = []
  workshopsTop5 = []
  noWorkshopsMessage=''
  

}
