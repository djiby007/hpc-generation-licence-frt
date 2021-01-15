import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryModel} from '../../../country/models/country.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '../../../country/services/country.service';
import {CityService} from '../../services/city.service';
import {CityModel} from '../../models/city.model';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {


  cityForm: FormGroup;
  city: CityModel;
  listCountry: CountryModel[];
  submitted = false;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
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
    this.findContinent(+this.activatedRoute.snapshot.paramMap.get('id'));
    this.getAllCountry();
    this.createForm();
  }

  goBack() {
    this.location.back();
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
      country : new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    // @ts-ignore
    const city: CityModel = {id: this.city.id , caption: this.caption.value, status: this.status.value, country: {id: this.country.value}};

    this.cityService.updateCity(city).subscribe(
      (data) => {
        if (data.data === null){
          this.Toast.fire({
            icon: 'error',
            title: data.message,
          });
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


  findContinent(id: number) {
    this.cityService.findCity(id).subscribe(value => {
      this.city = value.data;
      this.caption.setValue(this.city.caption);
      this.country.setValue(this.city.country.id);
      this.status.setValue(this.city.status);
    });
  }

}
