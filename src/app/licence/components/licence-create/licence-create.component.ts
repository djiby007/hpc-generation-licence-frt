import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LicenceService} from '../../services/licence.service';
import {OptionService} from '../../../option/services/option.service';
import {OptionModel} from '../../../option/models/option.model';
import {DetailsFacturationModel} from '../../models/detailsFacturation.model';
import {FilialeService} from '../../../filiale/services/filiale.service';
import {FilialeModel} from '../../../filiale/models/filiale.model';
import {ApplicationModel} from '../../../application/models/application.model';
import {ApplicationService} from '../../../application/service/application.service';
import {LicenceDtoModel} from '../../models/licenceDto.model';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {LicenceModel} from '../../models/licence.model';

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
  listApplications: ApplicationModel[];
  detailsFacture: DetailsFacturationModel;
  detailsFactureList: DetailsFacturationModel[];
  currentApplication: ApplicationModel;
  currentFiliale: FilialeModel;
  currentOption: OptionModel;
  licence: LicenceModel;
  hasError = false;
  message = '';
  value = this.formBuilder.group({
    nombre: ['', Validators.required],
    montant: ['', Validators.required],
    optionVente: ['', Validators.required]
  });
  selectedUnite = 'jour';
  constructor(private router: Router,
              private licenceService: LicenceService,
              private optionService: OptionService,
              private filialeService: FilialeService,
              private applicationService: ApplicationService,
              private formBuilder: FormBuilder) { }
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
      montant: new FormControl({value: 0, disabled: true}),
      description: new FormControl('', Validators.required),
      dateDebut: new FormControl('', Validators.required),
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
      optionVente: ['', Validators.required]
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
    this.licence = this.licenceForm.value;
    this.licence.montant = this.licence.application.prix;
    const duree = this.licenceForm.get('duree').value;
    /// console.log(this.selectedUnite);
    if (this.selectedUnite === 'jour'){
      this.licence.dateFin = moment(this.licenceForm.get('dateDebut').value).add(duree, 'days').toDate();
    }
    if (this.selectedUnite === 'mois'){
      this.licence.dateFin = moment(this.licenceForm.get('dateDebut').value).add(duree, 'months').toDate();
    }
    if (this.selectedUnite === 'an'){
      this.licence.dateFin = moment(this.licenceForm.get('dateDebut').value).add(duree, 'years').toDate();
    }
    this.resumeForm = new FormGroup({
      application: new FormControl({value: this.licenceForm.get('application').value.nom, disabled: true}),
      filiale: new FormControl({value: this.licenceForm.get('filiale').value.caption, disabled: true}),
      montant: new FormControl({value: this.licenceForm.get('application').value.prix, disabled: true}),
      description: new FormControl({value: this.licenceForm.get('description').value, disabled: true}),
      dateDebut: new FormControl({value: this.licenceForm.get('dateDebut').value, disabled: true}),
      dateFin: new FormControl({value: this.licence.dateFin, disabled: true}),
      duree: new FormControl({value: this.licenceForm.get('duree').value, disabled: true})
    });
  }

  getOptionList(){
    this.optionService.getOptionList().subscribe(data => {
      this.listOptions = data;
    });
  }

  getApplicationList(){
    this.applicationService.getApplication().subscribe(value => {
      this.listApplications = value.data;
    });
  }

  getFilialeList(){
    this.filialeService.getFiliale().subscribe(value => {
      this.listFiliales = value.data;
    });
  }

  getFilialeSelected(obj){
    this.currentFiliale = obj.value;
  }

  getApplicationSelected(obj){
    this.currentApplication = obj.value;
    this.licenceForm.patchValue({montant: this.currentApplication.prix});
  }

  getOptionSelected(obj){
    this.currentOption = obj.value;
  }

  getSelectedUnite(obj){
    this.selectedUnite = obj.value;
  }

  saveLicence(){
    const a = moment(this.licence.dateFin);
    const b = moment(this.licence.dateDebut);
    this.licence.duree = a.diff(b, 'days');
    const licenceDto: LicenceDtoModel = {
      licence: this.licence,
      detailsFacturationList: this.detailsFactureList
    };
    this.licenceService.addLicence(licenceDto).subscribe(
      (value) => {
        if (value.data === null){
          this.hasError = true;
          this.message = value.message;
        }
        else {
          this.Toast.fire({
            icon: 'success',
            title: value.message,
          });
          this.router.navigateByUrl('/licence');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
