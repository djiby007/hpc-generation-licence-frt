import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ConfigurationModel} from '../../models/configuration.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfigurationCreateComponent} from '../configuration-create/configuration-create.component';
import {ConfigurationService} from '../../services/configuration.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {ConfigurationEditComponent} from '../configuration-edit/configuration-edit.component';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listConfiguration: MatTableDataSource<ConfigurationModel>;
  displayColumns: string[] = ['Status', 'Option', 'Valeur Debut', 'Valeur Fin', 'Montant', 'Actions'];
  successApiMessage: string;
  errorApiMessage: string;
  successStatus: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private configService: ConfigurationService) {
    this.configService.listen().subscribe( (c: any) => {
      this.refreshConfigList();
    });
  }

  ngOnInit(): void { this.refreshConfigList(); }

  refreshConfigList(){
    this.configService.getConfigList().subscribe(data => {
        this.listConfiguration = new MatTableDataSource<ConfigurationModel>(data);
        this.listConfiguration.sort = this.sort;
        this.listConfiguration.paginator = this.paginator;
    });
  }

  onEditConfig(config: ConfigurationModel){
    this.configService.currentConfig = config;
    const dialogConfiguration = new MatDialogConfig();
    dialogConfiguration.disableClose = true;
    dialogConfiguration.autoFocus = true;
    dialogConfiguration.width = '50%';
    this.dialog.open(ConfigurationEditComponent, dialogConfiguration);
  }

  onDeleteConfig(config: ConfigurationModel){
    if (config.id){
      this.configService.deleteConfig(config.id, config).subscribe(response => {
        this.successApiMessage = response.message;
        this.successStatus = Boolean(response.success);
        if (this.successStatus === true){
          this.snackbar.open(this.successApiMessage.toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        }else {
          this.errorApiMessage = response.message;
          this.snackbar.open(this.errorApiMessage.toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        }
        this.refreshConfigList();
      }, err => {
        console.log(err.message);
      });
    }
  }

  applyFilter(filterValue: string) {
    this.listConfiguration.filter = filterValue.trim().toLocaleLowerCase();
    console.log(filterValue);
  }

  onAdd() {
    const dialogConfiguration = new MatDialogConfig();
    dialogConfiguration.disableClose = true;
    dialogConfiguration.autoFocus = true;
    dialogConfiguration.width = '50%';
    dialogConfiguration.panelClass = ['background-dialog'];
    this.dialog.open(ConfigurationCreateComponent, dialogConfiguration);
  }
}
