import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';

import { contentHeaders } from '../../common/headers';

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
  constructor(public router:Router, public http: Http){}

  login(event,username, password){
    let body = JSON.stringify({username, password});
    // posting the json data payload
    this.http.post('http://localhost:5000/api/v1/auth/login/',body,{headers: contentHeaders})
    .subscribe(
      // A response anaunymous function, that receives the login token
      response =>{
        localStorage.setItem('token', response.json().token);
        // redirectin the user to the list of bucketlists populated by the user
        this.router.navigate(['/bucketlists']);
      },
      //catching the errors that result from what was sent
      error => {
        this.login_errors =true;
        console.log(error.text());
      }
    );
  }
  register(event){
    event.preventDefault();
    this.router.navigate(['register']);
  }

}
