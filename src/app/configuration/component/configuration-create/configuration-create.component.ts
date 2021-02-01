import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ConfigurationService} from '../../services/configuration.service';
import {ConfigurationModel} from '../../models/configuration.model';
import {OptionService} from '../../../option/services/option.service';
import {OptionModule} from '../../../option/option.module';
import {OptionModel} from '../../../option/models/option.model';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {ApplicationEditConfigModel} from '../../../application/models/applicationEditConfig.model';

@Component({
  selector: 'app-configuration-create',
  templateUrl: './configuration-create.component.html',
  styleUrls: ['./configuration-create.component.css']
})
export class ConfigurationCreateComponent implements OnInit {
  configForm: FormGroup;
  listActivesOptions: OptionModel[];
  successApiMessage: string;
  errorApiMessage: string;
  successStatus: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private dialogs: MatDialogRef<ConfigurationCreateComponent>,
              private configService: ConfigurationService,
              private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private optionService: OptionService) { }

  ngOnInit(): void { this.createConfigForm(); this.resetConfigForm(); this.OptionList(); }

  resetConfigForm(){
    if (this.configForm !== null){
      this.configForm.reset();
    }
    this.configForm = this.fb.group({
      valeurDebut: [, { validators: [Validators.required, Validators.pattern('^[0-9]*$') ], updateOn: 'change' }],
      valeurFin: [, { validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change' }],
      montant: [, { validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change' }],
      optionVente: [, { validators: [Validators.required], updateOn: 'change' }],
      application: [, { validators: [Validators.required], updateOn: 'change' }],
      status: [, { validators: [Validators.required], updateOn: 'change' }],
    });
  }

  OptionList(){
    this.optionService.getActiveOptionList().subscribe(data => {
      this.listActivesOptions = data;
    }, error => {
      console.log(error);
    });
  }

  ApplicationList(){
    this.optionService.getActiveOptionList().subscribe(data => {
      this.listActivesOptions = data;
    }, error => {
      console.log(error);
    });
  }

  createConfigForm(){
    this.configForm = new FormGroup({
      valeurDebut: new FormControl('', Validators.required),
      valeurFin: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required),
      optionVente: new FormControl('', Validators.required),
      application: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  get valeurDebut(){return this.configForm.get('valeurDebut'); }
  get valeurFin(){return this.configForm.get('valeurFin'); }
  get optionVente(){return this.configForm.get('optionVente'); }
  get application(){return this.configForm.get('application'); }
  get montant(){return this.configForm.get('montant'); }
  get status(){return this.configForm.get('status'); }

  Close(){this.dialogs.close();  this.configService.filter('Save configuration'); }

  onSaveConfiguration(config: ConfigurationModel){
    const opt: OptionModel = this.configForm.value.optionVente;
    const app: ApplicationEditConfigModel = this.configForm.value.application;
    /*opt.id = this.configForm.value.optionVente;
    app.id = this.configForm.value.application;*/
    config.application = (app as ApplicationEditConfigModel);
    config.optionVente = (opt as OptionModel);
    this.configService.saveConfig(config).subscribe(res => {
      this.resetConfigForm();
      this.successApiMessage  = res.message;
      this.successStatus = res.success;
      if (this.successStatus === true){
        this.snackbar.open(this.successApiMessage.toString(), '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar']
        });
        this.Close();
      } else {
        this.errorApiMessage = res.message;
      }
    }, err => {
      console.log(err.message);
    });
  }
}
