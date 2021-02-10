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
import {ActivatedRoute} from '@angular/router';
import {LicenceModel} from '../../models/licence.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DetailsFacturationEditComponent} from '../details-facturation-edit/details-facturation-edit.component';
import {OptionEditComponent} from '../../../option/component/option-edit/option-edit.component';
import {OptionCreateComponent} from '../../../option/component/option-create/option-create.component';
import {MatTableDataSource} from '@angular/material/table';
import {LicenceDtoModel} from '../../models/licenceDto.model';

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
  selectedUnite = 'jour';
  licence: LicenceModel;
  licenceDto: LicenceDtoModel;
  Columns: string[] = [ 'Option', 'Nombre', 'Montant', 'Actions' ];
  detailsForm: FormGroup;
  value = this.formBuilder.group({
    nombre: ['', Validators.required],
    montant: ['', Validators.required],
    optionVente: ['', Validators.required]
  });
  details: FormArray;
  successStatus: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private licenceService: LicenceService,
              private filialeService: FilialeService,
              private applicationService: ApplicationService,
              private optionService: OptionService,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.findLicence(+this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.detailsFactureList);
    this.createForm();
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

  editDetails(Details: DetailsFacturationModel){
    /*this.licenceService.currentDetail = Details;
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    this.dialog.open(DetailsFacturationEditComponent, dialogOption);*/
  }

  addDetails() {
    /*const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.panelClass = ['background-dialog'];
    this.dialog.open(OptionCreateComponent, dialogOption);*/
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
      this.application.setValue(this.licenceDto.licence.application.id);
      this.montant.setValue(this.licenceDto.licence.application.prix);
      this.filiale.setValue(this.licenceDto.licence.filiale.id);
      this.description.setValue(this.licenceDto.licence.description);
      this.dateDebut.setValue(this.licenceDto.licence.dateDebut);
      this.duree.setValue(this.licenceDto.licence.duree);
      this.detailsFactureList = new MatTableDataSource<DetailsFacturationModel>(this.licenceDto.detailsFacturationList);
    });
  }
/*
  findDetails(idLicence: number) {
    this.licenceService.findDetails(idLicence).subscribe(data => {
      this.detailsFactureList = new MatTableDataSource<DetailsFacturationModel>(data);
    });
  }*/

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
    this.currentOption = obj.value;
  }

  getSelectedUnite(obj){
    this.selectedUnite = obj.value;
  }

  removeGroup(index) {
    /*this.detailsFactureList.splice(index);*/
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  updateLicence() {
    /*const options = this.optionService.currentOption;
    const option: OptionModel = {id: options.id , code: options.code, success: options.success, message: options.message,
      caption: this.updateOptionForm.get('caption').value, status: this.updateOptionForm.get('status').value};
    this.optionService.updateOption(option.id, option).subscribe( data => {
      this.successApiMessage = data.message;
      this.snackbar.open(this.successApiMessage.toString(), '', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['green-snackbar']
      });
      this.OnClose();
    }, error => {
      console.log(error.message);
    });*/
  }

}
