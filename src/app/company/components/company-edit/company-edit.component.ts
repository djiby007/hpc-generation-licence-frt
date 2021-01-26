import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {CityService} from '../../../city/services/city.service';
import {CompanyModel} from '../../models/company.model';
import {CityModel} from '../../../city/models/city.model';
import {Location} from '@angular/common';
import {TypeGeneriqueLogin} from '../../../enum/typeGeneriqueLogin.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {


  companyForm: FormGroup;
  company: CompanyModel;
  listCity: CityModel[];
  submitted = false;
  hasError = false;
  message = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private cityService: CityService,
    private location: Location) { }

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
    this.findContinent(+this.activatedRoute.snapshot.paramMap.get('id'));
    this.getAllCity();
    this.createForm();
  }

  goBack() {
    this.location.back();
  }

  get socialReason(){
    return this.companyForm.get('socialReason');
  }

  get email(){
    return this.companyForm.get('email');
  }

  get adress(){
    return this.companyForm.get('adress');
  }

  get phone(){
    return this.companyForm.get('phone');
  }

  get webSite(){
    return this.companyForm.get('webSite');
  }

  get city(){
    return this.companyForm.get('city');
  }

  get typeGeneriqueLogin(){
    return this.companyForm.get('typeGeneriqueLogin');
  }

  get status(){
    return this.companyForm.get('status');
  }


  getAllCity(){
    this.cityService.getCity().subscribe(value => this.listCity = value.data);
  }

  createForm(){
    this.companyForm = new FormGroup({
      socialReason: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      adress: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      webSite: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      typeGeneriqueLogin: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    // @ts-ignore
    const company: Company = {
      id: this.company.id,
      socialReason: this.socialReason.value,
      email: this.email.value,
      adress: this.adress.value,
      phone: this.phone.value,
      webSite: this.webSite.value,
      status: this.status.value,
      city: {id: this.city.value},
      typeGeneriqueLogin: this.typeGeneriqueLogin.value as TypeGeneriqueLogin
    };

    this.companyService.updateCompany(company).subscribe(
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
          this.router.navigateByUrl('/company');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  findContinent(id: number) {
    this.companyService.findCompany(id).subscribe(value => {
      this.company = value.data;
      this.socialReason.setValue(this.company.socialReason);
      this.email.setValue(this.company.email);
      this.adress.setValue(this.company.adress);
      this.phone.setValue(this.company.phone);
      this.webSite.setValue(this.company.webSite);
      this.status.setValue(this.company.status);
      this.city.setValue(this.company.city.id);
      this.typeGeneriqueLogin.setValue(this.company.typeGeneriqueLogin);
    });
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }



}
