import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '../../services/country.service';
import {ContinentService} from '../../../continent/services/continent.service';
import {CountryModel} from '../../models/country.model';
import {ContinentModel} from '../../../continent/models/continent.model';
import {Location} from '@angular/common';
import {Status} from '../../../enum/status.enum';
import Swal from 'sweetalert2';
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {
  countryForm: FormGroup;
  country: CountryModel;
  submitted = false;
  listContinent: ContinentModel[];
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
    private dialogue: MatDialogRef<CountryEditComponent>,
    private activatedRoute: ActivatedRoute,
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
    this.findCountry(+this.dialogue.id);
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
    this.submitted = true;
    const country: CountryModel = {
      id: this.country.id,
      caption: this.caption.value,
      code: '',
      status: this.status.value as Status,
      continent: {id: this.continent.value, code: '', caption: '' }
    };
    this.countryService.updateCountry(country)
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

  findCountry(id: number) {
    this.countryService.findCountry(id).subscribe(value => {
      this.country = value.data;
      this.caption.setValue(this.country.caption);
      this.continent.setValue(this.country.continent.id);
      this.status.setValue(this.country.status);
    });
  }

  OnClose(){this.dialogue.close(); }


}
