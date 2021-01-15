import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {ConfigurationService} from '../../services/configuration.service';

@Component({
  selector: 'app-configuration-edit',
  templateUrl: './configuration-edit.component.html',
  styleUrls: ['./configuration-edit.component.css']
})
export class ConfigurationEditComponent implements OnInit {
  listActivesOptions: {};
  editConfigForm: FormGroup;
  successApiMessage: string;
  errorApiMessage: string;
  successStatus: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private dialogue: MatDialogRef<ConfigurationEditComponent>,
              public configService: ConfigurationService ,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void { this.resetEditForm(); this.createEditForm(); }

  resetEditForm(){
    if (this.editConfigForm != null){
      console.log(this.editConfigForm);
      this.editConfigForm.reset();
    }
    this.editConfigForm = this.formBuilder.group({
      valeurDebut: [, { validators: [Validators.required, Validators.pattern('^[0-9]*$') ], updateOn: 'change' }],
      valeurFin: [, { validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change' }],
      montant: [, { validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change' }],
      optionVente: [, { validators: [Validators.required], updateOn: 'change' }],
      status: [, { validators: [Validators.required], updateOn: 'change' }],
    });
  }

  createEditForm(){
    this.editConfigForm = new FormGroup({
      valeurDebut: new FormControl('', Validators.required),
      valeurFin: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required),
      optionVente: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  get valeurDebut(){return this.editConfigForm.get('valeurDebut'); }
  get valeurFin(){return this.editConfigForm.get('valeurFin'); }
  get optionVente(){return this.editConfigForm.get('optionVente'); }
  get montant(){return this.editConfigForm.get('montant'); }
  get status(){return this.editConfigForm.get('status'); }

  onEditConfiguration(value) {
    console.log(value);
  }

  Close() {this.dialogue.close(); this.configService.filter('Update Configuration'); }
}
