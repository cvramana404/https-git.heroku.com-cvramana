import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  // getData(): Observable<any>
  // {
  //   return this.http.get<any>("assets/registrationform.json");
  // }

  getData1(): Observable<any>
  {
    return this.http.get<any>("assets/studentregistrationform.json");
  }

  // getData2():Observable<any>
  // {
  //   return this.http.get<any>("assets/adminnotifications.json");
  // }


  // collect:object[]=[];
  // receivedfromA(g)
  // {
  //   this.collect=g;
  // }

  // sendToB()
  // {
  //   return this.collect;
  // }
}
