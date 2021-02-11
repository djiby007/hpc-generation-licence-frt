import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {OptionService} from '../../services/option.service';
import {OptionModel} from '../../models/option.model';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import Swal from "sweetalert2";

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
  Status: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
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
      caption: [, { validators: [Validators.required, Validators.pattern('^[A-Za-z,ï,i]*$') ],
        updateOn: 'change' }],
      status: [, { validators: [Validators.required], updateOn: 'change' }],
    });
  }

  get caption(){return this.optionForm.get('caption'); }
  get status(){return this.optionForm.get('status'); }

  OnClose(){ this.dialogue.close(); this.optionService.filter('Save option'); }

  onSaveOption(option: OptionModel){
    option = this.optionForm.value;
    this.optionService.saveOption(option).subscribe(data => {
      this.resetForm();
      if (this.Status === true){
        this.Toast.fire({
          icon: 'success',
          title: data.message,
        });
      } else {
        this.Toast.fire({
          icon: 'error',
          title: data.message,
        });
      }
    }, err => {
      console.log(err.message);
    });
  }
}
