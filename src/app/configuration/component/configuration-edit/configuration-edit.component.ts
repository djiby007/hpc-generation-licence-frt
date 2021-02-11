import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {ConfigurationService} from '../../services/configuration.service';
import {ConfigurationModel} from '../../models/configuration.model';
import {OptionModel} from '../../../option/models/option.model';
import {OptionService} from '../../../option/services/option.service';
import {Observable} from 'rxjs';
import {ApplicationModel} from '../../../application/models/application.model';
import {ApplicationService} from '../../../application/service/application.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-configuration-edit',
  templateUrl: './configuration-edit.component.html',
  styleUrls: ['./configuration-edit.component.css']
})
export class ConfigurationEditComponent implements OnInit {
  listActivesOptions: OptionModel[];
  listApplicationEdit: ApplicationModel[];
  editConfigForm: FormGroup;
  successApiMessage: string;
  errorApiMessage: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  Status: boolean;
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
  constructor(private dialogue: MatDialogRef<ConfigurationEditComponent>,
              public configService: ConfigurationService ,
              private applicationService: ApplicationService,
              public optionService: OptionService ,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void { this.createEditForm(); this.resetEditForm(); this.OptionList(); this.ApplicationEditList(); }

  createEditForm(){
    this.editConfigForm = new FormGroup({
      valeurDebut: new FormControl('', Validators.required),
      valeurFin: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required),
      optionVente: new FormControl('', Validators.required),
      application: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  resetEditForm(){
    if (this.editConfigForm != null){
      this.editConfigForm.reset();
    }
    this.editConfigForm.controls.valeurDebut.setValidators([ Validators.required, Validators.pattern('^[0-9]*$')]);
    this.editConfigForm.controls.valeurFin.setValidators([ Validators.required, Validators.pattern('^[0-9]*$')]);
    this.editConfigForm.controls.montant.setValidators([ Validators.required,  Validators.pattern('^[0-9]*$')]);
    this.editConfigForm.controls.optionVente.setValidators([ Validators.required]);
    this.editConfigForm.controls.application.setValidators([ Validators.required]);
    this.editConfigForm.controls.status.setValidators([ Validators.required]);
  }

  get valeurDebut(){return this.editConfigForm.get('valeurDebut'); }
  get valeurFin(){return this.editConfigForm.get('valeurFin'); }
  get optionVente(){return this.editConfigForm.get('optionVente'); }
  get application(){return this.editConfigForm.get('application'); }
  get montant(){return this.editConfigForm.get('montant'); }
  get status(){return this.editConfigForm.get('status'); }

  OptionList(){
    this.optionService.getActiveOptionList().subscribe(data => {
      return this.listActivesOptions = data;
    }, error => {
      console.log(error);
    });
  }

  ApplicationEditList(){
    this.applicationService.getConfigApplicationList().subscribe(resp => {
      this.listApplicationEdit = resp.data;
    }, error => {
      console.log(error);
    });
  }

  onEditConfiguration() {
    const configs = this.configService.currentConfig;
    let configuration: ConfigurationModel;
    configuration = {
      id: configs.id, success: configs.success, message: configs.message,
      valeurDebut: this.valeurDebut.value,
      status: this.status.value,
      valeurFin: this.valeurFin.value,
      montant: this.montant.value,
      optionVente: { id: this.optionVente.value, caption: this.configService.currentConfig.optionVente.caption },
      application: { id: this.application.value, nom: this.configService.currentConfig.application.nom }
    };
    this.configService.updateConfig(configuration.id, configuration).subscribe( data => {
      this.Toast.fire({
        icon: 'error',
        title: data.message,
      });
      this.Close();
    }, error => {
      console.log(error.message);
    });
  }

  Close() {this.dialogue.close(); this.configService.filter('Update Configuration'); }
}
