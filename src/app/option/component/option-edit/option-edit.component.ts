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

  ngOnInit(): void { this.createForm(); this.resetForm(); }

  createForm(){
    this.updateOptionForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  resetForm(){
    if (this.updateOptionForm != null){
      this.updateOptionForm.reset();
    }
    this.updateOptionForm = this.formBuilder.group({
      caption: new  FormControl([, {validators: [Validators.required, Validators.pattern('^[A-Za-z]*$')], updateOn: 'change'}]),
      status: new FormControl([, { validators: [Validators.required], updateOn: 'change' }]),
    });
  }

  get caption(){return this.updateOptionForm.get('caption'); }
  get status(){return this.updateOptionForm.get('status'); }

  OnClose(){this.dialogue.close(); this.optionService.filter('Update option'); }

  onUpdateOption(opt: OptionModel) {
    this.optionService.currentOption = opt;
    const option: OptionModel = {id: opt.id , code: opt.code, success: opt.success, message: opt.message,
      caption: this.updateOptionForm.get('caption').value, status: this.updateOptionForm.get('status').value};
    this.optionService.updateOption(option.id, option).subscribe( data => {
      this.snackbar.open(this.successApiMessage.toString(), '', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['green-snackbar']
      });
      this.OnClose();
    }, error => {
      console.log(error.message);
    });
  }
}
