import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("logged"))
  }

  logged: User
  
}
