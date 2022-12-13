import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
// import { OpenSnackBarComponent } from './open-snack-bar/open-snack-bar.component';

export class MySnackBar {
    static _snackBar: MatSnackBar;
    
    constructor() { }

    static openSnackBar(message:string,action:string,duration:number,vaPosition:vrDirection,horPosition:horDirection){
        this._snackBar.open(message,action,{
        duration: duration,
        verticalPosition: vaPosition, // KYBC.Posible values: 'top' | 'bottom'.
        horizontalPosition: horPosition // KYBC.Posible values: 'left' | 'center' | 'right'.
      }
      
      )

    }
}
  export enum vrDirection {
    top = "top",
    bottom = "bottom"
  }
  export enum horDirection {
    left = "left",
    center = "center",
    right = "right"
  }