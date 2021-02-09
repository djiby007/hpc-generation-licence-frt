import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CountryService} from '../../services/country.service';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryModel} from '../../models/country.model';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {CountryEditComponent} from "../country-edit/country-edit.component";
import {CountryCreateComponent} from "../country-create/country-create.component";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  listCountry: MatTableDataSource<CountryModel>;
  countryForm: FormGroup;
  searchForm: FormGroup;
  listImportCountry: CountryModel[] = [];
  header = true;
  delete = false;
  submitted = false;
  test: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Columns: string[] = [ 'status', 'nom', 'code', 'Actions' ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router,
              private countryService: CountryService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private ngxCsvParser: NgxCsvParser) { }

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
  }

  getAllCountry(){
    this.countryService.getCountry()
      .subscribe(value => {
        console.log(value);
        this.listCountry = new MatTableDataSource<CountryModel>(value.data);
        this.listCountry.sort = this.sort;
        this.listCountry.paginator = this.paginator;
      });
  }

  get code(){
    return this.searchForm.get('code');
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }

  get file(){
    return this.countryForm.get('file');
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


  onAddCountry() {
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.panelClass = ['background-dialog'];
    this.dialog.open(CountryCreateComponent, dialogOption);
  }

  applyFilterCountry(filterValue: string) {
    this.listCountry.filter = filterValue.trim().toLocaleLowerCase();
  }

  onEditCountry(country: CountryModel){
    //this.applicationService.deleteApplication(application);
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.id = country.id + '';
    this.dialog.open(CountryEditComponent, dialogOption);
  }

  onDeleteCountry(country: CountryModel){
    this.countryService.deleteCountry(country);
  }

}
