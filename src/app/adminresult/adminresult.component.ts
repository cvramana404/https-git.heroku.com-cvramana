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

  }

  delete(v):void
  {
this.arr.splice(v,1);
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
  }
  send(v)
  {
    this.adminresults.receivedFromAdminResult(v);
    
  }

}
