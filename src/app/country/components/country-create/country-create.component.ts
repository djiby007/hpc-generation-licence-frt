import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CountryService} from '../../services/country.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContinentService} from '../../../continent/services/continent.service';
import {ContinentModel} from '../../../continent/models/continent.model';
import {Location} from '@angular/common';
import {Status} from '../../../enum/status.enum';
import Swal from 'sweetalert2';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrls: ['./country-create.component.scss']
})
export class CountryCreateComponent implements OnInit {
  countryForm: FormGroup;
  listContinent: ContinentModel[];
  submitted = false;
  hasError = false;
  message = '';
  successApiMessage: string;
  errorApiMessage: string;

  constructor(
    private router: Router,
    private dialogue: MatDialogRef<CountryCreateComponent>,
    private countryService: CountryService,
    private continentService: ContinentService,
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
    this.getAllContinent();
    this.createForm();
  }

  goBack() {
    this.location.back();
  }

  get caption(){
    return this.countryForm.get('caption');
  }

  get continent(){
    return this.countryForm.get('continent');
  }

  get status(){
    return this.countryForm.get('status');
  }

  getAllContinent(){
    this.continentService.getContinent().subscribe(value => this.listContinent = value.data);
  }

  createForm(){
    this.countryForm = new FormGroup({
      caption: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      continent: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  onSubmit() {

    console.log(this.continent.value);
    this.submitted = true;
    // @ts-ignore
    const country: Country = {
      caption: this.caption.value,
      status: this.status.value as Status,
      continent: {id: this.continent.value}};

    this.countryService.addCountry(country).subscribe(
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
          this.router.navigateByUrl('/country');
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
