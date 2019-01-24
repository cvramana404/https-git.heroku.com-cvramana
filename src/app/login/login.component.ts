import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  constructor(private router:Router, private ds:LoginService) { }

  ngOnInit() {
  }

  sign(v)
  {

    this.ds.receivedFromLogin(v);


    // if(v.email=="admin"){
    //   this.router.navigate(["admin"])
    // }
    // else
    // {
    //   this.router.navigate(["student"])
    // }

console.log(v);
  }

}
