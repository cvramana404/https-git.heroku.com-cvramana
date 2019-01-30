import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationService implements HttpInterceptor{

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
  {
    //read token from local storage
    const idToken=localStorage.getItem("id_token");
    //if token found, clone it to request object at header
    if(idToken)
    {
      const cloned=req.clone({
        headers:req.headers.set("Authorization","Bearer "+idToken)
      })
      return next.handle(cloned);
    }
    else
    {
      return next.handle(req);
    }
    
  }
}
