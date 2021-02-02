import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CountryService} from '../../services/country.service';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryModel} from '../../models/country.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  listCountry: CountryModel[];
  countryForm: FormGroup;
  searchForm: FormGroup;
  listImportCountry: CountryModel[] = [];
  header = true;
  delete = false;
  submitted = false;
  test: boolean;
  successMessage: string;
  editCountryUrl = '/country/edit/';
  constructor(private router: Router, private countryService: CountryService, private ngxCsvParser: NgxCsvParser) { }

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
      this.getAllCountry();
      return;
    }
    if ((code.trim()) === '') {
      this.Toast.fire({
        icon: 'warning',
        title: 'Rien à recherhcer!',
      });
      this.getAllCountry();
    }else{
      this.countryService.searchCountryKeyword(code)
        .subscribe(data => {
          this.listCountry = data;
          this.test = false;
        }, error => {
          console.log(error);
        });
    }
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }


  onEditCountry(country: CountryModel){
    this.router.navigateByUrl(this.editCountryUrl + (country.id));
  }

  onDeleteCountry(country: CountryModel){
   if (country.id) {
      Swal.fire({
        html: 'Voulez vous vraiment supprimer ce profile ?',
        showCancelButton: true,
        confirmButtonText: `Supprimer`,
        confirmButtonColor: '#138f46',
        cancelButtonColor: '#2d7de0',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.countryService.deleteCountry(country).subscribe( data => {
            // @ts-ignore
            this.successMessage = data.message;
            this.Toast.fire({
              icon: 'success',
              title: this.successMessage,
            });
            this.getAllCountry();
          }, err => {
            console.log(err);
          });
        }
      });
    }
  }


  get file(){
    return this.countryForm.get('file');
  }

  createForm(){
    this.countryForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }
  getAllCountry(){
    this.countryService.getCountry().subscribe(value => this.listCountry = value.data);
  }

  deleteCountry(country: CountryModel){
    this.countryService.deleteCountry(country).subscribe(value => this.getAllCountry());
  }

  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
      this.listImportCountry = result.map(value => {
        value.continent = {id: value.continent};
        return value;
      });
      console.log(this.listImportCountry);
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

  }

  onSubmit() {
      this.countryService.importCountry(this.listImportCountry).subscribe(
      (data) => {
        this.getAllCountry();
        this.listCountry = [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
