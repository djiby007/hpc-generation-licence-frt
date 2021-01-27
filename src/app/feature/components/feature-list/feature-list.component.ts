import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {FeatureModel} from '../../models/feature.model';
import {FeatureService} from '../../services/feature.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {

  listFeatures: any = {};
  featureFined: any;
  successMessage: string;
  errorMessage: string;
  uploadFileForm: FormGroup;
  searchFeatureForm: FormGroup;
  submitted = false;
  statusApi: boolean;
  header = true;
  delete = false;
  test: boolean;
  successData: string;
  @ViewChild('fileImportInput', {static: false}) fileImportInput: any;

  constructor(private featureService: FeatureService, private router: Router, private ngxCsvParser: NgxCsvParser) {
  }

  get code() {
    return this.searchFeatureForm.get('code');
  }

  editFeatureUrl = '/feature/edit/';
  featureListImport: FeatureModel[] = [];
  @ViewChild('closeButton') closeButton;

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

  get file() {
    return this.uploadFileForm.get('file');
  }

  ngOnInit(): void {
    this.getFeature();
    this.createForm();
    this.createFileForm();
    this.delete = false;
  }

  createForm() {
    this.searchFeatureForm = new FormGroup({
      code: new FormControl('', Validators.required)
    });
  }

  createFileForm(){
    this.uploadFileForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }

  getFeature(){
    this.featureService.getFeatures()
      .subscribe(data => {
        this.listFeatures = data;
        this.delete = false;
        this.test = true;
      }, error => {
        console.log(error);
      });
  }

  onSearchFeature(){
    const code = this.searchFeatureForm.value;
    this.submitted = true;
    if (this.searchFeatureForm.invalid) {
      this.getFeature();
      return;
    }
    if ((code) === '') {
      this.getFeature();
    } else {
      this.featureService.searchFeatureKeyword(code)
        .subscribe(data => {
          this.listFeatures = data;
          this.featureFined = this.listFeatures;
          this.test = false;
        }, error => {
          console.log(error);
        });
    }
  }

  onEditFeature(feature: FeatureModel){
    this.router.navigateByUrl(this.editFeatureUrl + (feature.id));
  }

  onDeleteFeature(f: FeatureModel){
    if (f.id) {
      Swal.fire({
        html: 'Voulez vous vraiment supprimer cette fonctionalité?',
        showCancelButton: true,
        confirmButtonText: `Supprimer`,
        confirmButtonColor: '#138f46',
        cancelButtonColor: '#2d7de0',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.featureService.deleteFeature(f.id, f)
            .subscribe(data => {
              // @ts-ignore
              this.successMessage = data.message;
              this.Toast.fire({
                icon: 'success',
                title: this.successMessage,
              });
              this.getFeature();
            }, err => {
              console.log(err);
            });
        }
      });
    }
  }

  onSave() {
    this.closeButton.nativeElement.click();
  }

  getFile($event: any): void {
    const files = $event.srcElement.files;
    if (files.type === 'application/vnd.ms-excel') {
      Swal.fire('', 'Veuilez selectioner un fichier csv!');
    } else {
      this.ngxCsvParser.parse(files[0], {header: this.header, delimiter: ','})
        .pipe().subscribe((result: Array<FeatureModel>) => {
        this.featureListImport = result;
      }, (error: NgxCSVParserError) => {
        console.log(error.message);
      });
    }
  }

  uploadFeature() {
    this.featureService.ImportFeature(this.featureListImport)
      .subscribe(res => {
          this.getFeature();
          // @ts-ignore
          this.successMessage = res.message;
          // @ts-ignore
          this.successData = res.data;
          // @ts-ignore
          this.statusApi = res.success;
        }, error => {
          this.errorMessage = error.message;
          console.log(error.message);
        }
      );
    this.onSave();
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }
}
