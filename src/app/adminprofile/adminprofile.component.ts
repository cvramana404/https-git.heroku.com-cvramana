import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit 
{
  b:boolean=false;
  data:object[]=[];
  data1:any[]=[];

  constructor(private ds:DataService, private http:HttpClient, private update:RegisterService)   { }

  ngOnInit() 
  {
// this.ds.getData().subscribe(temp=>{this.data=temp;})

this.http.get<any>('admin/adminprofile').subscribe(temp=>{this.data1=temp;})

  }

  edit(v)
  {
    this.b=true;
    this.data=v;
    
  }

  save()
  {
    this.b=false;
    this.update.fromAdminProfile(this.data);
  }
  

}
