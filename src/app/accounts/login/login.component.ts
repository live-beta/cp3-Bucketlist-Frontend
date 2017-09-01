import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// initialise a template that will be used in the processing of user information

const template = require('./login.component.html');
@Component({
  selector:'app-login',
  templateUrl: template,
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  // defining the login errors
  login_errors= false;
  error: string;
  errors =[];

  constructor(
    public router:Router,
    public http: Http,
    public toastr: ToastsManager){ }

  login(event,username, password){
    this.errors = [];
    let body = JSON.stringify({username, password});
    localStorage.setItem('currentUser',username);
    // posting login credentials with the data payload in 'body'
    this.http.post('http://localhost:5000/api/v1/auth/login/',body,{ headers: contentHeaders})
    .subscribe(
      // An anounymous response function, that receives the login token
      response =>{
        localStorage.setItem('token', response.json().token);
        // redirectin the user to the list of bucketlists populated by the user
        this.router.navigate(['/bucketlists']);
      },
      //catching the errors that result from what was sent
      error => {
        this.login_errors =true;
        this.error =error.json();
        let errorObj = error.json();
        this.toastr.error(errorObj.non_field_errors);
        console.log(errorObj.none_field_errors);
        if(errorObj.hasOwnProperty('username')){
          this.errors.push('username error:' + errorObj.username[0]);
        }
        if(errorObj.hasOwnProperty('password')){
          this.errors.push('Error: password is required');
        }
        console.log(this.errors);

      }
    );
  }
  register(event){
    event.preventDefault();
    this.router.navigate(['register']);
  }

}
