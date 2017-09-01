import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rsjs/Rx'

@Injectable()
export class DisplayServiceToggle {

  // This toggles the show regisrter flag
  public static showregister :boolean =true;
  setregister(){
    DisplayServiceToggle.showregister =false;

  }
  getregister(){
    return DisplayServiceToggle.showregister;
  }

}
