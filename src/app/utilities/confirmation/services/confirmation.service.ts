import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationComponent} from '../component/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor( private dialog: MatDialog ) { }

  openConfirmDialog(msg){
    return this.dialog.open(ConfirmationComponent, {
      width: '35%',
      disableClose: true,
      data : {
        message: msg,
      }
    });
  }
}
