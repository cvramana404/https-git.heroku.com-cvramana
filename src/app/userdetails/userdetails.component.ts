import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  data9:object[]=[];

  ngOnInit() 
  {
    this.http.get<any>('api/home/register').subscribe(temp=>this.data9=temp)
  }

}
