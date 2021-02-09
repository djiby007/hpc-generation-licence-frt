import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryModel} from '../../../country/models/country.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '../../../country/services/country.service';
import {CityService} from '../../services/city.service';
import {CityModel} from '../../models/city.model';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

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
  successApiMessage: string;
  errorApiMessage: string;
  Status = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private router: Router,
              private snackbar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private countryService: CountryService,
              private cityService: CityService,
              private dialogue: MatDialogRef<CityEditComponent>,
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
    this.createForm();
    this.findContinent(+this.dialogue.id);
    this.getAllCountry();
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

    this.cityService.updateCity(city)
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


  OnClose(){this.dialogue.close(); }

}
