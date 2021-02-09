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
import {ApplicationEditComponent} from "../application-edit/application-edit.component";

@Component({
  selector: 'app-application-list',
  templateUrl:  './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Columns: string[] = [ 'status', 'nom', 'description', 'prix', 'nombreJour', 'Actions' ];
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
    this.dialog.afterAllClosed.subscribe(()=>{
      this.getAllApplication();
    });
  }

  applyFilterApplications(filterValue: string) {
    this.listApplication.filter = filterValue.trim().toLocaleLowerCase();
  }

  onEditApplication(application: ApplicationModel){
    //this.applicationService.deleteApplication(application);
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.id = application.id + '';
    this.dialog.open(ApplicationEditComponent, dialogOption);
    this.dialog.afterAllClosed.subscribe(()=>{
      this.getAllApplication();
    });
  }

  onDeleteApplication(application: ApplicationModel){
    this.applicationService.deleteApplication(application).subscribe(data=>{
      if (data.success === true){
        this.snackbar.open(data.message, '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar']
        });
        this.getAllApplication();
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
