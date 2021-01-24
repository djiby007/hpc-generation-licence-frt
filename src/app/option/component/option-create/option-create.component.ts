import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {OptionService} from '../../services/option.service';
import {OptionModel} from '../../models/option.model';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-option-create',
  templateUrl: './option-create.component.html',
  styleUrls: ['./option-create.component.css']
})
export class OptionCreateComponent implements OnInit {
  optionForm: FormGroup;
  successApiMessage: string;
  errorApiMessage: string;
  successStatus: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private dialogue: MatDialogRef<OptionCreateComponent>,
              private optionService: OptionService ,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void { this.createForm(); this.resetForm(); }

  createForm(){
    this.optionForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  resetForm(){
    if (this.optionForm != null){
      this.optionForm.reset();
    }
    this.optionForm = this.formBuilder.group({
      caption: [, { validators: [Validators.required, Validators.pattern('^[A-Za-z,è,é,ê,ë,û,ù,à,ï,i]*$') ],
        updateOn: 'change' }],
      status: [, { validators: [Validators.required], updateOn: 'change' }],
    });
  }

  get caption(){return this.optionForm.get('caption'); }
  get status(){return this.optionForm.get('status'); }

  OnClose(){this.dialogue.close(); this.optionService.filter('Save option'); }

  onSaveOption(option: OptionModel){
    option = this.optionForm.value;
    this.optionService.saveOption(option).subscribe(res => {
      this.resetForm();
      this.successApiMessage  = res.message;
      this.successStatus = res.success;
      if (this.successStatus === true){
        this.snackbar.open(this.successApiMessage.toString(), '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar']
        });
        this.OnClose();
      } else {
        this.errorApiMessage = res.message;
        this.snackbar.open(this.successApiMessage.toString(), '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar']
        });
      }
    }, err => {
      console.log(err.message);
    });
  }
}
