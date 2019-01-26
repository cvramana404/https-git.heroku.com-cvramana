import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminnotificationsService {

  constructor(private http:HttpClient) { }

  receivedFromAdminNotification(g)
  {
    this.http.post('admin/adminnotifications',g).subscribe(temp=>{alert(temp)

    //   if(temp==="registered successfully")
    // {
    //   this.router.navigate(["home/login"]);
    // }
    // if(temp==="user existed")
    // {
    //   this.router.navigate(["home/register"]);
    // }
    
    });
  }

  fromAdminNotificationsEdit(d)
  {
    this.http.put('admin/adminnotifications',d).subscribe(temp=>{alert(temp)})
  }
}
