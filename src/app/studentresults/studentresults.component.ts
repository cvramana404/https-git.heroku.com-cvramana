import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentresults',
  templateUrl: './studentresults.component.html',
  styleUrls: ['./studentresults.component.css']
})
export class StudentresultsComponent implements OnInit {
  data6:any[]=[];
  searchTerm:string;

  constructor(private http:HttpClient) { }

  ngOnInit() 
  {
this.http.get<any>('api/admin/adminresult').subscribe(temp=>{
  if(temp['message']=='Token is not valid')
  {
    alert(temp['message'])
  }
  else
  {
    this.data6=temp;
  }})
  }

}
