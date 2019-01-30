import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from '../register.service';
import { DeleteprofileService } from '../deleteprofile.service';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  data1:object[]=[];
  data2:any[]=[];
  data:object[]=[];
  data3:object[]=[];
  b:boolean=false;

  constructor(private ds:DataService, private http:HttpClient, private update:RegisterService, private deleteprofile:DeleteprofileService) { }
p:number;
  ngOnInit() 
  {
// this.ds.getData1().subscribe(temp=>{this.data1=temp;})

this.http.get<any>("api/student/studentprofile").subscribe(temp=>{
  if(temp['message']=="Token is not valid")
  {
alert(temp['message']);
  }
  else{  
  
  this.data2=temp;}})
  }

  edit(v)
  {
    this.b=true;
    this.data=v;
    
  }

  

  save()
  {
    this.b=false;
    this.update.fromStudentProfile(this.data);
  }

  delete()
  {
    
    this.deleteprofile.fromStudentProfileRemove(this.data2);

  }

}
