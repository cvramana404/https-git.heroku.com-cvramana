import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AdminnotificationsService } from '../adminnotifications.service';
import { HttpClient } from '@angular/common/http';
import { DeleteadminnotificationsService } from '../deleteadminnotifications.service';

@Component({
  selector: 'app-adminnotifications',
  templateUrl: './adminnotifications.component.html',
  styleUrls: ['./adminnotifications.component.css']
})
export class AdminnotificationsComponent implements OnInit {

  data:object[]=[];
  arr:object[]=[];
  name:string;
  date:any;
  notifications:string;
  sendData:object[]=[];
  searchTerm:string;
  arr1:object[]=[];
  data3:any[]=[];
  
  
  
  

  constructor(private ds:DataService, private ds1:AdminnotificationsService, private http:HttpClient, private deleteAdminNotifications:DeleteadminnotificationsService) { }

  ngOnInit()
   {
    
    //  this.ds.getData2().subscribe(temp=>{this.data=temp;})

    //getting data from data base
    this.http.get<any>("api/admin/adminnotifications").subscribe(temp=>{
      if(temp['message']=='Token is not valid')
      {
        alert(temp['message']);
      }
      else
      {
        this.data3=temp;
      } })

  }

  addto(v):void
  {
this.arr.push(v);
this.name="";
this.date="";
this.notifications="";


console.log(v);
this.ds1.receivedFromAdminNotification(v);

  }
//   delete(u):void
//   {
// this.arr.splice(u,1);
//   }

  b:boolean=false;
  arr2:object[]=[];


  // edit(k):void
  // {
  //   this.b=true;
  //   this.arr2=k;
  // }
  

  send(g):void
  {
    this.arr1.push(g);

    // this.ds.receivedfromA(this.arr1);

    
  }

  editData(u)
  {
    this.b=true;
    this.arr2=u;
    

  }

  done():void
  {
    this.b=false;
    this.ds1.fromAdminNotificationsEdit(this.arr2);
  }
  



  delete(v)
  {
    
    this.deleteAdminNotifications.fromDeleteNotifications(v);

  }


}
