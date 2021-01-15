import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {CompanyModel} from '../../models/company.model';
import {CityModel} from '../../../city/models/city.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService, private ngxCsvParser: NgxCsvParser) { }

  get code(){
    return this.searchForm.get('code');
  }

  get file(){
    return this.companyForm.get('file');
  }

  listCompany: CompanyModel[];
  companyForm: FormGroup;
  searchForm: FormGroup;
  listImportCompany: CompanyModel[] = [];
  header = true;
  delete = false;
  submitted = false;
  test: boolean;
  successMessage: string;
  editCompanyUrl = '/company/edit/';

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
    this.getAllCompany();
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

  onSearch(){
    const code = this.code.value;
    this.submitted = true;
    if (this.searchForm.invalid) {
      this.getAllCompany();
      return;
    }
    if ((code.trim()) === '') {
      this.Toast.fire({
        icon: 'warning',
        title: 'Rien à recherhcer!',
      });
      this.getAllCompany();
    }else{
      this.companyService.searchCompanyKeyword(code)
        .subscribe(data => {
          this.listCompany = data;
          this.test = false;
        }, error => {
          console.log(error);
        });
    }
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }


  onEditCompany(company: CompanyModel){
    this.router.navigateByUrl(this.editCompanyUrl + (company.id));
  }

  onDeleteCompany(company: CompanyModel){
    if (company.id) {
      Swal.fire({
        html: 'Voulez vous vraiment supprimer cette société ?',
        showCancelButton: true,
        confirmButtonText: `Supprimer`,
        confirmButtonColor: '#138f46',
        cancelButtonColor: '#2d7de0',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.companyService.deleteCompany(company).subscribe( data => {
              // @ts-ignore
              this.successMessage = data.message;
              this.Toast.fire({
                icon: 'success',
                title: this.successMessage,
              });
              this.getAllCompany();
            }, err => {
              console.log(err);
            });
        }
      });
    }
  }

  getAllCompany(){
    this.companyService.getCompany().subscribe(value => this.listCompany = value.data);
  }

  createForm(){
    this.companyForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }

  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
      this.listImportCompany = result.map(value => {
        value.city = {id: value.city};
        return value;
      });
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

  }

  onSubmit() {
    this.companyService.importCompany(this.listImportCompany).subscribe(
      (data) => {
        this.getAllCompany();
        this.listImportCompany = [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}