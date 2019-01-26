import { Component, OnInit } from '@angular/core';
import { AdminresultService } from '../adminresult.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminresult',
  templateUrl: './adminresult.component.html',
  styleUrls: ['./adminresult.component.css']
})
export class AdminresultComponent implements OnInit {
  arr:object[]=[];
  b:boolean=false;
  data5:any[]=[];
  searchTerm:string;
  name:string;
  branch:string;
  subject1:string;
  marks1:string;
  subject2:string;
  marks2:string;
  subject3:string;
  marks3:string;
  subject4:string;
  marks4:string;
  

  constructor(private adminresults:AdminresultService, private http:HttpClient) { }

  ngOnInit() 
  {
this.http.get<any>('admin/adminresult').subscribe(temp=>{this.data5=temp;})
    }

  add(v):void
  {
this.arr.push(v);
console.log(v);
this.name='';
this.branch='';
this.subject1='';
this.marks1='';
this.subject2='';
this.marks2='';
this.subject3='';
this.marks3='';
this.subject4='';
this.marks4='';


this.adminresults.receivedFromAdminResult(v);

  }

  
  

  arr2:object;
  
  edit(h)
  {
    this.arr2=h;
    this.b=true;
    
  }

  done()
  {
    this.b=false;
    this.adminresults.receivedFromAdminResultEdit(this.arr2);
  }

  delete(v):void
  {

this.adminresults.receivedFromAdminResultDelete(v);
  }
  

}
