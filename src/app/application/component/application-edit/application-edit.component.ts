import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {ApplicationService} from "../../service/application.service";
import {Location} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicationCreateComponent} from "../application-create/application-create.component";
import {Status} from "../../../enum/status.enum";
import {ApplicationModel} from "../../models/application.model";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent implements OnInit {
  applicationForm: FormGroup;
  submitted = false;
  hasError = false;
  application: ApplicationModel;
  successApiMessage: string;
  errorApiMessage: string;
  message = '';
  Status = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(  private router: Router,
                private snackbar: MatSnackBar,
                private dialogue: MatDialogRef<ApplicationEditComponent>,
                private applicationService: ApplicationService,
                private location: Location) { }

  ngOnInit(): void {
    this.createForm();
    this.findApplication(+this.dialogue.id);
  }

  goBack() {
    this.location.back();
  }

  get nom(){
    return this.applicationForm.get('nom');
  }

  get prix(){
    return this.applicationForm.get('prix');
  }

  get description(){
    return this.applicationForm.get('description');
  }

  get nombreJour(){
    return this.applicationForm.get('nombreJour');
  }

  get status(){
    return this.applicationForm.get('status');
  }

  createForm(){
    this.applicationForm = new FormGroup({
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      description: new FormControl('', Validators.required),
      prix: new FormControl(0.0, Validators.required),
      nombreJour: new FormControl(0, Validators.required),
      status: new FormControl(Status.Actif, Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    // @ts-ignore
    const applicationModel: ApplicationModel = {
      nom: this.nom.value,
      prix: this.prix.value,
      description: this.description.value,
      nombreJour: this.nombreJour.value,
      status: this.status.value as Status,
    }

    this.applicationService.addApplication(applicationModel)
      .subscribe(data => {
        this.successApiMessage  = data.message;
        this.Status = Boolean(data.success);
        if (this.Status === true){
          this.snackbar.open(this.successApiMessage.toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        } else {
          this.errorApiMessage = data.message;
          this.snackbar.open(this.successApiMessage.toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        }
      }, error => {
        console.log(error);
      });
  }

  findApplication(id: number) {
    this.applicationService.findApplication(id).subscribe(value => {
      this.application = value.data;
      this.nom.setValue(this.application.nom);
      this.description.setValue(this.application.description);
      this.prix.setValue(this.application.prix);
      this.nombreJour.setValue(this.application.nombreJour);
      this.status.setValue(this.application.status);
    });
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }


  OnClose(){this.dialogue.close(); }
}
