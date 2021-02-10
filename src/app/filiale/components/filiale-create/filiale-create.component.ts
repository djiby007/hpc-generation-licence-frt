import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../../company/services/company.service";
import {CompanyModel} from "../../../company/models/company.model";
import {CityService} from "../../../city/services/city.service";
import {CityModel} from "../../../city/models/city.model";
import Swal from "sweetalert2";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Status} from "../../../enum/status.enum";
import {TypeGeneriqueLogin} from "../../../enum/typeGeneriqueLogin.enum";
import {FilialeModel} from "../../models/filiale.model";
import {FilialeService} from "../../services/filiale.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-filiale-create',
  templateUrl: './filiale-create.component.html',
  styleUrls: ['./filiale-create.component.css']
})
export class FilialeCreateComponent implements OnInit {

  filialeForm: FormGroup;
  listCity: CityModel[];
  listCompany: CompanyModel[];
  submitted = false;
  hasError = false;
  message = '';
  successApiMessage: string;
  errorApiMessage: string;
  Status = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private companyService: CompanyService,
    private cityService: CityService,
    private dialogue: MatDialogRef<FilialeCreateComponent>,
    private location: Location, private filialeService: FilialeService) { }
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
    this.getAllCompany();
    this.getAllCity();
    this.createForm();
  }

  getAllCompany(){
    this.companyService.getCompany().subscribe(value => {
      this.listCompany = value.data
    });
  }

  getAllCity(){
    this.cityService.getCity().subscribe(value => this.listCity = value.data);
  }

  createForm(){
    this.filialeForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      adress: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, /*Validators.pattern('(?=.*\\d)')*/]),
      webSite: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      typeGeneriqueLogin: new FormControl('', Validators.required)
    });
  }

  goBack() {
    this.location.back();
  }

  get caption(){
    return this.filialeForm.get('caption');
  }

  get email(){
    return this.filialeForm.get('email');
  }

  get adress(){
    return this.filialeForm.get('adress');
  }

  get phone(){
    return this.filialeForm.get('phone');
  }

  get webSite(){
    return this.filialeForm.get('webSite');
  }

  get city(){
    return this.filialeForm.get('city');
  }

  get company(){
    return this.filialeForm.get('company');
  }

  get typeGeneriqueLogin(){
    return this.filialeForm.get('typeGeneriqueLogin');
  }

  get status(){
    return this.filialeForm.get('status');
  }

  onSubmit() {
    this.submitted = true;
    // @ts-ignore
    const filiale: FilialeModel = {
      caption: this.caption.value,
      email: this.email.value,
      adress: this.adress.value,
      phone: this.phone.value,
      webSite: this.webSite.value,
      status: this.status.value,
      company: {id: this.company.value, socialReason: '', adress: '', email: '', phone: '', status: Status.Actif, webSite:'', code: ''},
      city: {id: this.city.value, status: Status.Actif, caption: '', code: '', country: null},
      typeGeneriqueLogin: this.typeGeneriqueLogin.value as TypeGeneriqueLogin
    };

    this.filialeService.addFiliale(filiale)
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
