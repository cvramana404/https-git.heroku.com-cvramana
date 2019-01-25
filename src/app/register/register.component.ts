import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data2:object[]=[];
  firstname:string;
  middlename:string;
  lastname:string;
  email:string;
  password:string;
  dateofbirth:string;
  rollnumber:string;
  category:string;
  branch:string;
  gender:string;
  
  constructor(private http:HttpClient, private ds:RegisterService) { }

  ngOnInit() 
  {

  }
  first(v):void
  {
    this.data2=v;
    console.log(this.data2);
    
    this.ds.reciveFromRegister(v);

  }
  

}
