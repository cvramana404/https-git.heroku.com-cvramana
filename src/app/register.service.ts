import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  data:object;
  data6:object[]=[];

  constructor(private http:HttpClient, private router:Router) { }
  reciveFromRegister(v){

this.data=v;
console.log(v);
this.http.post('home/register',v).subscribe(temp=>{alert(temp)

  if(temp==="registered successfully")
{
  this.router.navigate(["home/login"]);
}
if(temp==="user existed")
{
  this.router.navigate(["home/register"]);
}

});


  }

//admin profile updation

  fromAdminProfile(u)
  {
    this.http.put('admin/adminprofile',u).subscribe(temp=>{alert(temp)})
    console.log(u);
  }

  //student data updation

  fromStudentProfile(z)
  {
    this.http.put('student/studentprofile',z).subscribe(temp=>{alert(temp)})
  }

  

}
