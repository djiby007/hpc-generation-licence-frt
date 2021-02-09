import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FilialeService} from "../../services/filiale.service";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {FilialeModel} from "../../models/filiale.model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FilialeCreateComponent} from "../filiale-create/filiale-create.component";
import {FilialeEditComponent} from "../filiale-edit/filiale-edit.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-filiale-list',
  templateUrl: './filiale-list.component.html',
  styleUrls: ['./filiale-list.component.css']
})
export class FilialeListComponent implements OnInit {

  successMessage: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Columns: string[] = [ 'nom', 'adress', 'email', 'phone', 'webSite', 'city', 'Actions' ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  listFiliale: MatTableDataSource<FilialeModel>;
  filialeForm: FormGroup;
  searchForm: FormGroup;
  listImportFiliale: FilialeModel[] = [];
  header = true;
  delete = false;
  submitted = false;
  test: boolean;

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


  constructor(
    private router: Router,
    private filialeService: FilialeService,
    private ngxCsvParser: NgxCsvParser,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,) { }

  get code(){
    return this.searchForm.get('code');
  }

  get file(){
    return this.filialeForm.get('file');
  }

  ngOnInit(): void {
    this.getAllFiliale();
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
      this.getAllFiliale();
      return;
    }
    if ((code.trim()) === '') {
      this.Toast.fire({
        icon: 'warning',
        title: 'Rien à recherhcer!',
      });
      this.getAllFiliale();
    }else{
      this.filialeService.searchFilialeKeyword(code)
        .subscribe(data => {
          this.listFiliale = data;
          this.test = false;
        }, error => {
          console.log(error);
        });
    }
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }

  applyFilterFiliale(filterValue: string) {
    this.listFiliale.filter = filterValue.trim().toLocaleLowerCase();
  }

  onAddFiliale() {
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.panelClass = ['background-dialog'];
    this.dialog.open(FilialeCreateComponent, dialogOption);
    this.dialog.afterAllClosed.subscribe(()=>{
      this.getAllFiliale();
    });
  }

  onEditFiliale(filiale: FilialeModel){
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.id = filiale.id + '';
    this.dialog.open(FilialeEditComponent, dialogOption);
    this.dialog.afterAllClosed.subscribe(()=>{
      this.getAllFiliale();
    });
  }

  onDeleteFiliale(filiale: FilialeModel){
    if (filiale.id) {
      Swal.fire({
        html: 'Voulez vous vraiment supprimer cette société ?',
        showCancelButton: true,
        confirmButtonText: `Supprimer`,
        confirmButtonColor: '#138f46',
        cancelButtonColor: '#2d7de0',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.filialeService.deleteFiliale(filiale).subscribe( data => {
            if (data.success === true){
              this.snackbar.open(data.message, '', {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['green-snackbar']
              });
              this.getAllFiliale();
            } else {
              this.snackbar.open(data.message.toString(), '', {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['green-snackbar']
              });
            }
          }, err => {
            console.log(err);
          });
        }
      });
    }
  }

  getAllFiliale(){
    this.filialeService.getFiliale().subscribe(value => {
      this.listFiliale = new MatTableDataSource<FilialeModel>(value.data);
      this.listFiliale.sort = this.sort;
      this.listFiliale.paginator = this.paginator;
    });
  }

  createForm(){
    this.filialeForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }

  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
      this.listImportFiliale = result.map(value => {
        value.city = {id: value.city};
        return value;
      });
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

  }

  onSubmit() {
    this.filialeService.importFiliale(this.listImportFiliale).subscribe(
      (data) => {
        this.getAllFiliale();
        this.listImportFiliale = [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
