import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {ConfigurationService} from '../../services/configuration.service';
import {ConfigurationModel} from '../../models/configuration.model';
import {OptionService} from '../../../option/services/option.service';
import {OptionModule} from '../../../option/option.module';

@Component({
  selector: 'app-configuration-create',
  templateUrl: './configuration-create.component.html',
  styleUrls: ['./configuration-create.component.css']
})
export class ConfigurationCreateComponent implements OnInit {
  configForm: FormGroup;
  listActivesOptions: {};

  constructor(private dialogs: MatDialogRef<ConfigurationCreateComponent>,
              private configService: ConfigurationService,
              private fb: FormBuilder,
              private optionService: OptionService) { }

  ngOnInit(): void { this.createConfigForm(); this.resetConfigForm(); this.OptionList(); }

  resetConfigForm(){
    if (this.configForm !== null){
      console.log(this.configForm);
      this.configForm.reset();
    }
    this.configForm = this.fb.group({
      valeurDebut: [, { validators: [Validators.required, Validators.pattern('^[0-9]*$') ], updateOn: 'change' }],
      valeurFin: [, { validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change' }],
      montant: [, { validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'change' }],
      optionVente: [, { validators: [Validators.required], updateOn: 'change' }],
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

  createConfigForm(){
    this.configForm = new FormGroup({
      valeurDebut: new FormControl('', Validators.required),
      valeurFin: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required),
      optionVente: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  get valeurDebut(){return this.configForm.get('valeurDebut'); }
  get valeurFin(){return this.configForm.get('valeurFin'); }
  get optionVente(){return this.configForm.get('optionVente'); }
  get montant(){return this.configForm.get('montant'); }
  get status(){return this.configForm.get('status'); }

  Close(){this.dialogs.close(); }

  onSaveConfiguration(config: ConfigurationModel){
    const option = new OptionModule();
    config.optionVente = this.configForm.value.optionVente;
    config = this.configForm.value;
    console.log(config);
    this.configService.saveConfig(config).subscribe(res => {
      alert(res);
      this.resetConfigForm();
      console.log(res);
    });
  }
}
