import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteadminnotificationsService {

  data6:object[]=[];
  

  constructor(private http:HttpClient) { }


  //admin Notifications delete operation

  fromDeleteNotifications(z)
  {
    
    var httpOptions=
    {
      headers:new HttpHeaders({'content-type':'application/json'}),
      body:z
    };
this.http.delete<any>('api/admin/adminnotifications',httpOptions).subscribe(temp=>{alert(temp)});
  }
}
