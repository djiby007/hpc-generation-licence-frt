import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CityModel} from '../../models/city.model';
import {CityService} from '../../services/city.service';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  listCity: CityModel[];
  cityForm: FormGroup;
  searchForm: FormGroup;
  listImportCity: CityModel[] = [];
  header = true;
  delete = false;
  submitted = false;
  test: boolean;
  successMessage: string;
  editCityUrl = '/city/edit/';

  constructor(private router: Router, private cityService: CityService, private ngxCsvParser: NgxCsvParser) { }

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
    this.getAllCity();
    this.createForm();
    this.createsearchForm();
  }

  createsearchForm(){
    this.searchForm = new FormGroup({
      code: new FormControl('', [
        Validators.required
      ])
    });
  }

  get code(){
    return this.searchForm.get('code');
  }

  onSearch(){
    const code = this.code.value;
    this.submitted = true;
    if (this.searchForm.invalid) {
      this.getAllCity();
      return;
    }
    if ((code.trim()) === '') {
      this.Toast.fire({
        icon: 'warning',
        title: 'Rien à recherhcer!',
      });
      this.getAllCity();
    }else{
      this.cityService.searchCityKeyword(code)
        .subscribe(data => {
          this.listCity = data;
          this.test = false;
        }, error => {
          console.log(error);
        });
    }
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }


  onEditCity(city: CityModel){
    this.router.navigateByUrl(this.editCityUrl + (city.id));
  }

  onDeleteCity(city: CityModel){
    if (city.id) {
      Swal.fire({
        html: 'Voulez vous vraiment supprimer cette ville ?',
        showCancelButton: true,
        confirmButtonText: `Supprimer`,
        confirmButtonColor: '#138f46',
        cancelButtonColor: '#2d7de0',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.cityService.deleteCity(city).subscribe( data => {
            // @ts-ignore
            this.successMessage = data.message;
            this.Toast.fire({
              icon: 'success',
              title: this.successMessage,
            });
            this.getAllCity();
          }, err => {
            console.log(err);
          });
        }
      });
    }
  }

  getAllCity(){
    this.cityService.getCity().subscribe(value => this.listCity = value.data);
  }

  get file(){
    return this.cityForm.get('file');
  }

  createForm(){
    this.cityForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }

  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
      this.listImportCity = result.map(value => {
        value.country = {id: value.country};
        return value;
      });
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

  }

  onSubmit() {
    this.cityService.importCity(this.listImportCity).subscribe(
      (data) => {
        this.getAllCity();
        this.listImportCity = [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
