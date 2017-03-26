import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector:'app-register',
  templateUrl:'./register.component.html',
  styleUrls:['./register.component.css']
})

export class RegisterComponent{
  reg_errors =false;
  error:string;
  errors =[];
  constructor(public router: Router, public http: Http,
  public toastr:ToastsManager){ }
  register(event,username,email,password){
    //catch initial errors
    this.errors=[]
    event.preventDefault();
    let body=JSON.stringify({username,email,password});
    this.http.post('https://localhost:5000/api/v1/auth/register/',body,{headers:contentHeaders })
    .subscribe(
      response =>{
        this.router.navigate(['login']);
        this.showSuccess();
      },
      error =>{
        this.reg_errors=true;
        this.error = error.json();
        let errorObj =error.json();
        if (errorObj.hasOwnProperty('username')){
          this.errors.push('Username error: '+errorObj.username[0]);
        }
        if (errorObj.hasOwnProperty('email')){
          this.errors.push('Error: Email Address is required');
        }
        if(errorObj.hasOwnProperty('password')){
          this.errors.push('Error: Password is Required');
        }
        console.log(this.errors)
      }
    );
  }
  login(event){
    event.preventDefault();
    this.router.navigate(['login']);
  }
  showSuccess(){
    this.toastr.success('Registration Successful','Success!');
  }

}
