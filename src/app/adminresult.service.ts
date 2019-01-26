import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminresultService {

  constructor(private http:HttpClient) { }

  //admin results post operation

  receivedFromAdminResult(h)
  {
this.http.post('admin/adminresult',h).subscribe(temp=>{alert(temp)});
  }
  
  //admin results put operation

  receivedFromAdminResultEdit(k)
  {
    this.http.put('admin/adminresult',k).subscribe(temp=>{alert(temp)});
  }

  //admin results delete operation

  receivedFromAdminResultDelete(v)
  {
    var httpOptions=
    {
      headers:new HttpHeaders({'content-type':'application/json'}),
      body:v
    };
this.http.delete<any>('admin/adminresult',httpOptions).subscribe(temp=>{alert(temp)});
  }
  
}
