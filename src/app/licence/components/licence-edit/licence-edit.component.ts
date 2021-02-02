import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OptionModel} from '../../../option/models/option.model';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {OptionService} from '../../../option/services/option.service';
import {LicenceService} from '../../services/licence.service';
import {FilialeService} from '../../../filiale/services/filiale.service';
import {ApplicationService} from '../../../application/service/application.service';
import {FilialeModel} from '../../../filiale/models/filiale.model';
import {ApplicationModel} from '../../../application/models/application.model';
import {DetailsFacturationModel} from '../../models/detailsFacturation.model';
import {ActivatedRoute} from '@angular/router';
import {LicenceModel} from '../../models/licence.model';

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
  detailsFactureList: DetailsFacturationModel[];
  currentApplication: ApplicationModel;
  currentFiliale: FilialeModel;
  currentOption: OptionModel;
  selectedUnite = 'jour';
  licence: LicenceModel;
  successStatus: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private activatedRoute: ActivatedRoute,
              private licenceService: LicenceService,
              private filialeService: FilialeService,
              private applicationService: ApplicationService,
              private optionService: OptionService,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.findLicence(+this.activatedRoute.snapshot.paramMap.get('id'));
    this.createForm();
    this.getApplicationList();
    this.getFilialeList();
    this.getOptionList();
  }

  createForm(){
    this.updateLicenceForm = new FormGroup({
      application: new FormControl('', Validators.required),
      filiale: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dateDebut: new FormControl('', Validators.required),
      duree: new FormControl('', Validators.required)
    });
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

  findLicence(id: number) {
    this.licenceService.findLicence(id).subscribe(value => {
      this.licence = value.data;
      this.application.setValue(this.licence.application.id);
      this.filiale.setValue(this.licence.filiale.id);
      this.description.setValue(this.licence.description);
      this.dateDebut.setValue(this.licence.dateDebut);
      this.duree.setValue(this.licence.duree);
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
    this.updateLicenceForm.patchValue({montant: this.currentApplication.prix});
  }

  getOptionSelected(obj){
    this.currentOption = obj.value;
  }

  getSelectedUnite(obj){
    this.selectedUnite = obj.value;
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
