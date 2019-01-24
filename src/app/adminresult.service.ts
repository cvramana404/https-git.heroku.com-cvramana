import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminresultService {

  constructor(private http:HttpClient) { }

  receivedFromAdminResult(h)
  {
this.http.post('admin/adminresult',h).subscribe(temp=>{alert(temp)});
  }
}
