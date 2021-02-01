import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {OptionModel} from "../../../option/models/option.model";
import {ApplicationModel} from "../../models/application.model";
import {ApplicationService} from "../../service/application.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OptionEditComponent} from "../../../option/component/option-edit/option-edit.component";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {OptionCreateComponent} from "../../../option/component/option-create/option-create.component";
import {ApplicationCreateComponent} from "../application-create/application-create.component";

@Component({
  selector: 'app-application-list',
  templateUrl:  './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Columns: string[] = [ 'nom', 'description', 'prix', 'nombreJour', 'status' ];
  listApplication: MatTableDataSource<ApplicationModel>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private applicationService: ApplicationService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
  this.getAllApplication();
  }

  getAllApplication(){
    this.applicationService.getApplication()
      .subscribe(value => {
        console.log(value);
        this.listApplication = new MatTableDataSource<ApplicationModel>(value.data);
        this.listApplication.sort = this.sort;
        this.listApplication.paginator = this.paginator;
      })
  }

  onAddOption() {
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.panelClass = ['background-dialog'];
    this.dialog.open(ApplicationCreateComponent, dialogOption);
  }

  applyFilterApplications(filterValue: string) {
    this.listApplication.filter = filterValue.trim().toLocaleLowerCase();
  }

  onEditApplication(application: ApplicationModel){
    this.applicationService.deleteApplication(application);
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    this.dialog.open(OptionEditComponent, dialogOption);
  }

  onDeleteApplication(application: ApplicationModel){

  }

}
