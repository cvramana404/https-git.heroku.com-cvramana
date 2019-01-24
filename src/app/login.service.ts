import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router:Router) { }

  receivedFromLogin(v)
  {
    this.http.post('/home/login',v).subscribe(temp=>{alert(temp)

      if(temp==="user not existed")
    {
      this.router.navigate(["home/login"]);
    }
    if(temp==="wrong password")
    {
      this.router.navigate(["home/login"]);
    }
    if(temp==="logged in successfully as admin")
    {
      this.router.navigate(["/admin"]);
    }
    if(temp==="logged in successfully as student")
    {
      this.router.navigate(["/student"]);
    }
    
    
    });










  }
}
