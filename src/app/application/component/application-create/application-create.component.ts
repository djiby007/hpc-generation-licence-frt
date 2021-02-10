import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Status} from "../../../enum/status.enum";
import {ApplicationService} from "../../service/application.service";
import {ApplicationModel} from "../../models/application.model";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import Swal from "sweetalert2";

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {
  applicationForm: FormGroup;
  submitted = false;
  hasError = false;
  Status = false;
  successApiMessage: string;
  errorApiMessage: string;
  message = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
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

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private dialogue: MatDialogRef<ApplicationCreateComponent>,
    private applicationService: ApplicationService,
    private location: Location) { }

  ngOnInit(): void {
    this.createForm();
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
          this.Toast.fire({
            icon: 'success',
            title: data.message,
          });
          this.OnClose();
        } else {
          this.Toast.fire({
            icon: 'error',
            title: data.message,
          });
        }
      }, error => {
        console.log(error);
      });
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }


  OnClose(){this.dialogue.close(); }

}
