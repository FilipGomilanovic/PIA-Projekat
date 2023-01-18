import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unregistered',
  templateUrl: './unregistered.component.html',
  styleUrls: ['./unregistered.component.css']
})
export class UnregisteredComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateLogin(){
    this.router.navigate(['login'])
  }

}
