import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContinentService} from '../../services/continent.service';
import {ContinentModel} from '../../models/continent.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-continent-list',
  templateUrl: './continent-list.component.html',
  styleUrls: ['./continent-list.component.scss']
})
export class ContinentListComponent implements OnInit {
  listContinent: ContinentModel[];
  continentForm: FormGroup;
  searchForm: FormGroup;
  listImportContinent: ContinentModel[] = [];
  header = true;
  delete = false;
  submitted = false;
  test: boolean;
  successMessage: string;
  editContinentUrl = '/continent/edit/';
  constructor(
    private router: Router,
    private continentService: ContinentService,
    private ngxCsvParser: NgxCsvParser,
    private http: HttpClient) {
   /*
    http.get('http://localhost:8080/user/token').subscribe(data => {
      console.log(data);
      const token = data['token'];
      http.get('http://localhost:8080', {headers : new HttpHeaders().set('X-Auth-Token', token)})
        .subscribe(response => console.log(response));
    }, () => {});*/
  }

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
      this.getAllContinent();
      return;
    }
    if ((code.trim()) === '') {
      this.Toast.fire({
        icon: 'warning',
        title: 'Rien à recherhcer!',
      });
      this.getAllContinent();
    }else{
      console.log(code);
      this.continentService.searchContinentKeyword(code)
        .subscribe(data => {
          this.listContinent = data;
          this.test = false;
        }, error => {
          console.log(error);
        });
    }
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }


  onEditContinent(continent: ContinentModel){
    this.router.navigateByUrl(this.editContinentUrl + (continent.id));
  }

  onDeleteContinent(continent: ContinentModel){
    if (continent.id) {
      Swal.fire({
        html: 'Voulez vous vraiment supprimer ce continent ?',
        showCancelButton: true,
        confirmButtonText: `Supprimer`,
        confirmButtonColor: '#138f46',
        cancelButtonColor: '#2d7de0',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.continentService.deleteContinent(continent)
            .subscribe( data => {
              // @ts-ignore
              this.successMessage = data.message;
              this.Toast.fire({
                icon: 'success',
                title: this.successMessage,
              });
              this.getAllContinent();
            }, err => {
              console.log(err);
            });
        }
      });
    }
  }

  getAllContinent(){
    this.continentService.getContinent().subscribe(value => {
      this.listContinent = value.data;
    });
  }

  get file(){
    return this.continentForm.get('file');
  }

  createForm(){
    this.continentForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }

  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<ContinentModel>) => {
        this.listImportContinent = result;
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

  }

  onSubmit() {
       this.continentService.importContinent(this.listImportContinent).subscribe(
      (data) => {
        this.getAllContinent();
        this.listImportContinent = [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
