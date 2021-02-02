import {Component, OnInit, ViewChild} from '@angular/core';
import {LicenceService} from '../../services/licence.service';
import {LicenceModel} from '../../models/licence.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-licence-list',
  templateUrl: './licence-list.component.html',
  styleUrls: ['./licence-list.component.css']
})
export class LicenceListComponent implements OnInit {
  licenceList: MatTableDataSource<LicenceModel>;
  Columns: string[] = [ 'Status', 'Clé', 'Description', 'Date début', 'Date Fin', 'Durée' ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private licenceService: LicenceService) {
    this.licenceService.listen().subscribe( (l: any) => {
      this.getLicences();
    });
  }

  ngOnInit(): void {
    this.getLicences();
  }

  getLicences(){
    this.licenceService.getAllLicence().subscribe(value => {
      this.licenceList = new MatTableDataSource<LicenceModel>(value.data);
      this.licenceList.sort = this.sort;
      this.licenceList.paginator = this.paginator;
    });
  }

  addLicence(){

  }

  applyFilterLicences(filterValue: string) {
    this.licenceList.filter = filterValue.trim().toLocaleLowerCase();
  }
}
