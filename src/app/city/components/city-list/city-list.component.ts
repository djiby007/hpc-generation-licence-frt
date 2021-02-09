import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CityModel} from '../../models/city.model';
import {CityService} from '../../services/city.service';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {MatTableDataSource} from "@angular/material/table";
import {CountryModel} from "../../../country/models/country.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CountryCreateComponent} from "../../../country/components/country-create/country-create.component";
import {CityCreateComponent} from "../city-create/city-create.component";
import {CountryEditComponent} from "../../../country/components/country-edit/country-edit.component";
import {CityEditComponent} from "../city-edit/city-edit.component";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  listCity: MatTableDataSource<CityModel>;
  cityForm: FormGroup;
  searchForm: FormGroup;
  listImportCity: CityModel[] = [];
  header = true;
  delete = false;
  submitted = false;
  test: boolean;
  successMessage: string;
  editCityUrl = '/city/edit/';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Columns: string[] = [  'status', 'nom', 'code', 'Actions' ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private cityService: CityService,
    private ngxCsvParser: NgxCsvParser,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,) { }

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

  getAllCity(){
    this.cityService.getCity().subscribe(value => {
      this.listCity = new MatTableDataSource<CityModel>(value.data);
      this.listCity.sort = this.sort;
      this.listCity.paginator = this.paginator;
    });
  }

  onAddCity() {
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.panelClass = ['background-dialog'];
    this.dialog.open(CityCreateComponent, dialogOption);
    this.dialog.afterAllClosed.subscribe(()=>{
      this.getAllCity();
    });
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

  applyFilterCity(filterValue: string) {
    this.listCity.filter = filterValue.trim().toLocaleLowerCase();
  }

  onEditCity(city: CityModel){
    //this.applicationService.deleteApplication(application);
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.id = city.id + '';
    this.dialog.open(CityEditComponent, dialogOption);
    this.dialog.afterAllClosed.subscribe(()=>{
      this.getAllCity();
    });
  }

  onDeleteCity(city: CityModel){
    this.cityService.deleteCity(city).subscribe(data=>{
      if (data.success === true){
        this.snackbar.open(data.message, '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar']
        });
        this.getAllCity();
      } else {
        this.snackbar.open(data.message.toString(), '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar']
        });
      }
    });
  }
}
