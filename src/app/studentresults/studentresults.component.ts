import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentresults',
  templateUrl: './studentresults.component.html',
  styleUrls: ['./studentresults.component.css']
})
export class StudentresultsComponent implements OnInit {
  data6:any[]=[];

  constructor(private http:HttpClient) { }

  ngOnInit() 
  {
this.http.get<any>('admin/adminresult').subscribe(temp=>{this.data6=temp;})
  }

}
