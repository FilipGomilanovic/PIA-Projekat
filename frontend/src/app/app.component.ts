import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router){}

  title = 'PIA Rocks';
  logged = JSON.parse(sessionStorage.getItem('logged'))

  logOut(){
    sessionStorage.setItem("logged", null)
    window.location.href = window.location.protocol + '//' + window.location.host + '/';
  }
}
