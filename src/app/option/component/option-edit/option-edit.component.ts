import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {OptionService} from '../../services/option.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {OptionModel} from '../../models/option.model';

@Component({
  selector: 'app-option-edit',
  templateUrl: './option-edit.component.html',
  styleUrls: ['./option-edit.component.css']
})
export class OptionEditComponent implements OnInit {
  updateOptionForm: FormGroup;
  successApiMessage: string;
  errorApiMessage: string;
  successStatus: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private dialogue: MatDialogRef<OptionEditComponent>,
              public optionService: OptionService ,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void { this.createForm(); this.resetEditForm(); }

  createForm(){
    this.updateOptionForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  resetEditForm(){
    if (this.updateOptionForm != null){
      this.updateOptionForm.reset();
    }
    this.updateOptionForm.controls.caption.setValidators([ Validators.required, Validators.pattern('^[A-Za-z,û,ù,ï,i]*$')]),
      this.updateOptionForm.controls.status.setValidators([ Validators.required]);
  }

  get caption(){return this.updateOptionForm.get('caption'); }
  get status(){return this.updateOptionForm.get('status'); }

  OnClose(){this.dialogue.close(); this.optionService.filter('Update option'); }

  onUpdateOption() {
    const options = this.optionService.currentOption;
    const option: OptionModel = {id: options.id , code: options.code, success: options.success, message: options.message,
      caption: this.updateOptionForm.get('caption').value, status: this.updateOptionForm.get('status').value};
    this.optionService.updateOption(option.id, option).subscribe( data => {
      this.successApiMessage = data.message;
      if ( this.successStatus === false){
        this.errorApiMessage = data.message;
      }else{
        this.snackbar.open(this.successApiMessage.toString(), '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar']
        });
      }
      this.OnClose();
    }, error => {
      console.log(error.message);
    });
  }
}
