import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CityModel} from "../../../city/models/city.model";
import {CompanyModel} from "../../../company/models/company.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../../company/services/company.service";
import {CityService} from "../../../city/services/city.service";
import {Location} from "@angular/common";
import {FilialeService} from "../../services/filiale.service";
import Swal from "sweetalert2";
import {FilialeModel} from "../../models/filiale.model";
import {Status} from "../../../enum/status.enum";
import {TypeGeneriqueLogin} from "../../../enum/typeGeneriqueLogin.enum";

@Component({
  selector: 'app-filiale-edit',
  templateUrl: './filiale-edit.component.html',
  styleUrls: ['./filiale-edit.component.css']
})
export class FilialeEditComponent implements OnInit {

  filialeForm: FormGroup;
  listCity: CityModel[];
  filiale: FilialeModel;
  listCompany: CompanyModel[];
  submitted = false;
  hasError = false;
  message = '';
  constructor(
    private router: Router,
    private companyService: CompanyService,
    private cityService: CityService,
    private location: Location,
    private filialeService: FilialeService,
    private activatedRoute: ActivatedRoute,) { }
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
    this.findFiliale(+this.activatedRoute.snapshot.paramMap.get('id'));
    this.getAllCompany();
    this.getAllCity();
    this.createForm();
  }

  findFiliale(id: number) {
    this.filialeService.findFiliale(id).subscribe(value => {
      this.filiale = value.data;
      this.caption.setValue(this.filiale.caption);
      this.email.setValue(this.filiale.email);
      this.adress.setValue(this.filiale.adress);
      this.phone.setValue(this.filiale.phone);
      this.webSite.setValue(this.filiale.webSite);
      this.status.setValue(this.filiale.status);
      this.city.setValue(this.filiale.city.id);
      this.company.setValue(this.filiale.company.id);
      this.typeGeneriqueLogin.setValue(this.filiale.typeGeneriqueLogin);
    });
  }

  getAllCompany(){
    this.companyService.getCompany().subscribe(value => {
      console.log(value);
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
      id: this.filiale.id,
      caption: this.caption.value,
      email: this.email.value,
      adress: this.adress.value,
      phone: this.phone.value,
      webSite: this.webSite.value,
      status: this.status.value,
      company: {id: this.company.value, socialReason: '', adress: '', city: null, email: '', phone: '', status: Status.Actif, typeGeneriqueLogin: TypeGeneriqueLogin.BeforeEmail, webSite:'', code: ''},
      city: {id: this.city.value, status: Status.Actif, caption: '', code: '', country: null},
      typeGeneriqueLogin: this.typeGeneriqueLogin.value as TypeGeneriqueLogin
    };

    this.filialeService.updateFiliale(filiale).subscribe(
      (data) => {
        if (data.data === null){
          this.hasError = true;
          this.message = data.message;
        }
        else {
          this.Toast.fire({
            icon: 'success',
            title: data.message,
          });
          this.router.navigateByUrl('/filiale');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }
}
