import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CityService} from '../../../city/services/city.service';
import {CompanyService} from '../../services/company.service';
import {CityModel} from '../../../city/models/city.model';
import {CompanyModel} from '../../models/company.model';
import {Location} from '@angular/common';
import {TypeGeneriqueLogin} from '../../../enum/typeGeneriqueLogin.enum';
import {Status} from '../../../enum/status.enum';
import Swal from 'sweetalert2';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  companyForm: FormGroup;
  submitted = false;
  hasError = false;
  message = '';
  successApiMessage: string;
  errorApiMessage: string;
  constructor(
    private router: Router,
    private dialogue: MatDialogRef<CompanyCreateComponent>,
    private companyService: CompanyService,
    private location: Location
  ) { }
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

  get status(){
    return this.companyForm.get('status');
  }

  createForm(){
    this.companyForm = new FormGroup({
      socialReason: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      adress: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, /*Validators.pattern('(?=.*\\d)')*/]),
      webSite: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;
    // @ts-ignore
    const company: CompanyModel = {
      socialReason: this.socialReason.value,
      email: this.email.value,
      adress: this.adress.value,
      phone: this.phone.value,
      webSite: this.webSite.value,
      status: this.status.value,
    };

    this.companyService.addCompany(company).subscribe(
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


  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }


  OnClose(){this.dialogue.close(); }

}
