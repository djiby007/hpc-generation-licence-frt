import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CountryService} from '../../../country/services/country.service';
import {CountryModel} from '../../../country/models/country.model';
import {CityService} from '../../services/city.service';
import {CityModel} from '../../models/city.model';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.scss']
})
export class CityCreateComponent implements OnInit {

  cityForm: FormGroup;
  listCountry: CountryModel[];
  submitted = false;
  hasError = false;
  message = '';
  successApiMessage: string;
  errorApiMessage: string;
  constructor(
      private router: Router,
      private dialogue: MatDialogRef<CityCreateComponent>,
      private countryService: CountryService,
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
    this.getAllCountry();
    this.createForm();
  }

  get caption(){
    return this.cityForm.get('caption');
  }

  get status(){
    return this.cityForm.get('status');
  }

  get country(){
    return this.cityForm.get('country');
  }


  getAllCountry(){
    this.countryService.getCountry().subscribe(value => this.listCountry = value.data);
  }

  createForm(){
    this.cityForm = new FormGroup({
      caption: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      country: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;
    // @ts-ignore
    const city: CityModel = {caption: this.caption.value, status: this.status.value, country: {id: this.country.value}};
    this.cityService.addCity(city).subscribe(
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
          this.router.navigateByUrl('/city');
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
