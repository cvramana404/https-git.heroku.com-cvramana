import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router) { }

  logout()
  {
   var a= localStorage.removeItem('id_token');
   alert("logged out successfully");
   this.router.navigate(["home/login"])
  }

  ngOnInit() {
  }

}
