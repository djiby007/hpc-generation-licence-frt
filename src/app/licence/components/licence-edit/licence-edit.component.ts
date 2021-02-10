import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OptionModel} from '../../../option/models/option.model';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {OptionService} from '../../../option/services/option.service';
import {LicenceService} from '../../services/licence.service';
import {FilialeService} from '../../../filiale/services/filiale.service';
import {ApplicationService} from '../../../application/service/application.service';
import {FilialeModel} from '../../../filiale/models/filiale.model';
import {ApplicationModel} from '../../../application/models/application.model';
import {DetailsFacturationModel} from '../../models/detailsFacturation.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LicenceModel} from '../../models/licence.model';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {LicenceDtoModel} from '../../models/licenceDto.model';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-licence-edit',
  templateUrl: './licence-edit.component.html',
  styleUrls: ['./licence-edit.component.css']
})
export class LicenceEditComponent implements OnInit {
  updateLicenceForm: FormGroup;
  successApiMessage: string;
  errorApiMessage: string;
  listOptions: OptionModel[];
  listFiliales: FilialeModel[];
  listApplications: ApplicationModel[];
  detailsFacture: DetailsFacturationModel;
  detailsFactureList: MatTableDataSource<DetailsFacturationModel>;
  currentApplication: ApplicationModel;
  currentOption: OptionModel;
  currentFiliale: FilialeModel;
  selectedUnite = 'jour';
  licence: LicenceModel;
  licenceDto: LicenceDtoModel;
  dateFin: Date;
  newDuree: number;
  Columns: string[] = [ 'Option', 'Nombre', 'Montant', 'Actions' ];
  detailsForm: FormGroup;
  hasError = false;
  message = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private licenceService: LicenceService,
              private filialeService: FilialeService,
              private applicationService: ApplicationService,
              private optionService: OptionService) {}
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
    this.findLicence(+this.activatedRoute.snapshot.paramMap.get('id'));
    this.createForm();
    this.initialiserDetailsForm();
    this.getApplicationList();
    this.getFilialeList();
    this.getOptionList();
  }

  createForm(){
    this.updateLicenceForm = new FormGroup({
      application: new FormControl('', Validators.required),
      filiale: new FormControl('', Validators.required),
      montant: new FormControl({value: 0, disabled: true}),
      description: new FormControl('', Validators.required),
      dateDebut: new FormControl('', Validators.required),
      duree: new FormControl('', Validators.required)
    });
  }

  initialiserDetailsForm(){
    this.detailsForm = new FormGroup({
      optionVente: new FormControl('', Validators.required),
      nombre:  new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required)
    });
  }

  addDetailsForm(){
    const details = this.detailsForm.value;
    details.optionVente = this.currentOption;
    this.detailsFactureList.data.push(details);
    this.detailsFactureList._updateChangeSubscription();
    this.initialiserDetailsForm();
  }

  get application(){
    return this.updateLicenceForm.get('application');
  }
  get filiale(){
    return this.updateLicenceForm.get('filiale');
  }
  get description(){
    return this.updateLicenceForm.get('description');
  }
  get dateDebut(){
    return this.updateLicenceForm.get('dateDebut');
  }
  get duree(){
    return this.updateLicenceForm.get('duree');
  }

  get montant(){
    return this.updateLicenceForm.get('montant');
  }

  findLicence(id: number) {
    this.licenceService.findLicence(id).subscribe(value => {
      this.licenceDto = value.data;
      console.log(this.licenceDto);
      this.application.setValue(this.licenceDto.licence.application.id);
      this.montant.setValue(this.licenceDto.licence.application.prix);
      this.filiale.setValue(this.licenceDto.licence.filiale.id);
      this.description.setValue(this.licenceDto.licence.description);
      this.dateDebut.setValue(this.licenceDto.licence.dateDebut);
      this.duree.setValue(this.licenceDto.licence.duree);
      this.detailsFactureList = new MatTableDataSource<DetailsFacturationModel>(this.licenceDto.detailsFacturationList);
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

  getApplicationSelected(obj){
    this.currentApplication = this.listApplications.find(element => element.id === obj.value);
    this.updateLicenceForm.patchValue({montant: this.currentApplication.prix});
  }

  getOptionSelected(obj){
    this.currentOption = this.listOptions.find(option => option.id === obj.value);
  }
  getFilialeSelected(obj){
    this.currentFiliale = this.listFiliales.find(filiale => filiale.id === obj.value);
  }

  getSelectedUnite(obj){
    this.selectedUnite = obj.value;
  }

  removeDetails(index) {
    this.detailsFactureList.data.splice(this.detailsFactureList.data.indexOf(index), 1);
    this.detailsFactureList._updateChangeSubscription();
  }

  updateLicence() {
    const duree = this.updateLicenceForm.get('duree').value;
    /// console.log(this.selectedUnite);
    if (this.selectedUnite === 'jour') {
      this.dateFin = moment(this.updateLicenceForm.get('dateDebut').value).add(duree, 'days').toDate();
    }
    if (this.selectedUnite === 'mois'){
      this.dateFin = moment(this.updateLicenceForm.get('dateDebut').value).add(duree, 'months').toDate();
    }
    if (this.selectedUnite === 'an'){
      this.dateFin = moment(this.updateLicenceForm.get('dateDebut').value).add(duree, 'years').toDate();
    }
    const a = moment(this.dateFin);
    const b = moment(this.updateLicenceForm.get('dateDebut').value);
    this.newDuree= a.diff(b, 'days');
    this.currentFiliale = this.listFiliales.find(filiale => filiale.id === this.updateLicenceForm.get('filiale').value);
    this.currentApplication = this.listApplications.find(appli => appli.id === this.updateLicenceForm.get('application').value);
    this.licenceDto = {
      licence: {
        id: this.licenceDto.licence.id,
        application: this.currentApplication,
        filiale: this.currentFiliale,
        montant: this.montant.value,
        description: this.description.value,
        dateDebut: this.dateDebut.value,
        cle: this.licenceDto.licence.cle,
        dateFin: this.dateFin,
        duree: this.newDuree,
        status: this.licenceDto.licence.status
        },
      detailsFacturationList: this.detailsFactureList.data

    };
    console.log(this.licenceDto);
    this.licenceService.updateLicence(this.licenceDto.licence.id, this.licenceDto).subscribe( value => {
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
    }, error => {
      console.log(error.message);
    });
  }

}
