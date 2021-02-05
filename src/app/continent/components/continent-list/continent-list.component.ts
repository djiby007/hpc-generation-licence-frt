import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ContinentService} from '../../services/continent.service';
import {ContinentModel} from '../../models/continent.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConfigurationModel} from "../../../configuration/models/configuration.model";
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-continent-list',
  templateUrl: './continent-list.component.html',
  styleUrls: ['./continent-list.component.scss']
})
export class ContinentListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listContinent:  MatTableDataSource<ContinentModel>;
  Columns: string[] = ['Code', 'Libellé'];

  constructor(
    private router: Router,
    private continentService: ContinentService) {
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
  }

  getAllContinent(){
    this.continentService.getContinent().subscribe(value => {
      this.listContinent = new MatTableDataSource<ContinentModel>(value.data);
      this.listContinent.sort = this.sort;
      this.listContinent.paginator = this.paginator;
    });
  }
}
