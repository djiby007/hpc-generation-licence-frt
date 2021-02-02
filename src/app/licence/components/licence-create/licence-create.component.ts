import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LicenceService} from '../../services/licence.service';
import {LicenceModel} from '../../models/licence.model';
import {OptionService} from '../../../option/services/option.service';
import {OptionModel} from '../../../option/models/option.model';
import {DetailsFacturationModel} from '../../models/detailsFacturation.model';
import {FilialeService} from '../../../filiale/services/filiale.service';
import {FilialeModel} from '../../../filiale/models/filiale.model';

@Component({
  selector: 'app-licence-create',
  templateUrl: './licence-create.component.html',
  styleUrls: ['./licence-create.component.css']
})
export class LicenceCreateComponent implements OnInit {
  licenceForm: FormGroup;
  detailsForm: FormGroup;
  resumeForm: FormGroup;
  listOptions: OptionModel[];
  listFiliales: FilialeModel[];
  detailsFacture: DetailsFacturationModel;
  detailsFactureList: DetailsFacturationModel[];
  value = this.formBuilder.group({
    nombre: ['', Validators.required],
    montant: ['', Validators.required],
    option: ['', Validators.required]
  });
  constructor(private licenceService: LicenceService,
              private optionService: OptionService,
              private filialeService: FilialeService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createLicenceForm();
    this.initialiserDetailsForm();
    this.createResumeForm();
    this.getOptionList();
    this.getFilialeList();
    this.getApplicationList();
  }

  createLicenceForm(){
    this.licenceForm = new FormGroup({
      application: new FormControl('', Validators.required),
      filiale: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required),
      dateDebut: new FormControl('', Validators.required),
      dateFin: new FormControl('', Validators.required),
      duree: new FormControl('', Validators.required)
    });
  }

  initialiserDetailsForm(){
    this.detailsForm = this.formBuilder.group({
      details: this.formBuilder.array([
      ])
    });
  }

  addDetailsForm(){
    const val = this.formBuilder.group({
      nombre: ['', Validators.required],
      montant: ['', Validators.required],
      option: ['', Validators.required]
    });
    const detailsForm = this.detailsForm.get('details') as FormArray;
    detailsForm.push(val);
  }

  removeGroup(index) {
    const detailsForm = this.detailsForm.get('details') as FormArray;
    detailsForm.removeAt(index);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  createResumeForm(){
    this.detailsFactureList = this.detailsForm.get('details').value as DetailsFacturationModel[];
    this.resumeForm = new FormGroup({
      cle: new FormControl({value: this.licenceForm.get('description').value, disabled: true}),
      description: new FormControl({value: this.licenceForm.get('description').value, disabled: true}),
      montant: new FormControl({value: this.licenceForm.get('montant').value, disabled: true}),
      dateDebut: new FormControl({value: this.licenceForm.get('dateDebut').value, disabled: true}),
      dateFin: new FormControl({value: this.licenceForm.get('dateFin').value, disabled: true}),
      duree: new FormControl({value: this.licenceForm.get('duree').value, disabled: true}),
    });
  }

  getOptionList(){
    this.optionService.getOptionList().subscribe(data => {
      this.listOptions = data;
    });
  }

  getApplicationList(){
    this.optionService.getOptionList().subscribe(data => {
      this.listOptions = data;
    });
  }

  getFilialeList(){
    this.filialeService.getFiliale().subscribe(data => {
      this.listFiliales = data;
    });
  }

  saveLicence(licence: LicenceModel){}

}
