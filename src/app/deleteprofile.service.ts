import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteprofileService {

  data6:object[]=[];

  constructor(private http:HttpClient) { }


  //student data delete operation
  fromStudentProfileRemove(z)
  {
    var httpOptions=
    {
      headers:new HttpHeaders({'content-type':'application/json'}),
      body:z
    };
this.http.delete<any>('api/student/studentprofile',httpOptions).subscribe(temp=>{this.data6=temp;});
  }
}
