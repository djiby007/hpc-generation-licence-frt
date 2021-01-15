import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FilialeService} from "../../services/filiale.service";
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {FilialeModel} from "../../models/filiale.model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-filiale-list',
  templateUrl: './filiale-list.component.html',
  styleUrls: ['./filiale-list.component.css']
})
export class FilialeListComponent implements OnInit {

  constructor(private router: Router, private filialeService: FilialeService, private ngxCsvParser: NgxCsvParser) { }

  get code(){
    return this.searchForm.get('code');
  }

  get file(){
    return this.filialeForm.get('file');
  }

  listFiliale: FilialeModel[];
  filialeForm: FormGroup;
  searchForm: FormGroup;
  listImportFiliale: FilialeModel[] = [];
  header = true;
  delete = false;
  submitted = false;
  test: boolean;
  successMessage: string;
  editFilialeUrl = '/filiale/edit/';

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


  onEditFiliale(filiale: FilialeModel){
    this.router.navigateByUrl(this.editFilialeUrl + (filiale.id));
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
            // @ts-ignore
            this.successMessage = data.message;
            this.Toast.fire({
              icon: 'success',
              title: this.successMessage,
            });
            this.getAllFiliale();
          }, err => {
            console.log(err);
          });
        }
      });
    }
  }

  getAllFiliale(){
    this.filialeService.getFiliale().subscribe(value => this.listFiliale = value.data);
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
