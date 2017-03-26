import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { AuthService } from '../accounts/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router:Router, private auth:AuthService){}
  canActivate(){
    if(this.auth.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}  
