import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {ConfigurationService} from '../../services/configuration.service';
import {ConfigurationModel} from '../../models/configuration.model';
import {OptionService} from '../../../option/services/option.service';

@Component({
  selector: 'app-configuration-create',
  templateUrl: './configuration-create.component.html',
  styleUrls: ['./configuration-create.component.css']
})
export class ConfigurationCreateComponent implements OnInit {
  configForm: FormGroup;
  listActivesOptions: {};

  constructor(private router: Router,
              private dialogbox: MatDialogRef<ConfigurationCreateComponent>,
              private configService: ConfigurationService,
              private fb: FormBuilder,
              private optionService: OptionService) { }

  ngOnInit(): void { this.createForm(); this.resetForm(); this.OptionList(); }

  resetForm(){
    if (this.configForm != null){
      console.log(this.configForm);
      this.configForm.reset();
    }
    this.configForm = this.fb.group({
      valeurDebut: [, { validators: [Validators.required], updateOn: 'change' }],
      valeurFin: [, { validators: [Validators.required], updateOn: 'change' }],
      montant: [, { validators: [Validators.required], updateOn: 'change' }],
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

  createForm(){
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

  Close(){this.dialogbox.close(); }

  onSaveConfiguration(config: ConfigurationModel){
    config = this.configForm.value;
    console.log(config);
    this.configService.saveConfig(config).subscribe(res => {
      alert(res);
      this.resetForm();
      console.log(res);
    });
  }
}
