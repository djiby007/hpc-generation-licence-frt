import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ContinentService} from '../../services/continent.service';
import {ContinentModel} from '../../models/continent.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {
    this.getAllContinent();
    this.createForm();
    this.createsearchForm();
    this.dataSource.paginator = this.paginator;
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
