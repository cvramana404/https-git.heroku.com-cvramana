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
    this.http.post('api/home/login',v).subscribe(res=>{
      localStorage.setItem('id_token',res['idToken'])
      
        

      if(res==="user not existed")
    {
      this.router.navigate(["home/login"]);
    }
    if(res==="wrong password")
    {
      this.router.navigate(["home/login"]);
    }
    if(res['info']==="logged in admin")
    {
      this.router.navigate(["/admin"]);
    }
    if(res['info']==="logged in student")
    {
      this.router.navigate(["/student"]);
    }
    
    
    });










  }
}
