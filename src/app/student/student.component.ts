import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private router:Router) { }

  logout()
  {
    var a=localStorage.removeItem('id_token');
    alert ("logged out successfully");
    this.router.navigate(["home/login"])
  }

  ngOnInit() {
  }

}
